/*global module*/
module.exports = function (content) {
	var fs = require('fs');
	var path = require('path');
	var target = this.resourcePath;
	var targetPath = path.dirname(target);
	var targetFileName = path.basename(target);
	if(!fs.existsSync(target)){
		this.emitError(target + ' not exist!');
		return;
	}


	var getJsonFromAmdFile = function(content){
		var sandbox = {
			json:'',
			module : {},
			exports : {}
		};

		var mockDefine = function(id, dependencies, obj){
			if(!obj){
				if(!dependencies){
					obj = id;
				}else{
					obj = dependencies;
				}
			}
			this.json = obj;
		};


		var vm = require('vm');
		var context = vm.createContext(sandbox);
		var script = new vm.Script('var define='+mockDefine.toString()+';var ret='+content + ';ret&&!json&&!module.exports&&(json=ret);');
		script.runInContext(context);
		return sandbox.json || (sandbox.module && sandbox.module.exports);
	};

	var json = getJsonFromAmdFile(content);

	var ret = {};
	var coffee;
	var __content;

	ret.__root = json.root;
	for(var language in json){
		if(language === 'root') continue;
		var targetFile = path.join(targetPath,language,targetFileName);
		if(!fs.existsSync(targetFile)){
			this.emitError(targetFile + 'not exist!');
			return;
		}

		__content = fs.readFileSync(targetFile,'utf8');

		if (targetFile.match(/\.coffee$/)){
			if(!coffee) coffee = require('coffee-script');
			__content = coffee.compile(__content,{ bare: true });
		}

		ret['__' + language] = getJsonFromAmdFile(__content);
	}

	var retStr = 'var amdi18n=' + JSON.stringify(ret) + ';';

	var init = function(language){
		if(!language){
			if(window._i18n && window._i18n.locale){
				language = window._i18n.locale;
			}else if(document.documentElement.lang){
				language = document.documentElement.lang;
			}else{
				language = 'root';
			}
		}
		if (Object.assign) {
			Object.assign(this,this.__root,this['__'+language]);
		} else {
			var target = this['__' + language] || this.__root;
			if (target) {
				for (var name in target) {
					this[name] = target[name];
				}
			}
		}
	};

	retStr += 'amdi18n.init=' + init.toString() + ';';
	retStr += 'amdi18n.init();';
	retStr += 'module.exports=amdi18n;';

	this.cacheable && this.cacheable();
	this.value = content;
	return retStr;
};
