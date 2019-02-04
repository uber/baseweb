/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const scenarios = require('./examples-list');
const {getPuppeteerUrl, analyzeAccessibility} = require('../../e2e/helpers');

const suite = 'Tabs Test Suite';

describe(suite, () => {
  beforeAll(async () => {
    await page.goto(
      getPuppeteerUrl({
        suite,
        test: scenarios.STATEFUL_TABS_EXAMPLE,
      }),
    );
  });

  it('passes basic a11y tests', async () => {
    await page.waitFor('[role="tab"]');
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('changes content on tab click', async () => {
    await page.waitFor('[role="tab"]');

    // verifiy initial state, tab 0 is visible, tab 1 and 2 are hidden
    let states = [true, false, false];

    for (let i = 0; i < states.length; i++) {
      let visible = await page.$eval(
        `[aria-labelledby="${i}"]`,
        input => !!input.offsetParent,
      );
      await expect(visible).toBe(states[i]);
    }
    // click tab 2 and verify
    await page.click('[id="1"]');
    states = [false, true, false];

    for (let i = 0; i < states.length; i++) {
      let visible = await page.$eval(
        `[aria-labelledby="${i}"]`,
        input => !!input.offsetParent,
      );
      await expect(visible).toBe(states[i]);
    }
  });
});
