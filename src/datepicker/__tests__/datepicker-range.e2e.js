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
  day: '[aria-label="Choose Sunday, March 10th 2019. It\'s available."]',
  day2: '[aria-label="Choose Thursday, March 28th 2019. It\'s available."]',
  day4: '[aria-label="Choose Monday, April 1st 2019. It\'s available."]',
  day5: '[aria-label="Choose Wednesday, May 1st 2019. It\'s available."]',
  rightArrow: '[aria-label="Next month"]',
  monthYearSelectButton: '[data-id="monthYearSelectButton"]',
  monthYearSelectMenu: '[data-id="monthYearSelectMenu"]',
};

describe('Datepicker, Range', () => {
  it('selects range - verifies end of year', async () => {
    await mount(page, 'datepicker-range');

    await page.waitFor(selectors.input);
    await page.click(selectors.input);
    await page.waitFor(selectors.calendar);
    await page.click(selectors.monthYearSelectButton);
    await page.waitFor(selectors.monthYearSelectMenu);

    await page.$$eval('ul[role="listbox"] li', items => {
      const option = items.find(item => {
        return item.textContent === 'December 2019';
      });
      option.click();
      return option;
    });

    await page.click(
      '[aria-label="Choose Wednesday, December 25th 2019. It\'s available."]',
    );

    await page.click(
      '[aria-label="Choose Tuesday, December 31st 2019. It\'s available."]',
    );

    const selectedValue = await page.$eval(
      selectors.input,
      input => input.value,
    );
    expect(selectedValue).toBe('2019/12/25 – 2019/12/31');
  });

  it('selects range', async () => {
    await mount(page, 'datepicker-range');
    await page.waitFor(selectors.input);
    await page.click(selectors.input);
    await page.waitFor(selectors.calendar);
    await page.click(selectors.day);
    await page.waitFor(selectors.calendar);
    const selectedValue1 = await page.$eval(
      selectors.input,
      input => input.value,
    );
    expect(selectedValue1).toBe('2019/03/10 –     /  /  ');

    await page.click(selectors.day2);
    await page.waitFor(selectors.calendar, {
      hidden: true,
    });
    const selectedValue2 = await page.$eval(
      selectors.input,
      input => input.value,
    );
    expect(selectedValue2).toBe('2019/03/10 – 2019/03/28');
  });

  it('selects range in multi-month', async () => {
    await mount(page, 'datepicker-range-multi-month');
    await page.waitFor(selectors.input);
    await page.click(selectors.input);
    await page.waitFor(selectors.calendar);
    await page.click(selectors.day);
    await page.waitFor(selectors.calendar);
    const selectedValue1 = await page.$eval(
      selectors.input,
      input => input.value,
    );
    expect(selectedValue1).toBe('2019/03/10 –     /  /  ');

    await page.click(selectors.day4);
    await page.waitFor(selectors.calendar, {
      hidden: true,
    });
    const selectedValue2 = await page.$eval(
      selectors.input,
      input => input.value,
    );
    expect(selectedValue2).toBe('2019/03/10 – 2019/04/01');
  });

  it('selects range in multi-month - do not autoAdvance calendar months since selected date is in view', async () => {
    await mount(page, 'datepicker-range-multi-month');
    await page.waitFor(selectors.input);
    await page.click(selectors.input);
    await page.waitFor(selectors.calendar);
    // datepicker should show 2 months - March and April
    // we can see both a day in March and a day in April are rendered
    await page.waitFor(selectors.day);
    await page.click(selectors.day4);
    await page.waitFor(selectors.calendar);
    const selectedValue1 = await page.$eval(
      selectors.input,
      input => input.value,
    );
    expect(selectedValue1).toBe('2019/04/01 –     /  /  ');

    // after clicking on a date in April, in the second month, the months should NOT change at all. March should still be visible, and May should not be rendered
    // we finish off the test by clicking on a day in March (simulating clicking the "end" of the range first, then the "beginning" of the range last)
    // await page.waitFor(selectors.day5, {hidden: true});
    await page.waitFor(selectors.day);
    await page.click(selectors.day);
    await page.waitFor(selectors.calendar, {
      hidden: true,
    });
    const selectedValue2 = await page.$eval(
      selectors.input,
      input => input.value,
    );
    expect(selectedValue2).toBe('2019/03/10 – 2019/04/01');
  });
});
