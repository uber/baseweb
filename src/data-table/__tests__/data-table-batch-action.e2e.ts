/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount, analyzeAccessibility } from '../../test/integration';
import { getTable, getCellContentsAtColumnIndex, matchArrayElements } from './utilities';

const COLUMN_COUNT = 2;

function getCheckboxes(parent) {
  return parent.$$('label[data-baseweb="checkbox"]');
}

async function clickCheckboxAtRowIndex(parent, index) {
  const checkboxes = await getCheckboxes(parent);
  await checkboxes[index].click();
}

function wait(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function getCheckboxValues(element) {
  await wait(50); // briefly wait to give table state chance to update
  return element.$$eval('label[data-baseweb="checkbox"] input', (elements) =>
    elements.map((el) => String(el.checked))
  );
}

test.describe('data-table batch-actions', () => {
  test('passes basic a11y tests', async ({ page }) => {
    await mount(page, 'data-table--columns');
    const accessibilityReport = await analyzeAccessibility(page, [
      { id: 'aria-hidden-focus', enabled: false },
    ]);
    // @ts-expect-error todo(starr): unsure how to fix
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  test('renders checkboxes if batch actions are provided', async ({ page }) => {
    await mount(page, 'data-table--batch-action');
    const table = await getTable(page);
    const checkboxes = await getCheckboxes(table);
    expect(checkboxes.length).toBe(6);
  });

  test('checks row on selection', async ({ page }) => {
    await mount(page, 'data-table--batch-action');
    const table = await getTable(page);
    await clickCheckboxAtRowIndex(table, 1);
    const actual = await getCheckboxValues(table);
    const expected = ['true', 'true', 'false', 'false', 'false', 'false'];
    expect(matchArrayElements(actual, expected)).toBe(true);
  });

  test('unchecks row on second selection', async ({ page }) => {
    await mount(page, 'data-table--batch-action');
    const table = await getTable(page);
    await clickCheckboxAtRowIndex(table, 1);
    await clickCheckboxAtRowIndex(table, 1);
    const actual = await getCheckboxValues(table);
    const expected = ['false', 'false', 'false', 'false', 'false', 'false'];
    expect(matchArrayElements(actual, expected)).toBe(true);
  });

  test('checks all rows on header selection', async ({ page }) => {
    await mount(page, 'data-table--batch-action');
    const table = await getTable(page);
    await clickCheckboxAtRowIndex(table, 0);
    const actual = await getCheckboxValues(table);
    const expected = ['true', 'true', 'true', 'true', 'true', 'true'];
    expect(matchArrayElements(actual, expected)).toBe(true);
  });

  test('unchecks all rows on second header selection', async ({ page }) => {
    await mount(page, 'data-table--batch-action');
    const table = await getTable(page);
    await clickCheckboxAtRowIndex(table, 0);
    await clickCheckboxAtRowIndex(table, 0);
    const actual = await getCheckboxValues(table);
    const expected = ['false', 'false', 'false', 'false', 'false', 'false'];
    expect(matchArrayElements(actual, expected)).toBe(true);
  });

  test('unchecks all after row select, then header selection', async ({ page }) => {
    await mount(page, 'data-table--batch-action');
    const table = await getTable(page);
    await clickCheckboxAtRowIndex(table, 1);
    await clickCheckboxAtRowIndex(table, 0);
    const actual = await getCheckboxValues(table);
    const expected = ['false', 'false', 'false', 'false', 'false', 'false'];
    expect(matchArrayElements(actual, expected)).toBe(true);
  });

  test('does not check header if no rows in table', async ({ page }) => {
    await mount(page, 'data-table--batch-action');
    const table = await getTable(page);
    await clickCheckboxAtRowIndex(table, 0);

    const button = await page.$('button[aria-label="Approve"]');
    await button.click();

    const actual = await getCheckboxValues(table);
    const expected = ['false'];
    expect(matchArrayElements(actual, expected)).toBe(true);
  });

  test('calls onSelectionChange on selection changes', async ({ page }) => {
    await mount(page, 'data-table--batch-action');
    const table = await getTable(page);
    await clickCheckboxAtRowIndex(table, 1);
    await clickCheckboxAtRowIndex(table, 2);
    await clickCheckboxAtRowIndex(table, 3);
    const count = await page.$eval('#selection-change-count', (el) => el.textContent);
    expect(count).toBe('selection change count: 3');
  });

  test('avoids sort on header check', async ({ page }) => {
    const index = 0;
    await mount(page, 'data-table--batch-action');
    const table = await getTable(page);

    const before = await getCellContentsAtColumnIndex(page, COLUMN_COUNT, index);
    expect(matchArrayElements(before, ['1', '2', '3', '4', '5'])).toBe(true);

    await clickCheckboxAtRowIndex(table, 0);
    const after = await getCellContentsAtColumnIndex(page, COLUMN_COUNT, index);
    expect(matchArrayElements(after, ['1', '2', '3', '4', '5'])).toBe(true);
  });

  test('calls batch action onClick with selected rows', async ({ page }) => {
    await mount(page, 'data-table--batch-action');
    const table = await getTable(page);
    await clickCheckboxAtRowIndex(table, 1);

    const button = await page.$('button[aria-label="Approve"]');
    await button.click();

    const actual = await getCheckboxValues(table);
    const expected = ['false', 'false', 'false', 'false', 'false'];
    expect(matchArrayElements(actual, expected)).toBe(true);
  });

  test('batch action clearSelection clears selected rows', async ({ page }) => {
    await mount(page, 'data-table--batch-action');
    const table = await getTable(page);
    await clickCheckboxAtRowIndex(table, 1);

    const beforeActual = await getCheckboxValues(table);
    const beforeExpected = ['true', 'true', 'false', 'false', 'false', 'false'];
    expect(matchArrayElements(beforeActual, beforeExpected)).toBe(true);

    const button = await page.$('button[aria-label="Flag"]');
    await button.click();

    const afterActual = await getCheckboxValues(table);
    const afterExpected = ['false', 'false', 'false', 'false', 'false', 'false'];
    expect(matchArrayElements(afterActual, afterExpected)).toBe(true);
  });
});
