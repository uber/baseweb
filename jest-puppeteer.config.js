/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

let headless = true;

if (process.env.PUPPETEER_HEADLESS) {
  headless = process.env.PUPPETEER_HEADLESS !== 'false';
}

module.exports = {
  launch: {
    headless,
    slowMo: process.env.PUPPETEER_SLOWMO, // slow down tests with slowMo ms
  },
  browserContext: 'default',
  tests: {
    url: process.env.PUPPETEER_TARGET_URL || 'http://localhost:8080',
  },
  exitOnPageError: false,
};
