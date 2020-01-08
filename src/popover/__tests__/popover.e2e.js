/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

const selectors = {
  tooltip: '[role="tooltip"]',
  selectInput: 'input[role="combobox"]',
  selectDropDown: '[role="listbox"]',
  selectedList: '[data-id="selected"]',
  dropDownOption: '[role="option"]',
};

const optionAtPosition = position =>
  `${selectors.selectDropDown} ${selectors.dropDownOption}:nth-child(${position})`;

describe('popover', () => {
  it('passes basic a11y tests', async () => {
    await mount(page, 'popover');
    await page.waitFor(selectors.tooltip);
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('hover opens the popover', async () => {
    await mount(page, 'popover-hover');
    await page.waitFor('button');
    await page.hover('button');
    await page.waitFor(selectors.tooltip);
    await page.mouse.move(0, 0);
    await page.waitFor(selectors.tooltip, {hidden: true});
  });

  it('opened popover can be closed with ESC', async () => {
    await mount(page, 'popover-click');
    await page.waitFor('button');
    await page.click('button');
    await page.waitFor(selectors.tooltip);
    await page.keyboard.press('Escape');
    await page.waitFor(selectors.tooltip, {hidden: true});
  });

  // This is a regression test to verify that elements in a popover will still work.
  it('allows interaction with select', async () => {
    await mount(page, 'popover-select');
    await page.waitFor('button');
    await page.click('button');
    await page.waitFor(selectors.tooltip);
    await page.waitFor(selectors.selectInput);
    await page.click(selectors.selectInput);
    await page.waitFor(selectors.selectDropDown);
    await page.$eval(optionAtPosition(1), elem => elem.click());
    await page.waitFor(selectors.selectDropDown, {
      hidden: true,
    });

    const selectedValue = await page.$eval(
      selectors.selectedList,
      select => select.textContent,
    );
    expect(selectedValue).toBe('AliceBlue');
  });
});
