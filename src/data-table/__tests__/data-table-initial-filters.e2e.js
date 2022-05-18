/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const { mount } = require('../../../e2e/helpers');

const { expect, test } = require('@playwright/test');

const {
  TABLE_ROOT,
  getCellContentsAtColumnIndex,
  openFilterAtIndex,
  matchArrayElements,
} = require('./utilities.js');

const COLUMN_COUNT = 1;

test.describe('data table initial filters', () => {
  test('mounts with initial filters applied', async ({ page }) => {
    await mount(page, 'data-table--initial-filters');
    await page.waitForSelector(TABLE_ROOT);
    const data = await getCellContentsAtColumnIndex(page, COLUMN_COUNT, 0);
    expect(matchArrayElements(data, ['a'])).toBe(true);
  });

  test('calls onFilterRemove when expected', async ({ page }) => {
    await mount(page, 'data-table--initial-filters');
    await page.waitForSelector(TABLE_ROOT);
    const before = await page.$$('li[data-log="remove"]');
    expect(before.length).toBe(0);

    const tag = await page.$('span[data-baseweb="tag"]');
    const closeTagButton = await tag.$('span[role="presentation"]');
    await closeTagButton.click();

    const after = await page.$$('li[data-log="remove"]');
    expect(after.length).toBe(1);
  });

  test('calls onFilterAdd when expected', async ({ page }) => {
    await mount(page, 'data-table--initial-filters');
    await page.waitForSelector(TABLE_ROOT);

    const before = await page.$$('li[data-log="add"]');
    expect(before.length).toBe(0);

    const tag = await page.$('span[data-baseweb="tag"]');
    const closeTagButton = await tag.$('span[role="presentation"]');
    await closeTagButton.click();

    const popover = await openFilterAtIndex(page, 0);
    const checkboxes = await popover.$$('label[data-baseweb="checkbox"]');
    await checkboxes[1].click();
    await popover.$$eval('button', (items) => {
      const button = items.find((item) => item.textContent === 'Apply');
      return button.click();
    });

    const after = await page.$$('li[data-log="add"]');
    expect(after.length).toBe(1);
  });
});
