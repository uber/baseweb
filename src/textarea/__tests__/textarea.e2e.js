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
  textarea: 'textarea',
  clearIcon: '[data-e2e="clear-icon"]',
};

test.describe('textarea', () => {
  test('passes basic a11y tests', async ({ page }) => {
    await mount(page, 'textarea--textarea');
    await page.waitForSelector(selectors.textarea);
    const accessibilityReport = await analyzeAccessibility(page, {
      rules: [
        {
          id: 'label',
          enabled: false,
        },
      ],
    });
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  test('preset value is displayed', async ({ page }) => {
    await mount(page, 'textarea--textarea');
    await page.waitForSelector(selectors.textarea);

    const value = await page.$eval(selectors.textarea, (input) => input.value);
    expect(value).toBe('initial value');
  });

  test('entered value is displayed', async ({ page }) => {
    await mount(page, 'textarea--textarea');
    await page.waitForSelector(selectors.textarea);
    await page.click(selectors.textarea);
    await page.keyboard.type('!');

    const value = await page.$eval(selectors.textarea, (input) => input.value);
    expect(value).toBe('initial value!');
  });

  test('can be cleared with a click', async ({ page }) => {
    await mount(page, 'textarea--textarea');
    await page.waitForSelector(selectors.textarea);
    await page.click(selectors.textarea);
    await page.keyboard.type('Something or other');
    await page.click(selectors.clearIcon);
    const value = await page.$eval(selectors.textarea, (input) => input.value);
    expect(value).toBe('');
  });

  test('can be cleared with escape', async ({ page }) => {
    await mount(page, 'textarea--textarea');
    await page.waitForSelector(selectors.textarea);
    await page.click(selectors.textarea);
    await page.keyboard.type('Something or other');
    await page.keyboard.press('Escape');
    const value = await page.$eval(selectors.textarea, (input) => input.value);
    expect(value).toBe('');
  });
});
