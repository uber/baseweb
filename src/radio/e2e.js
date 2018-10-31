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

const suite = 'Radio Group Test Suite';

const selectors = {
  one: 'input[value="1"]',
  two: 'input[value="2"]',
  three: 'input[value="3"]',
};

describe('The radio component', () => {
  after((browser, done) => {
    browser.end(() => done());
  });

  it('passes basic accessibility tests', browser => {
    goToUrl({
      suite,
      test: scenarios.SIMPLE_EXAMPLE,
      browser,
    })
      .initAccessibility()
      .waitForElementVisible(selectors.one)
      .assert.accessibility('html', {
        'color-contrast': {
          enabled: false,
        },
      });
  });

  it('can switch changes', browser => {
    goToUrl({
      suite,
      test: scenarios.SIMPLE_EXAMPLE,
      browser,
    })
      .assert.attributeEquals(selectors.two, 'checked', 'true')
      // for some reason .click(selectors.one) does not work
      // this is the suggested workaround on github
      .moveToElement(selectors.one, 0, 0)
      .mouseButtonClick(0)
      .assert.attributeEquals(selectors.one, 'checked', 'true');
  });
});
