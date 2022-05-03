/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const { mount } = require('../../../e2e/helpers');

describe('select unmount blur', () => {
  it('onBlur callback properly handles unmounted component', async () => {
    await mount(page, 'select--unmount-blur');
    await page.click('button');
    await page.waitForSelector('[data-testid="select-container"]');
    await page.click('input');
    await page.waitForSelector('[role="listbox"]');

    // unmounts the select component when option selected
    await page.click('[role="option"]');
    await page.waitForSelector('[data-testid="select-container"]', {
      state: 'hidden',
    });

    await page.click('button');
    await page.waitForSelector('[data-testid="select-container"]');

    const value = await page.$eval('[data-testid="selected"]', (select) => select.textContent);
    expect(value).toBe('AliceBlue');
  });
});
