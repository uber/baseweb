/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const scenarios = require('./examples-list');
const {getPuppeteerUrl} = require('../../e2e/helpers');

const suite = 'Select Test Suite';

const selectors = {
  selectInput: '[role="combobox"]',
  selectDropDown: '[role="listbox"]',
  dropDownOption: '[role="option"]',
  selectedList: '[role="list"]',
  searchType: '[aria-autocomplete="list"]',
  expandedDropDown: '[aria-expanded="true"]',
};

describe(suite, () => {
  it('opens dropdown menu when click on select input', async () => {
    await page.goto(
      getPuppeteerUrl({
        suite,
        test: scenarios.SELECT,
      }),
    );
    await page.waitFor(selectors.selectInput);
    await page.click(selectors.selectInput);
    await page.waitFor(selectors.selectDropDown);
  });

  it('opened dropdown can be closed with ESC', async () => {
    await page.goto(
      getPuppeteerUrl({
        suite,
        test: scenarios.SELECT,
      }),
    );
    await page.waitFor(selectors.selectInput);
    await page.click(selectors.selectInput);
    await page.waitFor(selectors.selectDropDown);
    await page.keyboard.press('Escape');
    await page.waitFor(selectors.selectDropDown, {
      hidden: true,
    });
  });

  it('selects option when clicked in dropdown', async () => {
    await page.goto(
      getPuppeteerUrl({
        suite,
        test: scenarios.SINGLE_SELECT_SEARCH,
      }),
    );
    await page.waitFor(selectors.selectInput);
    await page.click(selectors.selectInput);
    await page.waitFor(selectors.selectDropDown);
    await page.click(
      `${selectors.selectDropDown} ${selectors.dropDownOption}:first-child`,
    );
    await page.waitFor(selectors.selectDropDown, {
      hidden: true,
    });

    const selectedValue = await page.$eval(
      selectors.selectedList,
      select => select.textContent,
    );
    expect(selectedValue).toBe('AliceBlue');
  });

  it('does not close dropdown after multiple selections were made', async () => {
    await page.goto(
      getPuppeteerUrl({
        suite,
        test: scenarios.MULTI_SELECT,
      }),
    );
    await page.waitFor(selectors.selectInput);
    await page.click(selectors.selectInput);
    await page.waitFor(selectors.selectDropDown);
    await page.click(
      `${selectors.selectDropDown} ${selectors.dropDownOption}:first-child`,
    );
    await page.click(
      `${selectors.selectDropDown} ${selectors.dropDownOption}:nth-child(3)`,
    );
    await page.waitFor(selectors.selectDropDown);
  });

  it('doesnt allow to click and select disabled options', async () => {
    await page.goto(
      getPuppeteerUrl({
        suite,
        test: scenarios.SINGLE_SELECT_SEARCH,
      }),
    );
    await page.waitFor(selectors.selectInput);
    await page.click(selectors.selectInput);
    await page.waitFor(selectors.selectDropDown);
    await page.click(
      `${selectors.selectDropDown} ${selectors.dropDownOption}:nth-child(2)`,
    );
    await page.waitFor(selectors.selectDropDown);
    const selectedValue = await page.$eval(
      selectors.selectedList,
      select => select.textContent,
    );
    expect(selectedValue).toBe('Start searching');
  });

  it('selects options when search input successful with results', async () => {
    await page.goto(
      getPuppeteerUrl({
        suite,
        test: scenarios.MULTI_SELECT_SEARCH,
      }),
    );
    await page.waitFor(selectors.selectInput);
    await page.click(selectors.selectInput);
    await page.type(selectors.selectInput, 'dark');
    await page.waitFor(selectors.selectDropDown);
    await page.waitFor(
      `${selectors.selectDropDown} ${selectors.dropDownOption}:nth-child(2)`,
    );
    await page.click(
      `${selectors.selectDropDown} ${selectors.dropDownOption}:first-child`,
    );
    const selectedValue = await page.$eval(
      selectors.selectedList,
      select => select.textContent,
    );
    expect(selectedValue).toBe('DarkBlue');
  });
});
