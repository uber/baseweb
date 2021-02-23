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
  mar12: '[aria-label="Choose Tuesday, March 12th 2019. It\'s available."]',
  mar12Selected:
    '[aria-label="Selected start date. Tuesday, March 12th 2019. It\'s available."]',
  mar14: '[aria-label="Choose Thursday, March 14th 2019. It\'s available."]',
  mar16: '[aria-label="Choose Saturday, March 16th 2019. It\'s available."]',
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
  activeEl.dispose();
  return equal;
};

describe('Datepicker - keyboard navigation', () => {
  it('calendar is focusable and can be navigated in', async () => {
    await mount(page, 'datepicker--datepicker');
    await page.waitForSelector(selectors.input);
    await page.focus(selectors.input);
    const isInputActive = await isActiveEl(page, selectors.input);
    expect(isInputActive).toBe(true);
    await page.waitForSelector(selectors.calendar);
    // march should be visible
    await page.waitForSelector(selectors.mar10);

    // focus the calendar
    await page.keyboard.press('ArrowDown');
    // the calendar's day is focused
    const isMar10Active = await isActiveEl(page, selectors.mar10);
    expect(isMar10Active).toBe(true);

    // navigate to the next day
    await page.keyboard.press('ArrowRight');
    // navigate to the next day
    await page.keyboard.press('ArrowRight');
    // Mar 12 is focused
    const isMar12Active = await isActiveEl(page, selectors.mar12);
    expect(isMar12Active).toBe(true);

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
    await page.waitForSelector(selectors.mar10, {hidden: true});
    // and make sure April is now visible
    await page.waitForSelector(selectors.apr1);

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

  it('calendar sets highlighted date appropriately when selecting a new date or navigating around', async () => {
    await mount(page, 'datepicker--range-highlight');
    await page.waitForSelector(selectors.input);
    // open the calendar by moving focus into input
    await page.focus(selectors.input);
    let isInputActive = await isActiveEl(page, selectors.input);
    expect(isInputActive).toBe(true);
    await page.waitForSelector(selectors.calendar);
    // march should be visible
    await page.waitForSelector(selectors.mar10);

    // focus the calendar
    await page.keyboard.press('ArrowDown');
    // the initially preset through the props highlighted date (Mar 10)
    // is highlighted and focused when calendar gets opened and no date selected
    const isMar10Active = await isActiveEl(page, selectors.mar10);
    expect(isMar10Active).toBe(true);

    // navigate to the Mar 12 and select the date
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    // Mar 12 is focused
    let isMar12Active = await isActiveEl(page, selectors.mar12);
    expect(isMar12Active).toBe(true);
    // select Mar 12
    await page.keyboard.press('Enter');

    // check that calendar stays opened
    await page.waitForSelector(selectors.calendar);

    // check that Mar 12 is still an active element
    isMar12Active = await isActiveEl(page, selectors.mar12Selected);
    expect(isMar12Active).toBe(true);

    // check that selected date shows up in the input
    let inputValue = await page.$eval(selectors.input, input => input.value);
    // get rid of any whitespaces in the value to compare
    expect(inputValue.replace(/\s/g, '')).toBe('2019/03/12–//');

    // navigate to the Mar 16 and select the second date
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    // Mar 16 is focused
    const isMar16Active = await isActiveEl(page, selectors.mar16);
    expect(isMar16Active).toBe(true);
    // select Mar 16
    await page.keyboard.press('Enter');

    // check that calendar is closed and input gets focus
    await page.waitForSelector(selectors.calendar, {hidden: true});
    isInputActive = await isActiveEl(page, selectors.input);
    expect(isInputActive).toBe(true);

    // check that selected date shows up in the input
    inputValue = await page.$eval(selectors.input, input => input.value);
    // get rid of any whitespaces in the value to compare
    expect(inputValue.replace(/\s/g, '')).toBe('2019/03/12–2019/03/16');

    // open the calendar again
    await page.keyboard.press('ArrowDown');
    await page.waitForSelector(selectors.calendar);
    // focus the calendar
    await page.keyboard.press('ArrowDown');
    // check that the first date (Mar 12) in the selected range is active
    isMar12Active = await isActiveEl(page, selectors.mar12Selected);
    expect(isMar12Active).toBe(true);

    // Now we'll check that with keyboard navigation the highlighted/focusable
    // date is set appropriately and doesn't jump between options like
    // the first day of the month, preset highlighted date, or selected date.

    // Navigating out of the calendar into its header and then back into the calendar
    // preserves the last highlighted day as highlighted/focusable.

    // navigate to the calendar's header
    await page.keyboard.press('Tab');
    // previous month button is focused
    let isPrevMonthActive = await isActiveEl(page, selectors.leftArrow);
    expect(isPrevMonthActive).toBe(true);

    // navigate back into the calendar
    // verify that the last focused day (Mar 12) is focused again
    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await page.keyboard.up('Shift');
    isMar12Active = await isActiveEl(page, selectors.mar12Selected);
    expect(isMar12Active).toBe(true);

    // navigate to a different day to check later that
    // the last highlighted date is preserved
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    let isMar14Active = await isActiveEl(page, selectors.mar14);
    expect(isMar14Active).toBe(true);

    // navigate to the calendar's header
    await page.keyboard.press('Tab');
    // previous month button is focused
    isPrevMonthActive = await isActiveEl(page, selectors.leftArrow);
    expect(isPrevMonthActive).toBe(true);

    // navigate back into the calendar
    // verify that the last focused day (Mar 14) is focused again
    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await page.keyboard.up('Shift');
    isMar14Active = await isActiveEl(page, selectors.mar14);
    expect(isMar14Active).toBe(true);

    // Navigate to a different month that doesn't have a beginning or
    // end date of the selected range in it and verify that the first
    // day of the month gets the highlight/focus.

    // Tab to the next month button
    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await page.keyboard.up('Shift');
    const isNextMonthActive = await isActiveEl(page, selectors.rightArrow);
    expect(isNextMonthActive).toBe(true);

    // press the next month button
    await page.keyboard.press('Enter');
    // make sure March is gone
    await page.waitForSelector(selectors.mar14, {hidden: true});
    // and make sure April is now visible
    await page.waitForSelector(selectors.apr1);

    // tab into the calendar
    await page.keyboard.press('Tab');
    const isApr1Active = await isActiveEl(page, selectors.apr1);
    // the first calendar's day is focused
    expect(isApr1Active).toBe(true);

    // Navigate back to March with a selected range in it
    // and verify that this time it highlights the beginning date of
    // the selected range (and not the last focused day in March before
    // we switched to April, nor the preset in the initial props
    // highlighted date in March).

    // Tab to the previous month button
    await page.keyboard.press('Tab');
    isPrevMonthActive = await isActiveEl(page, selectors.leftArrow);
    expect(isPrevMonthActive).toBe(true);
    // press the prev month button
    await page.keyboard.press('Enter');
    // make sure April is gone
    await page.waitForSelector(selectors.apr1, {hidden: true});
    // and make sure March is now visible
    await page.waitForSelector(selectors.mar10);

    // navigate back into the calendar and check the focused date
    // to be the beginning of the selected range (Mar 12)
    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await page.keyboard.up('Shift');
    isMar12Active = await isActiveEl(page, selectors.mar12Selected);
    expect(isMar12Active).toBe(true);
  });
});
