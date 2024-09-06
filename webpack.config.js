
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const webfontsGenerator = require('@vusion/webfonts-generator');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
const fs = require('fs');

const dist = path.resolve(__dirname, 'dist');

const allSvg = [];
const allSvgImages = fs.readdirSync('./src/assets/svg');
allSvgImages.forEach((file) => {
	allSvg.push('./src/assets/svg/' + file);
});

const copyPaterns = [
	{
		from: './src/assets',
		to: path.resolve(__dirname, './dist/assets'),
	},
	{
		from: './src/favicon.ico',
		to: path.resolve(__dirname, './dist'),
	},
];

module.exports = {
	mode: 'development',
	entry: './src/js/script.js',

	output: {
		filename: 'js/script.js',
		path: dist,
		clean: true,
	},
	devtool: 'source-map',
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'dist'),
		},
		port: 4200,
		open: true,
		hot: true,

		watchFiles: ['src/**/*'],
		compress: true,
		headers: {
			'Cache-Control': 'no-store',
		},
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							url: false,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: ['autoprefixer'],
							},
						},
					},
					'sass-loader',
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html', // Specify your template file
			filename: 'index.html', // Output file
			inject: 'body', // Inject all assets into the body (or 'head')
		}),
		new MiniCssExtractPlugin({
			filename: 'css/style.css',
		}),
		new StylelintPlugin({
			configFile: '.stylelintrc.json',
		}),
		new CopyPlugin({
			patterns: copyPaterns,
		}),
	],
};
