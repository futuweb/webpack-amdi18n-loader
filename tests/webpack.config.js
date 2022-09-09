const webpack = require('webpack');
const path = require('path');
let webpackMainVersion = 0;
if(webpack.version){
	webpackMainVersion = parseInt(webpack.version);
}

const config = {
	entry:{
		'basic/bundle':'./basic/main',
		'fallback/bundle':'./fallback/main',
		'nested-objects/bundle':'./nested-objects/main',
		'format-amd/bundle':'./format-amd/main',
		'format-amd-functions/bundle':'./format-amd-functions/main',
		'format-json/bundle':'./format-json/main',
		'format-esm/bundle':'./format-esm/main',
		'format-coffee/bundle':'./format-coffee/main.coffee',
		'query/bundle':'./query/main',
		'query-config/bundle':'./query-config/main',
		'root-true/bundle':'./root-true/main',
	},
	module:{
		
	},
	output:{
		library:'bundle',
		libraryTarget:'commonjs2',
		path: path.join(__dirname, '.'),
		filename:'[name].js'
	}
};

if(webpackMainVersion < 4){
	config.module.loaders = [{
		test: /\.coffee$/,
		loader: 'coffee-loader'
	}];
}else{
	config.mode = 'development';
	config.resolveLoader = {
		alias: {
			'amdi18n-loader': path.join(__dirname, '../index.js')
		}
	},
	config.module.rules = [{
		test: /\.coffee$/,
		use: 'coffee-loader'
	},{
		test: /\.json$/,
		type: 'javascript/auto'
	},{
		test: /query\-config\/nls\/lang\.js/,
		loader: 'amdi18n-loader',
		options: {
			exposeRoot: true
		}
	}];
}


module.exports = config;
