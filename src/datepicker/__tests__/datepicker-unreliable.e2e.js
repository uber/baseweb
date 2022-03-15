/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const { mount } = require('../../../e2e/helpers');

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
  beforeEach(async () => {
    await jestPuppeteer.resetPage();
  });

  it('renders previous month when the left arrow is clicked', async () => {
    await mount(page, 'datepicker--datepicker');
    await page.waitForSelector(selectors.input);
    await page.click(selectors.input);
    await page.waitForSelector(selectors.leftArrow);
    await page.click(selectors.leftArrow);
    await page.waitForSelector(selectors.day, {
      hidden: true,
    });
    await page.waitForSelector(selectors.day3);
  });

  it('renders next month when the right arrow is clicked', async () => {
    await mount(page, 'datepicker--datepicker');
    await page.waitForSelector(selectors.input);
    await page.click(selectors.input);
    await page.waitForSelector(selectors.rightArrow);
    await page.click(selectors.rightArrow);
    await page.waitForSelector(selectors.day, {
      hidden: true,
    });
    await page.waitForSelector(selectors.day4);
  });

  it('updates the calendar when a year selected from the dropdown', async () => {
    await mount(page, 'datepicker--datepicker');
    await page.waitForSelector(selectors.input);
    await page.click(selectors.input);
    const [, year] = await page.$$(selectors.monthYearSelectButton);

    await year.click();
    await page.waitForSelector(selectors.monthYearSelectMenu);
    await page.$$eval('ul[role="listbox"] li', (items) => {
      const option = items.find((item) => {
        return item.textContent === '2018';
      });
      return option.click();
    });

    await page.waitForSelector(selectors.monthYearSelectMenu, { hidden: true });
    await page.waitForSelector(selectors.calendar);
    await page.waitForSelector(selectors.day5);
  });

  it('updates the calendar when a month selected from the dropdown', async () => {
    await mount(page, 'datepicker--datepicker');
    await page.waitForSelector(selectors.input);
    await page.click(selectors.input);
    const [month] = await page.$$(selectors.monthYearSelectButton);

    await month.click();
    await page.waitForSelector(selectors.monthYearSelectMenu);
    await page.$$eval('ul[role="listbox"] li', (items) => {
      const option = items.find((item) => {
        return item.textContent === 'July';
      });
      return option.click();
    });

    await page.waitForSelector(selectors.monthYearSelectMenu, { hidden: true });
    await page.waitForSelector(selectors.calendar);
    await page.waitForSelector(selectors.day6);
  });

  it('disables previous month button if minimum month is selected', async () => {
    await mount(page, 'datepicker--datepicker');
    await page.waitForSelector(selectors.input);
    await page.click(selectors.input);
    const [month, year] = await page.$$(selectors.monthYearSelectButton);

    await year.click();
    await page.waitForSelector(selectors.monthYearSelectMenu);
    await page.$$eval('ul[role="listbox"] li', (items) => {
      const option = items.find((item) => {
        return item.textContent === '2000';
      });
      return option.click();
    });

    await month.click();
    await page.waitForSelector(selectors.monthYearSelectMenu);
    await page.$$eval('ul[role="listbox"] li', (items) => {
      const option = items.find((item) => {
        return item.textContent === 'January';
      });
      return option.click();
    });

    await page.click(selectors.leftArrow);
    const value = await page.$(selectors.monthYearSelectButton);
    const text = await page.evaluate((element) => element.textContent, value);
    expect(text).toBe('January');
  });

  it('disables next month button if maximum month is selected', async () => {
    await mount(page, 'datepicker--datepicker');
    await page.waitForSelector(selectors.input);
    await page.click(selectors.input);
    const [month, year] = await page.$$(selectors.monthYearSelectButton);

    await year.click();
    await page.waitForSelector(selectors.monthYearSelectMenu);
    await page.$$eval('ul[role="listbox"] li', (items) => {
      const option = items.find((item) => {
        return item.textContent === '2030';
      });
      return option.click();
    });

    await month.click();
    await page.waitForSelector(selectors.monthYearSelectMenu);
    await page.$$eval('ul[role="listbox"] li', (items) => {
      const option = items.find((item) => {
        return item.textContent === 'December';
      });
      return option.click();
    });

    await page.click(selectors.rightArrow);
    const value = await page.$(selectors.monthYearSelectButton);
    const text = await page.evaluate((element) => element.textContent, value);
    expect(text).toBe('December');
  });

  it('selects day when typed', async () => {
    await mount(page, 'datepicker--datepicker');
    await page.waitForSelector(selectors.input);
    await page.click(selectors.input);

    // input mask
    let selectedValue = await page.$eval(selectors.input, (input) => input.value);
    expect(selectedValue).toBe('    /  /  ');

    // actual value
    await page.type(selectors.input, '2019/03/10');
    selectedValue = await page.$eval(selectors.input, (input) => input.value);
    expect(selectedValue).toBe('2019/03/10');
  });

  // TODO(williamernest): temporarily disable this test due to flakiness
  // it('selects range - verifies end of year', async () => {
  //   await mount(page, 'datepicker--range');
  //
  //   await page.waitForSelector('input');
  //   await page.click('input');
  //   await page.waitForSelector('[data-baseweb="calendar"]');
  //   await page.click('[data-id="monthYearSelectButton"]');
  //   await page.waitForSelector('[data-id="monthYearSelectMenu"]');
  //
  //   await page.$$eval('ul[role="listbox"] li', items => {
  //     const option = items.find(item => {
  //       return item.textContent === 'December 2019';
  //     });
  //     option.click();
  //     return option;
  //   });
  //
  //   await page.click(
  //     '[aria-label="Choose Wednesday, December 25th 2019. It\'s available."]',
  //   );
  //
  //   await page.click(
  //     '[aria-label="Choose Tuesday, December 31st 2019. It\'s available."]',
  //   );
  //
  //   const selectedValue = await page.$eval('input', input => input.value);
  //   expect(selectedValue).toBe('2019/12/25 – 2019/12/31');
  // });
});
