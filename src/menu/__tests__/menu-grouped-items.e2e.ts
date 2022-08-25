/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount } from '../../test/integration';

const highlightedSelector = '[aria-selected="true"]';

async function findHighlightedLabel(page) {
  const highlightedItem = await page.$(highlightedSelector);
  return await page.evaluate((highlightedItem) => highlightedItem.textContent, highlightedItem);
}

function matchArrayElements(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

test.describe('menu-grouped-items', () => {
  test('renders expected li elements', async ({ page }) => {
    await mount(page, 'menu--grouped-items');
    const listElements = await page.$$('li');
    const actual = await Promise.all(
      listElements.map((listElement) => {
        return page.evaluate((li) => li.textContent, listElement);
      })
    );
    const expected = [
      'Black',
      'Blueish',
      'AliceBlue',
      'Aqua',
      'Aquamarine',
      'Whiteish',
      'AntiqueWhite',
      'Azure',
      'Beige',
    ];

    expect(matchArrayElements(actual, expected)).toBe(true);
  });

  test('skips optgroup headers when navigating with keyboard', async ({ page }) => {
    await mount(page, 'menu--grouped-items');
    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');

    const text = await findHighlightedLabel(page);
    expect(text).toBe('AliceBlue');
  });
});
