/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount} = require('../../../e2e/helpers');

const {
  TABLE_ROOT,
  getCellContentsAtColumnIndex,
  matchArrayElements,
} = require('./utilities.js');

function wait(ms) {
  return new Promise(res => setTimeout(res, ms));
}

const COLUMN_COUNT = 6;

describe('data table text search', () => {
  jest.setTimeout(10 * 1000);
  it('filters to expected number of rows', async () => {
    await mount(page, 'data-table-text-search');
    await page.waitFor(TABLE_ROOT);
    await page.type('input', 'arti');
    await wait(250); // input is debounced by 250ms

    const actual = await getCellContentsAtColumnIndex(page, COLUMN_COUNT, 0);
    const expected = ['American bison', 'Goat', 'Giraffe', 'Llama', 'Reindeer'];
    expect(matchArrayElements(actual, expected)).toBe(true);
  });
});
