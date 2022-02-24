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
  day: '[aria-label="Choose Thursday, March 28th 2019. It\'s available."]',
  day2: '[aria-label="Choose Sunday, March 10th 2019. It\'s available."]',
  day3: '[aria-label="Choose Tuesday, March 26th 2019. It\'s available."]',
  day4: '[aria-label="Choose Monday, April 1st 2019. It\'s available."]',
  day5: '[aria-label="Choose Friday, March 8th 2019. It\'s available."]',
  timeSelect: '[data-id="time-select"]',
  timeSelectDropdown: '[role="listbox"]',
  timeSelectValue: '[data-id="selected"]',
  multiMonthInputs: '[data-id="multiMonthInputs"]',
};

describe('Datepicker, Range with Locked Behavior', () => {
  it('selects End Date, then Start Date, then changes End Date', async () => {
    await mount(page, 'datepicker--range-locked-behavior');
    const [startDateInput, endDateInput] = await page.$$(selectors.input);

    // select a day for the End Date
    endDateInput.click();
    await page.waitForSelector(selectors.calendar);
    await page.click(selectors.day);
    await page.keyboard.press('Escape');
    const [startDateValue, endDateValue] = await page.$$eval(
      selectors.input,
      inputs => inputs.map(input => input.value),
    );
    expect(endDateValue).toBe('2019/03/28');
    expect(startDateValue).toBe('    /  /  ');

    // select a day for the Start Date
    startDateInput.click();
    await page.waitForSelector(selectors.calendar);
    await page.click(selectors.day2);
    await page.keyboard.press('Escape');
    const [startDateValue2, endDateValue2] = await page.$$eval(
      selectors.input,
      inputs => inputs.map(input => input.value),
    );
    expect(startDateValue2).toBe('2019/03/10');
    expect(endDateValue2).toBe('2019/03/28');

    // attempt to select a new, invalid End Date (End Date remains unchanged)
    endDateInput.click();
    await page.waitForSelector(selectors.calendar);
    await page.click(selectors.day5);
    await page.keyboard.press('Escape');
    const [startDateValue3, endDateValue3] = await page.$$eval(
      selectors.input,
      inputs => inputs.map(input => input.value),
    );
    expect(startDateValue3).toBe('2019/03/10');
    expect(endDateValue3).toBe('2019/03/28');

    // select a new, valid End Date
    endDateInput.click();
    await page.waitForSelector(selectors.calendar);
    await page.click(selectors.day3);
    await page.keyboard.press('Escape');
    const [startDateValue4, endDateValue4] = await page.$$eval(
      selectors.input,
      inputs => inputs.map(input => input.value),
    );
    expect(startDateValue4).toBe('2019/03/10');
    expect(endDateValue4).toBe('2019/03/26');
  });
  it('selects range in multi-month', async () => {
    await mount(page, 'datepicker--range-locked-behavior');
    const [startDateInput, endDateInput] = await page.$$(
      selectors.multiMonthInputs,
    );

    // select a day for Start Date
    startDateInput.click();
    await page.waitForSelector(selectors.calendar);
    await page.click(selectors.day5);
    await page.keyboard.press('Escape');
    const startDateValue1 = await page.$eval(
      selectors.multiMonthInputs,
      input => input.value,
    );
    expect(startDateValue1).toBe('2019/03/08');

    // select a different day for Start Date
    startDateInput.click();
    await page.waitForSelector(selectors.calendar);
    await page.click(selectors.day2);
    await page.keyboard.press('Escape');
    const [startDateValue2, endDateValue2] = await page.$$eval(
      selectors.multiMonthInputs,
      inputs => inputs.map(input => input.value),
    );
    expect(startDateValue2).toBe('2019/03/10');
    expect(endDateValue2).toBe('');

    // attempt to select an invalid day for End Date
    endDateInput.click();
    await page.waitForSelector(selectors.calendar);
    await page.click(selectors.day5);
    await page.keyboard.press('Escape');
    const [startDateValue3, endDateValue3] = await page.$$eval(
      selectors.multiMonthInputs,
      inputs => inputs.map(input => input.value),
    );
    expect(startDateValue3).toBe('2019/03/10');
    expect(endDateValue3).toBe('');

    // select a valid day for End Date
    endDateInput.click();
    await page.waitForSelector(selectors.calendar);
    await page.click(selectors.day4);
    await page.keyboard.press('Escape');
    const [startDateValue4, endDateValue4] = await page.$$eval(
      selectors.multiMonthInputs,
      inputs => inputs.map(input => input.value),
    );
    expect(startDateValue4).toBe('2019/03/10');
    expect(endDateValue4).toBe('2019/04/01');
  });

  it('selected time is preserved when dates are changed', async () => {
    await mount(page, 'datepicker--range-locked-behavior');
    const [startDateInput, endDateInput] = await page.$$(selectors.input);

    startDateInput.click();

    // Set the start time
    await page.waitForSelector(selectors.timeSelect);
    const timeSelects1 = await page.$$(selectors.timeSelect);
    await timeSelects1[0].click();
    await page.waitForSelector(selectors.timeSelectDropdown);
    await page.keyboard.type('12:30 AM');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    let startTimeValue1 = await page.$$eval(
      `${selectors.timeSelect} ${selectors.timeSelectValue}`,
      selects => selects[0].textContent,
    );
    expect(startTimeValue1).toBe('12:30 AM');

    // Select the start day
    await page.waitForSelector(selectors.calendar);
    await page.waitForSelector(selectors.day2);
    await page.click(selectors.day2);
    await page.keyboard.press('Escape');
    const startDateValue1 = await page.$eval(
      selectors.input,
      input => input.value,
    );
    expect(startDateValue1).toBe('2019/03/10');

    // Select the end day
    endDateInput.click();
    await page.waitForSelector(selectors.day);
    await page.click(selectors.day);
    await page.keyboard.press('Escape');
    const [startDateValue2, endDateValue2] = await page.$$eval(
      selectors.input,
      inputs => inputs.map(input => input.value),
    );
    expect(startDateValue2).toBe('2019/03/10');
    expect(endDateValue2).toBe('2019/03/28');

    // Set the end time
    endDateInput.click();
    await page.waitForSelector(selectors.timeSelect);
    const timeSelects2 = await page.$$(selectors.timeSelect);
    await timeSelects2[1].click();
    await page.waitForSelector(selectors.timeSelectDropdown);
    await page.keyboard.type('4:30 AM');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Escape');

    // Open the calendar, change the start day
    startDateInput.click();
    await page.waitForSelector(selectors.calendar);
    await page.waitForSelector(selectors.day5);
    await page.click(selectors.day5);

    // Open the calendar, check that the times are still correct
    startDateInput.click();
    await page.waitForSelector(selectors.timeSelect);
    const startTimeValue2 = await page.$$eval(
      `${selectors.timeSelect} ${selectors.timeSelectValue}`,
      selects => selects[0].textContent,
    );
    expect(startTimeValue2).toBe('12:30 AM');
    const endTimeValue = await page.$$eval(
      `${selectors.timeSelect} ${selectors.timeSelectValue}`,
      selects => selects[1].textContent,
    );
    expect(endTimeValue).toBe('4:30 AM');
  });
});
