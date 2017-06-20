const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const SERVERINFO = {
	host:'localhost',
	port:'81'
}
const PROJECT = {
	appPath:'app',
	distPath:'dist'
}

const PATHS = {
	app: path.join(__dirname, PROJECT.appPath),
	dist: path.join(__dirname, PROJECT.distPath),
	publicPath:'http://'+SERVERINFO.host+':'+SERVERINFO.port+'/'+PROJECT.distPath+'/'
};

const filePlugin = new ExtractTextWebpackPlugin({
	filename: 'css/[name].css',
	ignoreOrder: true /*次序不限*/
});

module.exports = {
	devServer: { /*服务配置*/
		host: SERVERINFO.host,
		port: SERVERINFO.port,
		overlay: { /*将eslint错误/警告直接显示在浏览器中*/
			errors: true,
			warnings: true
		}
	},
	entry: {
		app: PATHS.app
	},
	output: {
		path: PATHS.dist,
		publicPath:PATHS.publicPath,
		filename: 'js/[name].js' /*name 与 entry中的键值名称一致，可以有多个entry，自然就分成多个js*/
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'webpack demo'
		}),
		filePlugin /*将css文件抽取插件引入，防止页面flash*/
	],
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			query: {
				presets: ['es2015']
			}
		}],
		rules: [{
			test: /\.js$/,
			enforce: 'pre',
			loader: 'eslint-loader',
			exclude: /node_modules/,
			options: {
				emitWarning: true
			}
		}, {
			test: /\.css$/,
			exclude: /node_modules/,
			use: filePlugin.extract({
				use: {
					loader: 'css-loader',
					options: {
						modules: true
					}
				},
				fallback: 'style-loader'
			})
		}, {
			test: /\.(png|jpg)$/,
			loader: 'file-loader',
			loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
		}]

	},
	devtool: 'source-map'
};