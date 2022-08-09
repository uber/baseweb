/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount, analyzeAccessibility } from '../../test/integration';

const selectors = {
  prevButton: 'button[data-test="prev-button"]',
  nextButton: 'button[data-test="next-button"]',
  dropDownButton: '[data-baseweb="select"] [aria-selected]',
};

test.describe('pagination', () => {
  test('passes basic accessibility tests', async ({ page }) => {
    await mount(page, 'pagination--pagination');
    await page.waitForSelector(selectors.prevButton);
    const accessibilityReport = await analyzeAccessibility(page, [
      {
        //indicates listbox element should contain option elements (options are hoisted in the popover)
        id: 'aria-required-children',
        enabled: false,
      },
    ]);

    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  test('can be navigated using the prev and next buttons', async ({ page }) => {
    await mount(page, 'pagination--pagination');
    await page.waitForSelector(selectors.prevButton);
    // assert initial state
    const initialValue = await page.$eval(selectors.dropDownButton, (input) => input.textContent);
    expect(initialValue).toBe('1');

    // paginate to the next page
    await page.click(selectors.nextButton);
    let value = await page.$eval(selectors.dropDownButton, (input) => input.textContent);
    expect(value).toBe('2');

    // paginate to the previous page
    await page.click(selectors.prevButton);
    value = await page.$eval(selectors.dropDownButton, (input) => input.textContent);
    expect(value).toBe('1');
  });

  test('can be navigated using the dropdown menu', async ({ page }) => {
    await mount(page, 'pagination--pagination');
    await page.waitForSelector(selectors.prevButton);
    // assert initial state
    const initialValue = await page.$eval(selectors.dropDownButton, (input) => input.textContent);
    expect(initialValue).toBe('1');

    // paginate using the dropdown menu
    await page.click(selectors.dropDownButton);
    await page.click('ul li:nth-child(3)');

    let value = await page.$eval(selectors.dropDownButton, (input) => input.textContent);
    expect(value).toBe('3');
  });
});
