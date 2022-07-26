/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { test } from '@playwright/test';
import { mount } from '../../test/integration';

test.describe('toasts managed by application state', () => {
  test('only dismisses one toast', async ({ page }) => {
    await mount(page, 'toast--application-state');
    await page.waitForSelector('#test-container');

    await page.waitForSelector('[data-testid="0"]');
    await page.waitForSelector('[data-testid="1"]');
    await page.waitForSelector('[data-testid="2"]');

    const dismiss = await page.$('[data-testid="0"] [title="Close"]');
    await dismiss.click();

    await page.waitForSelector('[data-testid="0"]', { state: 'hidden' });
    await page.waitForSelector('[data-testid="1"]');
    await page.waitForSelector('[data-testid="2"]');
  });
});
