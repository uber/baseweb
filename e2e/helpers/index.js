/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-env node */

const config = require('../../jest-puppeteer.config.js');

function getUrl({launchUrl, suite, test}) {
  return `${launchUrl}?suite=${encodeURIComponent(
    suite,
  )}&test=${encodeURIComponent(test)}`;
}

function getPuppeteerUrl({suite, test}) {
  return getUrl({
    launchUrl: config.tests.url,
    suite,
    test,
  });
}

function goToUrl({suite, test, browser}) {
  const url = getUrl({launchUrl: browser.launchUrl, suite, test});
  return browser.url(url);
}

function formatFileName(testName) {
  return testName.toLowerCase().replace(/ /g, '-');
}

module.exports = {
  getPuppeteerUrl,
  getUrl,
  goToUrl,
  formatFileName,
};
