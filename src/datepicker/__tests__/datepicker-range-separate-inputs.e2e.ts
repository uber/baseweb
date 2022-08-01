/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount } from '../../test/integration';

const selectors = {
  input: 'input',
  calendar: '[data-baseweb="calendar"]',
  day: '[aria-label="Choose Sunday, March 10th 2019. It\'s available."]',
  day2: '[aria-label="Choose Thursday, March 28th 2019. It\'s available."]',
  day4: '[aria-label="Choose Monday, April 1st 2019. It\'s available."]',
  day5: '[aria-label="Choose Wednesday, May 1st 2019. It\'s available."]',
  timeSelect: '[data-id="time-select"]',
  timeSelectDropdown: '[role="listbox"]',
  timeSelectValue: '[data-id="selected"]',
  multiMonthInputs: '[data-id="multiMonthInputs"]',
};

test.describe('Datepicker, Range', () => {
  test('selects range', async ({ page }) => {
    await mount(page, 'datepicker--range-separate-inputs');
    const inputs = page.locator('input');
    const startInput = inputs.nth(0);
    await startInput.click();
    const day = await page.locator(selectors.day);
    await day.click();
    await expect(startInput).toHaveValue('2019/03/10');
    const day2 = await page.locator(selectors.day2);
    await day2.click();
    await expect(startInput).toHaveValue('2019/03/10');
    const endInput = inputs.nth(1);
    await expect(endInput).toHaveValue('2019/03/28');
  });

  test('selects range in multi-month', async ({ page }) => {
    await mount(page, 'datepicker--range-separate-inputs');
    const inputs = page.locator(selectors.multiMonthInputs);
    const startInput = inputs.nth(0);
    await startInput.click();
    const day = await page.locator(selectors.day);
    await day.click();
    await expect(startInput).toHaveValue('2019/03/10');
    const day4 = await page.locator(selectors.day4);
    await day4.click();
    await expect(startInput).toHaveValue('2019/03/10');
    const endInput = inputs.nth(1);
    await expect(endInput).toHaveValue('2019/04/01');
  });

  test('selects range in multi-month - do not autoAdvance calendar months since selected date is in view', async ({
    page,
  }) => {
    await mount(page, 'datepicker--range-separate-inputs');
    const inputs = page.locator(selectors.multiMonthInputs);
    const startInput = inputs.nth(0);
    await startInput.click();
    const day4 = await page.locator(selectors.day4);
    await day4.click();
    await expect(startInput).toHaveValue('2019/04/01');
    const day = await page.locator(selectors.day);
    await day.click();
    await expect(startInput).toHaveValue('2019/03/10');
    const endInput = inputs.nth(1);
    await expect(endInput).toHaveValue('2019/04/01');
  });

  test('selected time is preserved when dates are changed', async ({ page }) => {
    await mount(page, 'datepicker--range-separate-inputs');
    const inputs = page.locator(selectors.input);
    const startInput = inputs.nth(0);
    await startInput.click();

    const timeSelects = page.locator(selectors.timeSelect);
    const timeSelectValues = page.locator(selectors.timeSelectValue);

    const startTimeSelect = timeSelects.nth(0);
    await startTimeSelect.click();
    await page.keyboard.type('12:30 AM');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    const startTimeValue = await timeSelectValues.nth(0);
    await expect(startTimeValue).toHaveText('12:30 AM');

    const endTimeSelect = timeSelects.nth(1);
    await endTimeSelect.click();
    await page.keyboard.type('4:30 AM');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    const endTimeValue = await timeSelectValues.nth(1);
    await expect(endTimeValue).toHaveText('4:30 AM');

    const day = await page.locator(selectors.day);
    await day.click();
    await expect(startInput).toHaveValue('2019/03/10');

    const day2 = await page.locator(selectors.day2);
    await day2.click();

    await expect(startInput).toHaveValue('2019/03/10');
    const endInput = inputs.nth(1);
    await expect(endInput).toHaveValue('2019/03/28');
    const calendar = await page.locator(selectors.calendar);
    await expect(calendar).toBeHidden();

    await startInput.click();
    await expect(startTimeValue).toHaveText('12:30 AM');
    await expect(endTimeValue).toHaveText('4:30 AM');
  });
});
