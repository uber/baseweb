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

const suite = 'Tag Test Suite';

const selectors = {
  tags: 'span',
};

describe('The Tag component', () => {
  after((browser, done) => {
    browser.end(() => done());
  });

  xit('passes basic accessibility tests', browser => {
    goToUrl({
      suite,
      test: scenarios.ALL_BASIC_COLORS,
      browser,
    })
      .initAccessibility()
      .waitForElementVisible(selectors.tags)
      .assert.accessibility('html', {
        rules: {
          'color-contrast': {
            enabled: false,
          },
        },
      });
  });
});
