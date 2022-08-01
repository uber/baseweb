/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount } from '../../test/integration';

const COMBOBOX = 'input[role="combobox"]';
const LISTBOX = '[role="listbox"]';

test.describe('TimePicker min/max times', () => {
  test('handles min max datetimes with different date than value datetime clamping to current date start and end', async ({
    page,
  }) => {
    await mount(page, 'timepicker--time-picker-min-max-diff-day');

    const parent = page.locator('#default');
    await parent.locator(COMBOBOX).click();

    const listbox = page.locator(LISTBOX);
    const listItems = listbox.locator('li');
    const min = await listItems.first().textContent();
    const max = await listItems.last().textContent();

    expect(min).toBe('12:00 AM');
    expect(max).toBe('11:45 PM');
  });

  test('handles max date after current', async ({ page }) => {
    await mount(page, 'timepicker--time-picker-min-max-diff-day');

    const parent = page.locator('#max-after-current');
    await parent.locator(COMBOBOX).click();

    const listbox = page.locator(LISTBOX);
    const listItems = listbox.locator('li');
    const min = await listItems.first().textContent();
    const max = await listItems.last().textContent();

    expect(min).toBe('8:02 AM');
    expect(max).toBe('11:47 PM');
  });

  test('handles min date before current', async ({ page }) => {
    await mount(page, 'timepicker--time-picker-min-max-diff-day');

    const parent = page.locator('#min-before-current');
    await parent.locator(COMBOBOX).click();

    const listbox = page.locator(LISTBOX);
    const listItems = listbox.locator('li');
    const min = await listItems.first().textContent();
    const max = await listItems.last().textContent();

    expect(min).toBe('12:00 AM');
    expect(max).toBe('6:00 PM');
  });

  test('handles min max datetimes with different date than value datetime ignoring min max date', async ({
    page,
  }) => {
    await mount(page, 'timepicker--time-picker-min-max-diff-day');

    const parent = page.locator('#ignore-min-max-date');
    await parent.locator(COMBOBOX).click();

    const listbox = page.locator(LISTBOX);
    const listItems = listbox.locator('li');
    const min = await listItems.first().textContent();
    const max = await listItems.last().textContent();

    expect(min).toBe('8:02 AM');
    expect(max).toBe('6:02 PM');
  });

  test('handles min max datetimes with different date than value datetime ignoring min max date on step', async ({
    page,
  }) => {
    await mount(page, 'timepicker--time-picker-min-max-diff-day');

    const parent = page.locator('#max-time-lands-on-step');
    await parent.locator(COMBOBOX).click();

    const listbox = page.locator(LISTBOX);
    const listItems = listbox.locator('li');
    const min = await listItems.first().textContent();
    const max = await listItems.last().textContent();

    expect(min).toBe('8:00 AM');
    expect(max).toBe('10:00 AM');
  });
});
