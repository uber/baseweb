/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount, analyzeAccessibility } from '../../test/integration';

const selectors = {
  standard: '[data-e2e="standard"]',
  daylight: '[data-e2e="daylight"]',
  controlled: '[data-e2e="controlled"]',
  input: 'input[role="combobox"]',
  dropdown: '[role="listbox"]',
  value: '[data-id="selected"]',
};

test.describe('TimezonePicker', () => {
  test('passes basic a11y tests', async ({ page }) => {
    await mount(page, 'timezonepicker--timezone-picker');
    await page.waitForSelector(selectors.standard);
    const accessibilityReport = await analyzeAccessibility(page);
    // @ts-expect-error todo(starr): unsure how to fix
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  test('provides appropriate zone options if standard time', async ({ page }) => {
    await mount(page, 'timezonepicker--timezone-picker');
    await page.waitForSelector(selectors.standard);
    await page.click(`${selectors.standard} ${selectors.input}`);
    await page.waitForSelector(selectors.dropdown);
    await page.keyboard.type('new york');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    const value = await page.$eval(
      `${selectors.standard} ${selectors.value}`,
      (select) => select.textContent
    );

    expect(value).toBe('(GMT-5) America/New York');
  });

  test('provides appropriate zone options if daylight savings time', async ({ page }) => {
    await mount(page, 'timezonepicker--timezone-picker');
    await page.waitForSelector(selectors.daylight);
    await page.click(`${selectors.daylight} ${selectors.input}`);
    await page.waitForSelector(selectors.dropdown);
    await page.keyboard.type('new york');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    const value = await page.$eval(
      `${selectors.daylight} ${selectors.value}`,
      (select) => select.textContent
    );

    expect(value).toBe('(GMT-4) America/New York');
  });

  test('prioritizes select with controlled value over browser default', async ({ page }) => {
    await mount(page, 'timezonepicker--timezone-picker');
    await page.waitForSelector(selectors.controlled);
    const initial = await page.$eval(
      `${selectors.controlled} ${selectors.value}`,
      (select) => select.textContent
    );
    expect(initial).toBe('(GMT+9) Asia/Tokyo');
  });

  test('provides appropriate zone options if no acronym exists', async ({ page }) => {
    await mount(page, 'timezonepicker--timezone-picker');
    await page.waitForSelector(selectors.daylight);
    await page.click(`${selectors.daylight} ${selectors.input}`);
    await page.waitForSelector(selectors.dropdown);
    await page.keyboard.type('minsk');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    const value = await page.$eval(
      `${selectors.daylight} ${selectors.value}`,
      (select) => select.textContent
    );

    expect(value).toBe('(GMT+3) Europe/Minsk');
  });
});
