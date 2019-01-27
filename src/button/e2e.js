/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const scenarios = require('./examples-list');
const {getPuppeteerUrl, analyzeAccessibility} = require('../../e2e/helpers');

const suite = 'Button Test Suite';

describe(suite, () => {
  beforeAll(async () => {
    await page.goto(
      getPuppeteerUrl({
        suite,
        test: scenarios.BUTTON_WITH_ENHANCERS,
      }),
    );
  });

  it('passes basic a11y tests', async () => {
    await page.waitFor('button');
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });
});
