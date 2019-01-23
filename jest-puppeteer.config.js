/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

module.exports = {
  launch: {
    headless: process.PUPPETEER_IS_HEADLESS === 'false',
    slowMo: process.PUPPETEER_SLOWMO, // slow down tests with slowMo ms
  },
  browserContext: 'default',
};
