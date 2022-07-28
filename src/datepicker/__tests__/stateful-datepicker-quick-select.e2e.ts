/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount } from '../../test/integration';

const format = require('date-fns/format');
const subMonths = require('date-fns/subMonths');

const selectors = {
  input: 'input',
  calendar: '[data-baseweb="calendar"]',
  quickSelect: '[data-baseweb="select"]',
  quickSelectMenu: '[data-baseweb="menu"]',
  quickSelectPastMonth: '[data-baseweb="menu"] > li:nth-child(2)',
};

const now = new Date();
const monthAgo = subMonths(now, 1);

test.describe('Stateful Datepicker Quick Select', () => {
  test('can quick select with keyboard', async ({ page }) => {
    await mount(page, 'datepicker--stateful-quick-select');
    const input = page.locator(selectors.input);
    await input.click();
    const quickSelect = page.locator(selectors.quickSelect);
    await quickSelect.click();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    const expectedValue = [monthAgo, now].map((d) => format(d, 'yyyy/MM/dd')).join(' – ');
    await expect(input.first()).toHaveValue(expectedValue);
  });

  test('can quick select with mouse', async ({ page }) => {
    await mount(page, 'datepicker--stateful-quick-select');
    const input = page.locator(selectors.input);
    await input.click();
    const quickSelect = page.locator(selectors.quickSelect);
    await quickSelect.click();
    const quickSelectPastMonth = page.locator(selectors.quickSelectPastMonth);
    await quickSelectPastMonth.click();
    const expectedValue = [monthAgo, now].map((d) => format(d, 'yyyy/MM/dd')).join(' – ');
    await expect(input.first()).toHaveValue(expectedValue);
  });
});
