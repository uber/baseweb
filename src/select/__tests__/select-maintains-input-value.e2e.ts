/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount } from '../../test/integration';

const SELECT_INPUT = 'div[data-baseweb="select"] input';

test.describe('select option maintains input value after actions', () => {
  test('maintains input value after blur action', async ({ page }) => {
    await mount(page, 'select--maintains-input-value');

    const input = page.locator('#maintain-after-blur').locator(SELECT_INPUT);
    await input.type('a');
    await page.keyboard.press('Tab');
    expect(input).toHaveValue('a');
  });

  test('maintains input value after close action', async ({ browserName, page }) => {
    test.fixme(browserName === 'chromium', 'this feature fails in chromium');

    await mount(page, 'select--maintains-input-value');

    const scenario = page.locator('#maintain-after-close');
    const input = scenario.locator(SELECT_INPUT);

    await input.type('a');
    await page.keyboard.press('Escape');
    await expect(input).toHaveValue('a');
  });

  test('maintains input value after select action', async ({ page }) => {
    await mount(page, 'select--maintains-input-value');
    const input = page.locator('#maintain-after-select').locator(SELECT_INPUT);
    await input.type('a');
    await page.locator('li').first().click();
    await expect(input).toHaveValue('a');
  });

  test('maintains input value after any action', async ({ browserName, page }) => {
    test.fixme(browserName === 'chromium', 'this feature fails in chromium');

    await mount(page, 'select--maintains-input-value');
    const input = page.locator('#maintain-after-all').locator(SELECT_INPUT);

    await input.click();
    await input.type('a');
    await page.keyboard.press('Tab');
    await expect(input).toHaveValue('a');

    await input.click();
    await input.type('b');
    await page.keyboard.press('Escape');
    await expect(input).toHaveValue('ab');

    await page.keyboard.press('Backspace');
    await input.type('q');
    await page.locator('li').first().click();
    await expect(input).toHaveValue('aq');
  });
});
