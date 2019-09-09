/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

function getHeaderCellAtIndex(page, index) {
  return page.$(
    // plus one to convert to one indexed item
    `div[data-baseweb="data-table"] > div > div:nth-child(${index + 1})`,
  );
}

function getCellAtIndex(page, index) {
  // plus two to convert to one indexed item and skips header row
  return page.$(`div[data-baseweb="data-table"] > div:nth-child(${index + 2})`);
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
  return getTextContentFromElements(page, elements);
}

async function sortColumnAtIndex(page, index) {
  const headerCell = await getHeaderCellAtIndex(page, index);
  const sortButton = await headerCell.$('div[role="button"]');
  return sortButton.click();
}

function matchArrayElements(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

describe('data table columns', () => {
  jest.setTimeout(30 * 1000);
  it('passes basic a11y tests', async () => {
    await mount(page, 'data-table-columns');
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('renders expected number of cells', async () => {
    await mount(page, 'data-table-columns');
    await page.waitFor('div[data-baseweb="data-table"]');

    // one extra child to account for header row
    expect(
      await page.$eval(
        'div[data-baseweb="data-table"]',
        node => node.childNodes.length,
      ),
    ).toBe(17);
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
    await page.waitFor('div[data-baseweb="data-table"]');
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
    await page.waitFor('div[data-baseweb="data-table"]');
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
    await page.waitFor('div[data-baseweb="data-table"]');
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
  xit('filters categorical column', async () => {});
  xit('filters numerical column', async () => {
    // numerical column filter not implemented
  });

  it('renders tag after applying filter', async () => {});
  it('closing a filter restores filtered rows', async () => {});
});
