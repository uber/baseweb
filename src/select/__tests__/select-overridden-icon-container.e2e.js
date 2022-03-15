/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* global */
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const { mount } = require('../../../e2e/helpers/index.js');

describe('select overridden icon container', () => {
  it('does not call custom click handler on clear icon clicks on mobile', async () => {
    await mount(page, 'select--overridden-icon-container');

    const customIconSelector = '[data-testId="custom-icon"]';
    const countSelector = '[data-testId="click-count"]';

    async function getCount() {
      return page.evaluate((el) => el.textContent, await page.$(countSelector));
    }

    await page.waitForSelector(customIconSelector);
    expect(await getCount()).toBe('0');
    await page.tap(customIconSelector);
    expect(await getCount()).toBe('1');

    await page.waitForSelector('input');
    await page.tap('input');
    await page.waitForSelector('ul');
    await page.tap('li');

    await page.waitForSelector('[aria-label="Clear value"]');
    await page.tap('[aria-label="Clear value"]');
    expect(await getCount()).toBe('1');
  });
});
