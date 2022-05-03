/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const { mount } = require('../../../e2e/helpers');

const {
  TABLE_ROOT,
  getCellContentsAtColumnIndex,
  openFilterAtIndex,
  matchArrayElements,
} = require('./utilities.js');

const COLUMN_COUNT = 5;

describe('data table columns', () => {
  it('updates categorical column', async () => {
    const index = 1;
    await mount(page, 'data-table--columns');
    await page.waitForSelector(TABLE_ROOT);
    const initial = await getCellContentsAtColumnIndex(page, COLUMN_COUNT, index);
    expect(matchArrayElements(initial, ['A', 'B', 'A', 'A'])).toBe(true);

    let popover = await openFilterAtIndex(page, index);
    const checkbox = await popover.$('label[data-baseweb="checkbox"]');
    await checkbox.click();
    await popover.$$eval('button', (items) => {
      const button = items.find((item) => item.textContent === 'Apply');
      return button.click();
    });

    const filtered = await getCellContentsAtColumnIndex(page, COLUMN_COUNT, index);
    expect(matchArrayElements(filtered, ['A', 'A', 'A'])).toBe(true);

    const tag = await page.$('span[data-baseweb="tag"]');
    await tag.click();
    popover = await page.$('div[data-baseweb="popover"]');
    const checkboxes = await popover.$$('label[data-baseweb="checkbox"]');
    // in maybe 10% of runs, the 'a' checkbox is not unselected causing the
    // filter to be applied with both categories. added to separate suite with retries
    await checkboxes[0].click();
    await checkboxes[1].click();
    await popover.$$eval('button', (items) => {
      const button = items.find((item) => item.textContent === 'Apply');
      return button.click();
    });
    await page.waitForSelector('div[data-baseweb="popover"]', { state: 'hidden' });

    const updated = await getCellContentsAtColumnIndex(page, COLUMN_COUNT, index);

    expect(matchArrayElements(updated, ['B'])).toBe(true);
  });
});
