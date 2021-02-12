/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount} = require('../../../e2e/helpers');

describe('popover', () => {
  it('hover trigger does not cause loop on click', async () => {
    await mount(page, 'popover--focus-loop');
    await page.waitForSelector('button');
    await page.hover('button');
    await page.waitForSelector('div[data-e2e="content"]');

    await page.click('button');
    await page.waitForSelector('div[data-e2e="content"]', {hidden: true});
    await page.click('button');
    await page.waitForSelector('div[data-e2e="content"]', {hidden: true});

    await page.mouse.move(200, 200);
    await page.hover('button');
    await page.waitForSelector('div[data-e2e="content"]');
  });
});
