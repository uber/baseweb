/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const scenarios = require('./examples-list');
const {getPuppeteerUrl, analyzeAccessibility} = require('../../e2e/helpers');

const suite = 'Textarea Test Suite';

const selectors = {
  input: 'textarea[placeholder="Uncontrolled textarea"]',
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

  it('passes basic a11y tests', async () => {
    await page.waitFor(selectors.input);
    const accessibilityReport = await analyzeAccessibility(page, {
      rules: [
        {
          id: 'label',
          enabled: false,
        },
      ],
    });
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('preset value is displayed', async () => {
    await page.waitFor(selectors.input);

    const value = await page.$eval(selectors.input, input => input.value);
    expect(value).toBe('initial value');
  });

  it('entered value is displayed', async () => {
    await page.waitFor(selectors.input);
    await page.click(selectors.input);
    await page.keyboard.type('!');

    const value = await page.$eval(selectors.input, input => input.value);
    expect(value).toBe('initial value!');
  });
});
