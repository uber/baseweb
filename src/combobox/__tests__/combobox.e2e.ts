/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount, analyzeAccessibility } from '../../test/integration';

const selectors = {
  combobox: '[role="combobox"]',
  listbox: '[role="listbox"]',
  firstOption: '[role="option"]',
};

test.describe('combobox', () => {
  test('passes on initial render', async ({ page }) => {
    await mount(page, 'combobox--combobox');
    await page.waitForSelector(selectors.combobox);
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  test('passes when listbox is open', async ({ page }) => {
    await mount(page, 'combobox--combobox');
    await page.waitForSelector(selectors.combobox);
    await page.click(selectors.combobox);
    await page.waitForSelector(selectors.listbox);
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  test('passes when listbox is open, and an option is selected', async ({ page }) => {
    await mount(page, 'combobox--combobox');
    await page.waitForSelector(selectors.combobox);
    await page.click(selectors.combobox);
    await page.waitForSelector(selectors.listbox);
    await page.click(selectors.firstOption);
    await page.waitForSelector(selectors.listbox, { state: 'hidden' });
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });
});
