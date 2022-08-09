/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount } from '../../test/integration';
import { sortColumnAtIndex, getActionButtonByLabel } from './utilities';

test.describe('data-table-row-actions', () => {
  test('renders provided row action buttons', async ({ page }) => {
    await mount(page, 'data-table--row-actions');
    await page.mouse.move(150, 327);
    const actionButtonOne = await getActionButtonByLabel(page, 'row-action-label-one');
    expect(actionButtonOne).toBeTruthy();

    const actionButtonTwo = await getActionButtonByLabel(page, 'row-action-label-two');
    expect(actionButtonTwo).toBeTruthy();
  });

  test('calls provided onclick function when clicked', async ({ browserName, page }) => {
    test.fixme(browserName === 'firefox', 'this feature fails in firefox');

    await mount(page, 'data-table--row-actions');
    await page.mouse.move(150, 327);
    const actionButton = await getActionButtonByLabel(page, 'row-action-label-one');
    await actionButton.click({ force: true });

    const listItems = page.locator('li');
    await expect(listItems).toHaveCount(1);
    await expect(listItems.first()).toHaveText('Finding Nemo');
  });

  test('calls onclick with correct row after sorting', async ({ browserName, page }) => {
    test.fixme(browserName === 'firefox', 'this feature fails in firefox');

    await mount(page, 'data-table--row-actions');
    await sortColumnAtIndex(page, 0);

    await page.mouse.move(150, 327);
    const actionButton = await getActionButtonByLabel(page, 'row-action-label-one');
    await actionButton.click({ force: true });
    await expect(page.locator('li').first()).toHaveText('Iron Man 3');
  });
});
