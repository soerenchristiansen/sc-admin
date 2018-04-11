const path = require('path');
const webpack = require('webpack');
const { AureliaPlugin } = require('aurelia-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OpenBrowerPlugin = require('open-browser-webpack-plugin');
var extractCSS = new ExtractTextPlugin('app.css');
const bundleOutputDir = './wwwroot/dist';

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    return [{
        stats: { modules: false },
        entry: { 'app': 'aurelia-bootstrapper' },
        resolve: {
            extensions: ['.ts', '.js'],
            modules: ['ClientApp', 'node_modules'],
        },
        output: {
            path: path.resolve(bundleOutputDir),
            publicPath: 'dist/',
            filename: '[name].js'
        },
        module: {
            rules: [
                { test: /\.ts$/i, include: /ClientApp/, use: 'ts-loader?silent=true' },
                { test: /\.html$/i, use: 'html-loader' },
                { test: /\.css$/i, use: isDevBuild ? 'css-loader' : 'css-loader?minimize' },
                { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({ IS_DEV_BUILD: JSON.stringify(isDevBuild) }),
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./wwwroot/dist/vendor-manifest.json')
            }),
            new AureliaPlugin({ aureliaApp: 'boot' }),
            new CompressionPlugin({
                asset: "[path].gz[query]",
                algorithm: "gzip",
                test: /\.js$|\.css$|\.html$/,
                // threshold: 10240,
                minRatio: 0
              }),
			new OpenBrowerPlugin({ url: isDevBuild ? 'http://localhost:49412' : 'sc-admin.herokuapp.com' })
        ].concat(isDevBuild ? [
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]')  // Point sourcemap entries to the original file locations on disk
            })
        ] : [
            new webpack.optimize.UglifyJsPlugin()
        ])
    },
    {
        stats: { modules: false },
        entry: {
            main: './ClientApp/main.scss' 
        },
        output: {
            path: path.resolve(bundleOutputDir),
            publicPath: 'dist/',
            filename: 'app.css'
        },
        module: {
            rules: [
                { test: /\.css$/i, use: isDevBuild ? 'css-loader' : 'css-loader?minimize' },
                { test: /\.scss$/, exclude: /node_modules/, use: isDevBuild ? extractCSS.extract(['css-loader', 'sass-loader']) : extractCSS.extract(['css-loader?minimize', 'sass-loader?minimize']) }
            ]
        },
        plugins: [
            extractCSS
        ]
    }
];
}
