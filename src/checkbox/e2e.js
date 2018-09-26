/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const scenarios = require('./examples-list');

const suite = 'Checkbox Test Suite';

const selectors = {
  radioOne: '[data-name="radioSub1"] label',
  radioTwo: '[data-name="radioSub2"] label',
  radioMain: '[data-name="radioMain"] label input[type="checkbox"]',
};

function getUrl({launchUrl, suite, test}) {
  return `${launchUrl}?suite=${encodeURIComponent(
    suite,
  )}&test=${encodeURIComponent(test)}`;
}

module.exports = {
  afterEach: function(client, done) {
    client.notifySauceLabs(done);
  },
  [scenarios.INDETERMINATE]: function(client) {
    client
      .url(
        getUrl({
          launchUrl: client.launchUrl,
          suite,
          test: scenarios.INDETERMINATE,
        }),
      )
      .initAccessibility()
      .waitForElementVisible('body', 1000)
      .click(selectors.radioOne)
      .click(selectors.radioTwo)
      .assert.accessibility('html', {})
      .assert.attributeEquals(selectors.radioMain, 'checked', 'true')
      .end();
  },
};
