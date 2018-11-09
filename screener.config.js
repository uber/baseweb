/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

module.exports = {
  projectRepo: 'uber-web/baseui',
  storybookConfigDir: '.storybook-move',
  apiKey: process.env.SCREENER_API_KEY,
  resolution: '1024x768',
  baseBranch: 'master',
  includeRules: [
    /Accordion$/,
    /Buttons Compact with Enhancers/,
    /Buttons with Enhancers/,
    /Text with Image and Link/,
    /Text only/,
    /Checkbox example/,
    /Checkbox as toggle example/,
    /Icons in Button/,
    /Input state/,
    /Input with tags/,
    /Stateless Menu/,
    /Modal$/,
    /Stateful Pagination/,
    /stateless popover/,
    /Radio Group example/,
    /Multi-Select/,
    /Simple slider example/,
    /Textarea state/,
    /Toast notifications/,
  ],
  failureExitCode: 0,
};
