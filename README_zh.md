# amdi18n-loader

[![Travis branch](https://img.shields.io/travis/futuweb/webpack-amdi18n-loader/master.svg)](https://travis-ci.org/futuweb/webpack-amdi18n-loader)
[![npm](https://img.shields.io/npm/v/amdi18n-loader.svg)](https://npmjs.com/package/amdi18n-loader)

Webpack i18n loader 可以帮助你的项目处理语言国际化问题（i18n）。

它的基本用法与require.js的i18n插件类似。

特性：

- 兼容webpack 1/2/3/4
- 使用语言包的方式支持多语言（与require.js类似）
- 语言包支持CommonJS/AMD/ESM模块，`.json`文件，以及`.coffee`文件
- 支持根据`html[lang]`属性、全局变量或者浏览器/操作系统语言自动初始化语言
- 支持运行时切换语言
- 支持使用参数启用/禁用指定语言

## 安装

```sh
npm install amdi18n-loader
```

## 使用

首先在[这里](http://requirejs.org/docs/api.html#i18n)查看require.js i18n插件的文档。

语言包的结构如下：

- `lang.js`
- `zh-cn/lang.js`
- `zh-hk/lang.js`

lang.js:

```javascript
define({
    // root是指不指定语言或者无法找到对应语言时的默认语言
    root:{
        HELLO:'hello'
    },
    // 指定有以下语言包
    'zh-cn':true,
    'zh-hk':true
});
```

zh-cn/lang.js示例：

```javascript
define({
    // 注意，此处没有包装对象
    HELLO:'hello in zh-cn'
});
```

然后像这样使用：

```javascript
define([
    'amdi18n-loader!lang'
],function(amdi18n){

    // 选择语言时会首先查找`window._i18n.locale`,
    //
    // 如果找不到，则会取html[lang]属性
    // 例如： <html lang="en"> 会行使用`en`语言
    //
    // 如果仍然找不到，会尝试使用浏览器/操作系统语言
    //     navigator.languages[0] || navigator.language || navigator.userLanguage (.toLowerCase())
    //
    // 如果还是找不到，则使用`root`
    //
    // 你可以这样切换当前使用的语言
    // `amdi18n.init(language)`;

    console.log(amdi18n.HELLO);


});
```

## 高级用法

### 启用/禁用指定语言

你可以通过传递参数来启用或禁用某些语言

```javascript
// 现在我们换成了commonjs模块规范，但是不影响逻辑
var lang = require('amdi18n-loader?enable=[zh-cn]!');

// 这里不能再使用zh-hk！
lang.init('zh-hk');
```

下面的代码效果是一样的

```javascript
// 现在我们换成了commonjs模块规范，但是不影响逻辑
// 注意：使用`|`作为语言之间的分隔符
// 因为逗号在这里使用会有问题
var lang = require('amdi18n-loader?disable=[zh-hk|en-us]!');

// 这里不能再使用zh-hk！
lang.init('zh-hk');
```

可以同时使用`enable`和`disable`选项，但是如果一个语言被其中的任意一个参数禁用，这个语言将不能被使用。你可以根据语言列表的长度来决定使用哪个选项会方便一些。

### 暴露root对象

在某些情况下，需要访问`root`对象（#19）。你可以传`expose-root`参数将`root`对象暴露出来。

```javascript
require('amdi18n-loader?expose-root=1!')
```

## 注意

如果你选择使用`.json`文件作为webpack 4+中的语言包，则需要指定JSON文件的类型，否则webpack会尝试将最终的JS文件当作JSON解析，导致报错。

```javascript
// module.rules设置
{
    // 为了不影响其它的JSON文件
    // 这里最好指定规则，只影响语言包文件
    test: /\.json$/,
    type: 'javascript/auto'
},
```

## 版本历史

### v0.9.4 (2022-09-14)

- 语言包回退：支持对象嵌套层级 [#35](https://github.com/futuweb/webpack-amdi18n-loader/pull/35) (By cavic19)

### v0.9.3 (2019-06-28)

- 升级`devDependencies`中的`mocha`版本。 [#32](https://github.com/futuweb/webpack-amdi18n-loader/issues/32) (By umar-khan)
- Fix: 语言定义中，某个语言的`false`值会被忽略的问题。 [#33](https://github.com/futuweb/webpack-amdi18n-loader/issues/32) (By dlangerenken)

### v0.9.2 (2019-02-12)

- 允许ESM模块的语言包文件使用`export default{`语法（不带空格）。 [#30](https://github.com/futuweb/webpack-amdi18n-loader/issues/30) (By dlangerenken)

### v0.9.1 (2018-12-17)

- Fix: `navigator.languages`在IE上不存在的问题。 [#28](https://github.com/futuweb/webpack-amdi18n-loader/issues/28) (By gitgrimbo)

### v0.9.0 (2018-12-14)

- 从`navigator.languages` `navigator.language` 或 `navigator.userLanguage`中读取当前语言。 [#25]((https://github.com/futuweb/webpack-amdi18n-loader/issues/25)
- 支持在Node环境中使用。 [#26](https://github.com/futuweb/webpack-amdi18n-loader/issues/26) (By gitgrimbo)

### v0.8.0 (2018-07-01)

- 支持webpack 4。
- 语言包支持使用ESM modules。 (`export default {}`)。 [#16](https://github.com/futuweb/webpack-amdi18n-loader/issues/16)
- 添加一个暴露`root`对象的选项。 [#19](https://github.com/futuweb/webpack-amdi18n-loader/issues/19)
- 支持全局指定参数(e.g. `webpack.config.js`)，也支持传递参数选项。
- 在Node 7/8/10及webpack 1/2/3/4下运行自动化测试。

### v0.7.0 (2018-03-20)

- 支持语言包文件中写函数。 [#20](https://github.com/futuweb/webpack-amdi18n-loader/issues/20) (By ggriffithsIDBS)

### v0.6.2 (2017-10-16)

- Fix: 回退到root语言包失败的问题。 [#17](https://github.com/futuweb/webpack-amdi18n-loader/issues/17)

### v0.6.1 (2017-06-29)

- 将语言包文件添加到webpack的依赖列表，以使它们可以被watch和live-reload。See [#15](https://github.com/futuweb/webpack-amdi18n-loader/issues/15). (By jou)

### v0.6.0 (2017-06-11)

- 添加一种语言包格式支持（来自require.js i18n插件）。 See [#14](https://github.com/futuweb/webpack-amdi18n-loader/issues/14).

### v0.5.2 (2017-02-07)

- Fix: `enable` / `disable` 选项中传多个值无效的问题。 [#10](https://github.com/futuweb/webpack-amdi18n-loader/issues/10)
- 如果一个语言包在`enable`中指定了，则不再需要在root中指定。

### v0.5.1 (2017-01-14)

- Fix: 没有工厂函数的AMD语言包失效的问题。 [#8](https://github.com/futuweb/webpack-amdi18n-loader/issues/8)

### v0.5.0 (2017-01-13)

- 添加`enable`和`disable`参数。 [#6](https://github.com/futuweb/webpack-amdi18n-loader/issues/7)
- 支持读取html[lang]属性来确定语言。 [#7](https://github.com/futuweb/webpack-amdi18n-loader/issues/7)
- 重写提取语言包的方法。
- 添加自动化测试和travis CI。

### v0.4.0 (2016-01-18)

- 支持`.coffee`语言文件。 (By Mullerzs)

### v0.3.2 (2015-12-15)

- Fix: UMD模式使用的bug。 (By Rick)

### v0.3.1 (2015-12-15)

- Fix: IE使用的bug。 (By Rick)

### v0.3.0 (2015-12-14)

- 语言包支持加载CommonJS模块和JSON文件。 (By Rick)

### v0.2.0 (2015-10-15)

- 自动初始化当前语言。

### v0.1.0 (2015-10-14)

- 首次发布。
