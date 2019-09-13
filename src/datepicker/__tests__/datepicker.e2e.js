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
  calendar: '[role="application"]',
  day: '[aria-label="Choose Sunday, March 10th 2019. It\'s available."]',
  day2: '[aria-label="Choose Thursday, March 28th 2019. It\'s available."]',
  day3: '[aria-label="Choose Thursday, February 14th 2019. It\'s available."]',
  day4: '[aria-label="Choose Monday, April 1st 2019. It\'s available."]',
  day5: '[aria-label="Choose Saturday, March 10th 2018. It\'s available."]',
  day6: '[aria-label="Choose Monday, July 1st 2019. It\'s available."]',
  leftArrow: '[aria-label="Previous month"]',
  rightArrow: '[aria-label="Next month"]',
  monthYearSelectButton: '[data-id="monthYearSelectButton"]',
  monthYearSelectMenu: '[data-id="monthYearSelectMenu"]',
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

  it('rerenders input if value is changed', async () => {
    await mount(page, 'datepicker');
    await page.waitFor(selectors.input);
    await page.click('button');

    const selectedValue = await page.$eval(
      selectors.input,
      input => input.value,
    );
    expect(selectedValue).toBe('2019/03/18');
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
    expect(selectedValue1).toBe('2019/03/10 -     /  /  ');

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

  it('selects range - int', async () => {
    await mount(page, 'datepicker-int');
    await page.waitFor(selectors.input);
    await page.click(selectors.input);
    await page.waitFor(selectors.calendar);
    await page.click(selectors.day);
    await page.waitFor(selectors.calendar);
    const selectedValue1 = await page.$eval(
      selectors.input,
      input => input.value,
    );
    expect(selectedValue1).toBe('10.03.2019 -   .  .    ');

    await page.click(selectors.day2);
    await page.waitFor(selectors.calendar, {
      hidden: true,
    });
    const selectedValue2 = await page.$eval(
      selectors.input,
      input => input.value,
    );
    expect(selectedValue2).toBe('10.03.2019 - 28.03.2019');
  });

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
    expect(selectedValue).toBe('2019/12/25 - 2019/12/31');
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

  it('does not highlight random days when the right arrow is clicked', async () => {
    await mount(page, 'datepicker-range');
    await page.waitFor(selectors.input);
    await page.click(selectors.input);
    await page.waitFor(selectors.calendar);
    await page.click(selectors.rightArrow);
    await page.waitFor(selectors.day4);
    const value = await page.$(selectors.day4);
    const highlighted = await page.evaluate(
      element => element.getAttribute('data-highlighted'),
      value,
    );
    // Check the value of a custom data-highlighted attribute
    expect(highlighted).toBe('false');
  });

  it('updates the calendar when a year selected from the dropdown', async () => {
    await mount(page, 'datepicker');
    await page.waitFor(selectors.input);
    await page.click(selectors.input);
    await page.waitFor(selectors.calendar);
    await page.waitFor(selectors.day);
    await page.click(selectors.monthYearSelectButton);
    await page.waitFor(selectors.monthYearSelectMenu);

    await page.$$eval('ul[role="listbox"] li', items => {
      const option = items.find(item => {
        return item.textContent === 'March 2018';
      });
      option.click();
      return option;
    });

    await page.waitFor(selectors.monthYearSelectMenu, {hidden: true});
    await page.waitFor(selectors.calendar);
    await page.waitFor(selectors.day5);
  });

  it('updates the calendar when a month selected from the dropdown', async () => {
    await mount(page, 'datepicker');
    await page.waitFor(selectors.input);
    await page.click(selectors.input);
    await page.waitFor(selectors.calendar);
    await page.waitFor(selectors.day);
    await page.click(selectors.monthYearSelectButton);
    await page.waitFor(selectors.monthYearSelectMenu);

    await page.$$eval('ul[role="listbox"] li', items => {
      const option = items.find(item => {
        return item.textContent === 'July 2019';
      });
      option.click();
      return option;
    });

    await page.waitFor(selectors.monthYearSelectMenu, {hidden: true});
    await page.waitFor(selectors.calendar);
    await page.waitFor(selectors.day6);
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

  it('disables previous month button if minimum month is selected', async () => {
    await mount(page, 'datepicker');
    await page.waitFor(selectors.input);
    await page.click(selectors.input);
    await page.waitFor(selectors.calendar);
    await page.waitFor(selectors.day);
    await page.click(selectors.monthYearSelectButton);
    await page.waitFor(selectors.monthYearSelectMenu);

    await page.$$eval('ul[role="listbox"] li', items => {
      const option = items.find(item => {
        return item.textContent === 'January 2000';
      });
      option.click();
      return option;
    });

    await page.click(selectors.leftArrow);
    const value = await page.$(selectors.monthYearSelectButton);
    const text = await page.evaluate(element => element.textContent, value);
    // (Month YearTriangle Down) because it renders an icon within the element
    expect(text).toBe('January 2000Triangle Down');
  });

  it('disables next month button if maximum month is selected', async () => {
    await mount(page, 'datepicker');
    await page.waitFor(selectors.input);
    await page.click(selectors.input);
    await page.waitFor(selectors.calendar);
    await page.waitFor(selectors.day);
    await page.click(selectors.monthYearSelectButton);
    await page.waitFor(selectors.monthYearSelectMenu);

    await page.$$eval('ul[role="listbox"] li', items => {
      const option = items.find(item => {
        return item.textContent === 'December 2030';
      });
      option.click();
      return option;
    });

    await page.click(selectors.rightArrow);
    const value = await page.$(selectors.monthYearSelectButton);
    const text = await page.evaluate(element => element.textContent, value);
    // (Month YearTriangle Down) because it renders an icon within the element
    expect(text).toBe('December 2030Triangle Down');
  });
});
