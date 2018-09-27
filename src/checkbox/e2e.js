/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const scenarios = require('./examples-list');
const {goToUrl} = require('../../e2e/helpers');

const suite = 'Checkbox Test Suite';

const selectors = {
  radioOne: '[data-name="radioSub1"] label',
  radioTwo: '[data-name="radioSub2"] label',
  radioMain: '[data-name="radioMain"] label input[type="checkbox"]',
};

module.exports = {
  afterEach: function(client, done) {
    client.notifySauceLabs(done);
  },
  [scenarios.INDETERMINATE]: function(client) {
    goToUrl({
      suite,
      test: scenarios.INDETERMINATE,
      client,
    })
      .initAccessibility()
      .waitForElementVisible('body', 1000)
      .click(selectors.radioOne)
      .click(selectors.radioTwo)
      .assert.accessibility('html', {})
      .assert.attributeEquals(selectors.radioMain, 'checked', 'true')
      .end();
  },
};
