const path = require('path');
const htmlPlugin = require('html-webpack-plugin');

const SOURCE_DIR = path.resolve('./src');
const BUILD_DIR = path.resolve('./dist');
const NODE_MODULES = path.resolve('./node_modules');

module.exports = {
	resolve: {
		extensions: [ '.js', '.jsx', '.json', '.gql' ]
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
						presets: [ [ 'env', { module: false } ], 'stage-0', 'react' ],
						plugins: [
							'transform-decorators-legacy',
							[
								'import',
								{ libraryName: 'antd', libraryDirectory: 'es', style: true } // `style: true` 会加载 less 文件
							],
							[
								'transform-runtime',
								{
									helpers: false,
									polyfill: false,
									regenerator: true,
									moduleName: 'babel-runtime'
								}
							]
						]
					}
				}
			},
			{
				test: /\.(css|less)$/,
				exclude: path.join(NODE_MODULES, 'antd', 'es'),
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader', options: { modules: true } },
					{ loader: 'postcss-loader' },
					{ loader: 'less-loader', options: { javascriptEnabled: true } }
				]
			},
			{
				test: /\.(css|less)$/,
				include: path.join(NODE_MODULES, 'antd', 'es'),
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'postcss-loader' },
					{ loader: 'less-loader', options: { javascriptEnabled: true } }
				]
			},
			{
				test: /\.(graphql|gql)$/,
				exclude: /node_modules/,
				loader: 'graphql-tag/loader'
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
