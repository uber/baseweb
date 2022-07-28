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
  day: '[aria-label="Choose vasárnap, március 10. 2019. It\'s available."]',
  day2: '[aria-label="Choose csütörtök, március 28. 2019. It\'s available."]',
  monthYearSelectButton: '[data-id="monthYearSelectButton"]',
  monthYearSelectMenu: '[data-id="monthYearSelectMenu"]',
};

test.describe('Datepicker, Int', () => {
  test('selects range - int', async ({ page }) => {
    await mount(page, 'datepicker--int-range');
    const input = page.locator(selectors.input);
    await input.click();
    await page.locator(selectors.day).click();
    await expect(input).toHaveValue('2019 vasárnap 10');
    await page.locator(selectors.day2).click();
    await expect(input).toHaveValue('2019 vasárnap 10 – 2019 csütörtök 28');
  });
});
