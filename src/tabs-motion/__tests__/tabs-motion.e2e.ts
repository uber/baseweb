/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount, analyzeAccessibility, isSameNode } from '../../test/integration';

const getTabs = (page) => page.$$('[role=tab]');

const getTabPanels = (page) => page.$$('[role=tabpanel]');

const isHidden = (page, t) => {
  return page.evaluate((tab) => tab.hidden, t);
};

const isSelected = (page, t) => {
  return page.evaluate((tab) => tab.getAttribute('aria-selected') === 'true', t);
};

const isActiveEl = async (page, el) => {
  const activeEl = await page.evaluateHandle(`document.activeElement`);
  const result = await isSameNode(activeEl, el);
  activeEl.dispose();
  return result;
};

test.describe('tabs', () => {
  test('passes basic a11y tests', async ({ page }) => {
    await mount(page, 'tabs-motion--tabs-motion');
    await page.waitForSelector('[role="tab"]');
    const accessibilityReport = await analyzeAccessibility(page);
    // @ts-expect-error todo(starr): unsure how to fix
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  test('only the selected tab has visible content', async ({ page }) => {
    await mount(page, 'tabs-motion--tabs-motion');
    const tabs = await getTabs(page);
    const tabPanels = await getTabPanels(page);
    expect(await isSelected(page, tabs[0])).toBeTruthy();
    expect(await isHidden(page, tabPanels[0])).toBeFalsy();
    expect(await isSelected(page, tabs[1])).toBeFalsy();
    expect(await isHidden(page, tabPanels[1])).toBeTruthy();
    expect(await isSelected(page, tabs[2])).toBeFalsy();
    expect(await isHidden(page, tabPanels[2])).toBeTruthy();
  });

  test('*click* selects tab', async ({ page }) => {
    await mount(page, 'tabs-motion--tabs-motion');
    const tabs = await getTabs(page);
    expect(await isSelected(page, tabs[0])).toBeTruthy();
    await tabs[1].click();
    expect(await isSelected(page, tabs[1])).toBeTruthy();
  });

  test('*click* does not select disabled tab', async ({ page }) => {
    await mount(page, 'tabs-motion--disabled');
    const tabs = await getTabs(page);
    expect(await isSelected(page, tabs[0])).toBeTruthy();
    await tabs[1].click({ force: true });
    expect(await isSelected(page, tabs[0])).toBeTruthy();
  });

  test('does not mount non selected tab content', async ({ page }) => {
    await mount(page, 'tabs-motion--tabs-motion');
    const tabs = await getTabs(page);
    expect(await isSelected(page, tabs[0])).toBeTruthy();
    expect(await page.evaluate(`window.__e2e__mounted`)).toBe(false);
  });

  test('[renderAll] mounts non selected tab content', async ({ page }) => {
    await mount(page, 'tabs-motion--render-all');
    const tabs = await getTabs(page);
    expect(await isSelected(page, tabs[0])).toBeTruthy();
    expect(await page.evaluate(`window.__e2e__mounted`)).toBe(true);
  });

  test('{regression} conditional tab does not throw error', async ({ page }) => {
    await mount(page, 'tabs-motion--conditional');
    const button = await page.$('#toggle-robot-tab');
    let firstTab = await page.$('#tabs-conditional-tab-robot');
    expect(firstTab).toBeFalsy();
    await button.click();
    firstTab = await page.$('#tabs-conditional-tab-robot');
    expect(firstTab).toBeTruthy();
    expect(await page.evaluate(`window.__e2e__error`)).toBe(false);
  });

  test('*tab* moves focus to active tab', async ({ page }) => {
    await mount(page, 'tabs-motion--focus');
    const firstFocusElement = await page.$('#first-focus');
    await firstFocusElement.focus();
    expect(await isActiveEl(page, firstFocusElement)).toBeTruthy();
    await page.keyboard.press('Tab');
    const tabs = await getTabs(page);
    expect(await isActiveEl(page, tabs[1])).toBeTruthy();
  });

  test('*tab* moves focus to tab content', async ({ page }) => {
    await mount(page, 'tabs-motion--focus');
    const tabs = await getTabs(page);
    await tabs[1].focus();
    expect(await isActiveEl(page, tabs[1])).toBeTruthy();
    await page.keyboard.press('Tab');
    const tabContent = await page.$('#tab-content');
    expect(await isActiveEl(page, tabContent)).toBeTruthy();
  });

  test('*direction* moves focus to tab and selects tab', async ({ page }) => {
    await mount(page, 'tabs-motion--tabs-motion');
    const tabs = await getTabs(page);
    await tabs[0].focus();
    expect(await isActiveEl(page, tabs[0])).toBeTruthy();
    expect(await isSelected(page, tabs[0])).toBeTruthy();
    await page.keyboard.press('ArrowRight');
    expect(await isActiveEl(page, tabs[1])).toBeTruthy();
    expect(await isSelected(page, tabs[1])).toBeTruthy();
  });

  test('*direction* moves focus to tab and *enter* selects tab when [manual]', async ({ page }) => {
    await mount(page, 'tabs-motion--manual');
    const tabs = await getTabs(page);
    await tabs[0].focus();
    expect(await isActiveEl(page, tabs[0])).toBeTruthy();
    expect(await isSelected(page, tabs[0])).toBeTruthy();
    await page.keyboard.press('ArrowRight');
    expect(await isActiveEl(page, tabs[1])).toBeTruthy();
    expect(await isSelected(page, tabs[0])).toBeTruthy();
    await page.keyboard.press('Enter');
    expect(await isSelected(page, tabs[1])).toBeTruthy();
  });

  test('*direction* moves focus to tab and *space* selects tab when [manual]', async ({ page }) => {
    await mount(page, 'tabs-motion--manual');
    const tabs = await getTabs(page);
    await tabs[0].focus();
    expect(await isActiveEl(page, tabs[0])).toBeTruthy();
    expect(await isSelected(page, tabs[0])).toBeTruthy();
    await page.keyboard.press('ArrowRight');
    expect(await isActiveEl(page, tabs[1])).toBeTruthy();
    expect(await isSelected(page, tabs[0])).toBeTruthy();
    await page.keyboard.press('Space');
    expect(await isSelected(page, tabs[1])).toBeTruthy();
  });

  test('*direction* moves focus and skips disabled tabs', async ({ page }) => {
    await mount(page, 'tabs-motion--disabled');
    const tabs = await getTabs(page);
    await tabs[0].focus();
    expect(await isActiveEl(page, tabs[0])).toBeTruthy();
    expect(await isSelected(page, tabs[0])).toBeTruthy();
    await page.keyboard.press('ArrowRight');
    expect(await isActiveEl(page, tabs[2])).toBeTruthy();
    expect(await isSelected(page, tabs[2])).toBeTruthy();
  });

  test('ltr *direction* moves focus to next tab', async ({ page }) => {
    await mount(page, 'tabs-motion--tabs-motion');
    const tabs = await getTabs(page);
    await tabs[0].focus();
    expect(await isActiveEl(page, tabs[0])).toBeTruthy();
    await page.keyboard.press('ArrowRight');
    expect(await isActiveEl(page, tabs[1])).toBeTruthy();
  });

  test('ltr *direction* moves focus to previous tab', async ({ page }) => {
    await mount(page, 'tabs-motion--tabs-motion');
    const tabs = await getTabs(page);
    await tabs[1].focus();
    expect(await isActiveEl(page, tabs[1])).toBeTruthy();
    await page.keyboard.press('ArrowLeft');
    expect(await isActiveEl(page, tabs[0])).toBeTruthy();
  });

  test('ltr *direction* moves focus to first tab', async ({ page }) => {
    await mount(page, 'tabs-motion--tabs-motion');
    const tabs = await getTabs(page);
    await tabs[2].focus();
    expect(await isActiveEl(page, tabs[2])).toBeTruthy();
    await page.keyboard.press('ArrowRight');
    expect(await isActiveEl(page, tabs[0])).toBeTruthy();
  });

  test('ltr *direction* moves focus to last tab', async ({ page }) => {
    await mount(page, 'tabs-motion--tabs-motion');
    const tabs = await getTabs(page);
    await tabs[0].focus();
    expect(await isActiveEl(page, tabs[0])).toBeTruthy();
    await page.keyboard.press('ArrowLeft');
    expect(await isActiveEl(page, tabs[2])).toBeTruthy();
  });

  test('rtl *direction* moves focus to next tab', async ({ page }) => {
    await mount(page, 'tabs-motion--tabs-motion', 'light', true);
    const tabs = await getTabs(page);
    await tabs[0].focus();
    expect(await isActiveEl(page, tabs[0])).toBeTruthy();
    await page.keyboard.press('ArrowLeft');
    expect(await isActiveEl(page, tabs[1])).toBeTruthy();
  });

  test('rtl *direction* moves focus to previous tab', async ({ page }) => {
    await mount(page, 'tabs-motion--tabs-motion', 'light', true);
    const tabs = await getTabs(page);
    await tabs[1].focus();
    expect(await isActiveEl(page, tabs[1])).toBeTruthy();
    await page.keyboard.press('ArrowRight');
    expect(await isActiveEl(page, tabs[0])).toBeTruthy();
  });

  test('rtl *direction* moves focus to first tab', async ({ page }) => {
    await mount(page, 'tabs-motion--tabs-motion', 'light', true);
    const tabs = await getTabs(page);
    await tabs[2].focus();
    expect(await isActiveEl(page, tabs[2])).toBeTruthy();
    await page.keyboard.press('ArrowLeft');
    expect(await isActiveEl(page, tabs[0])).toBeTruthy();
  });

  test('rtl *direction* moves focus to last tab', async ({ page }) => {
    await mount(page, 'tabs-motion--tabs-motion', 'light', true);
    const tabs = await getTabs(page);
    await tabs[0].focus();
    expect(await isActiveEl(page, tabs[0])).toBeTruthy();
    await page.keyboard.press('ArrowRight');
    expect(await isActiveEl(page, tabs[2])).toBeTruthy();
  });

  test('vertical *direction* moves focus to next tab', async ({ page }) => {
    await mount(page, 'tabs-motion--vertical');
    const tabs = await getTabs(page);
    await tabs[0].focus();
    expect(await isActiveEl(page, tabs[0])).toBeTruthy();
    await page.keyboard.press('ArrowDown');
    expect(await isActiveEl(page, tabs[1])).toBeTruthy();
  });

  test('vertical *direction* moves focus to previous tab', async ({ page }) => {
    await mount(page, 'tabs-motion--vertical');
    const tabs = await getTabs(page);
    await tabs[1].focus();
    expect(await isActiveEl(page, tabs[1])).toBeTruthy();
    await page.keyboard.press('ArrowUp');
    expect(await isActiveEl(page, tabs[0])).toBeTruthy();
  });

  test('vertical *direction* moves focus to first tab', async ({ page }) => {
    await mount(page, 'tabs-motion--vertical');
    const tabs = await getTabs(page);
    await tabs[2].focus();
    expect(await isActiveEl(page, tabs[2])).toBeTruthy();
    await page.keyboard.press('ArrowDown');
    expect(await isActiveEl(page, tabs[0])).toBeTruthy();
  });

  test('vertical *direction* moves focus to last tab', async ({ page }) => {
    await mount(page, 'tabs-motion--vertical');
    const tabs = await getTabs(page);
    await tabs[0].focus();
    expect(await isActiveEl(page, tabs[0])).toBeTruthy();
    await page.keyboard.press('ArrowUp');
    expect(await isActiveEl(page, tabs[2])).toBeTruthy();
  });
});
