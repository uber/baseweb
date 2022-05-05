/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

// import { formatDate, subMonths } from '../utils/index.js';

const { mount } = require('../../../e2e/helpers');

const { expect, test } = require('@playwright/test');

const selectors = {
  input: 'input',
  calendar: '[data-baseweb="calendar"]',
  quickSelect: '[data-baseweb="select"]',
  quickSelectMenu: '[data-baseweb="menu"]',
  quickSelectPastMonth: '[data-baseweb="menu"] > li:nth-child(2)',
};

const NOW = new Date();
const FORMAT_STRING = 'yyyy/MM/dd';

test.describe('Stateful Datepicker Quick Select', () => {
  test('can quick select with keyboard', async ({ page }) => {
    // await mount(page, 'datepicker--stateful-quick-select');
    // await page.waitForSelector(selectors.input);
    // await page.click(selectors.input);
    // await page.waitForSelector(selectors.calendar);
    // await page.click(selectors.quickSelect);
    // await page.waitForSelector(selectors.quickSelectMenu);
    // await page.keyboard.press('ArrowDown');
    // await page.keyboard.press('Enter');
    // const selectedValue = await page.$eval(selectors.input, (input) => input.value);
    // expect(selectedValue).toBe(
    //   [subMonths(NOW, 1), NOW].map((d) => formatDate(d, FORMAT_STRING)).join(' – ')
    // );
  });

  test('can quick select with mouse', async ({ page }) => {
    // await mount(page, 'datepicker--stateful-quick-select');
    // await page.waitForSelector(selectors.input);
    // await page.click(selectors.input);
    // await page.waitForSelector(selectors.calendar);
    // await page.click(selectors.quickSelect);
    // await page.waitForSelector(selectors.quickSelectMenu);
    // await page.click(selectors.quickSelectPastMonth);
    // const selectedValue = await page.$eval(selectors.input, (input) => input.value);
    // expect(selectedValue).toBe(
    //   [subMonths(NOW, 1), NOW].map((d) => formatDate(d, FORMAT_STRING)).join(' – ')
    // );
  });
});
