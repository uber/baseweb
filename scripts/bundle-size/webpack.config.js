/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
// @flow

const {resolve} = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');

const plugins = [new CompressionPlugin()];

if (process.env.ANALYZER) {
  plugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
  entry: {
    main: resolve(__dirname, 'entry.js'),
  },
  context: __dirname,
  plugins,
  externals: /^(react|react-dom)$/,
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
        },
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: __dirname,
  },
};
