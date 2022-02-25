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
  day: '[aria-label="Choose Monday, March 14th 2022. It\'s available."]',
  day2: '[aria-label="Choose Saturday, March 26th 2022. It\'s available."]',
  day3: '[aria-label="Choose Tuesday, March 22nd 2022. It\'s available."]',
  day4: '[aria-label="Choose Thursday, March 31st 2022. It\'s available."]',
  day5: '[aria-label="Choose Monday, April 4th 2022. It\'s available."]',
  day6: '[aria-label="Choose Friday, April 1st 2022. It\'s available."]',
  rightArrow: '[aria-label="Next month."]',
};

describe('Datepicker, Range', () => {
  it('is unable to select range that includes excluded date', async () => {
    await mount(page, 'datepicker--range-exclude-dates');
    await page.waitForSelector(selectors.input);
    await page.click(selectors.input);
    await page.waitForSelector(selectors.calendar);
    await page.click(selectors.day);
    await page.waitForSelector(selectors.calendar);
    const selectedValue1 = await page.$eval(
      selectors.input,
      input => input.value,
    );
    expect(selectedValue1).toBe('2022/03/14 –     /  /  ');
    await page.click(selectors.day2);
    const selectedValue2 = await page.$eval(
      selectors.input,
      input => input.value,
    );
    expect(selectedValue2).toBe('2022/03/14 –     /  /  ');
    await page.click(selectors.day3);
    await page.waitForSelector(selectors.calendar, {
      hidden: true,
    });
    const selectedValue3 = await page.$eval(
      selectors.input,
      input => input.value,
    );
    expect(selectedValue3).toBe('2022/03/14 – 2022/03/22');
  });
  it('is unable to select range that includes excluded date, across months', async () => {
    await mount(page, 'datepicker--range-exclude-dates');
    await page.waitForSelector(selectors.input);
    await page.click(selectors.input);
    await page.waitForSelector(selectors.calendar);
    await page.click(selectors.day4);
    await page.waitForSelector(selectors.calendar);
    const selectedValue1 = await page.$eval(
      selectors.input,
      input => input.value,
    );
    expect(selectedValue1).toBe('2022/03/31 –     /  /  ');
    await page.click(selectors.day3);
    const selectedValue2 = await page.$eval(
      selectors.input,
      input => input.value,
    );
    expect(selectedValue2).toBe('2022/03/31 –     /  /  ');
    await page.click(selectors.rightArrow);
    await page.waitForSelector(selectors.day5);
    await page.click(selectors.day5);
    const selectedValue3 = await page.$eval(
      selectors.input,
      input => input.value,
    );
    expect(selectedValue3).toBe('2022/03/31 –     /  /  ');
    await page.click(selectors.day6);
    await page.waitForSelector(selectors.calendar, {
      hidden: true,
    });
    const selectedValue4 = await page.$eval(
      selectors.input,
      input => input.value,
    );
    expect(selectedValue4).toBe('2022/03/31 – 2022/04/01');
  });
});
