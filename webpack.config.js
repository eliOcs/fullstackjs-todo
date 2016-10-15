
/*jslint node, es6, maxlen: 80*/
'use strict';

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const projectPath = path.resolve(__dirname, 'frontend');
const buildPath = path.resolve(projectPath, 'build');
const srcPath = path.resolve(projectPath, 'src');

module.exports = {
    context: projectPath,

    entry: './src/index.js',

    devtool: 'source-map',

    output: {
        path: path.resolve(buildPath, 'js'),
        filename: 'app.bundle.js'
    },

    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },

    plugins: [
        new CopyWebpackPlugin([
            {
                from: './static',
                to: buildPath
            },
            {
                context: srcPath,
                from: './**/*.html',
                to: path.resolve(buildPath, 'templates')
            },
            {
                context: srcPath,
                from: './**/*.css',
                to: path.resolve(buildPath, 'styles')
            }
        ])
    ]
};
