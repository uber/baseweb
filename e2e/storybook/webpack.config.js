/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* global module __dirname */
/* eslint-disable flowtype/require-valid-file-annotation */

const path = require('path');

module.exports = {
  optimization: {
    minimize: false,
  },

  module: {
    rules: [
      {
        // only applies to the storybook file
        test: /storybook\/load-stories\.js$/,
        enforce: 'pre',
        loader: path.resolve(__dirname, '../scenario-loader.js'),
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
};
