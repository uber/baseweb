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
    // @ts-expect-error todo(starr): unsure how to fix
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  test('preset value is displayed', async ({ page }) => {
    await mount(page, 'input--input');
    await page.waitForSelector(selectors.input);
    const value = await page.$eval(selectors.input, (input) => input.value);
    expect(value).toBe('uber');
  });

  test('entered value is displayed', async ({ page }) => {
    await mount(page, 'input--input');
    await page.waitForSelector(selectors.input);

    await page.keyboard.type('_good');

    const value = await page.$eval(selectors.input, (input) => input.value);
    expect(value).toBe('uber_good');
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
      await page.waitForSelector(selectors.input);

      let inputValue = await page.$eval(selectors.input, (input) => input.value);
      expect(inputValue).toBe('Thing');

      await page.focus(selectors.input);
      await page.keyboard.press('Escape');

      inputValue = await page.$eval(selectors.input, (input) => input.value);
      expect(inputValue).toBe('');

      await page.waitForSelector(selectors.clearIcon, {
        state: 'hidden',
      });
    });

    test('not with escape key when its disabled', async ({ page }) => {
      await mount(page, 'input--clearable-noescape');
      await page.waitForSelector(selectors.input);

      let inputValue = await page.$eval(selectors.input, (input) => input.value);
      expect(inputValue).toBe('Thing');

      await page.focus(selectors.input);
      await page.keyboard.press('Escape');

      inputValue = await page.$eval(selectors.input, (input) => input.value);
      expect(inputValue).toBe('Thing');
    });

    test('with delete icon', async ({ page }) => {
      await mount(page, 'input--clearable');
      await page.waitForSelector(selectors.input);

      let inputValue = await page.$eval(selectors.input, (input) => input.value);
      expect(inputValue).toBe('Thing');

      await page.click(selectors.clearIcon);

      inputValue = await page.$eval(selectors.input, (input) => input.value);
      expect(inputValue).toBe('');

      await page.waitForSelector(selectors.clearIcon, {
        state: 'hidden',
      });
    });

    test('with delete icon via enter', async ({ page }) => {
      await mount(page, 'input--clearable');
      await page.waitForSelector(selectors.input);

      let inputValue = await page.$eval(selectors.input, (input) => input.value);
      expect(inputValue).toBe('Thing');

      await page.focus(selectors.clearIcon);
      await page.keyboard.press('Enter');

      inputValue = await page.$eval(selectors.input, (input) => input.value);
      expect(inputValue).toBe('');

      await page.waitForSelector(selectors.clearIcon, {
        state: 'hidden',
      });
    });

    test('with delete icon via space', async ({ page }) => {
      await mount(page, 'input--clearable');
      await page.waitForSelector(selectors.input);

      let inputValue = await page.$eval(selectors.input, (input) => input.value);
      expect(inputValue).toBe('Thing');

      await page.focus(selectors.clearIcon);
      await page.keyboard.press(' ');

      inputValue = await page.$eval(selectors.input, (input) => input.value);
      expect(inputValue).toBe('');

      await page.waitForSelector(selectors.clearIcon, {
        state: 'hidden',
      });
    });

    // regression test for https://github.com/uber/baseweb/issues/1643
    // verify that the input receiving the clear event is cleared and not another input
    test('clears the correct input', async ({ page }) => {
      await mount(page, 'input--clearable');
      await page.waitForSelector(selectors.input);

      // verify first input value is "Thing"
      expect(await page.$eval(selectors.input, (input) => input.value)).toBe('Thing');

      // verify second input value is "Or other"
      expect(await page.$eval(selectors.lastInput, (input) => input.value)).toBe('Or other');

      // clear first input
      await page.click(selectors.clearIcon);

      // verify first input value is ""
      expect(await page.$eval(selectors.input, (input) => input.value)).toBe('');

      // verify second input value is still "Other"
      expect(await page.$eval(selectors.lastInput, (input) => input.value)).toBe('Or other');
    });

    // regression tests for https://github.com/uber/baseweb/issues/1662
    test.describe('while in a form', () => {
      test.beforeEach(async ({ page }) => {
        await mount(page, 'input--password');
        await page.waitForSelector(selectors.input);
        // set global variable '__e2e__formSubmitted__' to false
        await page.evaluate(() => (window.__e2e__formSubmitted__ = false));
      });

      test('while focusing input, "enter" does not toggle password masking', async ({ page }) => {
        // focus input
        await page.focus(selectors.input);
        // verify type is password, aka the text is masked
        expect(await page.$eval(selectors.input, (input) => input.type)).toBe('password');
        // hit enter
        await page.keyboard.press('Enter');
        // verify type is still password, aka the text is still masked
        expect(await page.$eval(selectors.input, (input) => input.type)).toBe('password');
        // verify global variable '__e2e__formSubmitted__' is true
        expect(await page.evaluate(() => window.__e2e__formSubmitted__)).toBe(true);
      });

      test('while focusing mask toggle, "enter" does not submit the form', async ({ page }) => {
        // focus password mask toggle
        await page.focus(selectors.maskToggle);
        // verify type is password, aka the text is masked
        expect(await page.$eval(selectors.input, (input) => input.type)).toBe('password');
        // hit enter
        await page.keyboard.press('Enter');
        // verify type is now text, aka the text is not masked
        expect(await page.$eval(selectors.input, (input) => input.type)).toBe('text');
        // verify global variable '__e2e__formSubmitted__' is still false
        expect(await page.evaluate(() => window.__e2e__formSubmitted__)).toBe(false);
      });
    });
  });
});
