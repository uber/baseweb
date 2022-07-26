/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount } from '../../test/integration';

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

test.describe('Datepicker', () => {
  test('renders previous month when the left arrow is clicked', async ({ page }) => {
    await mount(page, 'datepicker--datepicker');
    await page.waitForSelector(selectors.input);
    await page.click(selectors.input);
    await page.waitForSelector(selectors.leftArrow);
    await page.click(selectors.leftArrow);
    await page.waitForSelector(selectors.day, {
      state: 'hidden',
    });
    await page.waitForSelector(selectors.day3);
  });

  test('renders next month when the right arrow is clicked', async ({ page }) => {
    await mount(page, 'datepicker--datepicker');
    await page.waitForSelector(selectors.input);
    await page.click(selectors.input);
    await page.waitForSelector(selectors.rightArrow);
    await page.click(selectors.rightArrow);
    await page.waitForSelector(selectors.day, {
      state: 'hidden',
    });
    await page.waitForSelector(selectors.day4);
  });

  test('updates the calendar when a year selected from the dropdown', async ({ page }) => {
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

    await page.waitForSelector(selectors.monthYearSelectMenu, { state: 'hidden' });
    await page.waitForSelector(selectors.calendar);
    await page.waitForSelector(selectors.day5);
  });

  test('updates the calendar when a month selected from the dropdown', async ({ page }) => {
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

    await page.waitForSelector(selectors.monthYearSelectMenu, { state: 'hidden' });
    await page.waitForSelector(selectors.calendar);
    await page.waitForSelector(selectors.day6);
  });

  test('disables previous month button if minimum month is selected', async ({ page }) => {
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

    await page.click(selectors.leftArrow, { force: true });
    const value = await page.$(selectors.monthYearSelectButton);
    const text = await page.evaluate((element) => element.textContent, value);
    expect(text).toBe('January');
  });

  test('disables next month button if maximum month is selected', async ({ page }) => {
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

    await page.click(selectors.rightArrow, { force: true });
    const value = await page.$(selectors.monthYearSelectButton);
    const text = await page.evaluate((element) => element.textContent, value);
    expect(text).toBe('December');
  });

  test('selects day when typed', async ({ page }) => {
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
