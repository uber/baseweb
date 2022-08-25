/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount } from '../../test/integration';

test.describe('data-table-row-actions-button', () => {
  test('renders provided row action buttons', async ({ page }) => {
    await mount(page, 'data-table--row-actions-button');

    // hover first row
    await page.mouse.move(150, 175);

    const a = await page.$('#hello');
    expect(a).toBeTruthy();

    const b = await page.$('#world');
    expect(b).toBeFalsy();

    // hover second row
    await page.mouse.move(150, 215);

    const c = await page.$('#hello');
    expect(c).toBeTruthy();

    const d = await page.$('#world');
    expect(d).toBeTruthy();
  });
});
