/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount, analyzeAccessibility } from '../../test/integration';

const selectors = {
  input: 'input',
  pinCodeValue: 'p[data-testid="pinCodeValue"]',
};

test.describe('PinCode', () => {
  test.beforeEach(async ({ page }) => {
    await mount(page, 'pin-code--pin-code');
    await page.waitForSelector(selectors.input);
  });

  test('passes basic a11y tests', async ({ page }) => {
    const accessibilityReport = await analyzeAccessibility(page, [
      {
        id: 'autocomplete-valid', // one-time-code has limited support but is useful for iOS
        enabled: false,
      },
    ]);
    // @ts-expect-error todo(starr): unsure how to fix
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  test('can enter a pin code', async ({ page }) => {
    const inputs = page.locator(selectors.input);
    await inputs.first().focus();
    await page.keyboard.press('1');
    await page.keyboard.press('2');
    await page.keyboard.press('3');
    await page.keyboard.press('4');
    await expect(inputs.nth(0)).toHaveValue('1');
    await expect(inputs.nth(1)).toHaveValue('2');
    await expect(inputs.nth(2)).toHaveValue('3');
    await expect(inputs.nth(3)).toHaveValue('4');
  });

  test('transfers focus to next input when a digit is entered', async ({ page }) => {
    const inputs = page.locator(selectors.input);
    await inputs.first().focus();
    await page.keyboard.press('1');
    await expect(inputs.nth(1)).toBeFocused();
  });

  test('only accepts digits', async ({ page }) => {
    const inputs = page.locator(selectors.input);
    await inputs.first().focus();
    await page.keyboard.press('a');
    await expect(inputs.first()).toHaveValue('');
    await page.keyboard.press('1');
    await expect(inputs.first()).toHaveValue('1');
  });

  test('deleting empty input transfers focus to previous input & clears that input', async ({
    page,
  }) => {
    const inputs = page.locator(selectors.input);
    await inputs.first().focus();
    await inputs.first().type('1');
    await expect(inputs.first()).toHaveValue('1');
    await page.keyboard.press('Backspace');
    await expect(inputs.first()).toHaveValue('');
    await expect(inputs.first()).toBeFocused();
  });

  // This test is validating that when you focus on an input
  // you do not have to have the current value selected to overwrite
  // the input value. So long as you enter a digit, the input will
  // be updated.
  test('does not require text selection to update input value', async ({ page }) => {
    const inputs = await page.locator(selectors.input);
    await inputs.first().focus();
    await page.keyboard.press('1');
    await inputs.first().focus();
    // verify that cursor position does not matter by entering text on left side
    await page.keyboard.press('ArrowLeft'); // ensures no text is selected
    await page.keyboard.press('2');
    await expect(inputs.first()).toHaveValue('2');
    // verify that cursor position does not matter by entering text on right side
    await inputs.first().focus();
    await page.keyboard.press('ArrowRight'); // ensures no text is selected
    await page.keyboard.press('3');
    await expect(inputs.first()).toHaveValue('3');
  });
});

test.describe('PinCodeMask', () => {
  test.beforeEach(async ({ page }) => {
    await mount(page, 'pin-code--mask');
    await page.waitForSelector(selectors.input);
  });

  test('successfully masks', async ({ page }) => {
    const inputs = page.locator(selectors.input);
    await inputs.first().focus();
    await page.keyboard.press('1');
    await page.keyboard.press('2');
    await page.keyboard.press('3');
    await page.keyboard.press('4');
    await expect(inputs.nth(0)).toHaveValue('*');
    await expect(inputs.nth(1)).toHaveValue('*');
    await expect(inputs.nth(2)).toHaveValue('*');
    await expect(inputs.nth(3)).toHaveValue('*');

    const pinCodeValue = page.locator(selectors.pinCodeValue);
    await expect(pinCodeValue).toHaveText('password:1 2 3 4 ');
  });
});
