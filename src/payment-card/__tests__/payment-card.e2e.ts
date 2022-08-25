/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount, analyzeAccessibility } from '../../test/integration';

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
    const input = page.locator(selectors.input);
    await input.type('4111222233334444');
    await expect(input).toHaveValue('4111 2222 3333 4444');
  });

  test('add more digits in the middle of input', async ({ page }) => {
    const input = page.locator(selectors.input);
    await input.type('41112');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('5');
    await expect(input).toHaveValue('4115 12');
    await page.keyboard.press('6');
    await expect(input).toHaveValue('4115 612');
  });

  test('delete digits from the end of input', async ({ page }) => {
    const input = page.locator(selectors.input);
    await input.type('4111 2');
    await page.keyboard.press('Backspace');
    await expect(input).toHaveValue('4111');
    await page.keyboard.press('Backspace');
    await expect(input).toHaveValue('411');
  });

  test('delete digits in the middle of input', async ({ page }) => {
    const input = page.locator(selectors.input);
    await input.type('4111 235');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('Backspace');
    await expect(input).toHaveValue('4111 35');
    await page.keyboard.press('Backspace');
    await expect(input).toHaveValue('4113 5');
  });
});
