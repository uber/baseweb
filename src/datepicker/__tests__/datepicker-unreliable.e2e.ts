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
    const input = page.locator(selectors.input).first();
    await input.click();
    const yearSelect = page.locator(selectors.monthYearSelectButton).nth(1);
    await yearSelect.click();
    const yearSelectMenu = page.locator(selectors.monthYearSelectMenu);
    await expect(yearSelectMenu).toBeVisible();
    const option2018 = yearSelectMenu.locator('text="2018"');
    await option2018.click();
    await expect(yearSelectMenu).toBeHidden();
    await expect(page.locator(selectors.day5)).toBeVisible();
  });

  test('updates the calendar when a month selected from the dropdown', async ({ page }) => {
    await mount(page, 'datepicker--datepicker');
    const input = page.locator(selectors.input).first();
    await input.click();
    const monthSelect = page.locator(selectors.monthYearSelectButton).nth(0);
    await monthSelect.click();
    const monthSelectMenu = page.locator(selectors.monthYearSelectMenu);
    await expect(monthSelectMenu).toBeVisible();
    const optionJuly = monthSelectMenu.locator('text="July"');
    await optionJuly.click();
    await expect(monthSelectMenu).toBeHidden();
    await expect(page.locator(selectors.day6)).toBeVisible();
  });

  test('disables previous month button if minimum month is selected', async ({ page }) => {
    await mount(page, 'datepicker--datepicker');
    const input = page.locator(selectors.input).first();
    await input.click();

    const monthSelect = page.locator(selectors.monthYearSelectButton).nth(0);
    const yearSelect = page.locator(selectors.monthYearSelectButton).nth(1);
    const selectMenu = page.locator(selectors.monthYearSelectMenu);

    await yearSelect.click();
    await expect(selectMenu).toBeVisible();
    const option2000 = selectMenu.locator('text="2000"');
    await option2000.click();
    await expect(selectMenu).toBeHidden();

    await monthSelect.click();
    await expect(selectMenu).toBeVisible();
    const optionJanuary = selectMenu.locator('text="January"');
    await optionJanuary.click();
    await expect(selectMenu).toBeHidden();

    const leftArrow = page.locator(selectors.leftArrow);
    await leftArrow.click({ force: true });

    await expect(monthSelect).toHaveText('January');
  });

  test('disables next month button if maximum month is selected', async ({ page }) => {
    await mount(page, 'datepicker--datepicker');
    const input = page.locator(selectors.input).first();
    await input.click();

    const monthSelect = page.locator(selectors.monthYearSelectButton).nth(0);
    const yearSelect = page.locator(selectors.monthYearSelectButton).nth(1);
    const selectMenu = page.locator(selectors.monthYearSelectMenu);

    await yearSelect.click();
    await expect(selectMenu).toBeVisible();
    const option2030 = selectMenu.locator('text="2030"');
    await option2030.click();
    await expect(selectMenu).toBeHidden();

    await monthSelect.click();
    await expect(selectMenu).toBeVisible();
    const optionDecember = selectMenu.locator('text="December"');
    await optionDecember.click();
    await expect(selectMenu).toBeHidden();

    const rightArrow = page.locator(selectors.rightArrow);
    await rightArrow.click({ force: true });
    await expect(monthSelect).toHaveText('December');
  });

  test('selects day when typed', async ({ page }) => {
    await mount(page, 'datepicker--datepicker');
    const input = page.locator(selectors.input).first();
    await input.click();

    // input mask
    await expect(input).toHaveValue('    /  /  ');

    // actual value
    await input.fill('2019/03/10');
    await expect(input).toHaveValue('2019/03/10');
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
