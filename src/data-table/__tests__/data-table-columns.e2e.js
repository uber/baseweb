/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

const {
  TABLE_ROOT,
  getCellContentsAtColumnIndex,
  sortColumnAtIndex,
  openFilterAtIndex,
  matchArrayElements,
} = require('./utilities.js');

const COLUMN_COUNT = 4;

describe('data table columns', () => {
  it('passes basic a11y tests', async () => {
    await mount(page, 'data-table-columns');
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('sorts boolean column', async () => {
    const index = 0;
    await mount(page, 'data-table-columns');
    await page.waitFor('div[data-baseweb="data-table"]');
    const initial = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(initial, ['T', 'F', 'T', 'F'])).toBe(true);

    await sortColumnAtIndex(page, index);
    const desc = await getCellContentsAtColumnIndex(page, COLUMN_COUNT, index);
    expect(matchArrayElements(desc, ['T', 'T', 'F', 'F'])).toBe(true);

    await sortColumnAtIndex(page, index);
    const asc = await getCellContentsAtColumnIndex(page, COLUMN_COUNT, index);
    expect(matchArrayElements(asc, ['F', 'F', 'T', 'T'])).toBe(true);

    await sortColumnAtIndex(page, index);
    const restored = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(initial, restored)).toBe(true);
  });

  it('sorts categorical column', async () => {
    const index = 1;
    await mount(page, 'data-table-columns');
    await page.waitFor(TABLE_ROOT);
    const initial = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(initial, ['A', 'B', 'A', 'A'])).toBe(true);

    await sortColumnAtIndex(page, index);
    const desc = await getCellContentsAtColumnIndex(page, COLUMN_COUNT, index);
    expect(matchArrayElements(desc, ['A', 'A', 'A', 'B'])).toBe(true);

    await sortColumnAtIndex(page, index);
    const asc = await getCellContentsAtColumnIndex(page, COLUMN_COUNT, index);
    expect(matchArrayElements(asc, ['B', 'A', 'A', 'A'])).toBe(true);

    await sortColumnAtIndex(page, index);
    const restored = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(initial, restored)).toBe(true);
  });

  it('sorts numerical column', async () => {
    const index = 2;
    await mount(page, 'data-table-columns');
    await page.waitFor(TABLE_ROOT);
    const initial = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(initial, ['2', '1', '4', '3'])).toBe(true);

    await sortColumnAtIndex(page, index);
    const desc = await getCellContentsAtColumnIndex(page, COLUMN_COUNT, index);
    expect(matchArrayElements(desc, ['4', '3', '2', '1'])).toBe(true);

    await sortColumnAtIndex(page, index);
    const asc = await getCellContentsAtColumnIndex(page, COLUMN_COUNT, index);
    expect(matchArrayElements(asc, ['1', '2', '3', '4'])).toBe(true);

    await sortColumnAtIndex(page, index);
    const restored = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(initial, restored)).toBe(true);
  });

  it('sorts string column', async () => {
    const index = 3;
    await mount(page, 'data-table-columns');
    await page.waitFor(TABLE_ROOT);
    const initial = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(initial, ['one', 'two', 'three', 'four'])).toBe(
      true,
    );

    await sortColumnAtIndex(page, index);
    await page.waitFor(150);
    const desc = await getCellContentsAtColumnIndex(page, COLUMN_COUNT, index);
    expect(matchArrayElements(desc, ['four', 'one', 'three', 'two'])).toBe(
      true,
    );

    await sortColumnAtIndex(page, index);
    await page.waitFor(150);
    const asc = await getCellContentsAtColumnIndex(page, COLUMN_COUNT, index);
    expect(matchArrayElements(asc, ['two', 'three', 'one', 'four'])).toBe(true);

    await sortColumnAtIndex(page, index);
    const restored = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(initial, restored)).toBe(true);
  });

  it('filters boolean column', async () => {
    const index = 0;
    await mount(page, 'data-table-columns');
    await page.waitFor(TABLE_ROOT);
    const initial = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(initial, ['T', 'F', 'T', 'F'])).toBe(true);

    const popover = await openFilterAtIndex(page, index);
    const checkbox = await popover.$('label[data-baseweb="checkbox"]');
    await checkbox.click();
    await popover.$$eval('button', items => {
      const button = items.find(item => item.textContent === 'Apply');
      return button.click();
    });

    const filtered = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(filtered, ['T', 'T'])).toBe(true);

    const tag = await page.$('span[data-baseweb="tag"]');
    const closeTagButton = await tag.$('span[role="button"]');
    await closeTagButton.click();

    const restored = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(restored, ['T', 'F', 'T', 'F'])).toBe(true);
  });

  it('filters categorical column', async () => {
    const index = 1;
    await mount(page, 'data-table-columns');
    await page.waitFor(TABLE_ROOT);
    const initial = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(initial, ['A', 'B', 'A', 'A'])).toBe(true);

    const popover = await openFilterAtIndex(page, index);
    const checkbox = await popover.$('label[data-baseweb="checkbox"]');
    await checkbox.click();
    await popover.$$eval('button', items => {
      const button = items.find(item => item.textContent === 'Apply');
      return button.click();
    });

    const filtered = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(filtered, ['A', 'A', 'A'])).toBe(true);

    const tag = await page.$('span[data-baseweb="tag"]');
    const closeTagButton = await tag.$('span[role="button"]');
    await closeTagButton.click();

    const restored = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(restored, ['A', 'B', 'A', 'A'])).toBe(true);
  });

  it('filters numerical column as single value', async () => {
    const index = 2;
    await mount(page, 'data-table-columns');
    await page.waitFor(TABLE_ROOT);
    const initial = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(initial, ['2', '1', '4', '3'])).toBe(true);

    const popover = await openFilterAtIndex(page, index);
    await popover.$$eval('button', items => {
      const button = items.find(item => item.textContent === 'Single Value');
      return button.click();
    });

    await page.keyboard.press('Backspace');
    await page.type('div[data-baseweb="popover"] input', '2');
    await popover.$$eval('button', items => {
      const button = items.find(item => item.textContent === 'Apply');
      return button.click();
    });

    const filtered = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(filtered, ['2'])).toBe(true);

    const tag = await page.$('span[data-baseweb="tag"]');
    const closeTagButton = await tag.$('span[role="button"]');
    await closeTagButton.click();

    const restored = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(restored, ['2', '1', '4', '3'])).toBe(true);
  });

  it('filters numerical column between case', async () => {
    const index = 2;
    await mount(page, 'data-table-columns');
    await page.waitFor(TABLE_ROOT);
    const initial = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(initial, ['2', '1', '4', '3'])).toBe(true);

    const popover = await openFilterAtIndex(page, index);
    const buttons = await popover.$$('button');
    const betweenButton = buttons[6];
    await betweenButton.click();

    const inputs = await popover.$$('div[data-baseweb="popover"] input');
    await inputs[0].click();
    await page.keyboard.press('Backspace');
    await inputs[0].type('2');

    await inputs[1].click();
    await page.keyboard.press('Backspace');
    await inputs[1].type('3');

    await popover.$$eval('button', items => {
      const button = items.find(item => item.textContent === 'Apply');
      return button.click();
    });

    const filtered = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(filtered, ['2', '3'])).toBe(true);
  });

  it('filters numerical column excludes between case', async () => {
    const index = 2;
    await mount(page, 'data-table-columns');
    await page.waitFor(TABLE_ROOT);
    const initial = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(initial, ['2', '1', '4', '3'])).toBe(true);

    const popover = await openFilterAtIndex(page, index);
    const buttons = await popover.$$('button');
    const betweenButton = buttons[6];
    await betweenButton.click();

    const inputs = await popover.$$('div[data-baseweb="popover"] input');
    await inputs[0].click();
    await page.keyboard.press('Backspace');
    await inputs[0].type('2');

    await inputs[1].click();
    await page.keyboard.press('Backspace');
    await inputs[1].type('3');

    const exclude = await popover.$('label[data-baseweb="checkbox"]');
    await exclude.click();

    await popover.$$eval('button', items => {
      const button = items.find(item => item.textContent === 'Apply');
      return button.click();
    });

    const filtered = await getCellContentsAtColumnIndex(
      page,
      COLUMN_COUNT,
      index,
    );
    expect(matchArrayElements(filtered, ['1', '4'])).toBe(true);
  });
});
