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

const suite = 'Tooltip Test Suite';

const selectors = {
  tooltip: '[role="tooltip"]',
};

describe('The tooltip component', () => {
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
      .moveToElement('span', 10, 10)
      .assert.accessibility('html', {});
  });

  it('hover opens the popover', browser => {
    goToUrl({
      suite,
      test: scenarios.SIMPLE_EXAMPLE,
      browser,
    })
      .waitForElementVisible('body', 1000)
      .moveToElement('span', 10, 10)
      .waitForElementPresent(selectors.tooltip, 1000)
      .moveToElement('body', 10, 10)
      .waitForElementNotPresent(selectors.tooltip, 1000);
  });
});
