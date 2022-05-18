/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/*eslint-env node*/
/* eslint-disable flowtype/require-valid-file-annotation */

const { expect, test } = require('@playwright/test');
const { mount, analyzeAccessibility } = require('../../../e2e/helpers');

test.describe('breadcrumbs', () => {
  test('passes basic a11y tests', async ({ page }) => {
    await mount(page, 'breadcrumbs--breadcrumbs');
    await page.waitForSelector('a');

    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });
});
