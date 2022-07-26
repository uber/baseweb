/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount, analyzeAccessibility, isSameNode } from '../../test/integration';

const selectors = {
  toast: '[role="alert"]',
  dismiss: 'svg',
  buttonDefault: 'button#default',
  buttonSameKey: 'button#same-key',
};

const isActiveEl = async (page, selector) => {
  const el = await page.evaluateHandle(() => window.document.activeElement);
  const selectedEl = await page.$(selector);
  return await isSameNode(page, el, selectedEl);
};

test.describe('toast', () => {
  test('passes basic a11y tests', async ({ page }) => {
    await mount(page, 'toast--toast');
    await page.waitForSelector(selectors.toast);
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  test('the close icon removes the notification', async ({ page }) => {
    await mount(page, 'toast--toast');
    await page.waitForSelector(selectors.toast);

    const originalNumberOfAlerts = await page.$$eval(selectors.toast, (toasts) => toasts.length);

    // close one toast with mouse click
    await page.click(selectors.dismiss);

    // close another toast with the keyboard
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    // we animate out the component
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    const updatedNumberOfAlerts = await page.$$eval(selectors.toast, (toasts) => toasts.length);

    expect(updatedNumberOfAlerts).toBe(originalNumberOfAlerts - 2);
  });

  test('opens two notifications if triggered twice (auto-generate incrementing keys)', async ({
    page,
  }) => {
    await mount(page, 'toast--toaster');
    await page.waitForSelector(selectors.buttonDefault);
    await page.click(selectors.buttonDefault);
    await page.click(selectors.buttonDefault);

    const numberOfAlerts = await page.$$eval(selectors.toast, (toasts) => toasts.length);

    expect(numberOfAlerts).toBe(2);
  });

  test('updates existing notification if the same key is provided', async ({ page }) => {
    await mount(page, 'toast--toaster');
    await page.waitForSelector(selectors.buttonSameKey);
    await page.click(selectors.buttonSameKey);
    await page.click(selectors.buttonSameKey);

    const numberOfAlerts = await page.$$eval(selectors.toast, (toasts) => {
      return toasts.length;
    });

    expect(numberOfAlerts).toBe(1);

    const toastContent = await page.$eval(selectors.toast, (toast) => {
      return toast && toast.innerText;
    });

    expect(toastContent).not.toBeNull();
    // in the scenario, the original toast text is 'not updated'
    // it is only changed to 'updated' after the first toast has popped up
    // so we check to make sure the toast contains the updated text
    expect(toastContent).toBe('updated');
  });

  test('focuses toast dismiss when autofocus is active and refocuses previously focused element on close', async ({
    browserName,
    page,
  }) => {
    test.fixme(browserName === 'webkit', 'this feature fails in webkit');

    await mount(page, 'toast--toaster-focus');
    await page.click(selectors.buttonDefault);
    await page.waitForSelector(selectors.toast);
    const isDismissActive = await isActiveEl(page, selectors.dismiss);
    expect(isDismissActive).toBe(true);
    await page.click(selectors.dismiss);
    const isButtonActive = await isActiveEl(page, selectors.buttonDefault);
    expect(isButtonActive).toBe(true);
  });
});
