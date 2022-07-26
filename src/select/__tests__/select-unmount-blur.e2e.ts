/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount } from '../../test/integration';

test.describe('select unmount blur', () => {
  test('onBlur callback properly handles unmounted component', async ({ page }) => {
    await mount(page, 'select--unmount-blur');
    await page.click('button');
    await page.waitForSelector('[data-testid="select-container"]');
    await page.click('input');
    await page.waitForSelector('[role="listbox"]');

    // unmounts the select component when option selected
    await page.click('[role="option"]');
    await page.waitForSelector('[data-testid="select-container"]', {
      state: 'hidden',
    });

    await page.click('button');
    await page.waitForSelector('[data-testid="select-container"]');

    const value = await page.$eval('[data-testid="selected"]', (select) => select.textContent);
    expect(value).toBe('AliceBlue');
  });
});
