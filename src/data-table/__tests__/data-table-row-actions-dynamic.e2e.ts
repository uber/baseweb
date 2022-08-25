/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount } from '../../test/integration';
import { getActionButtonByLabel } from './utilities';

test.describe('data-table-row-actions-dynamic', () => {
  test('renders provided row action buttons', async ({ page }) => {
    await mount(page, 'data-table--row-actions-dynamic');

    // hover first row
    await page.mouse.move(150, 175);

    const a = await getActionButtonByLabel(page, 'stable-action-icon');
    expect(a).toBeTruthy();

    const b = await getActionButtonByLabel(page, 'dynamic-action-icon');
    expect(b).toBeFalsy();

    // hover second row
    await page.mouse.move(150, 215);

    const c = await getActionButtonByLabel(page, 'stable-action-icon');
    expect(c).toBeTruthy();

    const d = await getActionButtonByLabel(page, 'dynamic-action-icon');
    expect(d).toBeTruthy();
  });
});
