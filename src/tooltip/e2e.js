/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const scenarios = require('./examples-list');
const {getPuppeteerUrl, analyzeAccessibility} = require('../../e2e/helpers');

const suite = 'Tooltip Test Suite';

const selectors = {
  tooltip: '[role="tooltip"]',
};

describe(suite, () => {
  beforeAll(async () => {
    await page.goto(
      getPuppeteerUrl({
        suite,
        test: scenarios.SIMPLE_EXAMPLE,
      }),
    );
  });

  it('passes basic a11y tests when hovered', async () => {
    await page.waitFor('span');
    await page.hover('span');
    await page.waitFor(selectors.tooltip);
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });
});
