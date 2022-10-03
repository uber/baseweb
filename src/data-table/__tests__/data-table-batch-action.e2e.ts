/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount, analyzeAccessibility } from '../../test/integration';
import { getTableLocator, getCellContentsAtColumnIndex, matchArrayElements } from './utilities';

const COLUMN_COUNT = 2;

function getCheckboxes(parent) {
  return parent.locator('label[data-baseweb="checkbox"]');
}

async function clickCheckboxAtRowIndex(parent, index) {
  const checkboxes = await getCheckboxes(parent);
  await checkboxes.nth(index).click();
}

async function getCheckboxValues(parent) {
  const checkboxes = parent.locator('label[data-baseweb="checkbox"] input');

  // briefly wait to give table state chance to update
  await new Promise((res) => setTimeout(res, 50));
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

    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  test('renders checkboxes if batch actions are provided', async ({ page }) => {
    await mount(page, 'data-table--batch-action');
    const table = await getTableLocator(page);
    const checkboxes = table.locator('label[data-baseweb="checkbox"]');
    expect(checkboxes).toHaveCount(6);
  });

  test('checks row on selection', async ({ page }) => {
    await mount(page, 'data-table--batch-action');
    const table = await getTableLocator(page);
    const checkboxes = table.locator('label[data-baseweb="checkbox"]');
    await checkboxes.nth(1).click();
    await expect(checkboxes.nth(0)).toBeChecked();
    await expect(checkboxes.nth(1)).toBeChecked();
    await expect(checkboxes.nth(2)).not.toBeChecked();
    await expect(checkboxes.nth(3)).not.toBeChecked();
    await expect(checkboxes.nth(4)).not.toBeChecked();
    await expect(checkboxes.nth(5)).not.toBeChecked();
  });

  test('unchecks row on second selection', async ({ page }) => {
    await mount(page, 'data-table--batch-action');
    const table = await getTableLocator(page);
    const checkboxes = table.locator('label[data-baseweb="checkbox"]');
    await checkboxes.nth(1).click();
    await checkboxes.nth(1).click();
    await expect(checkboxes.nth(0)).not.toBeChecked();
    await expect(checkboxes.nth(1)).not.toBeChecked();
    await expect(checkboxes.nth(2)).not.toBeChecked();
    await expect(checkboxes.nth(3)).not.toBeChecked();
    await expect(checkboxes.nth(4)).not.toBeChecked();
    await expect(checkboxes.nth(5)).not.toBeChecked();
  });

  test('checks all rows on header selection', async ({ page }) => {
    await mount(page, 'data-table--batch-action');
    const table = await getTableLocator(page);
    const checkboxes = table.locator('label[data-baseweb="checkbox"]');
    await checkboxes.nth(0).click();
    await expect(checkboxes.nth(0)).toBeChecked();
    await expect(checkboxes.nth(1)).toBeChecked();
    await expect(checkboxes.nth(2)).toBeChecked();
    await expect(checkboxes.nth(3)).toBeChecked();
    await expect(checkboxes.nth(4)).toBeChecked();
    await expect(checkboxes.nth(5)).toBeChecked();
  });

  test('unchecks all rows on second header selection', async ({ page }) => {
    await mount(page, 'data-table--batch-action');
    const table = await getTableLocator(page);
    const checkboxes = table.locator('label[data-baseweb="checkbox"]');
    await checkboxes.nth(0).click();
    await checkboxes.nth(0).click();
    await expect(checkboxes.nth(0)).not.toBeChecked();
    await expect(checkboxes.nth(1)).not.toBeChecked();
    await expect(checkboxes.nth(2)).not.toBeChecked();
    await expect(checkboxes.nth(3)).not.toBeChecked();
    await expect(checkboxes.nth(4)).not.toBeChecked();
    await expect(checkboxes.nth(5)).not.toBeChecked();
  });

  test('unchecks all after row select, then header selection', async ({ page }) => {
    await mount(page, 'data-table--batch-action');
    const table = await getTableLocator(page);
    const checkboxes = table.locator('label[data-baseweb="checkbox"]');
    await checkboxes.nth(1).click();
    await checkboxes.nth(0).click();
    await expect(checkboxes.nth(0)).not.toBeChecked();
    await expect(checkboxes.nth(1)).not.toBeChecked();
    await expect(checkboxes.nth(2)).not.toBeChecked();
    await expect(checkboxes.nth(3)).not.toBeChecked();
    await expect(checkboxes.nth(4)).not.toBeChecked();
    await expect(checkboxes.nth(5)).not.toBeChecked();
  });

  test('does not check header if no rows in table', async ({ page }) => {
    await mount(page, 'data-table--batch-action');
    const table = await getTableLocator(page);
    const checkboxes = table.locator('label[data-baseweb="checkbox"]');
    await checkboxes.nth(0).click();

    const button = page.locator('button[aria-label="Approve"]');
    await button.click();

    await expect(checkboxes).toHaveCount(1);
    await expect(checkboxes.nth(0)).not.toBeChecked();
  });

  test('calls onSelectionChange on selection changes', async ({ page }) => {
    await mount(page, 'data-table--batch-action');
    const table = await getTableLocator(page);
    const checkboxes = table.locator('label[data-baseweb="checkbox"]');
    await checkboxes.nth(1).click();
    await checkboxes.nth(2).click();
    await checkboxes.nth(3).click();
    const count = page.locator('#selection-change-count');
    await expect(count).toHaveText('selection change count: 3');
  });

  test('avoids sort on header check', async ({ page }) => {
    const index = 0;
    await mount(page, 'data-table--batch-action');
    const table = await getTableLocator(page);
    const checkboxes = table.locator('label[data-baseweb="checkbox"]');

    const before = await getCellContentsAtColumnIndex(page, COLUMN_COUNT, index);
    expect(before).toEqual(['1', '2', '3', '4', '5']);

    await checkboxes.nth(0).click();
    const after = await getCellContentsAtColumnIndex(page, COLUMN_COUNT, index);
    expect(after).toEqual(['1', '2', '3', '4', '5']);
  });

  test('calls batch action onClick with selected rows', async ({ page }) => {
    await mount(page, 'data-table--batch-action');
    const table = await getTableLocator(page);
    const checkboxes = table.locator('label[data-baseweb="checkbox"]');
    await checkboxes.nth(1).click();

    const button = page.locator('button[aria-label="Approve"]');
    await button.click();

    expect(checkboxes).toHaveCount(5);
    await expect(checkboxes.nth(0)).not.toBeChecked();
    await expect(checkboxes.nth(1)).not.toBeChecked();
    await expect(checkboxes.nth(2)).not.toBeChecked();
    await expect(checkboxes.nth(3)).not.toBeChecked();
    await expect(checkboxes.nth(4)).not.toBeChecked();
  });

  test('batch action clearSelection clears selected rows', async ({ page }) => {
    await mount(page, 'data-table--batch-action');
    const table = await getTableLocator(page);
    const checkboxes = table.locator('label[data-baseweb="checkbox"]');
    await checkboxes.nth(1).click();

    await expect(checkboxes.nth(0)).toBeChecked();
    await expect(checkboxes.nth(1)).toBeChecked();
    await expect(checkboxes.nth(2)).not.toBeChecked();
    await expect(checkboxes.nth(3)).not.toBeChecked();
    await expect(checkboxes.nth(4)).not.toBeChecked();
    await expect(checkboxes.nth(5)).not.toBeChecked();

    const button = page.locator('button[aria-label="Flag"]');
    await button.click();

    await expect(checkboxes.nth(0)).not.toBeChecked();
    await expect(checkboxes.nth(1)).not.toBeChecked();
    await expect(checkboxes.nth(2)).not.toBeChecked();
    await expect(checkboxes.nth(3)).not.toBeChecked();
    await expect(checkboxes.nth(4)).not.toBeChecked();
    await expect(checkboxes.nth(5)).not.toBeChecked();
  });
});
