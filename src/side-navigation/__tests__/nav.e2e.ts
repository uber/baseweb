/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount, analyzeAccessibility } from '../../test/integration';

const selectors = {
  root: 'nav[data-test="e2e"]',
};

test.describe('side navigation', () => {
  test('passes basic a11y tests', async ({ page }) => {
    await mount(page, 'side-navigation--nav');
    await page.waitForSelector(selectors.root);
    const accessibilityReport = await analyzeAccessibility(page, [
      {
        id: 'skip-link',
        enabled: false,
      },
    ]);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });
});
