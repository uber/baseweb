/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {getPuppeteerUrl, analyzeAccessibility} = require('../../../e2e/helpers');

describe('tag', () => {
  it('passes basic a11y tests', async () => {
    await page.goto(getPuppeteerUrl({name: 'tag'}));
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });
});
