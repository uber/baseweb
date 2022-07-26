/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount, analyzeAccessibility } from '../../test/integration';

const selectors = {
  enqueueOne: 'button[data-testid="queue-one"]',
  enqueueThree: 'button[data-testid="queue-three"]',
  root: 'div[data-testid="snackbar-root"]',
};

function wait(ms) {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}

test.describe('snackbar', () => {
  test('passes basic a11y tests', async ({ page }) => {
    await mount(page, 'snackbar--provider');
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  test('displays and hides single snackbar', async ({ page }) => {
    await mount(page, 'snackbar--provider');

    const before = await page.$(selectors.root);
    expect(before).toBeNull();

    const enqueue = await page.$(selectors.enqueueOne);
    await enqueue.click();

    await page.waitForSelector(selectors.root);

    await page.waitForSelector(selectors.root, { state: 'hidden' });
  });

  test('displays only one snackbar at a time', async ({ page }) => {
    await mount(page, 'snackbar--provider');

    const enqueue = await page.$(selectors.enqueueOne);
    await enqueue.click();
    await enqueue.click();
    await enqueue.click();

    await page.waitForSelector(selectors.root);

    const elements = await page.$$(selectors.root);
    // 2 because of off-screen render for measurement
    expect(elements.length).toBe(2);
  });

  test('hides snackbar on action click', async ({ page }) => {
    await mount(page, 'snackbar--provider');

    const enqueue = await page.$(selectors.enqueueOne);
    await enqueue.click();

    await wait(1500);

    const actions = await page.$$(`${selectors.root} button`);
    await actions[1].click();

    // normally, the snackbar would hide after 3000ms, 1000 for the animate out
    await wait(1500);

    const snackbar = await page.$(selectors.root);
    expect(snackbar).toBeNull();
  });

  test('handles asynchronous enqueue', async ({ page }) => {
    await mount(page, 'snackbar--async');
    await page.click(selectors.enqueueOne);

    await page.waitForFunction(() => {
      const el = document.querySelector('div[data-testid="snackbar-root"]');
      return el && el.textContent === '1';
    });

    await page.waitForFunction(() => {
      const el = document.querySelector('div[data-testid="snackbar-root"]');
      return el && el.textContent === '2';
    });

    await page.waitForFunction(() => {
      const el = document.querySelector('div[data-testid="snackbar-root"]');
      return el && el.textContent === '3';
    });

    await page.waitForFunction(() => {
      const el = document.querySelector('div[data-testid="snackbar-root"]');
      return el && el.textContent === '4';
    });

    await page.waitForFunction(() => {
      const el = document.querySelector('div[data-testid="snackbar-root"]');
      return el && el.textContent === '5';
    });
  });
});
