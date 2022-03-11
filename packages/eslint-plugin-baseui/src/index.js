/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

'use strict';

const DeprecatedThemeAPI = require('./deprecated-theme-api.js');
const DeprecatedComponentAPI = require('./deprecated-component-api.js');
const NoDeepImports = require('./no-deep-imports.js');
const NoBlockStyle = require('./no-block-style.js');
const NoComponentClassname = require('./no-component-classname.js');

module.exports = {
  rules: {
    'deprecated-theme-api': DeprecatedThemeAPI,
    'deprecated-component-api': DeprecatedComponentAPI,
    'no-deep-imports': NoDeepImports,
    'no-block-style': NoBlockStyle,
    'no-component-classname': NoComponentClassname,
  },
  configs: {
    recommended: {
      plugins: ['baseui'],
      rules: {
        'baseui/deprecated-theme-api': ['warn'],
        'baseui/deprecated-component-api': ['warn'],
        'baseui/no-deep-imports': ['warn'],
        'baseui/no-block-style': ['warn'],
        'baseui/no-component-classname': ['warn'],
      },
    },
  },
};
