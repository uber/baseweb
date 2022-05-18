/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const { mount } = require('../../../e2e/helpers');

const { expect, test } = require('@playwright/test');

const { TABLE_ROOT, getCellContentsAtColumnIndex, matchArrayElements } = require('./utilities.js');

function wait(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

const COLUMN_COUNT = 6;

test.describe('data table text search', () => {
  test('filters to expected number of rows', async ({ page }) => {
    await mount(page, 'data-table--text-search');
    await page.waitForSelector(TABLE_ROOT);
    await page.type('input', 'arti');
    await wait(250); // input is debounced by 250ms

    const actual = await getCellContentsAtColumnIndex(page, COLUMN_COUNT, 0);
    const expected = ['American bison', 'Goat', 'Giraffe', 'Llama', 'Reindeer'];
    expect(matchArrayElements(actual, expected)).toBe(true);
  });

  test('filters custom columns', async ({ page }) => {
    await mount(page, 'data-table--text-search');
    await page.waitForSelector(TABLE_ROOT);
    await page.type('input', 'moll');
    await wait(250); // input is debounced by 250ms

    const actual = await getCellContentsAtColumnIndex(page, COLUMN_COUNT, 0);
    const expected = ['Mediterranean mussel'];
    expect(matchArrayElements(actual, expected)).toBe(true);
  });
});
