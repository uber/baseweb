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

const suite = 'Menu Test Suite';

const selectors = {
  menu: '[role="main"]',
  firstItem: '[role="main"] li:first-child',
};

describe('The menu component', () => {
  after((browser, done) => {
    browser.end(() => done());
  });

  it('passes basic a11y tests', browser => {
    goToUrl({
      suite,
      test: scenarios.MENU,
      browser,
    })
      .initAccessibility()
      .waitForElementVisible(selectors.menu)
      .assert.accessibility('html', {});
  });
});
