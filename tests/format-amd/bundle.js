module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(3);



/***/ }),
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports) {

	var amdi18n={"__root":{"HELLO":"world"},"__zh-cn":{"HELLO":"你好"},"__zh-hk":{"HELLO":"雷吼"},"__en":{"HELLO":"world-en"}};amdi18n.init=function (language){
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

			// fallback to root
			for(var name in this.__root){
				if(typeof this[name] === 'undefined'){
					this[name] = this.__root[name];
				}
			}
		};amdi18n.init();module.exports=amdi18n;

/***/ })
/******/ ]);