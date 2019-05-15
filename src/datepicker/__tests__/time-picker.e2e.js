/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

const selectors = {
  twelveHour: '[data-e2e="12-hour"]',
  twentyFourHour: '[data-e2e="24-hour"]',
  input: 'input[role="combobox"]',
  dropdown: '[role="listbox"]',
  value: '[data-id="selected"]',
};

describe('TimePicker', () => {
  it('passes basic a11y tests', async () => {
    await mount(page, 'time-picker');
    await page.waitFor(selectors.twelveHour);
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('is renders expected 12 hour format times', async () => {
    await mount(page, 'time-picker');
    await page.waitFor(selectors.twelveHour);
    await page.click(`${selectors.twelveHour} ${selectors.input}`);
    await page.waitFor(selectors.dropdown);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    const value = await page.$eval(
      `${selectors.twelveHour} ${selectors.value}`,
      select => select.textContent,
    );

    expect(value).toBe('1:00 AM');
  });

  it('is renders expected 24 hour format times with custom step', async () => {
    await mount(page, 'time-picker');
    await page.waitFor(selectors.twentyFourHour);
    await page.click(`${selectors.twentyFourHour} ${selectors.input}`);
    await page.waitFor(selectors.dropdown);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    const value = await page.$eval(
      `${selectors.twentyFourHour} ${selectors.value}`,
      select => select.textContent,
    );

    expect(value).toBe('02:00');
  });
});
