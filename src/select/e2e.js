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
  selectedOption: '[role="listitem"]',
  searchType: '[aria-autocomplete="list"]',
  selectType: '[aria-autocomplete="none"]',
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
      .waitForElementVisible(selectors.selectInput, 1000)
      .click(selectors.selectInput)
      .waitForElementPresent(selectors.selectDropDown, 1000);
  });

  it('opened dropdown can be closed with ESC', browser => {
    goToUrl({
      suite,
      test: scenarios.SELECT,
      browser,
    })
      .waitForElementVisible(selectors.selectInput, 1000)
      .click(selectors.selectInput)
      .waitForElementPresent(selectors.selectDropDown, 1000)
      .keys('\uE00C')
      .waitForElementNotPresent(selectors.selectDropDown, 1000);
  });

  it('selects option when clicked in dropdown', browser => {
    goToUrl({
      suite,
      test: scenarios.SELECT,
      browser,
    })
      .waitForElementVisible(selectors.selectInput, 1000)
      .click(selectors.selectInput)
      .waitForElementPresent(selectors.selectDropDown, 1000)
      .click(
        `${selectors.selectDropDown} ${selectors.dropDownOption}:first-child`,
      )
      .waitForElementNotPresent(selectors.selectDropDown, 1000)
      .getText(
        `${selectors.selectedList} ${selectors.selectedOption}:first-child`,
        function(result) {
          this.assert.equal(result.value, 'AliceBlue');
        },
      );
  });

  it('doesnt close dropdown after multiple selections were made', browser => {
    goToUrl({
      suite,
      test: scenarios.MULTI_SELECT,
      browser,
    })
      .waitForElementVisible(selectors.selectInput, 1000)
      .click(selectors.selectInput)
      .waitForElementPresent(selectors.selectDropDown, 1000)
      .click(
        `${selectors.selectDropDown} ${selectors.dropDownOption}:first-child`,
      )
      .click(
        `${selectors.selectDropDown} ${selectors.dropDownOption}:nth-child(3)`,
      )
      .waitForElementPresent(selectors.selectDropDown, 1000);
  });

  it('doesnt allow to click and select disabled options', browser => {
    goToUrl({
      suite,
      test: scenarios.SELECT_DISABLED_OPTIONS,
      browser,
    })
      .waitForElementVisible(selectors.selectInput, 1000)
      .click(selectors.selectInput)
      .waitForElementPresent(selectors.selectDropDown, 1000)
      .click(
        `${selectors.selectDropDown} ${selectors.dropDownOption}:nth-child(2)`,
      )
      .waitForElementPresent(selectors.selectDropDown, 1000)
      .getText(selectors.selectedList, function(result) {
        this.assert.equal(result.value, '');
      });
  });

  it('selects options when search input successful with results', browser => {
    goToUrl({
      suite,
      test: scenarios.MULTI_SELECT_SEARCH,
      browser,
    })
      .waitForElementVisible(selectors.selectInput, 1000)
      .setValue(selectors.selectInput, 'dark', () => {
        browser
          .waitForElementPresent(selectors.selectDropDown, 100)
          .waitForElementPresent(
            `${selectors.selectDropDown} ${
              selectors.dropDownOption
            }:nth-child(2)`,
            1000,
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
