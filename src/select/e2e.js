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

const suite = 'Select Test Suite';

const selectors = {
  selectInput: '[role="combobox"]',
  selectDropDown: '[role="listbox"]',
  dropDownOption: '[role="option"]',
  selectedList: '[role="list"]',
  searchType: '[aria-autocomplete="list"]',
  expandedDropDown: '[aria-expanded="true"]',
};

describe('The select component', () => {
  after((browser, done) => {
    browser.end(() => done());
  });

  // TODO(#424)

  it('opens dropdown menu when click on select input', browser => {
    goToUrl({
      suite,
      test: scenarios.SELECT,
      browser,
    })
      .waitForElementVisible(selectors.selectInput)
      .click(selectors.selectInput)
      .waitForElementPresent(selectors.selectDropDown);
  });

  it('opened dropdown can be closed with ESC', browser => {
    goToUrl({
      suite,
      test: scenarios.SELECT,
      browser,
    })
      .waitForElementVisible(selectors.selectInput)
      .click(selectors.selectInput)
      .waitForElementPresent(selectors.selectDropDown)
      .keys('\uE00C')
      .waitForElementNotPresent(selectors.selectDropDown);
  });

  it('selects option when clicked in dropdown', browser => {
    goToUrl({
      suite,
      test: scenarios.SINGLE_SELECT_SEARCH,
      browser,
    })
      .waitForElementVisible(selectors.selectInput)
      .click(selectors.selectInput)
      .waitForElementPresent(selectors.selectDropDown)
      .click(
        `${selectors.selectDropDown} ${selectors.dropDownOption}:first-child`,
      )
      .waitForElementNotPresent(selectors.selectDropDown)
      .getText(`${selectors.selectedList}`, function(result) {
        this.assert.equal(result.value, 'AliceBlue');
      });
  });

  it('does not close dropdown after multiple selections were made', browser => {
    goToUrl({
      suite,
      test: scenarios.MULTI_SELECT,
      browser,
    })
      .waitForElementVisible(selectors.selectInput)
      .click(selectors.selectInput)
      .waitForElementPresent(selectors.selectDropDown)
      .click(
        `${selectors.selectDropDown} ${selectors.dropDownOption}:first-child`,
      )
      .click(
        `${selectors.selectDropDown} ${selectors.dropDownOption}:nth-child(3)`,
      )
      .waitForElementPresent(selectors.selectDropDown);
  });

  it('doesnt allow to click and select disabled options', browser => {
    goToUrl({
      suite,
      test: scenarios.SINGLE_SELECT_SEARCH,
      browser,
    })
      .waitForElementVisible(selectors.selectInput)
      .click(selectors.selectInput)
      .waitForElementPresent(selectors.selectDropDown)
      .click(
        `${selectors.selectDropDown} ${selectors.dropDownOption}:nth-child(2)`,
      )
      .waitForElementPresent(selectors.selectDropDown)
      .getText(selectors.selectedList, function(result) {
        // Placeholder is displayed
        this.assert.equal(result.value, 'Start searching');
      });
  });

  it('selects options when search input successful with results', browser => {
    goToUrl({
      suite,
      test: scenarios.MULTI_SELECT_SEARCH,
      browser,
    })
      .waitForElementVisible(selectors.selectInput)
      .click(selectors.selectInput)
      .setValue(selectors.selectInput, 'dark', () => {
        browser
          .waitForElementPresent(selectors.selectDropDown)
          .waitForElementPresent(
            `${selectors.selectDropDown} ${
              selectors.dropDownOption
            }:nth-child(2)`,
          )
          .click(
            `${selectors.selectDropDown} ${
              selectors.dropDownOption
            }:first-child`,
          )
          .getText(`${selectors.selectedList}`, function(result) {
            this.assert.equal(result.value, 'DarkBlue');
          });
      });
  });
});
