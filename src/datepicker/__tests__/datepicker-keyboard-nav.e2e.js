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
  mar10: '[aria-label="Choose Sunday, March 10th 2019. It\'s available."]',
  mar11: '[aria-label="Choose Monday, March 11th 2019. It\'s available."]',
  apr1: '[aria-label="Choose Monday, April 1st 2019. It\'s available."]',
  apr2: '[aria-label="Choose Tuesday, April 2nd 2019. It\'s available."]',
  leftArrow: '[aria-label="Previous month."]',
  rightArrow: '[aria-label="Next month."]',
  monthYearSelectButton: '[data-id="monthYearSelectButton"]',
};

const isActiveEl = async (page, selector) => {
  // eslint-disable-next-line cup/no-undef
  const activeEl = await page.evaluateHandle(() => document.activeElement);
  const selectedEl = await page.$(selector);
  const equal = await page.evaluate(
    (e1, e2) => e1 === e2,
    activeEl,
    selectedEl,
  );
  return equal;
};

describe('Datepicker - keyboard navigation', () => {
  it('calendar is focusable and can be navigated in', async () => {
    await mount(page, 'datepicker');
    await page.waitFor(selectors.input);
    await page.focus(selectors.input);
    const isInputActive = await isActiveEl(page, selectors.input);
    expect(isInputActive).toBe(true);
    await page.waitFor(selectors.calendar);
    // march should be visible
    await page.waitFor(selectors.mar10);

    // focus the calendar
    await page.keyboard.press('ArrowDown');
    // the calendar's day is focused
    const isMar10Active = await isActiveEl(page, selectors.mar10);
    expect(isMar10Active).toBe(true);

    // navigate to the next day
    await page.keyboard.press('ArrowRight');
    // next day is focused
    const isMar11Active = await isActiveEl(page, selectors.mar11);
    expect(isMar11Active).toBe(true);

    // navigate to the calendar's header
    await page.keyboard.press('Tab');
    // previous month button is focused
    const isPrevMonthActive = await isActiveEl(page, selectors.leftArrow);
    expect(isPrevMonthActive).toBe(true);

    // tab again - month/year select is focused
    await page.keyboard.press('Tab');
    const isMonthSelectActive = await isActiveEl(
      page,
      selectors.monthYearSelectButton,
    );
    expect(isMonthSelectActive).toBe(true);

    // tab again - next month button is focused
    await page.keyboard.press('Tab');
    const isNextMonthActive = await isActiveEl(page, selectors.rightArrow);
    expect(isNextMonthActive).toBe(true);

    // press the next month button
    await page.keyboard.press('Enter');
    // make sure March is gone
    await page.waitFor(selectors.mar10, {hidden: true});
    // and make sure April is now visible
    await page.waitFor(selectors.apr1);

    // tab into the calendar
    await page.keyboard.press('Tab');
    const isApr1Active = await isActiveEl(page, selectors.apr1);
    // the calendar's day is focused
    expect(isApr1Active).toBe(true);

    // make sure calendar can be navigated
    // navigate to the next day
    await page.keyboard.press('ArrowRight');
    // next day is focused
    const isApr2Active = await isActiveEl(page, selectors.apr2);
    expect(isApr2Active).toBe(true);

    // tab into header and then back into the calendar
    // verify that the last focused day is focused again
    await page.keyboard.press('Tab');
    let isElActive = await isActiveEl(page, selectors.leftArrow);
    expect(isElActive).toBe(true);
    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await page.keyboard.up('Shift');
    isElActive = await isActiveEl(page, selectors.apr2);
    expect(isElActive).toBe(true);
  });
});
