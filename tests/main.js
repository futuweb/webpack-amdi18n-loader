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
		lang.HELLO.should.eql('world');
	});
});

