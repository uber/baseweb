/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

const selectors = {
  selectInput: '[role="combobox"]',
  selectDropDown: '[role="listbox"]',
  dropDownOption: '[role="option"]',
  selectedList: '[role="list"]',
  searchType: '[aria-autocomplete="list"]',
  expandedDropDown: '[aria-expanded="true"]',
};

const optionAtPosition = position =>
  `${selectors.selectDropDown} ${
    selectors.dropDownOption
  }:nth-child(${position})`;

describe('select', () => {
  xit(`passes basic a11y tests`, async () => {
    await mount(page, 'select');
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('opens dropdown menu when click on select input', async () => {
    await mount(page, 'select');
    await page.waitFor(selectors.selectInput);
    await page.click(selectors.selectInput);
    await page.waitFor(selectors.selectDropDown);
  });

  it('opened dropdown can be closed with ESC', async () => {
    await mount(page, 'select');
    await page.waitFor(selectors.selectInput);
    await page.click(selectors.selectInput);
    await page.waitFor(selectors.selectDropDown);
    await page.keyboard.press('Escape');
    await page.waitFor(selectors.selectDropDown, {
      hidden: true,
    });
  });

  it('selects option when clicked in dropdown', async () => {
    await mount(page, 'select-search-single');
    await page.waitFor(selectors.selectInput);
    await page.click(selectors.selectInput);
    await page.waitFor(selectors.selectDropDown);
    await page.click(optionAtPosition(1));
    await page.waitFor(selectors.selectDropDown, {
      hidden: true,
    });

    const selectedValue = await page.$eval(
      selectors.selectedList,
      select => select.textContent,
    );
    expect(selectedValue).toBe('AliceBlue');
  });

  it('doesnt allow to click and select disabled options', async () => {
    await mount(page, 'select-search-single');
    await page.waitFor(selectors.selectInput);
    await page.click(selectors.selectInput);
    await page.waitFor(selectors.selectDropDown);
    await page.click(optionAtPosition(2));
    await page.waitFor(selectors.selectDropDown);
    const selectedValue = await page.$eval(
      selectors.selectedList,
      select => select.textContent,
    );
    expect(selectedValue).toBe('Start searching');
  });

  it('does not close dropdown after multiple selections were made', async () => {
    await mount(page, 'select-search-multi');
    await page.waitFor(selectors.selectInput);
    await page.click(selectors.selectInput);
    await page.waitFor(selectors.selectDropDown);
    await page.click(optionAtPosition(1));
    await page.click(optionAtPosition(3));
    await page.waitFor(selectors.selectDropDown);
  });

  it('selects options when search input successful with results', async () => {
    await mount(page, 'select-search-multi');
    await page.waitFor(selectors.selectInput);
    await page.click(selectors.selectInput);
    await page.type(selectors.selectInput, 'dark');
    await page.waitFor(selectors.selectDropDown);
    await page.waitFor(optionAtPosition(2));
    await page.click(optionAtPosition(1));
    const selectedValue = await page.$eval(
      selectors.selectedList,
      select => select.textContent,
    );
    expect(selectedValue).toBe('DarkBlue');
  });
});
