/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount } from '../../test/integration';

const SELECT_INPUT = 'div[data-baseweb="select"] input';

test.describe('inputRef prop', () => {
  test('can get a reference to the select input element', async ({ page }) => {
    await mount(page, 'select--input-ref');

    // clicking on button will focus the input
    await page.locator('button').click();
    await page.keyboard.press('a');
    await expect(page.locator(SELECT_INPUT)).toHaveValue('a');
  });
});
