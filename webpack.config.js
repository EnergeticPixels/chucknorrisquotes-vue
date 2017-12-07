module.exports = {
	// main entry for our app
	entry: ['./src/index.js', './src/auth/index.js'],
	// output config
	output: {
		path: __dirname + '/build',
		publicPath: 'build/',
		filename: 'build.js'
	},

	module: {
		loaders: [
			// process *.vue files using vue-loader
			{test: /\.vue$/, loader: 'vue'},
			// process *.js files usign babel loader
			// the exclude pattern is important so that we don't 
			// apply babel transform to all the deps!
			{test: /\.js$/, loader: 'babel', exclude: /node_modules/}
		]
	},

	babel: {
		presets: ['env'],
		plugins: ['transform-runtime']
	}
}