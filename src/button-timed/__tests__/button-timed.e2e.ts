/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount, analyzeAccessibility } from '../../test/integration';

test.describe('button-timed', () => {
  test('passes basic a11y tests', async ({ page }) => {
    await mount(page, 'button-timed--button-timed');
    await page.waitForSelector('button');
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  test('zeroes out countdown timer and disables button on click', async ({ page }) => {
    const firstBtn = '[data-testid="first"]';

    await mount(page, 'button-timed--button-timed');
    await page.waitForSelector(firstBtn);
    await page.click(firstBtn);
    expect(page.locator(`${firstBtn} span`)).toHaveText('(0:00)');
    expect(page.locator(firstBtn)).toBeDisabled();
  });

  test('pause controls whether the countdown timer runs', async ({ page }) => {
    const firstBtn = '[data-testid="first"]';

    await mount(page, 'button-timed--button-timed');
    await page.waitForSelector(firstBtn);
    expect(page.locator(`${firstBtn} span`)).toHaveText('(0:02)');

    await page.locator('text=Run').click();
    await page.waitForTimeout(1300);
    expect(page.locator(`${firstBtn} span`)).toHaveText('(0:01)');
  });
});
