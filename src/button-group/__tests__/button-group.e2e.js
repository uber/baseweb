/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/*eslint-env node*/
/* eslint-disable flowtype/require-valid-file-annotation */

const { mount, analyzeAccessibility } = require('../../../e2e/helpers');

const { expect, test } = require('@playwright/test');

test.describe('button-group', () => {
  test('radio mode passes basic a11y tests', async ({ page }) => {
    await mount(page, 'button-group--radio');
    await page.waitForSelector('div');
    await page.click('button');

    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  test('checkbox mode passes basic a11y tests', async ({ page }) => {
    await mount(page, 'button-group--checkbox');
    await page.waitForSelector('div');
    await page.click('button');

    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });
});
