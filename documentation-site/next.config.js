/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-env node */

const {resolve} = require('path');

module.exports = {
  webpack: (config, {buildId, dev, isServer, defaultLoaders}) => {
    config.resolve.alias.baseui = resolve(__dirname, '../dist');
    return config;
  },
};
