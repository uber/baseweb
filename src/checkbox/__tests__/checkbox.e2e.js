/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const { mount, analyzeAccessibility } = require('../../../e2e/helpers');

const { expect, test } = require('@playwright/test');

const parentCheckbox = '[data-name="parent"] input[type="checkbox"]';
const childLabel2 = '[data-name="child2"]';

test.describe('checkbox', () => {
  test(`passes basic a11y tests`, async ({ page }) => {
    await mount(page, 'checkbox--indeterminate');
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  test(`passes basic a11y tests when unlabeled`, async ({ page }) => {
    await mount(page, 'checkbox--unlabeled');
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  test('can switch states', async ({ page }) => {
    await mount(page, 'checkbox--indeterminate');
    await page.waitForSelector(childLabel2);
    await page.click(childLabel2);
    const checked = await page.$eval(parentCheckbox, (input) => input.checked);
    expect(checked).toBe(true);
  });
});
