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
  content: '#content',
};

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

  it('allows interaction with select', async () => {
    await mount(page, 'popover-select');
    await page.waitFor('button');
    await page.click('button');
    await page.waitFor(selectors.tooltip);
    await page.waitFor(selectors.selectInput);
    await page.click(selectors.selectInput);
    await page.waitFor(selectors.selectDropDown);

    const options = await page.$$(selectors.dropDownOption);
    await options[0].click();
    await page.waitFor(selectors.selectDropDown, {hidden: true});

    const selectedValue = await page.$eval(
      selectors.selectedList,
      select => select.textContent,
    );
    expect(selectedValue).toBe('AliceBlue');
  });

  it('closes one popover at a time on esc key press', async () => {
    await mount(page, 'popover-select');
    await page.waitFor('button');
    await page.click('button');
    await page.waitFor(selectors.tooltip);
    await page.waitFor(selectors.selectInput);
    await page.click(selectors.selectInput);
    await page.waitFor(selectors.selectDropDown);

    await page.keyboard.press('Escape');
    await page.waitFor(selectors.selectDropDown, {hidden: true});
    await page.waitFor(selectors.selectInput);

    await page.keyboard.press('Escape');
    await page.waitFor(selectors.selectInput, {hidden: true});
  });

  it('renders content even when hidden: with renderAll prop', async () => {
    await mount(page, 'popover-render-all');
    await page.waitFor('button');
    await page.waitFor(selectors.content);
    await page.click('button');
    await page.waitFor(selectors.tooltip);
    await page.waitFor(selectors.content);
    await page.keyboard.press('Escape');
    await page.waitFor(selectors.tooltip, {hidden: true});
    await page.waitFor(selectors.content);
  });
});
