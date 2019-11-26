/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

const selectors = {
  input: 'input',
  calendar: '[data-baseweb="calendar"]',
  day: '[aria-label="Choose Sunday, March 10th 2019. It\'s available."]',
  day2: '[aria-label="Choose Thursday, March 28th 2019. It\'s available."]',
  day3: '[aria-label="Choose Thursday, February 14th 2019. It\'s available."]',
  day4: '[aria-label="Choose Monday, April 1st 2019. It\'s available."]',
  day5: '[aria-label="Choose Saturday, March 10th 2018. It\'s available."]',
  day6: '[aria-label="Choose Monday, July 1st 2019. It\'s available."]',
  day7: '[aria-label="Choose Sunday, February 10th 2019. It\'s available."]',
  day8: '[aria-label="Choose Sunday, March 3rd 2019. It\'s available."]',
  day9: '[aria-label="Choose Saturday, March 9th 2019. It\'s available."]',
  day10: '[aria-label="Choose Monday, March 11th 2019. It\'s available."]',
  day11: '[aria-label="Choose Sunday, March 17th 2019. It\'s available."]',
  day12: '[aria-label="Choose Saturday, March 16th 2019. It\'s available."]',
  day13: '[aria-label="Choose Wednesday, April 10th 2019. It\'s available."]',
  leftArrow: '[aria-label="Previous month"]',
  rightArrow: '[aria-label="Next month"]',
  monthYearSelectButton: '[data-id="monthYearSelectButton"]',
  monthYearSelectMenu: '[data-id="monthYearSelectMenu"]',
};

const isActiveEl = async (page, selector) => {
  const el = await page.evaluateHandle(() => document.activeElement);
  const selectedEl = await page.$(selector);
  const equal = await page.evaluate((e1, e2) => e1 === e2, el, selectedEl);
  return equal;
};

describe('Datepicker', () => {
  it('datepicker passes basic a11y tests', async () => {
    await mount(page, 'datepicker');
    await page.waitFor(selectors.input);
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('opens the calendar on click', async () => {
    await mount(page, 'datepicker');
    await page.waitFor(selectors.input);
    await page.click(selectors.input);
    await page.waitFor(selectors.calendar);
    const calendarCount = await page.$$eval(
      selectors.calendar,
      calendar => calendar.length,
    );
    expect(calendarCount).toEqual(1);
  });

  it('opens the calendar on input focus', async () => {
    await mount(page, 'datepicker');
    await page.waitFor(selectors.input);
    await page.focus(selectors.input);
    await page.waitFor(selectors.calendar);
    const calendarCount = await page.$$eval(
      selectors.calendar,
      calendar => calendar.length,
    );
    expect(calendarCount).toEqual(1);
  });

  it('opens the calendar on input focus', async () => {
    await mount(page, 'datepicker');
    await page.waitFor(selectors.input);
    await page.focus(selectors.input);
    await page.waitFor(selectors.calendar);
  });

  it('closes the calendar on esc', async () => {
    await mount(page, 'datepicker');
    await page.waitFor(selectors.input);
    await page.click(selectors.input);
    await page.waitFor(selectors.calendar);
    await page.keyboard.press('Escape');
    await page.waitFor(selectors.calendar, {
      hidden: true,
    });
  });

  it('selects day when clicked', async () => {
    await mount(page, 'datepicker');
    await page.waitFor(selectors.input);
    await page.click(selectors.input);
    await page.waitFor(selectors.calendar);
    await page.click(selectors.day);
    await page.waitFor(selectors.calendar, {
      hidden: true,
    });

    const selectedValue = await page.$eval(
      selectors.input,
      input => input.value,
    );
    expect(selectedValue).toBe('2019/03/10');
  });

  it('rerenders input if value is changed', async () => {
    await mount(page, 'datepicker');
    await page.waitFor(selectors.input);
    await page.click('button');

    const selectedValue = await page.$eval(
      selectors.input,
      input => input.value,
    );
    expect(selectedValue).toBe('2019/07/01');
  });

  it('month year dropdown opens on arrow down', async () => {
    await mount(page, 'datepicker');
    await page.waitFor(selectors.input);
    await page.click(selectors.input);
    await page.waitFor(selectors.calendar);
    await page.waitFor(selectors.day);
    await page.focus(selectors.monthYearSelectButton);
    await page.keyboard.press('ArrowDown');

    await page.waitFor(selectors.monthYearSelectMenu);
  });

  it('month year dropdown opens on arrow up', async () => {
    await mount(page, 'datepicker');
    await page.waitFor(selectors.input);
    await page.click(selectors.input);
    await page.waitFor(selectors.calendar);
    await page.waitFor(selectors.day);
    await page.focus(selectors.monthYearSelectButton);
    await page.keyboard.press('ArrowUp');

    await page.waitFor(selectors.monthYearSelectMenu);
  });

  it('month year dropdown closes on tab away', async () => {
    await mount(page, 'datepicker');
    await page.waitFor(selectors.input);
    await page.click(selectors.input);
    await page.waitFor(selectors.calendar);
    await page.waitFor(selectors.day);
    await page.focus(selectors.monthYearSelectButton);
    await page.keyboard.press('ArrowDown');
    await page.waitFor(selectors.monthYearSelectMenu);
    await page.keyboard.press('Tab');
    await page.waitFor(selectors.monthYearSelectMenu, {hidden: true});
  });

  const waitTillDay = async page => {
    await mount(page, 'datepicker');
    await page.waitFor(selectors.input);
    await page.click(selectors.input);
    await page.waitFor(selectors.calendar);
    await page.waitFor(selectors.day);
    await page.focus(selectors.day);
  };

  it('navigates to next day on ArrowRight key press', async () => {
    await waitTillDay(page);
    await page.keyboard.press('ArrowRight');
    const isday10Active = await isActiveEl(page, selectors.day10);
    expect(isday10Active).toBe(true);
  });

  it('navigates to prev day on ArrowLeft key press', async () => {
    await waitTillDay(page);
    await page.keyboard.press('ArrowLeft');
    const isday9Active = await isActiveEl(page, selectors.day9);
    expect(isday9Active).toBe(true);
  });

  it('navigates to prev week on ArrowUp key press', async () => {
    await waitTillDay(page);
    await page.keyboard.press('ArrowUp');
    const isday8Active = await isActiveEl(page, selectors.day8);
    expect(isday8Active).toBe(true);
  });

  it('navigates to prev week on ArrowDown key press', async () => {
    await waitTillDay(page);
    await page.keyboard.press('ArrowDown');
    const isday11Active = await isActiveEl(page, selectors.day11);
    expect(isday11Active).toBe(true);
  });

  it('navigates to start of week on Home key press', async () => {
    await waitTillDay(page);
    await page.keyboard.press('Home');
    const isdayActive = await isActiveEl(page, selectors.day);
    expect(isdayActive).toBe(true);
  });
  it('navigates to end of week on End key press', async () => {
    await waitTillDay(page);
    await page.keyboard.press('End');
    const isday12Active = await isActiveEl(page, selectors.day12);
    expect(isday12Active).toBe(true);
  });
  it('navigates to prev month on PageUp key press', async () => {
    await waitTillDay(page);
    await page.keyboard.press('PageUp');
    const isday7Active = await isActiveEl(page, selectors.day7);
    expect(isday7Active).toBe(true);
  });
  it('navigates to next month on PageDown key press', async () => {
    await waitTillDay(page);
    await page.keyboard.press('PageDown');
    const isday13Active = await isActiveEl(page, selectors.day13);
    expect(isday13Active).toBe(true);
  });
});
