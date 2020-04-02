/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount} = require('../../../e2e/helpers');

const selectors = {
  input: 'input',
  calendar: '[data-baseweb="calendar"]',
  day: '[aria-label="Selected. Tuesday, March 31st. 2020. It\'s available."]',
};

describe('Datepicker, Int', () => {
  it('parses input with formatString', async () => {
    await mount(page, 'datepicker-int');
    await page.waitFor(selectors.input);
    await page.click(selectors.input);

    await page.type('14.12.2020');
    const inputValue = await page.$eval(selectors.input, input => input.value);
    expect(inputValue).toBe('14.12.2020');

    await page.waitFor(selectors.day);
  });
});
