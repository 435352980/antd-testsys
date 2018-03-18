const path = require('path');
const SOURCE_DIR = path.resolve('./src');
const BUILD_DIR = path.resolve('./dist');
const htmlPlugin = require('html-webpack-plugin');

module.exports = {
	resolve: {
		extensions: [ '.js', '.jsx', '.json' ]
	},
	devtool: 'source-map',
	entry: {
		main: path.join(SOURCE_DIR, 'app.jsx')
	},
	output: {
		path: BUILD_DIR,
		filename: 'js/[name][hash].js'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				include: SOURCE_DIR,
				exclude: path.resolve('./node_modules'),
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ [ 'env', { module: false } ], 'stage-0', 'react' ]
					}
				}
			}
		]
	},
	plugins: [
		new htmlPlugin({
			template: path.join(SOURCE_DIR, 'index.html'),
			inject: 'body'
		})
	]
};
