/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const { mount } = require('../../../e2e/helpers');

const { expect, test } = require('@playwright/test');

test.describe('popover-dynamic-triggertype', () => {
  test('hover opens/closes content by default', async ({ page }) => {
    await mount(page, 'popover--dynamic-trigger-type');
    await page.waitForSelector('button');

    await page.hover('button');
    await page.waitForSelector('#content-hover');

    await page.hover('#outside-target');
    await page.waitForSelector('#content-hover', { state: 'hidden' });
  });

  test('click opens/closes content', async ({ page }) => {
    await mount(page, 'popover--dynamic-trigger-type');
    await page.waitForSelector('button');

    await page.hover('button');
    await page.waitForSelector('#content-hover');

    await page.click('button');
    await page.waitForSelector('#content-click');

    await page.click('#outside-target');
    await page.waitForSelector('#content-click', { state: 'hidden' });
  });
});
