var should = require('should');
// mock
global.document = {documentElement:{}};
global.window = {document:document};

describe('basic function', function() {
	var lang = require('./basic/bundle');
	it('lang is an object', function() {
		lang.should.be.an.Object();
	});
	it('lang.HELLO(root)', function() {
		lang.HELLO.should.equal('world');
	});
	it('lang.HELLO(zh-cn)', function() {
		lang.init('zh-cn');
		lang.HELLO.should.equal('你好');
	});
	it('lang.HELLO(zh-hk)', function() {
		lang.init('zh-hk');
		lang.HELLO.should.equal('雷吼');
	});

});

describe('fallback', function() {
	global.window._i18n = {locale:'zh-hk'};
	var lang = require('./fallback/bundle');
	delete global.window._i18n;
	it('fallback to root', function() {
		lang.FALLBACK.should.equal('FALLBACK');
	});
});

describe('format-amd', function() {
	var lang = require('./format-amd/bundle');
	it('lang.HELLO(root, factory function)', function() {
		lang.HELLO.should.equal('world');
	});
	it('lang.HELLO(zh-cn, with dependencies)', function() {
		lang.init('zh-cn');
		lang.HELLO.should.equal('你好');
	});
	it('lang.HELLO(zh-hk, with id and dependencies)', function() {
		lang.init('zh-hk');
		lang.HELLO.should.equal('雷吼');
	});
	it('lang.HELLO(en, no factory function)', function() {
		lang.init('en');
		lang.HELLO.should.equal('world-en');
	});
});

describe('format-json', function() {
	var lang = require('./format-json/bundle');
	it('lang.HELLO(root)', function() {
		lang.HELLO.should.equal('world');
	});
	it('lang.HELLO(zh-cn)', function() {
		lang.init('zh-cn');
		lang.HELLO.should.equal('你好');
	});
	it('lang.HELLO(zh-hk)', function() {
		lang.init('zh-hk');
		lang.HELLO.should.equal('雷吼');
	});
});

describe('format-esm', function() {
	var lang = require('./format-esm/bundle');
	it('lang.HELLO(root)', function() {
		lang.HELLO.should.equal('world');
	});
	it('lang.HELLO(zh-cn)', function() {
		lang.init('zh-cn');
		lang.HELLO.should.equal('你好');
	});
	it('lang.HELLO(zh-hk)', function() {
		lang.init('zh-hk');
		lang.HELLO.should.equal('雷吼');
	});
});

describe('format-coffee', function() {
	var lang = require('./format-coffee/bundle');
	it('lang.HELLO(root)', function() {
		lang.HELLO.should.equal('world');
	});
	it('lang.HELLO(zh-cn)', function() {
		lang.init('zh-cn');
		lang.HELLO.should.equal('你好');
	});
	it('lang.HELLO(zh-hk)', function() {
		lang.init('zh-hk');
		lang.HELLO.should.equal('雷吼');
	});
});

describe('query', function() {
	var lang = require('./query/bundle');
	it('lang.HELLO(root)', function() {
		lang.HELLO.should.equal('world');
	});
	it('lang.HELLO(zh-cn)', function() {
		lang.init('zh-cn');
		lang.HELLO.should.equal('你好');
	});
	it('lang.HELLO(en-us)', function() {
		lang.init('en-us');
		lang.HELLO.should.equal('hello-us');
	});
	// zh-hk is not enabled
	it('lang.HELLO(zh-hk)', function() {
		lang.init('zh-hk');
		lang.HELLO.should.equal('world');
	});
});

describe('root-true', function() {
	var lang = require('./root-true/bundle');
	it('lang.HELLO(root)', function() {
		lang.HELLO.should.equal('world');
	});
	it('lang.HELLO(zh-cn)', function() {
		lang.init('zh-cn');
		lang.HELLO.should.equal('你好');
	});
	it('lang.HELLO(zh-hk)', function() {
		lang.init('zh-hk');
		lang.HELLO.should.equal('雷吼');
	});
});

describe('format-amd-functions', function() {
	var lang = require('./format-amd-functions/bundle');

	it('lang.HELLO(root, factory function)', function() {
		lang.HELLO.should.equal('world');
	});
	it('lang.HELLO_ARROW(root, factory function)', function() {
		lang.HELLO_ARROW(2).should.equal('world 2 times');
	});
	it('lang.HELLO_OBJECT.HELLO_FUNC(root, factory function)', function() {
		lang.HELLO_OBJECT.HELLO_FUNC(2).should.equal('world 2 times');
	});

	it('lang.HELLO(zh-cn, with dependencies)', function() {
		lang.init('zh-cn');
		lang.HELLO.should.equal('你好');
	});
	it('lang.HELLO_ARROW(zh-cn, with dependencies)', function() {
		lang.init('zh-cn');
		lang.HELLO_ARROW(2).should.equal('你好 2 times');
	});
	it('lang.HELLO_OBJECT.HELLO_FUNC(zh-cn, with dependencies)', function() {
		lang.init('zh-cn');
		lang.HELLO_OBJECT.HELLO_FUNC(2).should.equal('你好 2 times');
	});

	it('lang.HELLO(zh-hk, with id and dependencies)', function() {
		lang.init('zh-hk');
		lang.HELLO.should.equal('雷吼');
	});
	it('lang.HELLO_ARROW(zh-hk, with id and dependencies)', function() {
		lang.init('zh-hk');
		lang.HELLO_ARROW(2).should.equal('雷吼 2 times');
	});
	it('lang.HELLO_OBJECT.HELLO_FUNC(zh-hk, with id and dependencies)', function() {
		lang.init('zh-hk');
		lang.HELLO_OBJECT.HELLO_FUNC(2).should.equal('雷吼 2 times');
	});

	it('lang.HELLO(en, no factory function)', function() {
		lang.init('en');
		lang.HELLO.should.equal('world-en');
	});
	it('lang.HELLO_ARROW(en, no factory function)', function() {
		lang.init('en');
		lang.HELLO_ARROW(2).should.equal('world-en 2 times');
	});
	it('lang.HELLO_OBJECT.HELLO_FUNC(en, no factory function)', function() {
		lang.init('en');
		lang.HELLO_OBJECT.HELLO_FUNC(2).should.equal('world-en 2 times');
	});
});
