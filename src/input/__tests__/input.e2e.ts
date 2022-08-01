/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount, analyzeAccessibility } from '../../test/integration';

const selectors = {
  input: '[data-e2e="input"]',
  clearIcon: '[data-e2e="clear-icon"]',
  lastInput: '[data-e2e="last-input"]',
  maskToggle: '[data-e2e="mask-toggle"]',
};

test.describe('input', () => {
  test('passes basic a11y tests', async ({ page }) => {
    await mount(page, 'input--input');
    await page.waitForSelector(selectors.input);
    const accessibilityReport = await analyzeAccessibility(page);

    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  test('preset value is displayed', async ({ page }) => {
    await mount(page, 'input--input');
    await expect(page.locator('input')).toHaveValue('uber');
  });

  test('entered value is displayed', async ({ page }) => {
    await mount(page, 'input--input');
    const input = await page.locator('input');
    await input.type('_good');
    await expect(input).toHaveValue('uber_good');
  });

  test.describe('can clear values', () => {
    test('shows a clear value icon', async ({ page }) => {
      await mount(page, 'input--clearable');
      await page.waitForSelector(selectors.clearIcon, {
        state: 'visible',
      });
    });

    test('with escape key', async ({ page }) => {
      await mount(page, 'input--clearable');
      const input = page.locator(selectors.input);
      await expect(input).toHaveValue('Thing');
      await input.focus();
      await page.keyboard.press('Escape');
      await expect(input).toHaveValue('');
      const clearIcon = page.locator(selectors.clearIcon);
      await expect(clearIcon).toBeHidden();
    });

    test('not with escape key when its disabled', async ({ page }) => {
      await mount(page, 'input--clearable-noescape');
      const input = page.locator(selectors.input);
      await expect(input).toHaveValue('Thing');
      await input.focus();
      await page.keyboard.press('Escape');
      await expect(input).toHaveValue('Thing');
    });

    test('with delete icon', async ({ page }) => {
      await mount(page, 'input--clearable');
      const input = page.locator(selectors.input);
      await expect(input).toHaveValue('Thing');
      const clearIcon = page.locator(selectors.clearIcon);
      await clearIcon.click();
      await expect(input).toHaveValue('');
      await expect(clearIcon).toBeHidden();
    });

    test('with delete icon via enter', async ({ page }) => {
      await mount(page, 'input--clearable');
      const input = page.locator(selectors.input);
      await expect(input).toHaveValue('Thing');
      const clearIcon = page.locator(selectors.clearIcon);
      await clearIcon.focus();
      await page.keyboard.press('Enter');
      await expect(input).toHaveValue('');
      await expect(clearIcon).toBeHidden();
    });

    test('with delete icon via space', async ({ page }) => {
      await mount(page, 'input--clearable');
      const input = page.locator(selectors.input);
      await expect(input).toHaveValue('Thing');
      const clearIcon = page.locator(selectors.clearIcon);
      await clearIcon.focus();
      await page.keyboard.press(' ');
      await expect(input).toHaveValue('');
      await expect(clearIcon).toBeHidden();
    });

    // regression test for https://github.com/uber/baseweb/issues/1643
    // verify that the input receiving the clear event is cleared and not another input
    test('clears the correct input', async ({ page }) => {
      await mount(page, 'input--clearable');
      const first = page.locator(selectors.input);
      await expect(first).toHaveValue('Thing');
      const last = page.locator(selectors.lastInput);
      await expect(last).toHaveValue('Or other');
      const clearIcon = page.locator(selectors.clearIcon);
      await clearIcon.click();
      await expect(first).toHaveValue('');
      await expect(last).toHaveValue('Or other');
    });

    // regression tests for https://github.com/uber/baseweb/issues/1662
    test.describe('while in a form', () => {
      test.beforeEach(async ({ page }) => {
        await mount(page, 'input--password');
        await page.waitForSelector(selectors.input);
        // set global variable '__e2e__formSubmitted__' to false
        // @ts-expect-error
        await page.evaluate(() => (window.__e2e__formSubmitted__ = false));
      });

      test('while focusing input, "enter" does not toggle password masking', async ({ page }) => {
        // focus input
        const input = page.locator(selectors.input);
        await input.focus();
        // verify type is password, aka the text is masked
        await expect(input).toHaveAttribute('type', 'password');
        await page.keyboard.press('Enter');
        // verify type is still password, aka the text is still masked
        await expect(input).toHaveAttribute('type', 'password');
        // verify global variable '__e2e__formSubmitted__' is true
        // @ts-expect-error
        expect(await page.evaluate(() => window.__e2e__formSubmitted__)).toBe(true);
      });

      test('while focusing mask toggle, "enter" does not submit the form', async ({ page }) => {
        // focus password mask toggle
        const maskToggle = page.locator(selectors.maskToggle);
        await maskToggle.focus();
        // verify type is password, aka the text is masked
        const input = page.locator(selectors.input);
        await expect(input).toHaveAttribute('type', 'password');
        await page.keyboard.press('Enter');
        // verify type is now text, aka the text is not masked
        await expect(input).toHaveAttribute('type', 'text');
        // verify global variable '__e2e__formSubmitted__' is still false
        // @ts-expect-error
        expect(await page.evaluate(() => window.__e2e__formSubmitted__)).toBe(false);
      });
    });
  });
});
