var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/js/main.js',
    output: {
         path: path.resolve(__dirname, 'build'),
         filename: 'preview.bundle.js'
     },
     module: {
         loaders: [
             {
                 test: /\.js$/,
                 loader: 'babel-loader',
                 exclude: /node_modules/,
                 query: {
                     plugins: [
                        ["transform-runtime", {
                          "helpers": false, // defaults to true
                          "polyfill": false, // defaults to true
                          "regenerator": true, // defaults to true
                          "moduleName": "babel-runtime" // defaults to "babel-runtime"
                        }]
                     ],
                     presets: ['es2015', 'stage-0']
                 }
             }
         ]
     },
     stats: {
         colors: true
     },
    devtool: 'source-map'
};