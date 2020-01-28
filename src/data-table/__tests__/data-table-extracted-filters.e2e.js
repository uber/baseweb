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

const COLUMN_COUNT = 6;

describe('data-table-extracted-filters', () => {
  it('applies expected filters to table', async () => {
    // windowed table excludes hidden cells. set to larger viewport
    // to display everything we need to get the column contents
    await page.setViewport({width: 1366, height: 1000});

    await mount(page, 'data-table-extracted-filters');
    await page.waitFor(TABLE_ROOT);
    const phylumFilter = await page.$('#Phylum-filter');
    const checkboxes = await phylumFilter.$$('label[data-baseweb="checkbox"');
    await checkboxes[1].click();
    await phylumFilter.$$eval('button', items => {
      const button = items.find(item => item.textContent === 'Apply');
      return button.click();
    });

    const actual = await getCellContentsAtColumnIndex(page, COLUMN_COUNT, 0);
    const expected = [
      'Weaver ant',
      'Hairy Hermit Crab',
      'Chans megastick',
      'Golden Stag Beetle',
      'russet mite',
      'Firefly',
      'Ringlet Butterfly',
      'European wasp',
      'Tarantula',
      'giant forest scorpions',
    ];
    expect(matchArrayElements(actual, expected)).toBe(true);
  });
});
