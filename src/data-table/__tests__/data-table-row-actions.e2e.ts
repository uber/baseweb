/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount } from '../../test/integration';
import { sortColumnAtIndex, TABLE_ROOT } from './utilities';

test.describe('data-table-row-actions', () => {
  test('renders provided row action buttons', async ({ page }) => {
    await mount(page, 'data-table--row-actions');
    const cell1x1 = page.locator(`${TABLE_ROOT} > div:nth-child(2)`);
    await cell1x1.hover();

    await expect(page.locator('button[title="row-action-label-one"]')).toBeVisible();
    await expect(page.locator('button[title="row-action-label-two"]')).toBeVisible();
  });

  test('calls provided onclick function when clicked', async ({ browserName, page }) => {
    test.fixme(browserName === 'firefox', 'this test is unreliable in firefox');

    await mount(page, 'data-table--row-actions');
    const cell1x1 = page.locator(`${TABLE_ROOT} > div:nth-child(2)`);
    await cell1x1.hover();

    const actionButton = page.locator('button[title="row-action-label-one"]');
    await actionButton.click({ force: true });

    const listItems = page.locator('li');
    await expect(listItems).toHaveCount(1);
    await expect(listItems.first()).toHaveText('Avatar');
  });

  test('calls onclick with correct row after sorting', async ({ browserName, page }) => {
    test.fixme(browserName === 'firefox', 'this test is unreliable in firefox');

    await mount(page, 'data-table--row-actions');
    await page.waitForSelector(TABLE_ROOT);

    // click twice to sort z - a
    await sortColumnAtIndex(page, 0);
    await sortColumnAtIndex(page, 0);

    const cell1x1 = page.locator(`${TABLE_ROOT} > div:nth-child(2)`);
    await cell1x1.hover();

    const actionButton = page.locator('button[title="row-action-label-one"]');
    await actionButton.click({ force: true });
    await expect(page.locator('li').first()).toHaveText('Zookeeper');
  });
});
