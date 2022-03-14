/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* global */
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const { mount } = require('../../../e2e/helpers');

const SELECT_INPUT = 'div[data-baseweb="select"] input';

describe('select option maintains input value after actions', () => {
  it('maintains input value after blur action', async () => {
    await mount(page, 'select--maintains-input-value');
    const selector = `#maintain-after-blur ${SELECT_INPUT}`;
    await page.waitForSelector(selector);
    const input = await page.$(selector);
    await input.type('a');
    await page.keyboard.press('Tab');
    const value = await page.$eval(selector, (i) => i.value);
    expect(value).toBe('a');
  });

  it('maintains input value after close action', async () => {
    await mount(page, 'select--maintains-input-value');
    const selector = `#maintain-after-close ${SELECT_INPUT}`;
    await page.waitForSelector(selector);
    const input = await page.$(selector);
    await input.type('a');
    await page.keyboard.press('Escape');
    const value = await page.$eval(selector, (i) => i.value);
    expect(value).toBe('a');
  });

  it('maintains input value after select action', async () => {
    await mount(page, 'select--maintains-input-value');
    const selector = `#maintain-after-select ${SELECT_INPUT}`;
    await page.waitForSelector(selector);
    const input = await page.$(selector);
    await input.type('a');
    await page.click('li');
    const value = await page.$eval(selector, (i) => i.value);
    expect(value).toBe('a');
  });

  it('maintains input value after any action', async () => {
    await mount(page, 'select--maintains-input-value');
    const selector = `#maintain-after-all ${SELECT_INPUT}`;
    await page.waitForSelector(selector);
    const input = await page.$(selector);

    await input.type('a');
    await page.keyboard.press('Tab');
    const blur = await page.$eval(selector, (i) => i.value);
    expect(blur).toBe('a');

    await input.focus();
    await input.type('b');
    await page.keyboard.press('Escape');
    const close = await page.$eval(selector, (i) => i.value);
    expect(close).toBe('ab');

    await page.keyboard.press('Backspace');
    await input.type('q');
    await page.click('li');
    const select = await page.$eval(selector, (i) => i.value);
    expect(select).toBe('aq');
  });
});
