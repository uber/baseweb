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

test.describe('setDropdownOpen', () => {
  test('opens and closes dropdown with StatefulSelect', async ({ page }) => {
    await mount(page, 'select--control-ref-set-dropdown-open');
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
    await page.waitForSelector('li', { state: 'detached' });
    const listElems3 = await page.$$('li');
    expect(listElems3.length).toBe(0);

    await page.click(openBtn);
    await page.keyboard.press('Escape');

    await page.click(closeBtn);
    await page.waitForSelector('li', { state: 'detached' });
    const listElems4 = await page.$$('li');
    expect(listElems4.length).toBe(0);
  });

  test('opens and closes dropdown with Select', async ({ page }) => {
    await mount(page, 'select--control-ref-set-dropdown-open');
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
    await page.waitForSelector('li', { state: 'detached' });
    const listElems3 = await page.$$('li');
    expect(listElems3.length).toBe(0);

    await page.click(openBtn);
    await page.keyboard.press('Escape');

    await page.click(closeBtn);
    await page.waitForSelector('li', { state: 'detached' });
    const listElems4 = await page.$$('li');
    expect(listElems4.length).toBe(0);
  });
});

test.describe('setInputValue', () => {
  test('sets the input value', async ({ page }) => {
    await mount(page, 'select--control-ref-set-input-value');
    const input = '#inputValue';
    const setInputValue = `#setInputValueBtn`;
    const selected = '[data-id="selected"]';

    await page.waitForSelector(input);
    await page.waitForSelector(setInputValue);

    // 'apples' is pre-popluted in the input field, make sure that gets set correctly
    await page.click(setInputValue);
    const selectedValue = await page.$eval(selected, (select) => select.textContent);
    expect(selectedValue).toBe('apples');

    // let's type more text into the input field, make sure that gets set correctly
    await page.click(input);
    await page.keyboard.type(' and bananas');

    await page.click(setInputValue);
    const selectedValue2 = await page.$eval(selected, (select) => select.textContent);
    expect(selectedValue2).toBe('apples and bananas');
  });
});
