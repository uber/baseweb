/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

const selectors = {
  standard: '[data-e2e="standard"]',
  daylight: '[data-e2e="daylight"]',
  controlled: '[data-e2e="controlled"]',
  input: 'input[role="combobox"]',
  dropdown: '[role="listbox"]',
  value: '[data-id="selected"]',
};

describe('TimezonePicker', () => {
  it('passes basic a11y tests', async () => {
    await mount(page, 'timezonepicker--timezone-picker');
    await page.waitForSelector(selectors.standard);
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('provides appropriate zone options if standard time', async () => {
    await mount(page, 'timezonepicker--timezone-picker');
    await page.waitForSelector(selectors.standard);
    await page.click(`${selectors.standard} ${selectors.input}`);
    await page.waitForSelector(selectors.dropdown);
    await page.keyboard.type('new york');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    const value = await page.$eval(
      `${selectors.standard} ${selectors.value}`,
      select => select.textContent,
    );

    expect(value).toBe('(GMT-5) America/New York');
  });

  it('provides appropriate zone options if daylight savings time', async () => {
    await mount(page, 'timezonepicker--timezone-picker');
    await page.waitForSelector(selectors.daylight);
    await page.click(`${selectors.daylight} ${selectors.input}`);
    await page.waitForSelector(selectors.dropdown);
    await page.keyboard.type('new york');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    const value = await page.$eval(
      `${selectors.daylight} ${selectors.value}`,
      select => select.textContent,
    );

    expect(value).toBe('(GMT-4) America/New York');
  });

  it('prioritizes select with controlled value over browser default', async () => {
    await mount(page, 'timezonepicker--timezone-picker');
    await page.waitForSelector(selectors.controlled);
    const initial = await page.$eval(
      `${selectors.controlled} ${selectors.value}`,
      select => select.textContent,
    );
    expect(initial).toBe('(GMT+9) Asia/Tokyo');
  });

  it('provides appropriate zone options if no acronym exists', async () => {
    await mount(page, 'timezonepicker--timezone-picker');
    await page.waitForSelector(selectors.daylight);
    await page.click(`${selectors.daylight} ${selectors.input}`);
    await page.waitForSelector(selectors.dropdown);
    await page.keyboard.type('minsk');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    const value = await page.$eval(
      `${selectors.daylight} ${selectors.value}`,
      select => select.textContent,
    );

    expect(value).toBe('(GMT+3) Europe/Minsk');
  });
});
