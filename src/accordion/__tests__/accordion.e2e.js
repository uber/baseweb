/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/*eslint-env node*/
/* eslint-disable flowtype/require-valid-file-annotation */

const { expect, test } = require('@playwright/test');
const { mount, analyzeAccessibility, isSameNode } = require('../../../e2e/helpers');

const selectors = {
  collapsed: '[aria-expanded=false]',
  expanded: '[aria-expanded=true]',
  secondPanel: 'ul[data-baseweb="accordion"] li:nth-of-type(2) div:first-child',
  lastPanel: 'ul[data-baseweb="accordion"] li:last-of-type div:first-child',
};

test.describe('accordion', () => {
  test('passes basic a11y tests', async ({ page }) => {
    await mount(page, 'accordion--accordion');
    await page.waitForSelector('ul');
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  test('expands once the title is clicked', async ({ page }) => {
    await mount(page, 'accordion--accordion');
    await page.click(selectors.collapsed);
    await page.waitForSelector(selectors.expanded);
    await expect(page.locator('li').first()).toHaveText('Accordion panel 1panel 1');
  });

  test('collapses once expanded title is clicked', async ({ page }) => {
    await mount(page, 'accordion--accordion');

    const initialCount = await page.$$eval(selectors.collapsed, (panels) => panels.length);

    await page.click(selectors.collapsed);
    await page.waitForSelector(selectors.expanded);

    await page.click(selectors.expanded);
    const count = await page.$$eval(selectors.collapsed, (panels) => panels.length);
    expect(count).toBe(initialCount);
  });

  test('correctly shifts focus when End and Home keys are pressed', async ({ page }) => {
    await mount(page, 'accordion--accordion');

    await page.keyboard.press('Tab');
    await page.keyboard.press('End');

    // eslint-disable-next-line cup/no-undef
    const activeEl = await page.evaluateHandle(() => window.document.activeElement);
    const lastPanel = await page.$(selectors.lastPanel);
    expect(await isSameNode(page, activeEl, lastPanel)).toBe(true);

    await page.keyboard.press('Home');

    // eslint-disable-next-line cup/no-undef
    const activeEl2 = await page.evaluateHandle(() => window.document.activeElement);
    const firstPanel = await page.$(selectors.collapsed);
    expect(await isSameNode(page, activeEl2, firstPanel)).toBe(true);
  });

  test('correctly shifts focus when Arrow Up and Arrow Down are pressed', async ({ page }) => {
    await mount(page, 'accordion--accordion');

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');

    // eslint-disable-next-line cup/no-undef
    const activeEl = await page.evaluateHandle(() => window.document.activeElement);
    const secondPanel = await page.$(selectors.secondPanel);
    expect(await isSameNode(page, activeEl, secondPanel)).toBe(true);

    await page.keyboard.press('ArrowUp');

    // eslint-disable-next-line cup/no-undef
    const activeEl2 = await page.evaluateHandle(() => window.document.activeElement);
    const firstPanel = await page.$(selectors.collapsed);
    expect(await isSameNode(page, activeEl2, firstPanel)).toBe(true);
  });

  test('only moves between panel headers, ignoring panel bodies', async ({ page }) => {
    await mount(page, 'accordion--accordion');

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.keyboard.press('End');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowUp');

    // eslint-disable-next-line cup/no-undef
    const activeEl = await page.evaluateHandle(() => window.document.activeElement);
    const firstPanel = await page.$(selectors.collapsed);
    expect(await isSameNode(page, activeEl, firstPanel)).toBe(true);
  });
});
