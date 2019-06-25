/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

const selectors = {
  input: 'input[data-test="e2e"]',
  deleteIcon: 'svg[role="button"]',
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
      await page.waitFor(selectors.deleteIcon, {
        visible: true,
      });
    });

    it('with escape key', async () => {
      await mount(page, 'input-clearable');
      await page.waitFor(selectors.input);

      let inputValue = await page.$eval(selectors.input, input => input.value);
      expect(inputValue).toBe('Something');

      await page.focus(selectors.input);
      await page.keyboard.press('Escape');

      inputValue = await page.$eval(selectors.input, input => input.value);
      expect(inputValue).toBe('');

      await page.waitFor(selectors.deleteIcon, {
        hidden: true,
      });
    });

    it('with delete icon', async () => {
      await mount(page, 'input-clearable');
      await page.waitFor(selectors.input);

      let inputValue = await page.$eval(selectors.input, input => input.value);
      expect(inputValue).toBe('Something');

      await page.click(selectors.deleteIcon);

      inputValue = await page.$eval(selectors.input, input => input.value);
      expect(inputValue).toBe('');

      await page.waitFor(selectors.deleteIcon, {
        hidden: true,
      });
    });
  });
});
