/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */
/* global after */

const scenarios = require('./examples-list');
const {goToUrl} = require('../../e2e/helpers');

const suite = 'Popover Test Suite';

const selectors = {
  tooltip: '[role="tooltip"]',
};

describe('The popover component', () => {
  after((browser, done) => {
    browser.end(() => done());
  });

  it('passes basic a11y tests', browser => {
    goToUrl({
      suite,
      test: scenarios.SIMPLE_EXAMPLE,
      browser,
    })
      .initAccessibility()
      .waitForElementVisible('body', 1000)
      .assert.accessibility('html', {});
  });

  it('hover opens the popover', browser => {
    goToUrl({
      suite,
      test: scenarios.WITH_HOVER,
      browser,
    })
      .waitForElementVisible('body', 1000)
      .moveToElement('button', 10, 10)
      .waitForElementPresent(selectors.tooltip, 1000)
      .moveToElement('body', 10, 10)
      .waitForElementNotPresent(selectors.tooltip, 1000);
  });

  it('opened popover can be closed with ESC', browser => {
    goToUrl({
      suite,
      test: scenarios.WITH_CLICK,
      browser,
    })
      .waitForElementVisible('body', 1000)
      .click('button')
      .waitForElementPresent(selectors.tooltip, 1000)
      .keys('\uE00C')
      .waitForElementNotPresent(selectors.tooltip, 1000);
  });
});
