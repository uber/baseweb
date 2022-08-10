/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount, analyzeAccessibility } from '../../test/integration';

test.describe('pagination', () => {
  test('passes basic accessibility tests', async ({ page }) => {
    await mount(page, 'pagination--pagination');
    const prev = page.locator('text=Prev').first();
    await prev.waitFor();

    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  test('can be navigated using the prev and next buttons', async ({ page }) => {
    await mount(page, 'pagination--pagination');
    const select = page.locator('[data-baseweb="select"]').first();
    const prev = page.locator('text=Prev').first();
    const next = page.locator('text=Next').first();

    await expect(select).toContainText('1');
    await next.click();
    await expect(select).toContainText('2');
    await prev.click();
    await expect(select).toContainText('1');
  });

  test('can be navigated using the dropdown menu', async ({ page }) => {
    await mount(page, 'pagination--pagination');
    const select = page.locator('[data-baseweb="select"]').first();
    const options = page.locator('[role="option"]');

    await expect(select).toContainText('1');
    await select.click();
    await options.nth(2).click();
    await expect(select).toContainText('3');
  });
});
