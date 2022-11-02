/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount, analyzeAccessibility } from '../../test/integration';

test.describe('bottom-sheet', () => {
  test('passes basic a11y tests', async ({ page }) => {
    await mount(page, 'bottom-sheet--bottom-sheet');

    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });
});
