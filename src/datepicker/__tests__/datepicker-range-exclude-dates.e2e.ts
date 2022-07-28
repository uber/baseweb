/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */

import { mount } from '../../test/integration';

import { expect, test } from '@playwright/test';

const selectors = {
  input: 'input',
  calendar: '[data-baseweb="calendar"]',
  day: '[aria-label="Choose Monday, March 14th 2022. It\'s available."]',
  day2: '[aria-label="Choose Saturday, March 26th 2022. It\'s available."]',
  day3: '[aria-label="Choose Tuesday, March 22nd 2022. It\'s available."]',
  day4: '[aria-label="Choose Thursday, March 31st 2022. It\'s available."]',
  day5: '[aria-label="Choose Monday, April 4th 2022. It\'s available."]',
  day6: '[aria-label="Choose Friday, April 1st 2022. It\'s available."]',
  rightArrow: '[aria-label="Next month."]',
};

test.describe('Datepicker, Range', () => {
  test('is unable to select range that includes excluded date', async ({ page }) => {
    await mount(page, 'datepicker--range-exclude-dates');
    const scenario = page.locator('#within-month');
    const input = scenario.locator(selectors.input);
    await input.click();
    await expect(input).toHaveValue('2022/03/14 –     /  /  ');
    await page.locator(selectors.day2).click();
    await expect(input).toHaveValue('2022/03/14 –     /  /  ');
    await page.locator(selectors.day3).click();
    await expect(input).toHaveValue('2022/03/14 – 2022/03/22');
  });

  test('is unable to select range that includes excluded date, across months', async ({ page }) => {
    await mount(page, 'datepicker--range-exclude-dates');
    const scenario = page.locator('#between-month');
    const input = scenario.locator(selectors.input);
    await input.click();
    await expect(input).toHaveValue('2022/03/31 –     /  /  ');
    await page.locator(selectors.day3).click();
    await expect(input).toHaveValue('2022/03/31 –     /  /  ');
    await page.locator(selectors.rightArrow).click();
    await page.locator(selectors.day5).click();
    await expect(input).toHaveValue('2022/03/31 –     /  /  ');
    await page.locator(selectors.day6).click();
    await expect(input).toHaveValue('2022/03/31 – 2022/04/01');
  });
});
