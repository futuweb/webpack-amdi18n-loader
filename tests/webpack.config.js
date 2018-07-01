const webpack = require('webpack');
let webpackMainVersion = 0;
if(webpack.version){
	webpackMainVersion = parseInt(webpack.version);
}

const config = {
	entry:{
		'basic/bundle':'./basic/main',
		'fallback/bundle':'./fallback/main',
		'format-amd/bundle':'./format-amd/main',
		'format-amd-functions/bundle':'./format-amd-functions/main',
		'format-json/bundle':'./format-json/main',
		'format-esm/bundle':'./format-esm/main',
		'format-coffee/bundle':'./format-coffee/main.coffee',
		'query/bundle':'./query/main',
		'root-true/bundle':'./root-true/main',
	},
	module:{
		
	},
	output:{
		library:'bundle',
		libraryTarget:'commonjs2',
		filename:'[name].js'
	}
};

if(webpackMainVersion < 4){
	config.module.loaders = [{
		test: /\.coffee$/,
		loader: 'coffee-loader'
	}];
}else{
	config.module.rules = [{
		test: /\.coffee$/,
		use: 'coffee-loader'
	}];
}


module.exports = config;
