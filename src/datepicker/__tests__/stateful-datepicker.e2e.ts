/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount, analyzeAccessibility } from '../../test/integration';

const selectors = {
  input: 'input',
  calendar: '[data-baseweb="calendar"]',
  day: '[aria-label="Choose Sunday, March 10th 2019. It\'s available."]',
  selected: '[aria-label="Choose Tuesday, February 19th 2019. It\'s available."]',
  leftArrow: '[aria-label="Previous month."]',
  rightArrow: '[aria-label="Next month."]',
  monthYearSelectButton: '[data-id="monthYearSelectButton"]',
  monthYearSelectMenu: '[data-id="monthYearSelectMenu"]',
};

test.describe('Stateful Datepicker', () => {
  test('passes basic a11y tests', async ({ page }) => {
    await mount(page, 'datepicker--stateful');
    await page.waitForSelector(selectors.input);
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  test('datepicker with min max date allows browsing', async ({ page }) => {
    await mount(page, 'datepicker--stateful-min-max-date');
    await page.waitForSelector(selectors.input);
    await page.click(selectors.input);
    await page.waitForSelector(selectors.calendar);
    await page.click(selectors.day);
    await page.waitForSelector(selectors.calendar, {
      state: 'hidden',
    });
    await page.waitForSelector(selectors.input);
    await page.click(selectors.input);
    await page.waitForSelector(selectors.calendar);
    await page.waitForSelector(selectors.leftArrow);
    let value = await page.$eval(selectors.leftArrow, (select) => select.disabled);
    expect(value).toBe(false);
    await page.click(selectors.leftArrow);
    await page.waitForSelector(selectors.day, {
      state: 'hidden',
    });
    await page.waitForSelector(selectors.leftArrow);
    value = await page.$eval(selectors.leftArrow, (select) => select.disabled);
    expect(value).toBe(true);
    await page.waitForSelector(selectors.selected);
    await page.click(selectors.selected);
    await page.waitForSelector(selectors.input);
    await page.click(selectors.input);
    await page.waitForSelector(selectors.calendar);
    await page.waitForSelector(selectors.leftArrow);
    value = await page.$eval(selectors.leftArrow, (select) => select.disabled);
    expect(value).toBe(true);
    await page.waitForSelector(selectors.rightArrow);
    value = await page.$eval(selectors.rightArrow, (select) => select.disabled);
    expect(value).toBe(false);
  });

  test('datepicker with min max date shows valid months in header dropdown', async ({ page }) => {
    await mount(page, 'datepicker--stateful-min-max-date');
    await page.waitForSelector(selectors.input);
    await page.click(selectors.input);
    await page.waitForSelector(selectors.calendar);
    const [month] = await page.$$(selectors.monthYearSelectButton);
    await month.click();
    await page.waitForSelector(selectors.monthYearSelectMenu);

    const monthOptions = await page.$$eval(
      'ul[role="listbox"] li[aria-disabled="false"]',
      (items) => {
        // Return the first and last month year option
        return [items[0].textContent, items[items.length - 1].textContent];
      }
    );

    expect(monthOptions[0]).toEqual('February');
    expect(monthOptions[1]).toEqual('March');
  });
});
