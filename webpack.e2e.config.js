const path = require('path');

// This module is used by the visual regression tests to run the demos.
module.exports = {
  entry: './e2e/index.js',
  context: path.resolve(__dirname),
  resolve: {
    modules: [__dirname, 'node_modules'],
  },
  output: {
    path: path.join(__dirname, 'e2e/dist'),
    filename: 'index.js',
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'import-glob',
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
