/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

const selectors = {
  prevButton: 'button[data-test="prev-button"]',
  nextButton: 'button[data-test="next-button"]',
  dropDownButton: '[data-baseweb="select"] [aria-selected]',
};

describe('pagination', () => {
  it('passes basic accessibility tests', async () => {
    await mount(page, 'pagination');
    await page.waitFor(selectors.prevButton);
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('can be navigated using the prev and next buttons', async () => {
    await mount(page, 'pagination');
    await page.waitFor(selectors.prevButton);
    // assert initial state
    const initialValue = await page.$eval(
      selectors.dropDownButton,
      input => input.textContent,
    );
    expect(initialValue).toBe('1');

    // paginate to the next page
    await page.click(selectors.nextButton);
    let value = await page.$eval(
      selectors.dropDownButton,
      input => input.textContent,
    );
    expect(value).toBe('2');

    // paginate to the previous page
    await page.click(selectors.prevButton);
    value = await page.$eval(
      selectors.dropDownButton,
      input => input.textContent,
    );
    expect(value).toBe('1');
  });

  it('can be navigated using the dropdown menu', async () => {
    await mount(page, 'pagination');
    await page.waitFor(selectors.prevButton);
    // assert initial state
    const initialValue = await page.$eval(
      selectors.dropDownButton,
      input => input.textContent,
    );
    expect(initialValue).toBe('1');

    // paginate using the dropdown menu
    await page.click(selectors.dropDownButton);
    await page.click('ul li:nth-child(3)');

    let value = await page.$eval(
      selectors.dropDownButton,
      input => input.textContent,
    );
    expect(value).toBe('3');
  });
});
