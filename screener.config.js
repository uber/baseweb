/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const Slider = require('./src/slider/examples-list');
const Textarea = require('./src/textarea/examples-list');
const Toast = require('./src/toast/examples-list');

module.exports = {
  projectRepo: 'uber-web/baseui',
  storybookConfigDir: '.storybook',
  apiKey: process.env.SCREENER_API_KEY,
  resolution: '1024x768',
  baseBranch: 'master',
  includeRules: [
    new RegExp(Slider.AS_SIMPLE_RANGE_SLIDER),
    new RegExp(Textarea.STATE_EXAMPLE),
    new RegExp(Toast.TOAST_EXAMPLE),
  ],
  failureExitCode: 0,
};
