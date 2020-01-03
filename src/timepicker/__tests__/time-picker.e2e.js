/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

const selectors = {
  twelveHour: '[data-e2e="12-hour"]',
  twentyFourHour: '[data-e2e="24-hour"]',
  twelveHourCreatable: '[data-e2e="12-hour-creatable"]',
  twentyFourHourCreatable: '[data-e2e="24-hour-creatable"]',
  hours: '[data-e2e="hours"]',
  minutes: '[data-e2e="minutes"]',
  input: 'input[role="combobox"]',
  dropdown: '[role="listbox"]',
  option: '[role="option"]',
  value: '[data-id="selected"]',
};

describe('TimePicker', () => {
  it('passes basic a11y tests', async () => {
    await mount(page, 'time-picker');
    await page.waitFor(selectors.twelveHour);
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('is renders expected 12 hour format times', async () => {
    await mount(page, 'time-picker');
    await page.waitFor(selectors.twelveHour);
    await page.click(`${selectors.twelveHour} ${selectors.input}`);
    await page.waitFor(selectors.dropdown);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    const value = await page.$eval(
      `${selectors.twelveHour} ${selectors.value}`,
      select => select.textContent,
    );
    expect(value).toBe('1:00 AM');

    const hours = await page.$eval(
      `${selectors.twelveHour} ${selectors.hours}`,
      select => select.textContent,
    );
    expect(hours).toBe('hour: 1');

    const minutes = await page.$eval(
      `${selectors.twelveHour} ${selectors.minutes}`,
      select => select.textContent,
    );
    expect(minutes).toBe('minute: 0');
  });

  it('is renders expected 24 hour format times with custom step', async () => {
    await mount(page, 'time-picker');
    await page.waitFor(selectors.twentyFourHour);
    await page.click(`${selectors.twentyFourHour} ${selectors.input}`);
    await page.waitFor(selectors.dropdown);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    const value = await page.$eval(
      `${selectors.twentyFourHour} ${selectors.value}`,
      select => select.textContent,
    );

    expect(value).toBe('02:00');

    const hours = await page.$eval(
      `${selectors.twentyFourHour} ${selectors.hours}`,
      select => select.textContent,
    );
    expect(hours).toBe('hour: 2');

    const minutes = await page.$eval(
      `${selectors.twentyFourHour} ${selectors.minutes}`,
      select => select.textContent,
    );
    expect(minutes).toBe('minute: 0');
  });

  it('renders a date that is not one of the steps', async () => {
    await mount(page, 'time-picker');
    await page.waitFor(selectors.twelveHourCreatable);
    await page.waitFor(selectors.twentyFourHourCreatable);

    const twelveHourValue = await page.$eval(
      `${selectors.twelveHourCreatable} ${selectors.value}`,
      select => select.textContent,
    );

    const twentyFourHourValue = await page.$eval(
      `${selectors.twentyFourHourCreatable} ${selectors.value}`,
      select => select.textContent,
    );

    expect(twelveHourValue).toBe('1:11 AM');
    expect(twentyFourHourValue).toBe('01:11');
  });

  describe('creatable', () => {
    it('shows both AM and PM options when a 12-hour time without meridiem is entered', async () => {
      await mount(page, 'time-picker');
      await page.waitFor(selectors.twelveHourCreatable);
      await page.click(`${selectors.twelveHourCreatable} ${selectors.input}`);
      await page.waitFor(selectors.dropdown);
      await page.keyboard.type('3:33');

      const options = await page.$$(`${selectors.option}`);

      expect(options.length).toBe(2);
      const option1 = await page.evaluate(e => e.textContent, options[0]);
      const option2 = await page.evaluate(e => e.textContent, options[1]);
      expect(option1).toBe('3:33 AM');
      expect(option2).toBe('3:33 PM');
    });

    it('shows AM option when a 12-hour time with partial meridiem is entered', async () => {
      await mount(page, 'time-picker');
      await page.waitFor(selectors.twelveHourCreatable);
      await page.click(`${selectors.twelveHourCreatable} ${selectors.input}`);
      await page.waitFor(selectors.dropdown);
      await page.keyboard.type('3:33a');

      const options = await page.$$(`${selectors.option}`);

      expect(options.length).toBe(1);
      const option1 = await page.evaluate(e => e.textContent, options[0]);
      expect(option1).toBe('3:33 AM');
    });

    it('generates the correct seconds for 12PM', async () => {
      await mount(page, 'time-picker');
      await page.waitFor(selectors.twelveHourCreatable);
      await page.click(`${selectors.twelveHourCreatable} ${selectors.input}`);
      await page.waitFor(selectors.dropdown);
      await page.keyboard.type('12:11pm');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');

      const value = await page.$eval(
        `${selectors.twelveHourCreatable} ${selectors.value}`,
        select => select.textContent,
      );

      expect(value).toBe('12:11 PM');

      const hours = await page.$eval(
        `${selectors.twelveHourCreatable} ${selectors.hours}`,
        select => select.textContent,
      );
      expect(hours).toBe('hour: 12');

      const minutes = await page.$eval(
        `${selectors.twelveHourCreatable} ${selectors.minutes}`,
        select => select.textContent,
      );
      expect(minutes).toBe('minute: 11');
    });

    it('generates the correct seconds for 12AM', async () => {
      await mount(page, 'time-picker');
      await page.waitFor(selectors.twelveHourCreatable);
      await page.click(`${selectors.twelveHourCreatable} ${selectors.input}`);
      await page.waitFor(selectors.dropdown);
      await page.keyboard.type('12:22am');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');

      const value = await page.$eval(
        `${selectors.twelveHourCreatable} ${selectors.value}`,
        select => select.textContent,
      );

      expect(value).toBe('12:22 AM');
    });

    it('shows an option when a 24 hour time without leading zero is entered', async () => {
      await mount(page, 'time-picker');
      await page.waitFor(selectors.twentyFourHourCreatable);
      await page.click(
        `${selectors.twentyFourHourCreatable} ${selectors.input}`,
      );
      await page.waitFor(selectors.dropdown);
      await page.keyboard.type('3:33');

      const options = await page.$$(`${selectors.option}`);

      expect(options.length).toBe(1);
      const option1 = await page.evaluate(e => e.textContent, options[0]);
      expect(option1).toBe('03:33');
    });

    it('shows only one option when a time is entered that matches an existing option', async () => {
      await mount(page, 'time-picker');
      await page.waitFor(selectors.twentyFourHourCreatable);
      await page.click(
        `${selectors.twentyFourHourCreatable} ${selectors.input}`,
      );
      await page.waitFor(selectors.dropdown);
      await page.keyboard.type('00:15');

      const options = await page.$$(`${selectors.option}`);

      expect(options.length).toBe(1);
      const option1 = await page.evaluate(e => e.textContent, options[0]);
      expect(option1).toBe('00:15');
    });
  });
});
