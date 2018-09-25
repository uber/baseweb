/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const scenarios = require('./examples-list');

const suite = 'Modal Test Suite';

const selectors = {
  closeButton: 'button[aria-label="Close"]',
  openModal: '.open-modal-button',
  dialog: '[role="dialog"]',
};

function getUrl({launchUrl, suite, test}) {
  return `${launchUrl}?suite=${encodeURIComponent(
    suite,
  )}&test=${encodeURIComponent(test)}`;
}

module.exports = {
  [scenarios.SIMPLE_EXAMPLE]: function(client) {
    client
      .url(
        getUrl({
          launchUrl: client.launchUrl,
          suite,
          test: scenarios.SIMPLE_EXAMPLE,
        }),
      )
      .initAccessibility()
      .waitForElementVisible('body', 1000)
      // close modal to start fresh
      .click(selectors.closeButton)
      .waitForElementNotPresent(selectors.closeButton, 1000)
      .click(selectors.openModal)
      .waitForElementPresent(selectors.dialog, 1000)
      // dialog should be the focused element
      .assert.hasFocus(selectors.dialog)
      .assert.accessibility('html', {
        rules: {
          'color-contrast': {
            enabled: false,
          },
        },
      })
      // close again
      .click(selectors.closeButton)
      .waitForElementNotPresent(selectors.closeButton, 1000)
      // open button should be in focus
      .assert.hasFocus(selectors.openModal)
      .end();
  },
};
