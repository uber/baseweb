/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

describe('tabs', () => {
  it('passes basic a11y tests', async () => {
    await mount(page, 'tabs');
    await page.waitFor('[role="tab"]');
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('changes content on tab click', async () => {
    await mount(page, 'tabs');
    await page.waitFor('[role="tab"]');

    // verify initial state, tab 0 is visible, tab 1 and 2 are hidden
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
