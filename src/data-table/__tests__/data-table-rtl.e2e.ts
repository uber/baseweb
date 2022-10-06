/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount } from '../../test/integration';
import { TABLE_ROOT } from './utilities';

test.describe('data-table-rtl', () => {
  test('renders column cells in RTL order', async ({ page }) => {
    await mount(page, 'data-table--test-rtl', 'light', true);
    const cell1x1 = page.locator(`${TABLE_ROOT} > div:nth-child(2)`);
    await expect(cell1x1).toHaveCSS('right', '0px');
  });

  test('action row in RTL order', async ({ page }) => {
    await mount(page, 'data-table--test-rtl', 'light', true);
    const cell1x1 = page.locator(`${TABLE_ROOT} > div:nth-child(2)`);
    await cell1x1.hover();
    const actionRow = page.locator(`${TABLE_ROOT} > div:last-child`);
    await expect(actionRow).toHaveCSS('left', '0px');
  });
});
