/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount } from '../../test/integration';

const SELECT_INPUT = 'div[data-baseweb="select"] input';

test.describe('select backspace works as expected', () => {
  test('backspace one character', async ({ page }) => {
    await mount(page, 'select--backspace-behavior');
    const input = page.locator('#backspace-behavior').locator(SELECT_INPUT);

    // Select AliceBlue
    await input.type('a');
    await page.keyboard.press('Enter');

    // Backspace on AliceBlue
    await page.keyboard.press('Backspace');
    await expect(input).toHaveValue('AliceBlu');
  });

  test('backspace clears input value', async ({ page }) => {
    await mount(page, 'select--backspace-behavior');
    const input = page.locator('#backspace-clears-input-value').locator(SELECT_INPUT);

    // Select AliceBlue
    await input.type('a');
    await page.keyboard.press('Enter');

    // Backspace on AliceBlue
    await page.keyboard.press('Backspace');
    await expect(input).toHaveValue('');
  });
});
