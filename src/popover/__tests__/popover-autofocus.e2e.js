/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const { mount } = require('../../../e2e/helpers');

const { expect, test } = require('@playwright/test');

test.describe('popover', () => {
  test('contents are auto-focused but not focus-locked', async ({ page }) => {
    await mount(page, 'popover--auto-focus-without-focus-lock');

    await page.locator('button').click();
    const input = page.locator('input');
    await expect(input).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(input).not.toBeFocused();
  });
});
