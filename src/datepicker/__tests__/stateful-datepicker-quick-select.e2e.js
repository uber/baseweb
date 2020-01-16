/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount} = require('../../../e2e/helpers');

import {formatDate, subMonths} from '../utils/index.js';

const selectors = {
  input: 'input',
  calendar: '[data-baseweb="calendar"]',
  quickSelect: '[data-baseweb="select"]',
  quickSelectMenu: '[data-baseweb="menu"]',
  quickSelectPastMonth: '[data-baseweb="menu"] > li:nth-child(2)',
};

const NOW = new Date();
const FORMAT_STRING = 'yyyy/MM/dd';

describe('Stateful Datepicker Quick Select', () => {
  jest.retryTimes(3);

  beforeEach(async () => {
    await jestPuppeteer.resetPage();
  });

  it('can quick select with keyboard', async () => {
    await mount(page, 'stateful-datepicker-quick-select');
    await page.waitFor(selectors.input);
    await page.click(selectors.input);
    await page.waitFor(selectors.calendar);
    await page.click(selectors.quickSelect);
    await page.waitFor(selectors.quickSelectMenu);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    const selectedValue = await page.$eval(
      selectors.input,
      input => input.value,
    );

    expect(selectedValue).toBe(
      [subMonths(NOW, 1), NOW]
        .map(d => formatDate(d, FORMAT_STRING))
        .join(' – '),
    );
  });

  it('can quick select with mouse', async () => {
    await mount(page, 'stateful-datepicker-quick-select');
    await page.waitFor(selectors.input);
    await page.click(selectors.input);
    await page.waitFor(selectors.calendar);
    await page.click(selectors.quickSelect);
    await page.waitFor(selectors.quickSelectMenu);
    await page.click(selectors.quickSelectPastMonth);

    const selectedValue = await page.$eval(
      selectors.input,
      input => input.value,
    );

    expect(selectedValue).toBe(
      [subMonths(NOW, 1), NOW]
        .map(d => formatDate(d, FORMAT_STRING))
        .join(' – '),
    );
  });
});
