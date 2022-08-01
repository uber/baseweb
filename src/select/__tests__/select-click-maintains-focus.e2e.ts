/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount } from '../../test/integration';

const SELECT_INPUT = 'div[data-baseweb="select"] input';

function getActiveTag(page) {
  return page.evaluate(() => {
    const el = document.activeElement;
    if (el) {
      return el.tagName;
    }
  });
}

test.describe('select option click returns focus', () => {
  test('returns focus to select input after clicking option', async ({ page }) => {
    await mount(page, 'select--click-maintains-focus');
    await page.waitForSelector(SELECT_INPUT);

    const input = await page.$(SELECT_INPUT);
    await input.click();

    const beforeActiveTag = await getActiveTag(page);
    expect(beforeActiveTag).toBe('INPUT');

    await page.click('li');

    const afterActiveTag = await getActiveTag(page);
    expect(afterActiveTag).toBe('INPUT');
  });
});
