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
  selected:
    '[aria-label="Choose Tuesday, February 19th 2019. It\'s available."]',
  leftArrow: '[aria-label="Previous month"]',
  rightArrow: '[aria-label="Next month"]',
};

describe('Stateful Datepicker', () => {
  it('passes basic a11y tests', async () => {
    await mount(page, 'stateful-datepicker');
    await page.waitFor(selectors.input);
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('datepicker with min max date allows browsing', async () => {
    await mount(page, 'stateful-datepicker-min-max-date');
    await page.waitFor(selectors.input);
    await page.click(selectors.input);
    await page.waitFor(selectors.calendar);
    await page.click(selectors.day);
    await page.waitFor(selectors.calendar, {
      hidden: true,
    });
    await page.waitFor(selectors.input);
    await page.click(selectors.input);
    await page.waitFor(selectors.calendar);
    await page.waitFor(selectors.leftArrow);
    let value = await page.$eval(
      selectors.leftArrow,
      select => select.disabled,
    );
    expect(value).toBe(false);
    await page.click(selectors.leftArrow);
    await page.waitFor(selectors.day, {
      hidden: true,
    });
    await page.waitFor(selectors.leftArrow);
    value = await page.$eval(selectors.leftArrow, select => select.disabled);
    expect(value).toBe(true);
    await page.waitFor(selectors.selected);
    await page.click(selectors.selected);
    await page.waitFor(selectors.input);
    await page.click(selectors.input);
    await page.waitFor(selectors.calendar);
    await page.waitFor(selectors.leftArrow);
    value = await page.$eval(selectors.leftArrow, select => select.disabled);
    expect(value).toBe(true);
    await page.waitFor(selectors.rightArrow);
    value = await page.$eval(selectors.rightArrow, select => select.disabled);
    expect(value).toBe(false);
  });
});
