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

const suite = 'Button Test Suite';

describe('The button component', () => {
  after((browser, done) => {
    browser.end(() => done());
  });

  it('passes basic a11y tests', browser => {
    goToUrl({
      suite,
      test: scenarios.BUTTON_WITH_ENHANCERS,
      browser,
    })
      .initAccessibility()
      .waitForElementVisible('body', 1000)
      .assert.accessibility('html', {});

    assertVisuals({
      browser,
      id: scenarios.BUTTON_WITH_ENHANCERS,
    });
  });
});
