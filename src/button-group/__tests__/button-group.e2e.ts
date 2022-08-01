/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount, analyzeAccessibility } from '../../test/integration';

test.describe('button-group', () => {
  test('radio mode passes basic a11y tests', async ({ page }) => {
    await mount(page, 'button-group--radio');
    await page.waitForSelector('div');
    await page.click('button');

    const accessibilityReport = await analyzeAccessibility(page);
    // @ts-expect-error todo(starr): unsure how to fix
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  test('checkbox mode passes basic a11y tests', async ({ page }) => {
    await mount(page, 'button-group--checkbox');
    await page.waitForSelector('div');
    await page.click('button');

    const accessibilityReport = await analyzeAccessibility(page);
    // @ts-expect-error todo(starr): unsure how to fix
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });
});
