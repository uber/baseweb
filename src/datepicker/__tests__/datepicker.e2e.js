/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

const selectors = {
  input: 'input',
  calendar: '[role="grid"]',
  day: '[aria-label="Sunday, March 10th 2019"]',
  day2: '[aria-label="Thursday, March 28th 2019"]',
  day3: '[aria-label="Thursday, February 14th 2019"]',
  day4: '[aria-label="Monday, April 1st 2019"]',
  leftArrow: '[aria-label="Previous month"]',
  rightArrow: '[aria-label="Next month"]',
  monthSelect: '[data-id="monthSelect"]',
  yearSelect: '[data-id="yearSelect"]',
  selectDropdown: 'ul[role="listbox"]',
};

describe('Datepicker', () => {
  it('calendar passes basic a11y tests', async () => {
    await mount(page, 'calendar');
    await page.waitFor(selectors.calendar);
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

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
    expect(selectedValue1).toBe('2019/03/10');

    await page.click(selectors.day2);
    await page.waitFor(selectors.calendar, {
      hidden: true,
    });
    const selectedValue2 = await page.$eval(
      selectors.input,
      input => input.value,
    );
    expect(selectedValue2).toBe('2019/03/10 - 2019/03/28');
  });

  it('renders previous month when the left arrow is clicked', async () => {
    await mount(page, 'datepicker');
    await page.waitFor(selectors.input);
    await page.click(selectors.input);
    await page.waitFor(selectors.calendar);
    await page.click(selectors.leftArrow);
    await page.waitFor(selectors.day, {
      hidden: true,
    });
    await page.waitFor(selectors.day3);
  });

  it('renders next month when the right arrow is clicked', async () => {
    await mount(page, 'datepicker');
    await page.waitFor(selectors.input);
    await page.click(selectors.input);
    await page.waitFor(selectors.calendar);
    await page.click(selectors.rightArrow);
    await page.waitFor(selectors.day, {
      hidden: true,
    });
    await page.waitFor(selectors.day4);
  });

  it('updates the calendar when a year selected from the dropdown', async () => {
    await mount(page, 'datepicker');
    await page.waitFor(selectors.input);
    await page.click(selectors.input);
    await page.waitFor(selectors.calendar);
    await page.waitFor('[aria-label="Sunday, March 10th 2019"]');
    await page.click(selectors.yearSelect);
    const dropdown = `${selectors.yearSelect} ${selectors.selectDropdown}`;
    await page.waitFor(dropdown);

    await page.$$eval('ul[role="listbox"] li', items => {
      const option = items.find(item => {
        return item.textContent === '2018';
      });
      option.click();
      return option;
    });
    await page.waitFor(dropdown, {hidden: true});
    await page.waitFor(selectors.calendar);
    await page.waitFor('[aria-label="Saturday, March 10th 2018"]');
  });

  it('updates the calendar when a month selected from the dropdown', async () => {
    await mount(page, 'datepicker');
    await page.waitFor(selectors.input);
    await page.click(selectors.input);
    await page.waitFor(selectors.calendar);
    await page.waitFor('[aria-label="Sunday, March 10th 2019"]');
    await page.click(selectors.monthSelect);
    const dropdown = `${selectors.monthSelect} ${selectors.selectDropdown}`;
    await page.waitFor(dropdown);

    await page.$$eval('ul[role="listbox"] li', items => {
      const option = items.find(item => {
        return item.textContent === 'July';
      });
      option.click();
      return option;
    });
    await page.waitFor(dropdown, {hidden: true});
    await page.waitFor(selectors.calendar);
    await page.waitFor('[aria-label="Monday, July 1st 2019"]');
  });
});
