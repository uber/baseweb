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
  jest.retryTimes(3);

  beforeEach(async () => {
    await jestPuppeteer.resetPage();
  });

  it('renders previous month when the left arrow is clicked', async () => {
    await mount(page, 'datepicker');
    await page.waitFor(selectors.input);
    await page.click(selectors.input);
    await page.waitFor(selectors.leftArrow);
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
    await page.waitFor(selectors.rightArrow);
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
    await page.waitFor(selectors.monthYearSelectButton);
    await page.click(selectors.monthYearSelectButton);
    await page.waitFor(selectors.monthYearSelectMenu);

    await page.$$eval('ul[role="listbox"] li', items => {
      const option = items.find(item => {
        return item.textContent === 'March 2018';
      });
      return option.click();
    });

    await page.waitFor(selectors.monthYearSelectMenu, {hidden: true});
    await page.waitFor(selectors.calendar);
    await page.waitFor(selectors.day5);
  });

  it('updates the calendar when a month selected from the dropdown', async () => {
    await mount(page, 'datepicker');
    await page.waitFor(selectors.input);
    await page.click(selectors.input);
    await page.waitFor(selectors.monthYearSelectButton);
    await page.click(selectors.monthYearSelectButton);
    await page.waitFor(selectors.monthYearSelectMenu);

    await page.$$eval('ul[role="listbox"] li', items => {
      const option = items.find(item => {
        return item.textContent === 'July 2019';
      });
      return option.click();
    });

    await page.waitFor(selectors.monthYearSelectMenu, {hidden: true});
    await page.waitFor(selectors.calendar);
    await page.waitFor(selectors.day6);
  });

  it('disables previous month button if minimum month is selected', async () => {
    await mount(page, 'datepicker');
    await page.waitFor(selectors.input);
    await page.click(selectors.input);
    await page.waitFor(selectors.monthYearSelectButton);
    await page.click(selectors.monthYearSelectButton);
    await page.waitFor(selectors.monthYearSelectMenu);

    await page.$$eval('ul[role="listbox"] li', items => {
      const option = items.find(item => {
        return item.textContent === 'January 2000';
      });
      return option.click();
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
    await page.waitFor(selectors.monthYearSelectButton);
    await page.click(selectors.monthYearSelectButton);
    await page.waitFor(selectors.monthYearSelectMenu);

    await page.$$eval('ul[role="listbox"] li', items => {
      const option = items.find(item => {
        return item.textContent === 'December 2030';
      });
      return option.click();
    });

    await page.click(selectors.rightArrow);
    const value = await page.$(selectors.monthYearSelectButton);
    const text = await page.evaluate(element => element.textContent, value);
    // (Month YearTriangle Down) because it renders an icon within the element
    expect(text).toBe('December 2030Triangle Down');
  });

  it('selects day when typed', async () => {
    await mount(page, 'datepicker');
    await page.waitFor(selectors.input);
    await page.click(selectors.input);

    // input mask
    let selectedValue = await page.$eval(selectors.input, input => input.value);
    expect(selectedValue).toBe('    /  /  ');

    // actual value
    await page.type(selectors.input, '2019/03/10');
    selectedValue = await page.$eval(selectors.input, input => input.value);
    expect(selectedValue).toBe('2019/03/10');
  });
});
