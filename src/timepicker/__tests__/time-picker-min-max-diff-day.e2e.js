/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount} = require('../../../e2e/helpers');

const COMBOBOX = 'input[role="combobox"]';
const LISTBOX = '[role="listbox"]';

describe('TimePicker min/max times', () => {
  it('handles min/max datetimes with different date than value datetime', async () => {
    await mount(page, 'timepicker--time-picker-min-max-diff-day');
    await page.waitForSelector(COMBOBOX);
    await page.click(COMBOBOX);
    await page.waitForSelector(LISTBOX);

    const listItems = await page.$$(`${LISTBOX} li`);
    const min = await page.evaluate(el => el.textContent, listItems[0]);
    const max = await page.evaluate(
      el => el.textContent,
      listItems[listItems.length - 1],
    );

    expect(min).toBe('8:02 AM');
    expect(max).toBe('6:02 PM');
  });
});
