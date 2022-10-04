/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount } from '../../test/integration';

test.describe('data table initial filters', () => {
  test('mounts with initial sort applied', async ({ page }) => {
    await mount(page, 'data-table--stateful-callback');

    const textQueryInput = page.locator('input').first();
    const filterMenuButton = page.locator('text=Add Filter');
    const filterMenuColumn = page.locator('li').locator('text=Order');
    const categoricalFilterOption = page.locator('label').locator('text=Crocodylia');
    const filterMenuApply = page.locator('text=Apply');
    const changeListItems = page.locator('ul#change-list').locator('li');
    const filterClearButton = page.locator('[title="Delete"]');
    const nameColumnHeader = page.locator('text=Name');

    await expect(changeListItems).toHaveCount(1);
    await textQueryInput.type('Alligator');
    await expect(changeListItems).toHaveCount(2);
    await filterMenuButton.click();
    await filterMenuColumn.click();
    await categoricalFilterOption.click();
    await filterMenuApply.click();
    await expect(changeListItems).toHaveCount(3);
    await filterClearButton.click();
    await expect(changeListItems).toHaveCount(4);
    await nameColumnHeader.click();
    await expect(changeListItems).toHaveCount(5);
    await nameColumnHeader.click();
    await expect(changeListItems).toHaveCount(6);
    await nameColumnHeader.click();
    await expect(changeListItems).toHaveCount(7);

    expect(await changeListItems.allTextContents()).toEqual([
      '{"textQuery":""}',
      '{"textQuery":"Alligator"}',
      '{"title":"Order","data":{"description":"Crocodylia","exclude":false,"selection":{}}}',
      '{"title":"Order"}',
      '{"sortIndex":0,"sortDirection":"ASC"}',
      '{"sortIndex":0,"sortDirection":"DESC"}',
      '{"sortIndex":-1,"sortDirection":"ASC"}',
    ]);
  });
});
