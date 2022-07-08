/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const { mount, analyzeAccessibility } = require('../../../e2e/helpers');

const { expect, test } = require('@playwright/test');

const selectors = {
  twelveHour: '[data-e2e="12-hour"]',
  twentyFourHour: '[data-e2e="24-hour"]',
  twentyFourHourMoment: '[data-e2e="24-hour-moment"]',
  twelveHourCreatable: '[data-e2e="12-hour-creatable"]',
  twentyFourHourCreatable: '[data-e2e="24-hour-creatable"]',
  minMaxTime: '[data-e2e="with-min-and-max-time"]',
  minMaxTimeMoment: '[data-e2e="with-min-and-max-time-moment"]',
  hours: '[data-e2e="hours"]',
  minutes: '[data-e2e="minutes"]',
  input: 'input[role="combobox"]',
  dropdown: '[role="listbox"]',
  option: '[role="option"]',
  value: '[data-id="selected"]',
};

test.describe('TimePicker', () => {
  test('passes basic a11y tests', async ({ page }) => {
    await mount(page, 'timepicker--time-picker');
    await page.waitForSelector(selectors.twelveHour);
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  test('is renders expected 12 hour format times', async ({ page }) => {
    await mount(page, 'timepicker--time-picker');
    await page.waitForSelector(selectors.twelveHour);
    await page.click(`${selectors.twelveHour} ${selectors.input}`);
    await page.waitForSelector(selectors.dropdown);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    const value = await page.$eval(
      `${selectors.twelveHour} ${selectors.value}`,
      (select) => select.textContent
    );
    expect(value).toBe('1:00 AM');

    const hours = await page.$eval(
      `${selectors.twelveHour} ${selectors.hours}`,
      (select) => select.textContent
    );
    expect(hours).toBe('hour: 1');

    const minutes = await page.$eval(
      `${selectors.twelveHour} ${selectors.minutes}`,
      (select) => select.textContent
    );
    expect(minutes).toBe('minute: 0');
  });

  test('it renders only times within the min/max range', async ({ page }) => {
    await mount(page, 'timepicker--time-picker');
    await page.waitForSelector(selectors.minMaxTime);
    await page.click(`${selectors.minMaxTime} ${selectors.input}`);
    await page.waitForSelector(selectors.dropdown);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    const value = await page.$eval(
      `${selectors.minMaxTime} ${selectors.value}`,
      (select) => select.textContent
    );
    expect(value).toBe('10:00');

    const hours = await page.$eval(
      `${selectors.minMaxTime} ${selectors.hours}`,
      (select) => select.textContent
    );
    expect(hours).toBe('hour: 10');

    const minutes = await page.$eval(
      `${selectors.minMaxTime} ${selectors.minutes}`,
      (select) => select.textContent
    );
    expect(minutes).toBe('minute: 0');
  });

  test('is renders expected 24 hour format times with custom step', async ({ page }) => {
    await mount(page, 'timepicker--time-picker');
    await page.waitForSelector(selectors.twentyFourHour);
    await page.click(`${selectors.twentyFourHour} ${selectors.input}`);
    await page.waitForSelector(selectors.dropdown);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    const value = await page.$eval(
      `${selectors.twentyFourHour} ${selectors.value}`,
      (select) => select.textContent
    );

    expect(value).toBe('02:00');

    const hours = await page.$eval(
      `${selectors.twentyFourHour} ${selectors.hours}`,
      (select) => select.textContent
    );
    expect(hours).toBe('hour: 2');

    const minutes = await page.$eval(
      `${selectors.twentyFourHour} ${selectors.minutes}`,
      (select) => select.textContent
    );
    expect(minutes).toBe('minute: 0');
  });

  test('renders a date that is not one of the steps', async ({ page }) => {
    await mount(page, 'timepicker--time-picker');
    await page.waitForSelector(selectors.twelveHourCreatable);
    await page.waitForSelector(selectors.twentyFourHourCreatable);

    const twelveHourValue = await page.$eval(
      `${selectors.twelveHourCreatable} ${selectors.value}`,
      (select) => select.textContent
    );

    const twentyFourHourValue = await page.$eval(
      `${selectors.twentyFourHourCreatable} ${selectors.value}`,
      (select) => select.textContent
    );

    expect(twelveHourValue).toBe('1:11 AM');
    expect(twentyFourHourValue).toBe('01:11');
  });

  test.describe('creatable', () => {
    test('shows both AM and PM options when a 12-hour time without meridiem is entered', async ({
      page,
    }) => {
      await mount(page, 'timepicker--time-picker');
      await page.waitForSelector(selectors.twelveHourCreatable);
      await page.click(`${selectors.twelveHourCreatable} ${selectors.input}`);
      await page.waitForSelector(selectors.dropdown);
      await page.keyboard.type('3:33');

      const options = await page.$$(`${selectors.option}`);

      expect(options.length).toBe(2);
      const option1 = await page.evaluate((e) => e.textContent, options[0]);
      const option2 = await page.evaluate((e) => e.textContent, options[1]);
      expect(option1).toBe('3:33 AM');
      expect(option2).toBe('3:33 PM');
    });

    test('shows AM option when a 12-hour time with partial meridiem is entered', async ({
      page,
    }) => {
      await mount(page, 'timepicker--time-picker');
      await page.waitForSelector(selectors.twelveHourCreatable);
      await page.click(`${selectors.twelveHourCreatable} ${selectors.input}`);
      await page.waitForSelector(selectors.dropdown);
      await page.keyboard.type('3:33a');

      const options = await page.$$(`${selectors.option}`);

      expect(options.length).toBe(1);
      const option1 = await page.evaluate((e) => e.textContent, options[0]);
      expect(option1).toBe('3:33 AM');
    });

    test('generates the correct seconds for 12PM', async ({ page }) => {
      await mount(page, 'timepicker--time-picker');
      await page.waitForSelector(selectors.twelveHourCreatable);
      await page.click(`${selectors.twelveHourCreatable} ${selectors.input}`);
      await page.waitForSelector(selectors.dropdown);
      await page.keyboard.type('12:11pm');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');

      const value = await page.$eval(
        `${selectors.twelveHourCreatable} ${selectors.value}`,
        (select) => select.textContent
      );

      expect(value).toBe('12:11 PM');

      const hours = await page.$eval(
        `${selectors.twelveHourCreatable} ${selectors.hours}`,
        (select) => select.textContent
      );
      expect(hours).toBe('hour: 12');

      const minutes = await page.$eval(
        `${selectors.twelveHourCreatable} ${selectors.minutes}`,
        (select) => select.textContent
      );
      expect(minutes).toBe('minute: 11');
    });

    test('generates the correct seconds for 12AM', async ({ page }) => {
      await mount(page, 'timepicker--time-picker');
      await page.waitForSelector(selectors.twelveHourCreatable);
      await page.click(`${selectors.twelveHourCreatable} ${selectors.input}`);
      await page.waitForSelector(selectors.dropdown);
      await page.keyboard.type('12:22am');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');

      const value = await page.$eval(
        `${selectors.twelveHourCreatable} ${selectors.value}`,
        (select) => select.textContent
      );

      expect(value).toBe('12:22 AM');
    });

    test('shows an option when a 24 hour time without leading zero is entered', async ({
      page,
    }) => {
      await mount(page, 'timepicker--time-picker');
      await page.waitForSelector(selectors.twentyFourHourCreatable);
      await page.click(`${selectors.twentyFourHourCreatable} ${selectors.input}`);
      await page.waitForSelector(selectors.dropdown);
      await page.keyboard.type('3:33');

      const options = await page.$$(`${selectors.option}`);

      expect(options.length).toBe(1);
      const option1 = await page.evaluate((e) => e.textContent, options[0]);
      expect(option1).toBe('03:33');
    });

    test('shows only one option when a time is entered that matches an existing option', async ({
      page,
    }) => {
      await mount(page, 'timepicker--time-picker');
      await page.waitForSelector(selectors.twentyFourHourCreatable);
      await page.click(`${selectors.twentyFourHourCreatable} ${selectors.input}`);
      await page.waitForSelector(selectors.dropdown);
      await page.keyboard.type('00:15');

      const options = await page.$$(`${selectors.option}`);

      expect(options.length).toBe(1);
      const option1 = await page.evaluate((e) => e.textContent, options[0]);
      expect(option1).toBe('00:15');
    });
  });

  test.describe('when using moment', () => {
    test('moment - is renders expected 24 hour format times with custom step', async ({ page }) => {
      await mount(page, 'timepicker--time-picker');
      await page.waitForSelector(selectors.twentyFourHourMoment);
      await page.click(`${selectors.twentyFourHourMoment} ${selectors.input}`);
      await page.waitForSelector(selectors.dropdown);
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');

      const value = await page.$eval(
        `${selectors.twentyFourHourMoment} ${selectors.value}`,
        (select) => select.textContent
      );

      expect(value).toBe('02:00');

      const hours = await page.$eval(
        `${selectors.twentyFourHourMoment} ${selectors.hours}`,
        (select) => select.textContent
      );
      expect(hours).toBe('hour: 2');

      const minutes = await page.$eval(
        `${selectors.twentyFourHourMoment} ${selectors.minutes}`,
        (select) => select.textContent
      );
      expect(minutes).toBe('minute: 0');
    });

    test('moment - it renders only times within the min/max range', async ({ page }) => {
      await mount(page, 'timepicker--time-picker');
      await page.waitForSelector(selectors.minMaxTimeMoment);
      await page.click(`${selectors.minMaxTimeMoment} ${selectors.input}`);
      await page.waitForSelector(selectors.dropdown);
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');

      const value = await page.$eval(
        `${selectors.minMaxTimeMoment} ${selectors.value}`,
        (select) => select.textContent
      );
      expect(value).toBe('10:00');

      const hours = await page.$eval(
        `${selectors.minMaxTimeMoment} ${selectors.hours}`,
        (select) => select.textContent
      );
      expect(hours).toBe('hour: 10');

      const minutes = await page.$eval(
        `${selectors.minMaxTimeMoment} ${selectors.minutes}`,
        (select) => select.textContent
      );
      expect(minutes).toBe('minute: 0');
    });
  });
});
