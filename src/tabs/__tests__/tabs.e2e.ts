/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount, analyzeAccessibility } from '../../test/integration';

test.describe('tabs', () => {
  test('passes basic a11y tests', async ({ page }) => {
    await mount(page, 'tabs--tabs');
    await page.waitForSelector('[role="tab"]');
    const accessibilityReport = await analyzeAccessibility(page);
    // @ts-expect-error todo(starr): unsure how to fix
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  test('changes content on tab click', async ({ page }) => {
    await mount(page, 'tabs--tabs');
    await page.waitForSelector('[role="tab"]');

    // verify initial state, tab 0 is visible, tab 1 and 2 are hidden
    let states = [true, false, false];

    for (let i = 0; i < states.length; i++) {
      let visible = await page.$eval(`[aria-labelledby="${i}"]`, (input) => !!input.offsetParent);
      await expect(visible).toBe(states[i]);
    }
    // click tab 2 and verify
    await page.click('[id="1"]');
    states = [false, true, false];

    for (let i = 0; i < states.length; i++) {
      let visible = await page.$eval(`[aria-labelledby="${i}"]`, (input) => !!input.offsetParent);
      await expect(visible).toBe(states[i]);
    }
  });
});
