/**
 * @author https://github.com/acvetkov
 * @overview Webpack config
 */

const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	mode: 'production',
	entry: {
		"sinon-chrome": path.resolve(__dirname, "./src/extensions/index.js"),
		"sinon-chrome-apps": path.resolve(__dirname, "./src/apps/index.js"),
		"sinon-chrome-webextensions": path.resolve(__dirname, "./src/webextensions/index.js")
	},
	output: {
		path: path.resolve(__dirname, "./dist/"),
		filename: "[name].min.js",
		library: "chrome",
		libraryTarget: "umd"
	},
	resolve: {
		alias: {
			sinon: path.resolve(__dirname, "node_modules/sinon/pkg/sinon.js")
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: "babel-loader"
				},
				exclude: /(node_modules)/
			},
			{
				test: /\.json$/,
				use: {
					loader: "json-loader"
				},
				type: 'javascript/auto'
			}
		],
		noParse: [/node_modules\/sinon/]
	},
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()]
	}
};
