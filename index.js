/*global module*/
var loaderUtils = require('loader-utils');

module.exports = function (content) {
	var query = {};
	if(this.query){
		if(typeof this.query === 'string'){
			query = loaderUtils.parseQuery(this.query);
		}else{
			query = this.query;
		}
	}


	// whitelist / blacklist
	var enableList = [];
	var disableList = [];
	if(query.enable){
		enableList = query.enable.replace(/[\[\]]/g,'').split('|').map(function(item){
			return item.trim();
		});
	}
	if(query.disable){
		disableList = query.disable.replace(/[\[\]]/g,'').split('|').map(function(item){
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
			// turn esm to commonjs2
			content = content.replace(/export[\s\r\n]+default[\s\r\n]+/, 'module.exports=');
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
	if(query['expose-root'] || query.exposeRoot){
		ret.root = json.root;
	}

	// merge
	// 1. langs in `root`
	// 2. enable list
	// 3. disable list
	var allLangs = [];
	for(var language in json){
		if(language === 'root' && typeof json.root !== 'boolean') continue;
		if(enableList.length && enableList.indexOf(language) === -1) continue;
		if(disableList.indexOf(language) > -1) continue;
		allLangs.push(language);
	}
	enableList.forEach(function(language){
		if(allLangs.indexOf(language) === -1){
			allLangs.push(language);
		}
	});
	// deal all langs except root
	for(var i = 0; i < allLangs.length; i++){
		var language = allLangs[i];
		// get lang file.
		var targetFile = path.join(targetPath,language,targetFileName);
		if(!fs.existsSync(targetFile)){
			this.emitError(targetFile + 'not exist!');
			return;
		}

		// add targetFile to webpack dependencies
		// so they can be watched and live-reloaded
		// see #15
		this.addDependency(targetFile);

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
	// store found functions as strings
	var funcs = [];
	// amdi18n is the final lang definition.
	var retStr = 'var amdi18n=' + JSON.stringify(ret, function(key,value) {
		if(typeof value === 'function') {
			var vFunc = value.toString();
			// store json version (function with quotes)
			funcs.push(JSON.stringify(vFunc));
			return vFunc;
		}
		return value;
	}) + ';';

	// replace function with quotes with raw function
	for(let func of funcs) {
		retStr = retStr.replace(func, JSON.parse(func));
	}


	// this function would be exported
	// and running in browser
	// it's used to determin which lang to use
	// then copy all definition of that lang to the "root" level
	var init = function(language){
		// get the default language
		if(!language){
			if(typeof window !== 'undefined' && window._i18n && window._i18n.locale){
				language = window._i18n.locale;
			}else if(typeof document !== 'undefined' && document.documentElement.lang){
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

		// fallback to root
		for(var name in this.__root){
			if(typeof this[name] === 'undefined'){
				this[name] = this.__root[name];
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
