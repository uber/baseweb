/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

const selectors = {
  toast: '[role="alert"]',
  dismiss: 'svg',
};

describe('toast', () => {
  it('passes basic a11y tests', async () => {
    await mount(page, 'toast');
    await page.waitFor(selectors.toast);
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('the close icon removes the notification', async () => {
    await mount(page, 'toast');
    await page.waitFor(selectors.toast);

    const originalNumberOfAlerts = await page.$$eval(
      selectors.toast,
      toasts => toasts.length,
    );

    // close one toast with mouse click
    await page.click(selectors.dismiss);

    // close another toast with the keyboard
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    // we animate out the component
    await new Promise(resolve => {
      setTimeout(resolve, 1000);
    });

    const updatedNumberOfAlerts = await page.$$eval(
      selectors.toast,
      toasts => toasts.length,
    );

    expect(updatedNumberOfAlerts).toBe(originalNumberOfAlerts - 2);
  });

  it('opens a notification', async () => {
    await mount(page, 'toaster');
    await page.waitFor('button');
    await page.click('button');

    const numberOfAlerts = await page.$$eval(
      selectors.toast,
      toasts => toasts.length,
    );

    expect(numberOfAlerts).toBe(1);
  });
});
