/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

'use strict';

const DeprecatedThemeAPI = require('./deprecated-theme-api.js');
const DeprecatedComponentAPI = require('./deprecated-component-api.js');
const NoDeepImports = require('./no-deep-imports.js');

module.exports = {
  rules: {
    'deprecated-theme-api': DeprecatedThemeAPI,
    'deprecated-component-api': DeprecatedComponentAPI,
    'no-deep-imports': NoDeepImports,
  },
  configs: {
    recommended: {
      plugins: ['baseui'],
      rules: {
        'baseui/deprecated-theme-api': ['warn'],
        'baseui/deprecated-component-api': ['warn'],
        'baseui/no-deep-imports': ['warn'],
      },
    },
  },
};
