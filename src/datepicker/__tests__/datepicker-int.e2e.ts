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
  day: '[aria-label="Selected. kedd, március 31. 2020. It\'s available."]',
};

test.describe('Datepicker, Int', () => {
  test('parses input with formatString', async ({ page }) => {
    await mount(page, 'datepicker--int');
    const input = page.locator(selectors.input);
    await input.click();
    await input.type('31.03.202');
    await expect(page.locator(selectors.day)).toBeHidden();
    await input.type('0');
    await expect(input).toHaveValue('31.03.2020');
    await expect(page.locator(selectors.day)).toBeVisible();
  });
});
