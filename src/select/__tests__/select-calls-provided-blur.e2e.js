/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* global document */
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const { mount } = require('../../../e2e/helpers');

const SELECT_INPUT = 'div[data-baseweb="select"] input';

function getActiveTag(page) {
  return page.evaluate(() => {
    const el = document.activeElement;
    if (el) {
      return el.tagName;
    }
  });
}

describe('select option click returns focus', () => {
  it('calls provided blur function when another element is focused', async () => {
    await mount(page, 'select--calls-provided-blur');
    await page.waitForSelector(SELECT_INPUT);

    const input = await page.$(SELECT_INPUT);
    await input.click();

    const beforeActiveTag = await getActiveTag(page);
    expect(beforeActiveTag).toBe('INPUT');

    await page.keyboard.press('Tab');

    const afterActiveTag = await getActiveTag(page);
    expect(afterActiveTag).toBe('BUTTON');

    const p = await page.$('p');
    const blurCount = await page.evaluate((el) => el.textContent, p);
    expect(blurCount).toBe('1');
  });
});
