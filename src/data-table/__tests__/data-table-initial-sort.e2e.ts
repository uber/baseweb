/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount } from '../../test/integration';
import { TABLE_ROOT, getCellContentsAtColumnIndex, matchArrayElements } from './utilities';

const COLUMN_COUNT = 1;

test.describe('data table initial filters', () => {
  test('mounts with initial sort applied', async ({ page }) => {
    await mount(page, 'data-table--initial-sort');
    await page.waitForSelector(TABLE_ROOT);
    const data = await getCellContentsAtColumnIndex(page, COLUMN_COUNT, 0);
    expect(matchArrayElements(data, ['d', 'c', 'b', 'a'])).toBe(true);
  });
});
