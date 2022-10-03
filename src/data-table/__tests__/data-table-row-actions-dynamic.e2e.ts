/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount } from '../../test/integration';

const COLUMN_COUNT = 2;

test.describe('data-table-row-actions-dynamic', () => {
  test('renders provided row action buttons', async ({ page }) => {
    await mount(page, 'data-table--row-actions-dynamic');

    const stable = page.locator('button[title="stable-action-icon"]');
    const dynamic = page.locator('button[title="dynamic-action-icon"]');

    expect(stable).toBeHidden();
    expect(dynamic).toBeHidden();

    await page.locator('text=1').first().hover();
    expect(stable).toBeVisible();
    expect(dynamic).toBeHidden();

    await page.locator('text=2').first().hover();
    expect(stable).toBeVisible();
    expect(dynamic).toBeVisible();
  });
});
