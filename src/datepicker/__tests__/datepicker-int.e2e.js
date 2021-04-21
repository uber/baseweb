/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount} = require('../../../e2e/helpers');

const selectors = {
  input: 'input',
  calendar: '[data-baseweb="calendar"]',
  day: '[aria-label="Selected. kedd, március 31. 2020. It\'s available."]',
};

describe('Datepicker, Int', () => {
  it('parses input with formatString', async () => {
    await mount(page, 'datepicker--int');
    await page.waitForSelector(selectors.input);
    await page.click(selectors.input);

    await page.keyboard.type('31.03.202');
    await page.waitForSelector(selectors.day, {hidden: true});

    await page.keyboard.type('0');
    const inputValue = await page.$eval(selectors.input, input => input.value);

    expect(inputValue).toBe('31.03.2020');

    await page.waitForSelector(selectors.day);
  });
});
