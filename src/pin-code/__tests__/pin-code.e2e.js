/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* global document */
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const { mount, analyzeAccessibility, isSameNode } = require('../../../e2e/helpers');

const { expect, test } = require('@playwright/test');

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
    const accessibilityReport = await analyzeAccessibility(page, {
      rules: [
        {
          id: 'autocomplete-valid', // one-time-code has limited support but is useful for iOS
          enabled: false,
        },
      ],
    });
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  test('can enter a pin code', async ({ page }) => {
    const inputs = await page.$$(selectors.input);
    await page.focus(selectors.input);
    await page.keyboard.press('1');
    await page.keyboard.press('2');
    await page.keyboard.press('3');
    await page.keyboard.press('4');
    expect(await page.evaluate((el) => el.value, inputs[0])).toBe('1');
    expect(await page.evaluate((el) => el.value, inputs[1])).toBe('2');
    expect(await page.evaluate((el) => el.value, inputs[2])).toBe('3');
    expect(await page.evaluate((el) => el.value, inputs[3])).toBe('4');
  });

  test('transfers focus to next input when a digit is entered', async ({ page }) => {
    const inputs = page.locator(selectors.input);
    await inputs.first().focus();
    await page.keyboard.press('1');
    await expect(inputs.nth(1)).toBeFocused();
  });

  test('only accepts digits', async ({ page }) => {
    const input = await page.$(selectors.input);
    await page.focus(selectors.input);
    await page.keyboard.press('a');
    expect(await page.evaluate((el) => el.value, input)).toBe('');
    await page.keyboard.press('1');
    expect(await page.evaluate((el) => el.value, input)).toBe('1');
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
    const input = await page.$(selectors.input);
    await page.focus(selectors.input);
    await page.keyboard.press('1');
    await page.focus(selectors.input);
    // verify that cursor position does not matter by entering text on left side
    await page.keyboard.press('ArrowLeft'); // ensures no text is selected
    await page.keyboard.press('2');
    expect(await page.evaluate((el) => el.value, input)).toBe('2');
    // verify that cursor position does not matter by entering text on right side
    await page.focus(selectors.input);
    await page.keyboard.press('ArrowRight'); // ensures no text is selected
    await page.keyboard.press('3');
    expect(await page.evaluate((el) => el.value, input)).toBe('3');
  });
});

test.describe('PinCodeMask', () => {
  test.beforeEach(async ({ page }) => {
    await mount(page, 'pin-code--mask');
    await page.waitForSelector(selectors.input);
  });

  test('successfully masks', async ({ page }) => {
    const inputs = await page.$$(selectors.input);
    await page.focus(selectors.input);
    await page.keyboard.press('1');
    await page.keyboard.press('2');
    await page.keyboard.press('3');
    await page.keyboard.press('4');
    expect(await page.evaluate((el) => el.value, inputs[0])).toBe('*');
    expect(await page.evaluate((el) => el.value, inputs[1])).toBe('*');
    expect(await page.evaluate((el) => el.value, inputs[2])).toBe('*');
    expect(await page.evaluate((el) => el.value, inputs[3])).toBe('*');

    const pinCodeValue = await page.$(selectors.pinCodeValue);
    expect(await page.evaluate((el) => el.textContent, pinCodeValue)).toBe('password:1 2 3 4 ');
  });
});
