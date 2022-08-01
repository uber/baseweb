/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount, analyzeAccessibility } from '../../test/integration';

test.describe('tree view', () => {
  test('passes basic a11y tests', async ({ page }) => {
    await mount(page, 'tree-view--tree-view');
    const accessibilityReport = await analyzeAccessibility(page);

    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  test('renderall: renders children even when hidden: with renderAll prop', async ({ page }) => {
    await mount(page, 'tree-view--render-all');
    expect((await page.$$("//div[contains(text(), 'hidden')]")).length).not.toBe(0);
  });

  test('singleExpanded: only have one node sibling isExpanded at a time', async ({ page }) => {
    await mount(page, 'tree-view--single-expanded');
    expect((await page.$$("//div[contains(text(), 'Child 1.1')]")).length).not.toBe(0);
    expect((await page.$$("//div[contains(text(), 'Child 2.1')]")).length).toBe(0);
    const parentNode = (await page.$$("//div[contains(text(), 'Node 2')]"))[0];
    expect(parentNode).toBeTruthy();
    await parentNode.click();
    expect((await page.$$("//div[contains(text(), 'Child 2.1')]")).length).not.toBe(0);
    expect((await page.$$("//div[contains(text(), 'Child 1.1')]")).length).toBe(0);
  });

  test('interactable elements in tree node label', async ({ page }) => {
    const checkbox = '[data-baseweb="checkbox"]';
    const checkboxInput = '[data-baseweb="checkbox"] input';
    await mount(page, 'tree-view--interactable');
    await page.waitForSelector(checkbox);
    let isChecked = await page.$eval(
      checkboxInput,
      (i) => i instanceof HTMLInputElement && i.checked === true
    );
    expect(isChecked).toBe(false);
    await page.click(checkbox);
    isChecked = await page.$eval(
      checkboxInput,
      (i) => i instanceof HTMLInputElement && i.checked === true
    );
    expect(isChecked).toBe(true);
  });

  test('type-ahead works normal', async ({ page }) => {
    await mount(page, 'tree-view--tree-view');
    await page.mouse.click(50, 20);
    await page.mouse.click(50, 20);
    await page.keyboard.press('g');
    const highlightedSelector = '[tabindex="0"]';
    const highlightedItem = await page.$(highlightedSelector);
    const text = await page.evaluate(
      (item) => (item ? item.textContent : 'NOT_FOUND'),
      highlightedItem
    );
    expect(text).toBe('BlankGrandchild 1');
  });
});
