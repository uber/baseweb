/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount} = require('../../../e2e/helpers');

const TABLE_ROOT = 'div[data-baseweb="data-table"]';

function getCellAtIndex(page, index) {
  // plus two to convert to one indexed item and skips header row
  return page.$(`${TABLE_ROOT} > div:nth-child(${index + 2})`);
}

function getCellsAtColumnIndex(page, index) {
  // hard-coded related column count for now. could be calcuated by number of children if scenario changes.
  const COLUMN_COUNT = 6;
  const indices = [];
  for (let i = 0; i < COLUMN_COUNT; i++) {
    indices.push(i * COLUMN_COUNT + index);
  }
  return Promise.all(indices.map(i => getCellAtIndex(page, i)));
}

function getTextContentFromElements(page, elements) {
  return Promise.all(
    elements.map(element => {
      return page.evaluate(e => e.textContent, element);
    }),
  );
}

async function getCellContentsAtColumnIndex(page, index) {
  const elements = await getCellsAtColumnIndex(page, index);
  return getTextContentFromElements(page, elements.filter(Boolean));
}

function matchArrayElements(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function wait(ms) {
  return new Promise(res => setTimeout(res, ms));
}

describe('data table text search', () => {
  jest.setTimeout(10 * 1000);
  it('filters to expected number of rows', async () => {
    await mount(page, 'data-table-text-search');
    await page.waitFor(TABLE_ROOT);
    await page.type('input', 'arti');
    await wait(250); // input is debounced by 250ms

    const actual = await getCellContentsAtColumnIndex(page, 0);
    const expected = ['American bison', 'Goat', 'Giraffe', 'Llama', 'Reindeer'];
    expect(matchArrayElements(actual, expected)).toBe(true);
  });
});
