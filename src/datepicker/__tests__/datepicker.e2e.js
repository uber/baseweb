/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const { mount, analyzeAccessibility } = require('../../../e2e/helpers');

const selectors = {
  input: 'input',
  calendar: '[data-baseweb="calendar"]',
  day: '[aria-label="Choose Sunday, March 10th 2019. It\'s available."]',
  day2: '[aria-label="Choose Thursday, March 28th 2019. It\'s available."]',
  day3: '[aria-label="Choose Thursday, February 14th 2019. It\'s available."]',
  day4: '[aria-label="Choose Monday, April 1st 2019. It\'s available."]',
  day5: '[aria-label="Choose Saturday, March 10th 2018. It\'s available."]',
  day6: '[aria-label="Choose Monday, July 1st 2019. It\'s available."]',
  leftArrow: '[aria-label="Previous month."]',
  rightArrow: '[aria-label="Next month."]',
  monthYearSelectButton: '[data-id="monthYearSelectButton"]',
  monthYearSelectMenu: '[data-id="monthYearSelectMenu"]',
};

describe('Datepicker', () => {
  it('datepicker passes basic a11y tests', async () => {
    await mount(page, 'datepicker--datepicker');
    await page.waitForSelector(selectors.input);
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('opens the calendar on click', async () => {
    await mount(page, 'datepicker--datepicker');
    await page.waitForSelector(selectors.input);
    await page.click(selectors.input);
    await page.waitForSelector(selectors.calendar);
    const calendarCount = await page.$$eval(selectors.calendar, (calendar) => calendar.length);
    expect(calendarCount).toEqual(1);
  });

  it('opens the calendar on input focus', async () => {
    await mount(page, 'datepicker--datepicker');
    await page.waitForSelector(selectors.input);
    await page.focus(selectors.input);
    await page.waitForSelector(selectors.calendar);
    const calendarCount = await page.$$eval(selectors.calendar, (calendar) => calendar.length);
    expect(calendarCount).toEqual(1);
  });

  it('closes the calendar on esc', async () => {
    await mount(page, 'datepicker--datepicker');
    await page.waitForSelector(selectors.input);
    await page.click(selectors.input);
    await page.waitForSelector(selectors.calendar);
    await page.keyboard.press('Escape');
    await page.waitForSelector(selectors.calendar, {
      state: 'hidden',
    });
  });

  it('selects day when clicked', async () => {
    await mount(page, 'datepicker--datepicker');
    await page.waitForSelector(selectors.input);
    await page.click(selectors.input);
    await page.waitForSelector(selectors.calendar);
    await page.click(selectors.day);
    await page.waitForSelector(selectors.calendar, {
      state: 'hidden',
    });

    const selectedValue = await page.$eval(selectors.input, (input) => input.value);
    expect(selectedValue).toBe('2019/03/10');
  });

  it('rerenders input if value is changed', async () => {
    await mount(page, 'datepicker--datepicker');
    await page.waitForSelector(selectors.input);
    await page.click('button');

    const selectedValue = await page.$eval(selectors.input, (input) => input.value);
    expect(selectedValue).toBe('2019/07/01');
  });

  it('input causes calendar to switch to appropriate month', async () => {
    await mount(page, 'datepicker--datepicker');
    await page.waitForSelector(selectors.input);
    await page.click(selectors.input);
    await page.waitForSelector(selectors.calendar);
    // march should be visible
    await page.waitForSelector(selectors.day);

    // we want to enter entire date but the onChange functionality only fires on key press so...
    await page.$eval(selectors.input, (el) => (el.value = '2019/07/0'));
    // also make sure the selected date isn't the date we're testing - selected/non-selected dates have different aria-labels
    await page.keyboard.press('2');

    // make sure march is gone
    await page.waitForSelector(selectors.day, { state: 'hidden' });
    // and make sure july is now visible
    await page.waitForSelector(selectors.day6);
  });

  it('month year dropdown opens on arrow down', async () => {
    await mount(page, 'datepicker--datepicker');
    await page.waitForSelector(selectors.input);
    await page.click(selectors.input);
    await page.waitForSelector(selectors.calendar);
    await page.waitForSelector(selectors.day);
    await page.focus(selectors.monthYearSelectButton);
    await page.keyboard.press('ArrowDown');

    await page.waitForSelector(selectors.monthYearSelectMenu);
  });

  it('month year dropdown opens on arrow up', async () => {
    await mount(page, 'datepicker--datepicker');
    await page.waitForSelector(selectors.input);
    await page.click(selectors.input);
    await page.waitForSelector(selectors.calendar);
    await page.waitForSelector(selectors.day);
    await page.focus(selectors.monthYearSelectButton);
    await page.keyboard.press('ArrowUp');

    await page.waitForSelector(selectors.monthYearSelectMenu);
  });

  it('month year dropdown escape does not close calendar', async () => {
    await mount(page, 'datepicker--datepicker');
    await page.waitForSelector(selectors.input);
    await page.click(selectors.input);
    await page.waitForSelector(selectors.calendar);
    await page.waitForSelector(selectors.day);
    await page.focus(selectors.monthYearSelectButton);
    await page.keyboard.press('ArrowDown');
    await page.waitForSelector(selectors.monthYearSelectMenu);
    await page.keyboard.press('Escape');
    await page.waitForSelector(selectors.monthYearSelectMenu, { state: 'hidden' });
    await page.waitForSelector(selectors.calendar);
  });
});
