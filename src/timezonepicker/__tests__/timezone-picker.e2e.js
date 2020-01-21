/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

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

const labelToShortCode = label => label.split(' ')[0];

describe('TimezonePicker', () => {
  it('passes basic a11y tests', async () => {
    await mount(page, 'timezone-picker');
    await page.waitFor(selectors.standard);
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('provides appropriate zone options if standard time', async () => {
    await mount(page, 'timezone-picker');
    await page.waitFor(selectors.standard);
    await page.click(`${selectors.standard} ${selectors.input}`);
    await page.waitFor(selectors.dropdown);
    await page.keyboard.type('new york');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    const value = await page.$eval(
      `${selectors.standard} ${selectors.value}`,
      select => select.textContent,
    );

    expect(labelToShortCode(value)).toBe('EST');
  });

  it('provides appropriate zone options if daylight savings time', async () => {
    await mount(page, 'timezone-picker');
    await page.waitFor(selectors.daylight);
    await page.click(`${selectors.daylight} ${selectors.input}`);
    await page.waitFor(selectors.dropdown);
    await page.keyboard.type('new york');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    const value = await page.$eval(
      `${selectors.daylight} ${selectors.value}`,
      select => select.textContent,
    );

    expect(labelToShortCode(value)).toBe('EDT');
  });

  it('prioritizes select with controlled value over browser default', async () => {
    await mount(page, 'timezone-picker');
    await page.waitFor(selectors.controlled);
    const initial = await page.$eval(
      `${selectors.controlled} ${selectors.value}`,
      select => select.textContent,
    );
    expect(labelToShortCode(initial)).toBe('JST');
  });

  it('provides appropriate zone options if no acronym exists', async () => {
    await mount(page, 'timezone-picker');
    await page.waitFor(selectors.daylight);
    await page.click(`${selectors.daylight} ${selectors.input}`);
    await page.waitFor(selectors.dropdown);
    await page.keyboard.type('minsk');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    const value = await page.$eval(
      `${selectors.daylight} ${selectors.value}`,
      select => select.textContent,
    );

    expect(labelToShortCode(value)).toBe('Europe/Minsk');
  });
});
