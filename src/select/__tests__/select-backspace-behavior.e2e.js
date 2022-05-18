/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* global */
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const { mount } = require('../../../e2e/helpers');

const { expect, test } = require('@playwright/test');

const SELECT_INPUT = 'div[data-baseweb="select"] input';

test.describe('select backspace works as expected', () => {
  test('backspace one character', async ({ page }) => {
    await mount(page, 'select--backspace-behavior');
    const selector = `#backspace-behavior ${SELECT_INPUT}`;
    await page.waitForSelector(selector);
    const input = await page.$(selector);

    // Select AliceBlue
    await input.type('a');
    await page.keyboard.press('Enter');

    // Backspace on AliceBlue
    await page.keyboard.press('Backspace');
    const backspaced = await page.$eval(selector, (i) => i.value);
    expect(backspaced).toBe('AliceBlu');
  });

  test('backspace clears input value', async ({ page }) => {
    await mount(page, 'select--backspace-behavior');
    const selector = `#backspace-clears-input-value ${SELECT_INPUT}`;
    await page.waitForSelector(selector);
    const input = await page.$(selector);

    // Select AliceBlue
    await input.type('a');
    await page.keyboard.press('Enter');

    // Backspace on AliceBlue
    await page.keyboard.press('Backspace');
    const backspaced = await page.$eval(selector, (i) => i.value);
    expect(backspaced).toBe('');
  });
});
