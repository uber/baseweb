/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

const TABLE_ROOT = 'div[data-baseweb="data-table"]';

function getHeaderCellAtIndex(page, index) {
  return page.$(
    // plus one to convert to one indexed item
    `${TABLE_ROOT} > div > div:nth-child(${index + 1})`,
  );
}

function getCellAtIndex(page, index) {
  // plus two to convert to one indexed item and skips header row
  return page.$(`${TABLE_ROOT} > div:nth-child(${index + 2})`);
}

function getCellsAtColumnIndex(page, index) {
  // hard-coded related column count for now. could be calcuated by number of children if scenario changes.
  const COLUMN_COUNT = 4;
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

async function sortColumnAtIndex(page, index) {
  const headerCell = await getHeaderCellAtIndex(page, index);
  const sortButton = await headerCell.$('div[role="button"]');
  return sortButton.click();
}

async function openFilterAtIndex(page, index) {
  const headerCell = await getHeaderCellAtIndex(page, index);
  await headerCell.hover();
  const hoveredHeaderCell = await getHeaderCellAtIndex(page, index);
  const filterButton = await hoveredHeaderCell.$('button');
  await filterButton.click();
  return page.$('div[data-baseweb="popover"]');
}

function matchArrayElements(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

describe('data table columns', () => {
  it('passes basic a11y tests', async () => {
    await mount(page, 'data-table-columns');
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('renders expected number of cells', async () => {
    await mount(page, 'data-table-columns');
    await page.waitFor(TABLE_ROOT);

    // one extra child to account for header row
    expect(await page.$eval(TABLE_ROOT, node => node.childNodes.length)).toBe(
      17,
    );
  });

  it('sorts boolean column', async () => {
    const index = 0;
    await mount(page, 'data-table-columns');
    await page.waitFor('div[data-baseweb="data-table"]');
    const initial = await getCellContentsAtColumnIndex(page, index);
    expect(matchArrayElements(initial, ['T', 'F', 'T', 'F'])).toBe(true);

    await sortColumnAtIndex(page, index);
    const desc = await getCellContentsAtColumnIndex(page, index);
    expect(matchArrayElements(desc, ['T', 'T', 'F', 'F'])).toBe(true);

    await sortColumnAtIndex(page, index);
    const asc = await getCellContentsAtColumnIndex(page, index);
    expect(matchArrayElements(asc, ['F', 'F', 'T', 'T'])).toBe(true);

    await sortColumnAtIndex(page, index);
    const restored = await getCellContentsAtColumnIndex(page, index);
    expect(matchArrayElements(initial, restored)).toBe(true);
  });

  it('sorts categorical column', async () => {
    const index = 1;
    await mount(page, 'data-table-columns');
    await page.waitFor(TABLE_ROOT);
    const initial = await getCellContentsAtColumnIndex(page, index);
    expect(matchArrayElements(initial, ['A', 'B', 'A', 'A'])).toBe(true);

    await sortColumnAtIndex(page, index);
    const desc = await getCellContentsAtColumnIndex(page, index);
    expect(matchArrayElements(desc, ['A', 'A', 'A', 'B'])).toBe(true);

    await sortColumnAtIndex(page, index);
    const asc = await getCellContentsAtColumnIndex(page, index);
    expect(matchArrayElements(asc, ['B', 'A', 'A', 'A'])).toBe(true);

    await sortColumnAtIndex(page, index);
    const restored = await getCellContentsAtColumnIndex(page, index);
    expect(matchArrayElements(initial, restored)).toBe(true);
  });

  it('sorts numerical column', async () => {
    const index = 2;
    await mount(page, 'data-table-columns');
    await page.waitFor(TABLE_ROOT);
    const initial = await getCellContentsAtColumnIndex(page, index);
    expect(matchArrayElements(initial, ['2', '1', '4', '3'])).toBe(true);

    await sortColumnAtIndex(page, index);
    const desc = await getCellContentsAtColumnIndex(page, index);
    expect(matchArrayElements(desc, ['4', '3', '2', '1'])).toBe(true);

    await sortColumnAtIndex(page, index);
    const asc = await getCellContentsAtColumnIndex(page, index);
    expect(matchArrayElements(asc, ['1', '2', '3', '4'])).toBe(true);

    await sortColumnAtIndex(page, index);
    const restored = await getCellContentsAtColumnIndex(page, index);
    expect(matchArrayElements(initial, restored)).toBe(true);
  });

  it('sorts string column', async () => {
    const index = 3;
    await mount(page, 'data-table-columns');
    await page.waitFor(TABLE_ROOT);
    const initial = await getCellContentsAtColumnIndex(page, index);
    expect(matchArrayElements(initial, ['one', 'two', 'three', 'four'])).toBe(
      true,
    );

    await sortColumnAtIndex(page, index);
    const desc = await getCellContentsAtColumnIndex(page, index);
    expect(matchArrayElements(desc, ['four', 'one', 'three', 'two'])).toBe(
      true,
    );

    await sortColumnAtIndex(page, index);
    const asc = await getCellContentsAtColumnIndex(page, index);
    expect(matchArrayElements(asc, ['two', 'three', 'one', 'four'])).toBe(true);

    await sortColumnAtIndex(page, index);
    const restored = await getCellContentsAtColumnIndex(page, index);
    expect(matchArrayElements(initial, restored)).toBe(true);
  });

  xit('filters boolean column', async () => {
    // boolean column filter not implemented
  });

  it('filters categorical column', async () => {
    const index = 1;
    await mount(page, 'data-table-columns');
    await page.waitFor(TABLE_ROOT);
    const initial = await getCellContentsAtColumnIndex(page, index);
    expect(matchArrayElements(initial, ['A', 'B', 'A', 'A'])).toBe(true);

    const popover = await openFilterAtIndex(page, index);
    const checkbox = await popover.$('label[data-baseweb="checkbox"]');
    await checkbox.click();
    const apply = await popover.$('button');
    await apply.click();

    const filtered = await getCellContentsAtColumnIndex(page, index);
    expect(matchArrayElements(filtered, ['A', 'A', 'A'])).toBe(true);

    const tag = await page.$('span[data-baseweb="tag"]');
    const closeTagButton = await tag.$('span[role="button"]');
    await closeTagButton.click();

    const restored = await getCellContentsAtColumnIndex(page, index);
    expect(matchArrayElements(restored, ['A', 'B', 'A', 'A'])).toBe(true);
  });

  xit('filters numerical column', async () => {
    // numerical column filter not implemented
  });
});
