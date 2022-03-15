/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const { mount } = require('../../../e2e/helpers');

const selectors = {
  input: 'input',
  calendar: '[data-baseweb="calendar"]',
  day: '[aria-label="Choose vasárnap, március 10. 2019. It\'s available."]',
  day2: '[aria-label="Choose csütörtök, március 28. 2019. It\'s available."]',
  monthYearSelectButton: '[data-id="monthYearSelectButton"]',
  monthYearSelectMenu: '[data-id="monthYearSelectMenu"]',
};

describe('Datepicker, Int', () => {
  it('selects range - int', async () => {
    await mount(page, 'datepicker--int-range');
    await page.waitForSelector(selectors.input);
    await page.click(selectors.input);
    await page.waitForSelector(selectors.calendar);
    await page.click(selectors.day);
    await page.waitForSelector(selectors.calendar);
    const selectedValue1 = await page.$eval(selectors.input, (input) => input.value);
    expect(selectedValue1).toBe('2019 vasárnap 10');
    await page.click(selectors.day2);
    await page.waitForSelector(selectors.calendar, {
      hidden: true,
    });
    const selectedValue2 = await page.$eval(selectors.input, (input) => input.value);
    expect(selectedValue2).toBe('2019 vasárnap 10 – 2019 csütörtök 28');
  });
});
