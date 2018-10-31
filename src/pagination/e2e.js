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

const suite = 'Pagination Test Suite';

const selectors = {
  prevButton: 'button[data-test="prev-button"]',
  nextButton: 'button[data-test="next-button"]',
  dropDownButton: 'button[data-test="dropdown-button"]',
};

describe('The pagination component', () => {
  after((browser, done) => {
    browser.end(() => done());
  });

  it('passes basic accessiblity tests', browser => {
    goToUrl({
      suite,
      test: scenarios.STATEFUL_PAGINATION,
      browser,
    })
      .initAccessibility()
      .waitForElementVisible(selectors.prevButton)
      .assert.accessibility('html', {
        rules: {
          'color-contrast': {
            enabled: false,
          },
          'image-alt': {
            enabled: false,
          },
        },
      });
  });

  it('can be navigated using the prev and next buttons', browser => {
    goToUrl({
      suite,
      test: scenarios.STATEFUL_PAGINATION,
      browser,
    });

    // assert initial state
    browser.expect.element(selectors.dropDownButton).text.to.equal(1);
    // paginate to the next page
    browser.click(selectors.nextButton);
    browser.expect.element(selectors.dropDownButton).text.to.equal(2);
    // paginate to the previous page
    browser.click(selectors.prevButton);
    browser.expect.element(selectors.dropDownButton).text.to.equal(1);
  });

  it('can be navigated using the dropdown menu', browser => {
    goToUrl({
      suite,
      test: scenarios.STATEFUL_PAGINATION,
      browser,
    });

    // assert initial state
    browser.expect.element(selectors.dropDownButton).text.to.equal(1);
    // paginate using the dropdown menu
    browser.click(selectors.dropDownButton);
    browser.click('ul li:nth-child(3)');
    browser.expect.element(selectors.dropDownButton).text.to.equal(3);
  });
});
