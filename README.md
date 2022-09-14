# amdi18n-loader

[![Travis branch](https://img.shields.io/travis/futuweb/webpack-amdi18n-loader/master.svg)](https://travis-ci.org/futuweb/webpack-amdi18n-loader)
[![npm](https://img.shields.io/npm/v/amdi18n-loader.svg)](https://npmjs.com/package/amdi18n-loader)

[中文文档](./README_zh.md)

Webpack i18n loader helps your projects to process internationalization (i18n).

It's quite similar to require.js i18n plugin.

Features:

- Fully compatitable with webpack 1/2/3/4
- Works with language packages. (similar to require.js)
- Support CommonJS/AMD/ESM module and `.json` files, and more, `.coffee` files
- Auto init current language via `html[lang]` attribute, global varible or browser/system settings
- Switch current language at runtime
- Enable/Disable language packages via queries

## Install

```sh
npm install amdi18n-loader
```

## Usage

First look at require.js i18n plugin's docs [here](http://requirejs.org/docs/api.html#i18n).

The structure of language packages are like this:

- `lang.js`
- `zh-cn/lang.js`
- `zh-hk/lang.js`

lang.js:

```javascript
define({
    // root means the common language package
    root:{
        HELLO:'hello'
    },
    // we have the language packages below:
    'zh-cn':true,
    'zh-hk':true
});
```

zh-cn/lang.js example:

```javascript
define({
    // please note: no wrapper object here!
    HELLO:'hello in zh-cn'
});
```

Then use it like this:

```javascript
define([
    'amdi18n-loader!lang'
],function(amdi18n){

    // By default, it will lookup `window._i18n.locale`,
    //
    // If not found, it will try to use the html[lang] attribute,
    // For example: <html lang="en"> then language `en` was used,
    //
    // If still not found, it will try to use browser/system settings
    //     navigator.languages[0] || navigator.language || navigator.userLanguage (.toLowerCase())
    //
    // If nothing found, `root` was used.
    //
    // You can manully change the language by
    // `amdi18n.init(language)`;

    console.log(amdi18n.HELLO);


});
```

## Advanced Usage

### Enable/Disable language packages

You can pass queries to enable or disable some langs.

```javascript
// We use commonjs now. It matters nothing.
var lang = require('amdi18n-loader?enable=[zh-cn]!');

// It's not ok to use zh-hk now!
lang.init('zh-hk');
```

The code below behaviors the same:

```javascript
// We use commonjs now. It matters nothing.
// Notice: we use `|` to as separator,
// Because webpack will break the comma.
var lang = require('amdi18n-loader?disable=[zh-hk|en-us]!');

// It's not ok to use zh-hk now!
lang.init('zh-hk');
```

It's ok to use both `enable` and `disable`, but if any one disables a lang, the lang will not be usable. You can decide which to use by the length of list.

### Expose Root Object

In some case, accessing `root` object is required (#19). You can pass a query `expose-root` to expose the `root` object.

```javascript
require('amdi18n-loader?expose-root=1!')
```

## Notice

If you choose to use `.json` files as your lang files in webpack 4+, You need to specify the type of json files, otherwise webpack will try to parse the final script content as JSON, and throws errors.

```javascript
// in module.rules
{
    // to avoid affecting other json files
    // you'd better specify the lang files only,
    test: /\.json$/,
    type: 'javascript/auto'
},
```

## History

### v0.9.4 (2022-09-14)

- Fallback: Add support for nested objects. [#35](https://github.com/futuweb/webpack-amdi18n-loader/pull/35) (By cavic19)

### v0.9.3 (2019-06-28)

- update `mocha` in `devDependencies`. [#32](https://github.com/futuweb/webpack-amdi18n-loader/issues/32) (By umar-khan)
- Fix: `false` value of a language key in root file ignored. [#33](https://github.com/futuweb/webpack-amdi18n-loader/issues/32) (By dlangerenken)

### v0.9.2 (2019-02-12)

- allows `export default{` without whitespace in ESM module lang files. [#30](https://github.com/futuweb/webpack-amdi18n-loader/issues/30) (By dlangerenken)

### v0.9.1 (2018-12-17)

- Fix: `navigator.languages` not exists on IE. [#28](https://github.com/futuweb/webpack-amdi18n-loader/issues/28) (By gitgrimbo)

### v0.9.0 (2018-12-14)

- Read language settings from `navigator.languages` `navigator.language` and `navigator.userLanguage`. [#25](https://github.com/futuweb/webpack-amdi18n-loader/issues/25)
- Support using in Node environment. [#26](https://github.com/futuweb/webpack-amdi18n-loader/issues/26) (By gitgrimbo)

### v0.8.0 (2018-07-01)

- Support webpack 4.
- Support ESM modules in lang files. (`export default {}`). [#16](https://github.com/futuweb/webpack-amdi18n-loader/issues/16)
- Add a config to expose the `root` object. [#19](https://github.com/futuweb/webpack-amdi18n-loader/issues/19)
- Support using in global config (e.g. `webpack.config.js`) and passing options.
- Better auto test for Node 7/8/10 and webpack 1/2/3/4.

### v0.7.0 (2018-03-20)

- Support functions in lang files. [#20](https://github.com/futuweb/webpack-amdi18n-loader/issues/20) (By ggriffithsIDBS)

### v0.6.2 (2017-10-16)

- Fix: failed to fallback to root. [#17](https://github.com/futuweb/webpack-amdi18n-loader/issues/17)

### v0.6.1 (2017-06-29)

- Add lang files to webpack dependencies, so they can be watched and live-reloaded. See [#15](https://github.com/futuweb/webpack-amdi18n-loader/issues/15). (By jou)

### v0.6.0 (2017-06-11)

- Add a type of format support (for require.js i18n plugin). See [#14](https://github.com/futuweb/webpack-amdi18n-loader/issues/14).

### v0.5.2 (2017-02-07)

- Fix: multi values in `enable` / `disable` queries invalid. [#10](https://github.com/futuweb/webpack-amdi18n-loader/issues/10)
- If a lang specified in `enable`, no longer required to specify in root.

### v0.5.1 (2017-01-14)

- Fix: AMD lang file without factory function not working. [#8](https://github.com/futuweb/webpack-amdi18n-loader/issues/8)

### v0.5.0 (2017-01-13)

- Add `enable` and `disable` queries. [#6](https://github.com/futuweb/webpack-amdi18n-loader/issues/7)
- Detect default language by html[lang] attribute. [#7](https://github.com/futuweb/webpack-amdi18n-loader/issues/7)
- Rewrite the method that extract language definitions.
- Add testing & travis CI.

### v0.4.0 (2016-01-18)

- Support `.coffee` language files. (By Mullerzs)

### v0.3.2 (2015-12-15)

- Fix bug using in UMD mode. (By Rick)

### v0.3.1 (2015-12-15)

- Fix bug on IE. (By Rick)

### v0.3.0 (2015-12-14)

- Support load CommonJS module and json file. (By Rick)

### v0.2.0 (2015-10-15)

- Auto init.

### v0.1.0 (2015-10-14)

- First release.
