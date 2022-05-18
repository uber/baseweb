/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const { mount, analyzeAccessibility } = require('../../../e2e/helpers');

const { expect, test } = require('@playwright/test');

const selectors = {
  container: '[role="radiogroup"]',
  checked: '[aria-checked="true"]',
};

test.describe('Rating', () => {
  test('passes basic a11y tests', async ({ page }) => {
    await mount(page, 'rating--star');
    await page.waitForSelector(selectors.container);
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  test('for a value of three, three stars are highlighted', async ({ page }) => {
    await mount(page, 'rating--star');
    await page.waitForSelector(selectors.container);

    const highlightedStars = await page.$$eval(selectors.checked, (stars) => stars.length);
    expect(highlightedStars).toBe(3);
  });

  test('for a value of three, the third emoticon is highlighted', async ({ page }) => {
    await mount(page, 'rating--emoticon');
    await page.waitForSelector(selectors.container);

    const highlightedEmoticons = await page.$$eval(selectors.checked, (stars) => stars.length);
    expect(highlightedEmoticons).toBe(1);

    const indexOfHighlighted = await page.$eval(
      selectors.checked,
      (star) => +star.getAttribute('aria-posinset')
    );
    expect(indexOfHighlighted).toBe(3);
  });
});
