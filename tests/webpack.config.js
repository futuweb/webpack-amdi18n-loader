module.exports = {
	entry:{
		'basic/bundle':'./basic/main',
		'fallback/bundle':'./fallback/main',
		'format-amd/bundle':'./format-amd/main',
		'format-amd-functions/bundle':'./format-amd-functions/main',
		'format-json/bundle':'./format-json/main',
		'format-coffee/bundle':'./format-coffee/main.coffee',
		'query/bundle':'./query/main',
		'root-true/bundle':'./root-true/main',
	},
	module:{
		loaders:[{
			test: /\.coffee$/,
			loader: 'coffee-loader'
		}]
	},
	output:{
		library:'bundle',
		libraryTarget:'commonjs2',
		filename:'[name].js'
	}
};
