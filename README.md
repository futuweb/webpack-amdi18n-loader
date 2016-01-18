# amdi18n-loader

Webpack i18n loader similar to require.js i18n plugin. The loader also support CommonJS module and `.json` files, and more, `.coffee` files.

## Install

```sh
npm install amdi18n-loader
```

## Usage

First look at require.js i18n plugin's docs [at here](http://requirejs.org/docs/api.html#i18n).

The language part is like this:

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
    'amdi18n!lang'
],function(amdi18n){

    // By default, it will lookup `window._i18n.locale`,
    // If nothing found, `root` was used.
    // You can manully change the language by
    // `amdi18n.init(language)`;

    console.log(amdi18n.HELLO);


});
```

## History

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
