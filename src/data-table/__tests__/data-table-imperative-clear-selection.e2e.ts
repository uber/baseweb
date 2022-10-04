/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount } from '../../test/integration';
import { getCellContentsAtColumnIndex } from './utilities';

const COLUMN_COUNT = 2;

test.describe('data-table imperative clear selection', () => {
  test('clears selection outside of batch action', async ({ page }) => {
    await mount(page, 'data-table--imperative-clear-selection');
    const batchActionRemoveButton = page.locator('text=Remove selected rows');
    const rowActionRemoveButton = page.locator('button[title="Remove row"]');
    const firstRowCheckbox = page.locator('[data-baseweb="checkbox"]').nth(1);

    await expect(batchActionRemoveButton).toBeHidden();
    await expect(rowActionRemoveButton).toBeHidden();
    const initialActual = await getCellContentsAtColumnIndex(page, COLUMN_COUNT, 0);
    const initialExpected = ['1', '2', '3', '4', '5'];
    expect(initialActual).toEqual(initialExpected);

    await firstRowCheckbox.click();
    await batchActionRemoveButton.click();
    await expect(batchActionRemoveButton).toBeHidden();
    const batchActual = await getCellContentsAtColumnIndex(page, COLUMN_COUNT, 0);
    expect(batchActual.slice(0, 4)).toEqual(initialExpected.slice(1));

    await firstRowCheckbox.click();
    await expect(batchActionRemoveButton).toBeVisible();
    await rowActionRemoveButton.click();
    const rowActual = await getCellContentsAtColumnIndex(page, COLUMN_COUNT, 0);
    expect(rowActual.slice(0, 3)).toEqual(initialExpected.slice(2));
  });
});
