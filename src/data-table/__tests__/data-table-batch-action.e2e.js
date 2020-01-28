/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

const {getTable} = require('./utilities.js');

function getCheckboxes(parent) {
  return parent.$$('label[data-baseweb="checkbox"]');
}

async function clickCheckboxAtRowIndex(parent, index) {
  const checkboxes = await getCheckboxes(parent);
  await checkboxes[index].click();
}

function wait(ms) {
  return new Promise(res => setTimeout(res, ms));
}

async function getCheckboxValues(element) {
  await wait(50); // breifly wait to give table state chance to update
  return element.$$eval('label[data-baseweb="checkbox"] input', elements =>
    elements.map(el => el.checked),
  );
}

function matchArrayElements(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

describe('data-table batch-actions', () => {
  it('passes basic a11y tests', async () => {
    await mount(page, 'data-table-columns');
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('renders checkboxes if batch actions are provided', async () => {
    await mount(page, 'data-table-batch-action');
    const table = await getTable(page);
    const checkboxes = await getCheckboxes(table);
    expect(checkboxes.length).toBe(6);
  });

  it('checks row on selection', async () => {
    await mount(page, 'data-table-batch-action');
    const table = await getTable(page);
    await clickCheckboxAtRowIndex(table, 1);
    const actual = await getCheckboxValues(table);
    const expected = [true, true, false, false, false, false];
    expect(matchArrayElements(actual, expected)).toBe(true);
  });

  it('unchecks row on second selection', async () => {
    await mount(page, 'data-table-batch-action');
    const table = await getTable(page);
    await clickCheckboxAtRowIndex(table, 1);
    await clickCheckboxAtRowIndex(table, 1);
    const actual = await getCheckboxValues(table);
    const expected = [false, false, false, false, false, false];
    expect(matchArrayElements(actual, expected)).toBe(true);
  });

  it('checks all rows on header selection', async () => {
    await mount(page, 'data-table-batch-action');
    const table = await getTable(page);
    await clickCheckboxAtRowIndex(table, 0);
    const actual = await getCheckboxValues(table);
    const expected = [true, true, true, true, true, true];
    expect(matchArrayElements(actual, expected)).toBe(true);
  });

  it('unchecks all rows on second header selection', async () => {
    await mount(page, 'data-table-batch-action');
    const table = await getTable(page);
    await clickCheckboxAtRowIndex(table, 0);
    await clickCheckboxAtRowIndex(table, 0);
    const actual = await getCheckboxValues(table);
    const expected = [false, false, false, false, false, false];
    expect(matchArrayElements(actual, expected)).toBe(true);
  });

  it('unchecks all after row select, then header selection', async () => {
    await mount(page, 'data-table-batch-action');
    const table = await getTable(page);
    await clickCheckboxAtRowIndex(table, 1);
    await clickCheckboxAtRowIndex(table, 0);
    const actual = await getCheckboxValues(table);
    const expected = [false, false, false, false, false, false];
    expect(matchArrayElements(actual, expected)).toBe(true);
  });

  it('does not check header if no rows in table', async () => {
    await mount(page, 'data-table-batch-action');
    const table = await getTable(page);
    await clickCheckboxAtRowIndex(table, 0);

    const button = await page.$('button[aria-label="Approve"]');
    await button.click();

    const actual = await getCheckboxValues(table);
    const expected = [false];
    expect(matchArrayElements(actual, expected)).toBe(true);
  });

  it('calls onSelectionChange on selection changes', async () => {
    await mount(page, 'data-table-batch-action');
    const table = await getTable(page);
    await clickCheckboxAtRowIndex(table, 1);
    await clickCheckboxAtRowIndex(table, 2);
    await clickCheckboxAtRowIndex(table, 3);
    const count = await page.$eval(
      '#selection-change-count',
      el => el.textContent,
    );
    expect(count).toBe('selection change count: 3');
  });

  it('calls batch action onClick with selected rows', async () => {
    await mount(page, 'data-table-batch-action');
    const table = await getTable(page);
    await clickCheckboxAtRowIndex(table, 1);

    const button = await page.$('button[aria-label="Approve"]');
    await button.click();

    const actual = await getCheckboxValues(table);
    const expected = [false, false, false, false, false];
    expect(matchArrayElements(actual, expected)).toBe(true);
  });

  it('batch action clearSelection clears selected rows', async () => {
    await mount(page, 'data-table-batch-action');
    const table = await getTable(page);
    await clickCheckboxAtRowIndex(table, 1);

    const beforeActual = await getCheckboxValues(table);
    const beforeExpected = [true, true, false, false, false, false];
    expect(matchArrayElements(beforeActual, beforeExpected)).toBe(true);

    const button = await page.$('button[aria-label="Flag"]');
    await button.click();

    const afterActual = await getCheckboxValues(table);
    const afterExpected = [false, false, false, false, false, false];
    expect(matchArrayElements(afterActual, afterExpected)).toBe(true);
  });
});
