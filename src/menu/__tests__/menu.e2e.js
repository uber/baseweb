/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* global document */
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const { mount, analyzeAccessibility, isSameNode } = require('../../../e2e/helpers');

const { expect, test } = require('@playwright/test');

test.describe('menu', () => {
  test('passes basic a11y tests', async ({ page }) => {
    await mount(page, 'menu--menu');
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });
});

const parentSelector = '[data-e2e="parent-menu"]';
const childSelector = '[data-e2e="child-menu"]';
const highlightedSelector = '[aria-selected="true"]';

function position(x, y) {
  const PAGE_MARGIN = 20;
  const MENU_MARGIN_TOP = 16;
  const MENU_ITEM_HEIGHT = 26;

  const MENU_WIDTH = 300;
  const MENU_WIDTH_OFFSET = MENU_WIDTH / 2;

  return [
    PAGE_MARGIN + MENU_WIDTH_OFFSET + MENU_WIDTH * x,
    PAGE_MARGIN + MENU_MARGIN_TOP + MENU_ITEM_HEIGHT * y,
  ];
}

function clickItem(page, x, y) {
  return page.mouse.click(...position(x, y));
}

function hoverItem(page, x, y) {
  return page.mouse.move(...position(x, y));
}

function findActiveElement(page) {
  return page.evaluateHandle(() => document.activeElement);
}

async function findHighlightedLabel(page) {
  const highlightedItem = await page.$(highlightedSelector);
  return await page.evaluate((item) => (item ? item.textContent : 'NOT_FOUND'), highlightedItem);
}

test.describe('menu-child', () => {
  test('focuses menu on mouse enter and blurs on mouse leave', async ({ page }) => {
    await mount(page, 'menu--child');
    await hoverItem(page, 0, 0);

    const parent = await page.$(parentSelector);
    const activeElement = await findActiveElement(page);
    const isEqual = await isSameNode(page, parent, activeElement);
    expect(isEqual).toBe(true);
  });

  test('up and down arrows change highlighted item', async ({ page }) => {
    await mount(page, 'menu--child');
    await hoverItem(page, 0, 0);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowUp');

    const text = await findHighlightedLabel(page);
    expect(text).toBe('New Window');
  });

  test('keyboard character input change highlighted item through type-ahead', async ({ page }) => {
    await mount(page, 'menu--child');
    await hoverItem(page, 0, 0);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('a');
    const text = await findHighlightedLabel(page);
    expect(text).toBe('Add Folder to Workspace...');
  });

  test('type-ahead can have fulltext match', async ({ page }) => {
    await mount(page, 'menu--child');
    await hoverItem(page, 0, 0);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('b');
    const text = await findHighlightedLabel(page);
    expect(text).toBe('Toggle Breakpoint');
  });

  test('unhighlights item on mouse leave', async ({ page }) => {
    await mount(page, 'menu--child');

    await hoverItem(page, 0, 0);
    await page.waitForSelector(highlightedSelector);
    const before = await findHighlightedLabel(page);
    expect(before).toBe('New File');

    await hoverItem(page, 1, 0);
    await page.waitForSelector(highlightedSelector, { state: 'hidden' });

    const after = await findHighlightedLabel(page);
    expect(after).toBe('NOT_FOUND');
  });

  test('left and right arrows change focused menu', async ({ page }) => {
    await mount(page, 'menu--child');
    await hoverItem(page, 0, 0);

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowRight');

    const child = await page.$(childSelector);
    const activeElement = await findActiveElement(page);
    const isEqual = await isSameNode(page, child, activeElement);
    expect(isEqual).toBe(true);
  });

  test('can select item in child menu by keyboard navigation', async ({ page }) => {
    await mount(page, 'menu--child');
    await hoverItem(page, 0, 0);

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');

    const text = await findHighlightedLabel(page);
    expect(text).toBe('More...');
  });

  test('opens child menu on hover', async ({ page }) => {
    await mount(page, 'menu--child');
    await hoverItem(page, 0, 5);
    await page.waitForSelector(childSelector);
  });

  test('allows child menu to release focus and closes menu when different menu item selected', async ({
    page,
  }) => {
    await mount(page, 'menu--child');
    await hoverItem(page, 0, 5);
    await page.waitForSelector(childSelector);
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowDown');
    await page.waitForSelector(childSelector, { state: 'hidden' });
  });

  test('highlights child menu item on hover', async ({ page }) => {
    await mount(page, 'menu--child');
    await hoverItem(page, 0, 5);
    await page.waitForSelector(childSelector);

    await hoverItem(page, 1, 5);
    const text = await findHighlightedLabel(page);
    expect(text).toBe('Reopen Closed Editor');
  });

  test('closes child menu on parent mouse out from option with child content', async ({ page }) => {
    await mount(page, 'menu--child');
    await page.waitForSelector(parentSelector);
    const [x, y] = position(0, 5);
    await page.mouse.move(x, y);
    await page.waitForSelector(childSelector);
    await page.mouse.move(0, y);
    await page.waitForSelector(childSelector, { state: 'hidden' });
  });

  test('item with child menu triggers click handler', async ({ page }) => {
    await mount(page, 'menu--child');
    await clickItem(page, 0, 5);
    const log = await page.$$('#menu-child-click-log > li');
    expect(log.length).toBe(1);
  });

  test('renders content even when hidden: with renderAll prop', async ({ page }) => {
    await mount(page, 'menu--child-render-all');
    await page.waitForSelector(parentSelector);
    await page.waitForSelector(childSelector, { state: 'attached' });
    await hoverItem(page, 0, 0);

    const parent = await page.$(parentSelector);
    const activeElement = await findActiveElement(page);
    const isEqual = await isSameNode(page, parent, activeElement);
    expect(isEqual).toBe(true);
    await page.waitForSelector(childSelector, { state: 'attached' });
  });

  test('child menu clicks do not close if inside popover content', async ({
    browserName,
    page,
  }) => {
    test.fixme(browserName === 'firefox', 'this feature fails in firefox');

    await mount(page, 'menu--child-in-popover');
    await page.click('button');
    await page.waitForSelector(parentSelector);
    await page.mouse.move(150, 159);
    await page.waitForSelector(childSelector);
    await page.mouse.click(450, 159);
    await page.waitForSelector(childSelector);
    await page.click('button');
    await page.waitForSelector(childSelector, { state: 'hidden' });
  });

  test('keyboard navigation works when ancestor stopPropagations', async ({ page }) => {
    await mount(page, 'menu--propagation');
    await hoverItem(page, 0, 0);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowUp');

    const text = await findHighlightedLabel(page);
    expect(text).toBe('Item Two');
  });
});
