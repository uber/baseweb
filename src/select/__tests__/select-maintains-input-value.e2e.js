/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* global */
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const { mount } = require('../../../e2e/helpers');

const { expect, test } = require('@playwright/test');

const SELECT_INPUT = 'div[data-baseweb="select"] input';

test.describe('select option maintains input value after actions', () => {
  test('maintains input value after blur action', async ({ page }) => {
    await mount(page, 'select--maintains-input-value');
    const selector = `#maintain-after-blur ${SELECT_INPUT}`;
    await page.waitForSelector(selector);
    const input = await page.$(selector);
    await input.type('a');
    await page.keyboard.press('Tab');
    const value = await page.$eval(selector, (i) => i.value);
    expect(value).toBe('a');
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
    const selector = `#maintain-after-select ${SELECT_INPUT}`;
    await page.waitForSelector(selector);
    const input = await page.$(selector);
    await input.type('a');
    await page.click('li');
    const value = await page.$eval(selector, (i) => i.value);
    expect(value).toBe('a');
  });

  test('maintains input value after any action', async ({ browserName, page }) => {
    test.fixme(browserName === 'chromium', 'this feature fails in chromium');

    await mount(page, 'select--maintains-input-value');

    const scenario = page.locator('#maintain-after-all');
    const input = scenario.locator(SELECT_INPUT);

    await input.type('a');
    await page.keyboard.press('Tab');
    await expect(input).toHaveValue('a');

    await input.focus();
    await input.type('b');
    await page.keyboard.press('Escape');
    await expect(input).toHaveValue('ab');

    await page.keyboard.press('Backspace');
    await input.type('q');
    await page.locator('li').first().click();
    await expect(input).toHaveValue('aq');
  });
});
