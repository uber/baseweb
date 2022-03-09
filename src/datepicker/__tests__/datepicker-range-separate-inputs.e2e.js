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
  day: '[aria-label="Choose Sunday, March 10th 2019. It\'s available."]',
  day2: '[aria-label="Choose Thursday, March 28th 2019. It\'s available."]',
  day4: '[aria-label="Choose Monday, April 1st 2019. It\'s available."]',
  day5: '[aria-label="Choose Wednesday, May 1st 2019. It\'s available."]',
  timeSelect: '[data-id="time-select"]',
  timeSelectDropdown: '[role="listbox"]',
  timeSelectValue: '[data-id="selected"]',
  multiMonthInputs: '[data-id="multiMonthInputs"]',
};

describe('Datepicker, Range', () => {
  it('selects range', async () => {
    await mount(page, 'datepicker--range-separate-inputs');
    await page.waitForSelector(selectors.input);
    await page.click(selectors.input);
    await page.waitForSelector(selectors.calendar);
    await page.click(selectors.day);
    await page.waitForSelector(selectors.calendar);
    const startDateValue1 = await page.$eval(
      selectors.input,
      (input) => input.value,
    );
    expect(startDateValue1).toBe('2019/03/10');
    await page.click(selectors.day2);
    await page.waitForSelector(selectors.calendar, {
      hidden: true,
    });
    const [startDateValue2, endDateValue2] = await page.$$eval(
      selectors.input,
      (inputs) => inputs.map((input) => input.value),
    );
    expect(startDateValue2).toBe('2019/03/10');
    expect(endDateValue2).toBe('2019/03/28');
  });
  it('selects range in multi-month', async () => {
    await mount(page, 'datepicker--range-separate-inputs');
    await page.waitForSelector(selectors.multiMonthInputs);
    await page.click(selectors.multiMonthInputs);
    await page.waitForSelector(selectors.calendar);
    await page.click(selectors.day);
    await page.waitForSelector(selectors.calendar);
    const startDateValue1 = await page.$eval(
      selectors.multiMonthInputs,
      (input) => input.value,
    );
    expect(startDateValue1).toBe('2019/03/10');
    await page.click(selectors.day4);
    await page.waitForSelector(selectors.calendar, {
      hidden: true,
    });
    const [startDateValue2, endDateValue2] = await page.$$eval(
      selectors.multiMonthInputs,
      (inputs) => inputs.map((input) => input.value),
    );
    expect(startDateValue2).toBe('2019/03/10');
    expect(endDateValue2).toBe('2019/04/01');
  });
  it('selects range in multi-month - do not autoAdvance calendar months since selected date is in view', async () => {
    await mount(page, 'datepicker--range-separate-inputs');
    await page.waitForSelector(selectors.multiMonthInputs);
    await page.click(selectors.multiMonthInputs);
    await page.waitForSelector(selectors.calendar);
    // datepicker should show 2 months - March and April
    // we can see both a day in March and a day in April are rendered
    await page.waitForSelector(selectors.day);
    await page.click(selectors.day4);
    await page.waitForSelector(selectors.calendar);
    const startDateValue1 = await page.$eval(
      selectors.multiMonthInputs,
      (input) => input.value,
    );
    expect(startDateValue1).toBe('2019/04/01');
    // after clicking on a date in April, in the second month, the months should NOT change at all. March should still be visible, and May should not be rendered
    // we finish off the test by clicking on a day in March (simulating clicking the "end" of the range first, then the "beginning" of the range last)
    // await page.waitForSelector(selectors.day5, {hidden: true});
    await page.waitForSelector(selectors.day);
    await page.click(selectors.day);
    await page.waitForSelector(selectors.calendar, {
      hidden: true,
    });
    const [startDateValue2, endDateValue2] = await page.$$eval(
      selectors.multiMonthInputs,
      (inputs) => inputs.map((input) => input.value),
    );
    expect(startDateValue2).toBe('2019/03/10');
    expect(endDateValue2).toBe('2019/04/01');
  });
  it('selected time is preserved when dates are changed', async () => {
    await mount(page, 'datepicker--range-separate-inputs');
    await page.waitForSelector(selectors.input);
    await page.click(selectors.input);
    await page.waitForSelector(selectors.timeSelect);

    let timeSelects = await page.$$(selectors.timeSelect);
    // Set the start time
    await timeSelects[0].click();
    await page.waitForSelector(selectors.timeSelectDropdown);
    await page.keyboard.type('12:30 AM');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    let timeSelectValue = await page.$$eval(
      `${selectors.timeSelect} ${selectors.timeSelectValue}`,
      (selects) => selects[0].textContent,
    );
    expect(timeSelectValue).toBe('12:30 AM');
    // Set the end time
    await timeSelects[1].click();
    await page.waitForSelector(selectors.timeSelectDropdown);
    await page.keyboard.type('4:30 AM');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    let timeSelectValue2 = await page.$$eval(
      `${selectors.timeSelect} ${selectors.timeSelectValue}`,
      (selects) => selects[1].textContent,
    );
    expect(timeSelectValue2).toBe('4:30 AM');
    // Select the start day
    await page.waitForSelector(selectors.calendar);
    await page.waitForSelector(selectors.day);
    await page.click(selectors.day);
    const startDateValue1 = await page.$eval(
      selectors.input,
      (input) => input.value,
    );
    expect(startDateValue1).toBe('2019/03/10');
    // Select the start day
    await page.waitForSelector(selectors.day2);
    await page.click(selectors.day2);
    await page.waitForSelector(selectors.calendar, {
      hidden: true,
    });
    const [startDateValue2, endDateValue2] = await page.$$eval(
      selectors.input,
      (inputs) => inputs.map((input) => input.value),
    );
    expect(startDateValue2).toBe('2019/03/10');
    expect(endDateValue2).toBe('2019/03/28');
    await page.waitForSelector(selectors.calendar, {hidden: true});

    // Open the calendar again and check that the time is set correctly
    await page.click(selectors.input);
    await page.waitForSelector(selectors.timeSelect);
    timeSelectValue = await page.$$eval(
      `${selectors.timeSelect} ${selectors.timeSelectValue}`,
      (selects) => selects[0].textContent,
    );
    expect(timeSelectValue).toBe('12:30 AM');
    // Set the end time
    timeSelectValue2 = await page.$$eval(
      `${selectors.timeSelect} ${selectors.timeSelectValue}`,
      (selects) => selects[1].textContent,
    );
    expect(timeSelectValue2).toBe('4:30 AM');
  });
});
