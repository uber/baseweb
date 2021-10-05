/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* global */
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount} = require('../../../e2e/helpers');

describe('setDropdownOpen', () => {
  it('opens and closes dropdown', async () => {
    await mount(page, 'select--methods');
    const openBtn = `#open`;
    const closeBtn = `#close`;

    await page.waitForSelector(openBtn);
    await page.waitForSelector(closeBtn);

    await page.click(openBtn);
    const listElems1 = await page.$$('li');
    expect(listElems1.length).toBe(3);

    // clicking 'open' a second time shouldn't change anything
    await page.click(openBtn);
    const listElems2 = await page.$$('li');
    expect(listElems2.length).toBe(3);

    await page.click(closeBtn);
    const listElems3 = await page.$$('li');
    expect(listElems3.length).toBe(0);

    await page.click(openBtn);
    await page.keyboard.press('Escape');
    await page.click(closeBtn);
    expect(listElems3.length).toBe(0);
  });
});
