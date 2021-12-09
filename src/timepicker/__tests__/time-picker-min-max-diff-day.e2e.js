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
  it('handles min max datetimes with different date than value datetime clamping to current date start and end', async () => {
    await mount(page, 'timepicker--time-picker-min-max-diff-day');

    const parent = await page.$('#default');
    await parent.click(COMBOBOX);
    const listbox = await page.$(LISTBOX);

    const listItems = await listbox.$$(`${LISTBOX} li`);
    const min = await page.evaluate(el => el.textContent, listItems[0]);
    const max = await page.evaluate(
      el => el.textContent,
      listItems[listItems.length - 1],
    );

    expect(min).toBe('12:00 AM');
    expect(max).toBe('11:45 PM');
  });

  it('handles max date after current', async () => {
    await mount(page, 'timepicker--time-picker-min-max-diff-day');

    const parent = await page.$('#max-after-current');
    await parent.click(COMBOBOX);
    const listbox = await page.$(LISTBOX);

    const listItems = await listbox.$$(`${LISTBOX} li`);
    const min = await page.evaluate(el => el.textContent, listItems[0]);
    const max = await page.evaluate(
      el => el.textContent,
      listItems[listItems.length - 1],
    );

    expect(min).toBe('8:02 AM');
    expect(max).toBe('11:47 PM');
  });

  it('handles min date before current', async () => {
    await mount(page, 'timepicker--time-picker-min-max-diff-day');

    const parent = await page.$('#min-before-current');
    await parent.click(COMBOBOX);
    const listbox = await page.$(LISTBOX);

    const listItems = await listbox.$$(`${LISTBOX} li`);
    const min = await page.evaluate(el => el.textContent, listItems[0]);
    const max = await page.evaluate(
      el => el.textContent,
      listItems[listItems.length - 1],
    );

    expect(min).toBe('12:00 AM');
    expect(max).toBe('6:00 PM');
  });

  it('handles min max datetimes with different date than value datetime ignoring min max date', async () => {
    await mount(page, 'timepicker--time-picker-min-max-diff-day');

    const parent = await page.$('#ignore-min-max-date');
    await parent.click(COMBOBOX);
    const listbox = await page.$(LISTBOX);

    const listItems = await listbox.$$(`${LISTBOX} li`);
    const min = await page.evaluate(el => el.textContent, listItems[0]);
    const max = await page.evaluate(
      el => el.textContent,
      listItems[listItems.length - 1],
    );

    expect(min).toBe('8:02 AM');
    expect(max).toBe('6:02 PM');
  });

  it('handles min max datetimes with different date than value datetime ignoring min max date', async () => {
    await mount(page, 'timepicker--time-picker-min-max-diff-day');

    const parent = await page.$('#max-time-lands-on-step');
    await parent.click(COMBOBOX);
    const listbox = await page.$(LISTBOX);

    const listItems = await listbox.$$(`${LISTBOX} li`);
    const min = await page.evaluate(el => el.textContent, listItems[0]);
    const max = await page.evaluate(
      el => el.textContent,
      listItems[listItems.length - 1],
    );

    expect(min).toBe('8:00 AM');
    expect(max).toBe('10:00 AM');
  });
});
