/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

const selectors = {
  input: '[data-e2e="input"]',
  clearIcon: '[data-e2e="clear-icon"]',
  lastInput: '[data-e2e="last-input"]',
};

describe('input', () => {
  it('passes basic a11y tests', async () => {
    await mount(page, 'input');
    await page.waitFor(selectors.input);
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('preset value is displayed', async () => {
    await mount(page, 'input');
    await page.waitFor(selectors.input);
    const value = await page.$eval(selectors.input, input => input.value);
    expect(value).toBe('uber');
  });

  it('entered value is displayed', async () => {
    await mount(page, 'input');
    await page.waitFor(selectors.input);

    await page.keyboard.type('_good');

    const value = await page.$eval(selectors.input, input => input.value);
    expect(value).toBe('uber_good');
  });

  describe('can clear values', () => {
    it('shows a clear value icon', async () => {
      await mount(page, 'input-clearable');
      await page.waitFor(selectors.clearIcon, {
        visible: true,
      });
    });

    it('with escape key', async () => {
      await mount(page, 'input-clearable');
      await page.waitFor(selectors.input);

      let inputValue = await page.$eval(selectors.input, input => input.value);
      expect(inputValue).toBe('Thing');

      await page.focus(selectors.input);
      await page.keyboard.press('Escape');

      inputValue = await page.$eval(selectors.input, input => input.value);
      expect(inputValue).toBe('');

      await page.waitFor(selectors.clearIcon, {
        hidden: true,
      });
    });

    it('with delete icon', async () => {
      await mount(page, 'input-clearable');
      await page.waitFor(selectors.input);

      let inputValue = await page.$eval(selectors.input, input => input.value);
      expect(inputValue).toBe('Thing');

      await page.click(selectors.clearIcon);

      inputValue = await page.$eval(selectors.input, input => input.value);
      expect(inputValue).toBe('');

      await page.waitFor(selectors.clearIcon, {
        hidden: true,
      });
    });

    // regression test for https://github.com/uber-web/baseui/issues/1643
    // verify that the input receiving the clear event is cleared and not another input
    it('clears the correct input', async () => {
      await mount(page, 'input-clearable');
      await page.waitFor(selectors.input);

      // verify first input value is "Thing"
      expect(await page.$eval(selectors.input, input => input.value)).toBe(
        'Thing',
      );

      // verify second input value is "Or other"
      expect(await page.$eval(selectors.lastInput, input => input.value)).toBe(
        'Or other',
      );

      // clear first input
      await page.click(selectors.clearIcon);

      // verify first input value is ""
      expect(await page.$eval(selectors.input, input => input.value)).toBe('');

      // verify second input value is still "Other"
      expect(await page.$eval(selectors.lastInput, input => input.value)).toBe(
        'Or other',
      );
    });
  });
});
