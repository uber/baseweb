/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */
/* global window */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

const selectors = {
  input: '[data-e2e="input"]',
  clearIcon: '[data-e2e="clear-icon"]',
  lastInput: '[data-e2e="last-input"]',
  maskToggle: '[data-e2e="mask-toggle"]',
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

    // regression test for https://github.com/uber/baseweb/issues/1643
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

    // regression tests for https://github.com/uber/baseweb/issues/1662
    describe('while in a form', () => {
      beforeEach(async () => {
        await mount(page, 'input-password');
        await page.waitFor(selectors.input);
        // set global variable '__e2e__formSubmitted__' to false
        await page.evaluate(() => (window.__e2e__formSubmitted__ = false));
      });

      it('while focusing input, "enter" does not toggle password masking', async () => {
        // focus input
        await page.focus(selectors.input);
        // verify type is password, aka the text is masked
        expect(await page.$eval(selectors.input, input => input.type)).toBe(
          'password',
        );
        // hit enter
        await page.keyboard.press('Enter');
        // verify type is still password, aka the text is still masked
        expect(await page.$eval(selectors.input, input => input.type)).toBe(
          'password',
        );
        // verify global variable '__e2e__formSubmitted__' is true
        expect(await page.evaluate(() => window.__e2e__formSubmitted__)).toBe(
          true,
        );
      });

      it('while focusing mask toggle, "enter" does not submit the form', async () => {
        // focus password mask toggle
        await page.focus(selectors.maskToggle);
        // verify type is password, aka the text is masked
        expect(await page.$eval(selectors.input, input => input.type)).toBe(
          'password',
        );
        // hit enter
        await page.keyboard.press('Enter');
        // verify type is now text, aka the text is not masked
        expect(await page.$eval(selectors.input, input => input.type)).toBe(
          'text',
        );
        // verify global variable '__e2e__formSubmitted__' is still false
        expect(await page.evaluate(() => window.__e2e__formSubmitted__)).toBe(
          false,
        );
      });
    });
  });
});
