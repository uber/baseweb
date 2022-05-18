/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const { mount, analyzeAccessibility } = require('../../../e2e/helpers');

const { expect, test } = require('@playwright/test');

const selectors = {
  input: 'input',
};

test.describe('PaymentCard', () => {
  test.beforeEach(async ({ page }) => {
    await mount(page, 'payment-card--stateful');
    await page.waitForSelector(selectors.input);
  });

  test('passes basic a11y tests', async ({ page }) => {
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  test('enter full credit card number', async ({ page }) => {
    const input = await page.$(selectors.input);
    await input.type('4111222233334444');
    const value = await page.evaluate((element) => element.value, input);
    expect(value).toBe('4111 2222 3333 4444');
  });

  test('add more digits in the middle of input', async ({ page }) => {
    const input = await page.$(selectors.input);
    await input.type('41112');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('5');
    expect(await page.evaluate((el) => el.value, input)).toBe('4115 12');
    await page.keyboard.press('6');
    expect(await page.evaluate((el) => el.value, input)).toBe('4115 612');
  });

  test('delete digits from the end of input', async ({ page }) => {
    const input = await page.$(selectors.input);
    await input.type('4111 2');
    await page.keyboard.press('Backspace');
    expect(await page.evaluate((el) => el.value, input)).toBe('4111');
    await page.keyboard.press('Backspace');
    expect(await page.evaluate((el) => el.value, input)).toBe('411');
  });

  test('delete digits in the middle of input', async ({ page }) => {
    const input = await page.$(selectors.input);
    await input.type('4111 235');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('Backspace');
    expect(await page.evaluate((el) => el.value, input)).toBe('4111 35');
    await page.keyboard.press('Backspace');
    expect(await page.evaluate((el) => el.value, input)).toBe('4113 5');
  });
});
