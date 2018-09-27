/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const scenarios = require('./examples-list');
const {goToUrl} = require('../../e2e/helpers');

const suite = 'Button Test Suite';

module.exports = {
  afterEach: function(client, done) {
    client.notifySauceLabs(done);
  },
  'Basic a11y test': function(client) {
    goToUrl({
      suite,
      test: scenarios.BUTTON_WITH_ENHANCERS,
      client,
    })
      .initAccessibility()
      .waitForElementVisible('body', 1000)
      .assert.accessibility('html', {})
      .end();
  },
};
