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
  calendar: '[role="application"]',
  day: '[aria-label="Choose Sunday, March 10th 2019. It\'s available."]',
  day2: '[aria-label="Choose Thursday, March 28th 2019. It\'s available."]',
  day3: '[aria-label="Choose Thursday, February 14th 2019. It\'s available."]',
  day4: '[aria-label="Choose Monday, April 1st 2019. It\'s available."]',
  day5: '[aria-label="Choose Saturday, March 10th 2018. It\'s available."]',
  day6: '[aria-label="Choose Monday, July 1st 2019. It\'s available."]',
  leftArrow: '[aria-label="Previous month"]',
  rightArrow: '[aria-label="Next month"]',
  monthSelect: '[data-id="monthSelect"]',
  monthDropdown: '[data-id="monthDropdown"]',
  yearSelect: '[data-id="yearSelect"]',
  yearDropdown: '[data-id="yearDropdown"]',
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
    await page.waitFor(selectors.day);
    await page.click(selectors.yearSelect);
    await page.waitFor(selectors.yearDropdown);

    await page.$$eval('ul[role="listbox"] li', items => {
      const option = items.find(item => {
        return item.textContent === '2018';
      });
      option.click();
      return option;
    });

    await page.waitFor(selectors.yearDropdown, {hidden: true});
    await page.waitFor(selectors.calendar);
    await page.waitFor(selectors.day5);
  });

  it('updates the calendar when a month selected from the dropdown', async () => {
    await mount(page, 'datepicker');
    await page.waitFor(selectors.input);
    await page.click(selectors.input);
    await page.waitFor(selectors.calendar);
    await page.waitFor(selectors.day);
    await page.click(selectors.monthSelect);
    await page.waitFor(selectors.monthDropdown);

    await page.$$eval('ul[role="listbox"] li', items => {
      const option = items.find(item => {
        return item.textContent === 'July';
      });
      option.click();
      return option;
    });

    await page.waitFor(selectors.monthDropdown, {hidden: true});
    await page.waitFor(selectors.calendar);
    await page.waitFor(selectors.day6);
  });
});
