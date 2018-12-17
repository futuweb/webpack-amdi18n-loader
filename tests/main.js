var should = require('should');

function mockWindowDocumentNavigator() {
	// Currently, the tests only run on Node, so window will never exist.
	// But if the tests could run in the browser, we don't want to overwrite
	// window or document.
	var windowExists = typeof window !== 'undefined';
	if (!windowExists) {
		document = {documentElement:{}};
		navigator = {};
		window = {document:document, navigator:navigator};
	}
	return function() {
		if (!windowExists) {
			delete window;
			delete navigator;
			delete document;
		}
	};
}

function clearModule(id) {
	// For some tests we load the same bundle/module multiple times.
	// So we need to remove that module from the cache so that it will be
	// properly loaded the next time.
	delete require.cache[require.resolve(id)];
}

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
	var restore = mockWindowDocumentNavigator();
	window._i18n = {locale:'zh-hk'};
	var lang = require('./fallback/bundle');
	restore();
	it('fallback to root', function() {
		lang.FALLBACK.should.equal('FALLBACK');
	});
});

describe('navigator.languages', function() {
	it('should use navigator.languages if present', function() {
		var restore = mockWindowDocumentNavigator();
		navigator.languages = ["zh-HK", "zh"];
		var lang = require('./fallback/bundle');
		clearModule('./fallback/bundle');
		restore();
		lang.HELLO.should.equal('雷吼');
	});
	it('should ignore undefined navigator.languages', function() {
		var restore = mockWindowDocumentNavigator();
		// navigator.languages doesn't exist on the mock by default,
		// but make it explicit for clarity.
		delete navigator.languages;
		var lang = require('./fallback/bundle');
		clearModule('./fallback/bundle');
		restore();
		lang.HELLO.should.equal('world');
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
	it('lang.root should be an object', function() {
		lang.root.should.be.an.Object();
	});
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
