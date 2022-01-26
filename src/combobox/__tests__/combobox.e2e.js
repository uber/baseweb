/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */
/* global window */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

describe('input', () => {
  it('passes basic a11y tests', async () => {
    await mount(page, 'combobox--combobox');
    await page.waitForSelector('[role="combobox"]');
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });
});
