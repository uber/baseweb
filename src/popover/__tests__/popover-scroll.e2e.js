/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable flowtype/require-valid-file-annotation */
/* global window */

const {mount} = require('../../../e2e/helpers');

describe('popover scroll', () => {
  it('should maintain scroll position after not-focus-locked open', async () => {
    const container = '#case-not-focus-locked';
    const button = '#button-not-focus-locked';

    await mount(page, 'popover--scroll');
    await page.waitForSelector(container);

    const initialYOffset = await page.evaluate(() => window.pageYOffset);
    expect(initialYOffset).toBe(0);

    await page.waitForSelector(button);
    // puppeteer will scroll element into view on hover
    await page.hover(button);
    const beforeYOffset = await page.evaluate(() => window.pageYOffset);
    expect(beforeYOffset).toBeGreaterThan(0);
    await page.click(button);

    const afterYOffset = await page.evaluate(() => window.pageYOffset);
    expect(afterYOffset).toBe(beforeYOffset);
  });

  it('should maintain scroll position after focus-locked open', async () => {
    const container = '#case-focus-locked';
    const button = '#button-focus-locked';

    await mount(page, 'popover--scroll');
    await page.waitForSelector(container);

    const initialYOffset = await page.evaluate(() => window.pageYOffset);
    expect(initialYOffset).toBe(0);

    await page.waitForSelector(button);
    // puppeteer will scroll element into view on hover
    await page.hover(button);
    const beforeYOffset = await page.evaluate(() => window.pageYOffset);
    expect(beforeYOffset).toBeGreaterThan(0);
    await page.click(button);

    const afterYOffset = await page.evaluate(() => window.pageYOffset);
    expect(afterYOffset).toBe(beforeYOffset);
  });
});
