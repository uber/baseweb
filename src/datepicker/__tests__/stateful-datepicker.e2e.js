/*
Copyright (c) Uber Technologies, Inc.

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
  selected:
    '[aria-label="Choose Tuesday, February 19th 2019. It\'s available."]',
  leftArrow: '[aria-label="Previous month."]',
  rightArrow: '[aria-label="Next month."]',
  monthYearSelectButton: '[data-id="monthYearSelectButton"]',
  monthYearSelectMenu: '[data-id="monthYearSelectMenu"]',
};

describe('Stateful Datepicker', () => {
  beforeEach(async () => {
    await jestPuppeteer.resetPage();
  });

  it('passes basic a11y tests', async () => {
    await mount(page, 'datepicker--stateful');
    await page.waitForSelector(selectors.input);
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('datepicker with min max date allows browsing', async () => {
    await mount(page, 'datepicker--stateful-min-max-date');
    await page.waitForSelector(selectors.input);
    await page.click(selectors.input);
    await page.waitForSelector(selectors.calendar);
    await page.click(selectors.day);
    await page.waitForSelector(selectors.calendar, {
      hidden: true,
    });
    await page.waitForSelector(selectors.input);
    await page.click(selectors.input);
    await page.waitForSelector(selectors.calendar);
    await page.waitForSelector(selectors.leftArrow);
    let value = await page.$eval(
      selectors.leftArrow,
      (select) => select.disabled,
    );
    expect(value).toBe(false);
    await page.click(selectors.leftArrow);
    await page.waitForSelector(selectors.day, {
      hidden: true,
    });
    await page.waitForSelector(selectors.leftArrow);
    value = await page.$eval(selectors.leftArrow, (select) => select.disabled);
    expect(value).toBe(true);
    await page.waitForSelector(selectors.selected);
    await page.click(selectors.selected);
    await page.waitForSelector(selectors.input);
    await page.click(selectors.input);
    await page.waitForSelector(selectors.calendar);
    await page.waitForSelector(selectors.leftArrow);
    value = await page.$eval(selectors.leftArrow, (select) => select.disabled);
    expect(value).toBe(true);
    await page.waitForSelector(selectors.rightArrow);
    value = await page.$eval(selectors.rightArrow, (select) => select.disabled);
    expect(value).toBe(false);
  });

  it('datepicker with min max date shows valid months in header dropdown', async () => {
    await mount(page, 'datepicker--stateful-min-max-date');
    await page.waitForSelector(selectors.input);
    await page.click(selectors.input);
    await page.waitForSelector(selectors.calendar);
    const [month] = await page.$$(selectors.monthYearSelectButton);
    await month.click();
    await page.waitForSelector(selectors.monthYearSelectMenu);

    const monthOptions = await page.$$eval(
      'ul[role="listbox"] li[aria-disabled="false"]',
      (items) => {
        // Return the first and last month year option
        return [items[0].textContent, items[items.length - 1].textContent];
      },
    );

    expect(monthOptions[0]).toEqual('February');
    expect(monthOptions[1]).toEqual('March');
  });
});
