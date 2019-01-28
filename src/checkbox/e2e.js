/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const scenarios = require('./examples-list');
const {getPuppeteerUrl, analyzeAccessibility} = require('../../e2e/helpers');

const suite = 'Checkbox Test Suite';

const selectors = {
  radioOne: '[data-name="radioSub1"] label',
  radioTwo: '[data-name="radioSub2"] label',
  radioMain: '[data-name="radioMain"] label input[type="checkbox"]',
};

describe(suite, () => {
  beforeAll(async () => {
    await page.goto(
      getPuppeteerUrl({
        suite,
        test: scenarios.INDETERMINATE,
      }),
    );
  });

  it('can switch states', async () => {
    await page.waitFor(selectors.radioOne);
    await page.click(selectors.radioOne);
    await page.click(selectors.radioTwo);

    const checked = await page.$eval(
      selectors.radioMain,
      input => input.checked,
    );
    expect(checked).toBe(true);

    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });
});
