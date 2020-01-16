/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

const parentCheckbox = '[data-name="parent"] input[type="checkbox"]';
const childLabel2 = '[data-name="child2"]';

describe('checkbox', () => {
  it(`passes basic a11y tests`, async () => {
    await mount(page, 'checkbox-indeterminate');
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it(`passes basic a11y tests when unlabeled`, async () => {
    await mount(page, 'checkbox-unlabeled');
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('can switch states', async () => {
    await mount(page, 'checkbox-indeterminate');
    await page.waitFor(childLabel2);
    await page.click(childLabel2);
    const checked = await page.$eval(parentCheckbox, input => input.checked);
    expect(checked).toBe(true);
  });
});
