/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

const selectors = {
  calendar: '[data-baseweb="calendar"]',
  day0: '[aria-label="Choose Friday, February 22nd 2019. It\'s available."]',
  day: '[aria-label="Choose Saturday, February 23rd 2019. It\'s available."]',
  day1: '[aria-label="Choose Thursday, February 21st 2019. It\'s available."]',
  day2: '[aria-label="Choose Friday, February 15th 2019. It\'s available."]',
  day3: '[aria-label="Choose Friday, March 1st 2019. It\'s available."]',
  day4: '[aria-label="Choose Sunday, February 17th 2019. It\'s available."]',
  day5: '[aria-label="Choose Friday, March 22nd 2019. It\'s available."]',
  day6: '[aria-label="Choose Tuesday, January 22nd 2019. It\'s available."]',
};
const isActiveEl = async (page, selector) => {
  // eslint-disable-next-line cup/no-undef
  const el = await page.evaluateHandle(() => window.document.activeElement);
  const selectedEl = await page.$(selector);
  const equal = await page.evaluate((e1, e2) => e1 === e2, el, selectedEl);
  return equal;
};

describe('Calendar', () => {
  it('calendar passes basic a11y tests', async () => {
    await mount(page, 'calendar');
    await page.waitFor(selectors.calendar);
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });
  const waitTillDay = async page => {
    await mount(page, 'calendar');
    await page.waitFor(selectors.calendar);
    await page.waitFor(selectors.day0);
    await page.focus(selectors.day0);
  };

  it('navigates to next day on ArrowRight key press', async () => {
    await waitTillDay(page);
    await page.keyboard.press('ArrowRight');
    const isdayActive = await isActiveEl(page, selectors.day);
    expect(isdayActive).toBe(true);
  });
  it('navigates to prev day on ArrowLeft key press', async () => {
    await waitTillDay(page);
    await page.keyboard.press('ArrowLeft');
    const isday1Active = await isActiveEl(page, selectors.day1);
    expect(isday1Active).toBe(true);
  });

  it('navigates to prev week on ArrowUp key press', async () => {
    await waitTillDay(page);
    await page.keyboard.press('ArrowUp');
    const isday2Active = await isActiveEl(page, selectors.day2);
    expect(isday2Active).toBe(true);
  });

  it('navigates to prev week on ArrowDown key press', async () => {
    await waitTillDay(page);
    await page.keyboard.press('ArrowDown');
    const isday3Active = await isActiveEl(page, selectors.day3);
    expect(isday3Active).toBe(true);
  });

  it('navigates to start of week on Home key press', async () => {
    await waitTillDay(page);
    await page.keyboard.press('Home');
    const isday4Active = await isActiveEl(page, selectors.day4);
    expect(isday4Active).toBe(true);
  });
  it('navigates to end of week on End key press', async () => {
    await waitTillDay(page);
    await page.keyboard.press('End');
    const isdayActive = await isActiveEl(page, selectors.day);
    expect(isdayActive).toBe(true);
  });
  it('navigates to prev month on PageUp key press', async () => {
    await waitTillDay(page);
    await page.keyboard.press('PageUp');
    const isday6Active = await isActiveEl(page, selectors.day6);
    expect(isday6Active).toBe(true);
  });
  it('navigates to next month on PageDown key press', async () => {
    await waitTillDay(page);
    await page.keyboard.press('PageDown');
    const isday5Active = await isActiveEl(page, selectors.day5);
    expect(isday5Active).toBe(true);
  });
});
