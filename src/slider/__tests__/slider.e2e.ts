/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount, analyzeAccessibility } from '../../test/integration';

// most slider actions are covered in react-range e2e tests: https://github.com/tajo/react-range/tree/master/e2e
test.describe('slider', () => {
  test('passes basic a11y tests', async ({ page }) => {
    await mount(page, 'slider--slider');
    const accessibilityReport = await analyzeAccessibility(page, [
      {
        // https://github.com/tajo/react-range/issues/147
        id: 'aria-input-field-name',
        enabled: false,
      },
    ]);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });
});
