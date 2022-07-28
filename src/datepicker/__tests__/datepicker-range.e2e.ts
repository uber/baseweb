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
  day6: '[aria-label="Choose Sunday, June 6th 2021. It\'s available."]',
  day7: '[aria-label="Choose Monday, June 14th 2021. It\'s available."]',
  rightArrow: '[aria-label="Next month."]',
  timeSelect: '[data-id="time-select"]',
  timeSelectDropdown: '[role="listbox"]',
  timeSelectOption: '[role="option"]',
  timeSelectValue: '[data-id="selected"]',
};

test.describe('Datepicker, Range', () => {
  test('selects range', async ({ page }) => {
    await mount(page, 'datepicker--range');
    const input = page.locator(selectors.input).first();
    await input.click();
    const day = page.locator(selectors.day);
    await day.click();
    await expect(input).toHaveValue('2019/03/10 –     /  /  ');
    const day2 = page.locator(selectors.day2);
    await day2.click();
    const calendar = page.locator(selectors.calendar);
    await expect(calendar).toBeHidden();
    await expect(input).toHaveValue('2019/03/10 – 2019/03/28');
  });

  test('selects range in multi-month', async ({ page }) => {
    await mount(page, 'datepicker--range-multi-month');
    const input = page.locator(selectors.input).first();
    await input.click();
    const day = page.locator(selectors.day);
    await day.click();
    await expect(input).toHaveValue('2019/03/10 –     /  /  ');
    const day4 = page.locator(selectors.day4);
    await day4.click();
    const calendar = page.locator(selectors.calendar);
    await expect(calendar).toBeHidden();
    await expect(input).toHaveValue('2019/03/10 – 2019/04/01');
  });

  test('selects range in multi-month - do not autoAdvance calendar months since selected date is in view', async ({
    page,
  }) => {
    await mount(page, 'datepicker--range-multi-month');
    const input = page.locator(selectors.input).first();
    await input.click();
    const day4 = page.locator(selectors.day4);
    await day4.click();
    await expect(input).toHaveValue('2019/04/01 –     /  /  ');
    const day = page.locator(selectors.day);
    await day.click();
    await expect(input).toHaveValue('2019/03/10 – 2019/04/01');
  });

  test('selected time is preserved when dates are changed', async ({ page }) => {
    await mount(page, 'datepicker--range');
    const input = page.locator(selectors.input).first();
    await input.click();
    const timeSelects = page.locator(selectors.timeSelect);
    const timeValues = page.locator(selectors.timeSelectValue);

    const startTimeSelect = timeSelects.nth(0);
    await startTimeSelect.click();
    await page.keyboard.type('12:30 AM');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    const startTimeValue = timeValues.nth(0);
    await expect(startTimeValue).toHaveText('12:30 AM');

    const endTimeSelect = timeSelects.nth(1);
    await endTimeSelect.click();
    await page.keyboard.type('4:30 AM');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    const endTimeValue = timeValues.nth(1);
    await expect(endTimeValue).toHaveText('4:30 AM');

    const day = page.locator(selectors.day);
    await day.click();
    await expect(input).toHaveValue('2019/03/10 –     /  /  ');

    const day2 = page.locator(selectors.day2);
    await day2.click();
    await expect(input).toHaveValue('2019/03/10 – 2019/03/28');

    const calendar = page.locator(selectors.calendar);
    await expect(calendar).toBeHidden();

    await input.click();
    await expect(startTimeValue).toHaveText('12:30 AM');
    await expect(endTimeValue).toHaveText('4:30 AM');
  });
});

test.describe('Datepicker, Range, null StartDate with valid EndDate', () => {
  test('displays NullDatePlaceholder in the input field', async ({ page }) => {
    await mount(page, 'datepicker--range-null-start-date');
    const input = page.locator(selectors.input).first();
    await expect(input).toHaveValue('    /  /   – 2021/06/10');
  });

  test('selects range when selected date is before EndDate', async ({ page }) => {
    await mount(page, 'datepicker--range-null-start-date');
    const input = page.locator(selectors.input).first();
    await input.click();
    const day = page.locator(selectors.day6);
    await day.click();
    await expect(input).toHaveValue('2021/06/06 – 2021/06/10');
  });

  test('selects range when selected date is after EndDate', async ({ page }) => {
    await mount(page, 'datepicker--range-null-start-date');
    const input = page.locator(selectors.input).first();
    await input.click();
    const day = page.locator(selectors.day7);
    await day.click();
    await expect(input).toHaveValue('2021/06/10 – 2021/06/14');
  });
});
