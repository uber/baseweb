/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount } from '../../test/integration';
import { sortColumnAtIndex, matchArrayElements } from './utilities';

test.describe('data table columns', () => {
  test('updates application state when rows change', async ({ page }) => {
    const index = 0;
    await mount(page, 'data-table--included-rows-change');
    await page.waitForSelector('div[data-baseweb="data-table"]');

    const initialLi = await page.$$('li');
    const initial = await Promise.all(
      initialLi.map((li) => page.evaluate((e) => e.textContent, li))
    );
    expect(matchArrayElements(initial, ['1', '2', '3', '4'])).toBe(true);

    await sortColumnAtIndex(page, index);
    const afterLi = await page.$$('li');
    const after = await Promise.all(afterLi.map((li) => page.evaluate((e) => e.textContent, li)));
    expect(matchArrayElements(after, ['1', '3', '2', '4'])).toBe(true);
  });
});
