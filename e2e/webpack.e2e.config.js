const path = require('path');

// This module is used by the visual regression tests to run the demos.
module.exports = {
  entry: './index.js',
  context: path.resolve(__dirname),
  resolve: {
    modules: [__dirname, '../node_modules'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        // only applies to the e2e/tests.js file
        test: /e2e\/tests\.js$/,
        enforce: 'pre',
        loader: path.resolve(__dirname, 'scenario-loader.js'),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'file-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
    ],
  },
};
