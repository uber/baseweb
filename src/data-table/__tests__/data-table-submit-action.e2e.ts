/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount, analyzeAccessibility } from '../../test/integration';
import { getTable, matchArrayElements } from './utilities';
import {
  clickCheckboxAtRowIndex,
  getCheckboxes,
  getCheckboxValues,
} from './data-table-batch-action.e2e';

test.describe('data-table submit-actions', () => {
  test('passes basic a11y tests', async ({ page }) => {
    await mount(page, 'data-table--submit-action');
    const accessibilityReport = await analyzeAccessibility(page, [
      { id: 'aria-hidden-focus', enabled: false },
    ]);

    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  test('renders submit buttons if submit actions are provided', async ({ page }) => {
    await mount(page, 'data-table--submit-action');
    const button = await page.$$('button[aria-label="Un-submit"]');
    expect(button.length).toBe(1);
  });

  test('renders checkboxes if submit actions are provided', async ({ page }) => {
    await mount(page, 'data-table--submit-action');
    const table = await getTable(page);
    const checkboxes = await getCheckboxes(table);
    expect(checkboxes.length).toBe(6);
  });

  test('does not hide search bar at selections if only submit actions are provided', async ({
    page,
  }) => {
    await mount(page, 'data-table--submit-action');
    const table = await getTable(page);
    const searchBar = await page.$$('input[aria-label="Search by text"]');
    expect(searchBar.length).toBe(1);
    await clickCheckboxAtRowIndex(table, 1);
    expect(searchBar.length).toBe(1);
  });

  test('calls submit action onClick with selected rows', async ({ page }) => {
    await mount(page, 'data-table--submit-action');

    expect(await page.isVisible('text=Submitted 0 rows')).toBe(true);
    expect(await page.isVisible('text=Submitted 1 rows')).toBe(false);

    const table = await getTable(page);
    await clickCheckboxAtRowIndex(table, 1);
    const button = await page.$('button:has-text("Submit")');
    await button.click();

    expect(await page.isVisible('text=Submitted 1 rows')).toBe(true);
    expect(await page.isVisible('text=Submitted 0 rows')).toBe(false);
  });

  test('submit action clearSelection clears selected rows', async ({ page }) => {
    await mount(page, 'data-table--submit-action');
    const table = await getTable(page);
    await clickCheckboxAtRowIndex(table, 1);

    const beforeActual = await getCheckboxValues(table);
    const beforeExpected = ['true', 'true', 'false', 'false', 'false', 'false'];
    expect(matchArrayElements(beforeActual, beforeExpected)).toBe(true);

    const button = await page.$('button:has-text("Submit")');
    await button.click();

    const afterActual = await getCheckboxValues(table);
    const afterExpected = ['false', 'false', 'false', 'false', 'false', 'false'];
    expect(matchArrayElements(afterActual, afterExpected)).toBe(true);
  });
});
