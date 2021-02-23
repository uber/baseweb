/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

describe('skeleton-loading', () => {
  it('passes basic a11y tests', async () => {
    await mount(page, 'skeleton--loading');
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('if loads component correctly', async () => {
    await mount(page, 'skeleton--loading');
    const haveSkeleton = await page.$$eval('div[testid="loader"]', divs => {
      if (divs.length > 0) {
        return true;
      }
      return false;
    });
    expect(haveSkeleton).toBe(true);
    await page.waitForSelector('div[testid="loader"]', {hidden: true});
    const haveContent = await page.$$eval('div[id="content"]', divs => {
      if (divs.length > 0) {
        return true;
      }
      return false;
    });
    expect(haveContent).toBe(true);
  });
});
