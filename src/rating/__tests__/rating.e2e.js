/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

const selectors = {
  container: '[role="radiogroup"]',
  checked: '[aria-checked="true"]',
};

describe('Rating', () => {
  it('passes basic a11y tests', async () => {
    await mount(page, 'rating-star');
    await page.waitFor(selectors.container);
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('for a value of three, three stars are highlighted', async () => {
    await mount(page, 'rating-star');
    await page.waitFor(selectors.container);

    const highlightedStars = await page.$$eval(
      selectors.checked,
      stars => stars.length,
    );
    expect(highlightedStars).toBe(3);
  });

  it('for a value of three, the third emoticon is highlighted', async () => {
    await mount(page, 'rating-emoticon');
    await page.waitFor(selectors.container);

    const highlightedEmoticons = await page.$$eval(
      selectors.checked,
      stars => stars.length,
    );
    expect(highlightedEmoticons).toBe(1);

    const indexOfHighlighted = await page.$eval(
      selectors.checked,
      star => +star.getAttribute('aria-posinset'),
    );
    expect(indexOfHighlighted).toBe(3);
  });
});
