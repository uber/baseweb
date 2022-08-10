/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount, analyzeAccessibility } from '../../test/integration';

test.describe('tooltip', () => {
  test('passes basic a11y tests when hovered', async ({ page }) => {
    await mount(page, 'tooltip--tooltip');
    const anchor = page.locator('text=such as this');
    const content = page.locator('text=Tooltips display short messages.');
    await anchor.hover();
    await expect(content).toBeVisible();
    const accessibilityReport = await analyzeAccessibility(page);
    // focus locks applies guards with tabIndex=1 to trap the focus on purpose
    accessibilityReport.violations = accessibilityReport.violations.filter(
      (v) => v.id !== 'tabindex'
    );

    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });
});
