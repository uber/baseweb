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
  buttonDefault: 'button#default',
  buttonSameKey: 'button#same-key',
};

const isActiveEl = async (page, selector) => {
  // eslint-disable-next-line cup/no-undef
  const el = await page.evaluateHandle(() => window.document.activeElement);
  const selectedEl = await page.$(selector);
  const equal = await page.evaluate((e1, e2) => e1 === e2, el, selectedEl);
  return equal;
};

describe('toast', () => {
  it('passes basic a11y tests', async () => {
    await mount(page, 'toast');
    await page.waitForSelector(selectors.toast);
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('the close icon removes the notification', async () => {
    await mount(page, 'toast');
    await page.waitForSelector(selectors.toast);

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

  it('opens two notifications if triggered twice (auto-generate incrementing keys)', async () => {
    await mount(page, 'toaster');
    await page.waitForSelector(selectors.buttonDefault);
    await page.click(selectors.buttonDefault);
    await page.click(selectors.buttonDefault);

    const numberOfAlerts = await page.$$eval(
      selectors.toast,
      toasts => toasts.length,
    );

    expect(numberOfAlerts).toBe(2);
  });

  it('updates existing notification if the same key is provided', async () => {
    await mount(page, 'toaster');
    await page.waitForSelector(selectors.buttonSameKey);
    await page.click(selectors.buttonSameKey);
    await page.click(selectors.buttonSameKey);

    const numberOfAlerts = await page.$$eval(selectors.toast, toasts => {
      return toasts.length;
    });

    expect(numberOfAlerts).toBe(1);

    const toastContent = await page.$eval(selectors.toast, toast => {
      return toast && toast.innerText;
    });

    expect(toastContent).not.toBeNull();
    // in the scenario, the original toast text is 'not updated'
    // it is only changed to 'updated' after the first toast has popped up
    // so we check to make sure the toast contains the updated text
    expect(toastContent).toBe('updated');
  });

  it('focuses toast dismiss when autofocus is active and refocuses previously focused element on close', async () => {
    await mount(page, 'toaster-focus');
    await page.click(selectors.buttonDefault);
    await page.waitForSelector(selectors.toast);
    const isDismissActive = await isActiveEl(page, selectors.dismiss);
    expect(isDismissActive).toBe(true);
    await page.click(selectors.dismiss);
    const isButtonActive = await isActiveEl(page, selectors.buttonDefault);
    expect(isButtonActive).toBe(true);
  });
});
