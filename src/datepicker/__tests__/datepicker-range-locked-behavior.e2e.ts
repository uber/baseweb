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
  timeSelect: '[data-id="time-select"]',
  timeSelectDropdown: '[role="listbox"]',
  timeSelectValue: '[data-id="selected"]',
  multiMonthInputs: '[data-id="multiMonthInputs"]',
};

const mar8 = '[aria-label="Choose Friday, March 8th 2019. It\'s available."]';
const mar28 = '[aria-label="Choose Thursday, March 28th 2019. It\'s available."]';
const mar10 = '[aria-label="Choose Sunday, March 10th 2019. It\'s available."]';
const mar26 = '[aria-label="Choose Tuesday, March 26th 2019. It\'s available."]';
const Apr1 = '[aria-label="Choose Monday, April 1st 2019. It\'s available."]';

test.describe('Datepicker, Range with Locked Behavior', () => {
  test('selects End Date, then Start Date, then changes End Date', async ({ page }) => {
    await mount(page, 'datepicker--range-locked-behavior');
    const inputs = page.locator(selectors.input);
    const startDateInput = inputs.nth(0);
    const endDateInput = inputs.nth(1);

    await endDateInput.click();
    await page.locator(mar28).click();
    await page.keyboard.press('Escape');
    await expect(endDateInput).toHaveValue('2019/03/28');
    await expect(startDateInput).toHaveValue('    /  /  ');

    await startDateInput.click();
    await page.locator(mar10).click();
    await page.keyboard.press('Escape');
    await expect(startDateInput).toHaveValue('2019/03/10');
    await expect(endDateInput).toHaveValue('2019/03/28');

    await endDateInput.click();
    await page.locator(mar8).click();
    await page.keyboard.press('Escape');
    await expect(startDateInput).toHaveValue('2019/03/10');
    await expect(endDateInput).toHaveValue('2019/03/28');

    await endDateInput.click();
    await page.locator(mar26).click();
    await page.keyboard.press('Escape');
    await expect(startDateInput).toHaveValue('2019/03/10');
    await expect(endDateInput).toHaveValue('2019/03/26');
  });

  test('selects range in multi-month', async ({ page }) => {
    await mount(page, 'datepicker--range-locked-behavior');
    const inputs = page.locator(selectors.multiMonthInputs);
    const startDateInput = inputs.nth(0);
    const endDateInput = inputs.nth(1);

    await startDateInput.click();
    await page.locator(mar8).click();
    await page.keyboard.press('Escape');
    await expect(startDateInput).toHaveValue('2019/03/08');

    await startDateInput.click();
    await page.locator(mar10).click();
    await page.keyboard.press('Escape');
    await expect(startDateInput).toHaveValue('2019/03/10');
    await expect(endDateInput).toHaveValue('');

    await endDateInput.click();
    await page.locator(mar8).click();
    await page.keyboard.press('Escape');
    await expect(startDateInput).toHaveValue('2019/03/10');
    await expect(endDateInput).toHaveValue('');

    await endDateInput.click();
    await page.locator(Apr1).click();
    await page.keyboard.press('Escape');
    await expect(startDateInput).toHaveValue('2019/03/10');
    await expect(endDateInput).toHaveValue('2019/04/01');
  });

  test('selected time is preserved when dates are changed', async ({ page }) => {
    await mount(page, 'datepicker--range-locked-behavior');

    const startDateInput = page.locator(selectors.input).nth(0);
    await startDateInput.click();

    // Set the start time
    const startTimeSelect = page.locator(selectors.timeSelect).first();
    await startTimeSelect.click();
    await startTimeSelect.type('12:30 AM');
    await startTimeSelect.press('Enter');
    await expect(startTimeSelect).toContainText('12:30 AM');

    // Select the start day
    await page.locator(mar10).click();
    await page.keyboard.press('Escape');
    await expect(startDateInput).toHaveValue('2019/03/10');

    // Select the end day
    const endDateInput = page.locator(selectors.input).nth(1);
    await endDateInput.click();

    await page.locator(mar28).click();
    await expect(startDateInput).toHaveValue('2019/03/10');
    await expect(endDateInput).toHaveValue('2019/03/28');

    // Set the end time
    await endDateInput.click();
    const endTimeSelect = page.locator(selectors.timeSelect).last();
    await endTimeSelect.click();
    await endTimeSelect.type('4:30 AM');
    await endTimeSelect.press('Enter');
    await expect(endTimeSelect).toContainText('4:30 AM');
    await page.keyboard.press('Escape');

    // Open the calendar, change the start day
    await startDateInput.click();
    await page.locator(mar8).click();

    // Open the calendar, check that the times are still correct
    await startDateInput.click();
    await expect(startTimeSelect).toContainText('12:30 AM');
    await expect(endTimeSelect).toContainText('4:30 AM');
  });
});
