/*global module*/
var loaderUtils = require('loader-utils');

module.exports = function (content) {
	var query = loaderUtils.parseQuery(this.query);

	// whitelist / blacklist
	var enableList = [];
	var disableList = [];
	if(query.enable){
		enableList = query.enable.replace(/[\[\]]/g,'').split(',').map(function(item){
			return item.trim();
		});
	}
	if(query.disable){
		disableList = query.disable.replace(/[\[\]]/g,'').split(',').map(function(item){
			return item.trim();
		});
	}

	var fs = require('fs');
	var path = require('path');
	var target = this.resourcePath;
	var targetPath = path.dirname(target);
	var targetFileName = path.basename(target);
	if(!fs.existsSync(target)){
		this.emitError(target + ' not exist!');
		return;
	}

	// get lang definition from all formats of files
	var getJsonFromFile = function(content){
		var sandbox = {
			json:'',
			module : {},
			exports : {}
		};

		var mockDefine = function(id, dependencies, factory){
			if(!factory){
				if(!dependencies){
					factory = id;
				}else{
					factory = dependencies;
				}
			}
			if(typeof factory === 'function'){
				this.json = factory();
			}else{
				this.json = factory;
			}
		};


		var vm = require('vm');
		var context = vm.createContext(sandbox);

		var script;
		// get lang definition by file extension.
		if(/\.json/.test(targetFileName)){
			script = 'json = ' + content;
		}else{
			// define the 'define()' function
			script = 'var define=' + mockDefine.toString() + ';' +
				// execute 'define()' function
				content + ';' +
				// if it's amd, this.json is the correct value.
				// if it's not amd, give the commonjs result.
				'if(!json && module.exports) json = module.exports;';
		}
		var vmScript = new vm.Script(script);
		vmScript.runInContext(context);
		return sandbox.json;
	};

	// get root
	var json = getJsonFromFile(content);
	// object with all langs
	var ret = {};
	var coffee;
	var __content;

	// root lang
	ret.__root = json.root;

	// deal all langs except root
	for(var language in json){
		if(language === 'root') continue;
		if(enableList.length && enableList.indexOf(language) === -1) continue;
		if(disableList.indexOf(language) > -1) continue;
		// get lang file.
		var targetFile = path.join(targetPath,language,targetFileName);
		if(!fs.existsSync(targetFile)){
			this.emitError(targetFile + 'not exist!');
			return;
		}

		// lang file raw content
		__content = fs.readFileSync(targetFile,'utf8');

		// compile coffee script
		if (targetFile.match(/\.coffee$/)){
			if(!coffee) coffee = require('coffee-script');
			__content = coffee.compile(__content,{ bare: true });
		}

		// give this lang definition to ret
		ret['__' + language] = getJsonFromFile(__content);
	}

	// amdi18n is the final lang definition.
	var retStr = 'var amdi18n=' + JSON.stringify(ret) + ';';

	// this function would be exported
	// and running in browser
	// it's used to determin which lang to use
	// then copy all definition of that lang to the "root" level
	var init = function(language){
		// get the default language
		if(!language){
			if(window._i18n && window._i18n.locale){
				language = window._i18n.locale;
			}else if(document.documentElement.lang){
				language = document.documentElement.lang;
			}else{
				language = 'root';
			}
		}
		var target = this['__' + language] || this.__root;

		// copy definition to root level
		if (target) {
			for (var name in target) {
				this[name] = target[name];
			}
		}
	};

	// loader-related issue, nothing matters.
	retStr += 'amdi18n.init=' + init.toString() + ';';
	retStr += 'amdi18n.init();';
	retStr += 'module.exports=amdi18n;';

	if(this.cacheable) this.cacheable();
	this.value = content;
	return retStr;
};
