/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const { mount, analyzeAccessibility } = require('../../../e2e/helpers');

const { expect, test } = require('@playwright/test');

// most slider actions are covered in react-range e2e tests: https://github.com/tajo/react-range/tree/master/e2e
test.describe('slider', () => {
  test('passes basic a11y tests', async ({ page }) => {
    await mount(page, 'slider--slider');
    const accessibilityReport = await analyzeAccessibility(page, {
      rules: [
        {
          // https://github.com/tajo/react-range/issues/147
          id: 'aria-input-field-name',
          enabled: false,
        },
      ],
    });
    expect(accessibilityReport).toHaveNoAccessibilityIssues({
      knownViolations: ['aria-input-field-name'],
    });
  });
});
