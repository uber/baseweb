/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */
/* global after */

const scenarios = require('./examples-list');
const {goToUrl, assertVisuals} = require('../../e2e/helpers');

const suite = 'Checkbox Test Suite';

const selectors = {
  radioOne: '[data-name="radioSub1"] label',
  radioTwo: '[data-name="radioSub2"] label',
  radioMain: '[data-name="radioMain"] label input[type="checkbox"]',
};

describe('The checkbox component', () => {
  afterEach((browser, done) => {
    browser.notifySauceLabs(done);
  });

  after((browser, done) => {
    browser.end(() => done());
  });

  it('can switch states', browser => {
    goToUrl({
      suite,
      test: scenarios.INDETERMINATE,
      browser,
    })
      .initAccessibility()
      .waitForElementVisible('body', 1000)
      .click(selectors.radioOne)
      .click(selectors.radioTwo)
      .assert.accessibility('html', {})
      .assert.attributeEquals(selectors.radioMain, 'checked', 'true');

    assertVisuals({
      browser,
      id: scenarios.INDETERMINATE,
    });
  });
});
