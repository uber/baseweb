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
    await page.waitForSelector('button');
    const button = await page.$('button');
    await button.click();

    await page.keyboard.press('a');
    const value = await page.$eval(SELECT_INPUT, (i) => i.value);
    expect(value).toBe('a');
  });
});
