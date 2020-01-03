/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

const selectors = {
  tooltip: '[role="tooltip"]',
};

describe('tooltip', () => {
  it('passes basic a11y tests when hovered', async () => {
    await mount(page, 'tooltip');
    await page.waitFor('span');
    await page.hover('span');
    await page.waitFor(selectors.tooltip);
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });
});
