/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

const selectors = {
  combobox: '[role="combobox"]',
  listbox: '[role="listbox"]',
};

describe('combobox', () => {
  it('passes on initial render', async () => {
    await mount(page, 'combobox--combobox');
    await page.waitForSelector(selectors.combobox);
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('passes when listbox is open', async () => {
    await mount(page, 'combobox--combobox');
    await page.waitForSelector(selectors.combobox);
    await page.click(selectors.combobox);
    await page.waitForSelector(selectors.listbox);
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });
});
