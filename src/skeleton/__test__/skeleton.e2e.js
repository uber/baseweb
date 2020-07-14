/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

async function countNumber() {
  const groupCount = await page.$$eval(
    'div[dataTestId="loader"]',
    divs => divs.length,
  );
  return groupCount > 0;
}

describe('skeleton', () => {
  it('passes basic a11y tests', async () => {
    await mount(page, 'skeleton');
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('check skeleton element number ', async () => {
    await mount(page, 'skeleton');
    expect(await countNumber()).toBeTruthy();
  });
});
