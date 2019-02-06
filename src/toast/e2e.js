/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const scenarios = require('./examples-list');
const {getPuppeteerUrl, analyzeAccessibility} = require('../../e2e/helpers');

const suite = 'Toast Test Suite';

const selectors = {
  toast: '[role="alert"]',
  dismiss: 'svg',
};

describe(suite, () => {
  it('passes basic a11y tests', async () => {
    await page.goto(
      getPuppeteerUrl({
        suite,
        test: scenarios.TOAST_EXAMPLE,
      }),
    );
    await page.waitFor(selectors.toast);
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('the close icon removes the notification', async () => {
    await page.goto(
      getPuppeteerUrl({
        suite,
        test: scenarios.TOAST_EXAMPLE,
      }),
    );
    await page.waitFor(selectors.toast);

    const originalNumberOfAlerts = await page.$$eval(
      selectors.toast,
      toasts => toasts.length,
    );

    await page.click(selectors.dismiss);

    // we animate out the component
    await new Promise(resolve => {
      setTimeout(resolve, 1000);
    });

    const updatedNumberOfAlerts = await page.$$eval(
      selectors.toast,
      toasts => toasts.length,
    );

    expect(updatedNumberOfAlerts).toBe(originalNumberOfAlerts - 1);
  });

  it('opens a notifaction', async () => {
    await page.goto(
      getPuppeteerUrl({
        suite,
        test: scenarios.TOASTER_EXAMPLE,
      }),
    );
    await page.waitFor('button');
    await page.click('button');

    const numberOfAlerts = await page.$$eval(
      selectors.toast,
      toasts => toasts.length,
    );

    expect(numberOfAlerts).toBe(1);
  });
});
