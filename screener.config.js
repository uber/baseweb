/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

module.exports = {
  projectRepo: 'uber-web/baseui',
  storybookConfigDir: '.storybook',
  apiKey: process.env.SCREENER_API_KEY,
  resolutions: [
    {
      width: 1024,
      height: 768,
    },
  ],
  baseBranch: 'master',
  failureExitCode: 0,
  browsers: [
    {
      browserName: 'chrome',
    },
    {
      browserName: 'internet explorer',
      version: '11',
      excludeRules: [/(^baseui-dark|-rtl$)/],
    },
  ],
};
