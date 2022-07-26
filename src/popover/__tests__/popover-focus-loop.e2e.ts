/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { test } from '@playwright/test';
import { mount } from '../../test/integration';

test.describe('popover', () => {
  test('hover trigger does not cause loop on click', async ({ page }) => {
    await mount(page, 'popover--focus-loop');
    await page.waitForSelector('button');
    await page.hover('button');
    await page.waitForSelector('div[data-e2e="content"]');

    await page.click('button');
    await page.waitForSelector('div[data-e2e="content"]', { hidden: false });
    await page.click('button');
    await page.waitForSelector('div[data-e2e="content"]', { hidden: false });

    await page.mouse.move(200, 200);
    await page.hover('button');
    await page.waitForSelector('div[data-e2e="content"]');
  });
});
