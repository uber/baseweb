/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount, analyzeAccessibility } from '../../test/integration';

test.describe('skeleton-loading', () => {
  test('passes basic a11y tests', async ({ page }) => {
    await mount(page, 'skeleton--loading');
    const accessibilityReport = await analyzeAccessibility(page);
    // @ts-expect-error todo(starr): unsure how to fix
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  test('if loads component correctly', async ({ page }) => {
    await mount(page, 'skeleton--loading');
    const haveSkeleton = await page.$$eval('div[testid="loader"]', (divs) => {
      if (divs.length > 0) {
        return true;
      }
      return false;
    });
    expect(haveSkeleton).toBe(true);
    await page.waitForSelector('div[testid="loader"]', { state: 'hidden' });
    const haveContent = await page.$$eval('div[id="content"]', (divs) => {
      if (divs.length > 0) {
        return true;
      }
      return false;
    });
    expect(haveContent).toBe(true);
  });
});
