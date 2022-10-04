/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount, analyzeAccessibility } from '../../test/integration';

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

test.describe('menu-child', () => {
  test('focuses menu on mouse enter and blurs on mouse leave', async ({ page }) => {
    await mount(page, 'menu--child');
    await page.locator('text=New File').hover();
    await expect(page.locator(parentSelector)).toBeFocused();
  });

  test('up and down arrows change highlighted item', async ({ page }) => {
    await mount(page, 'menu--child');
    await page.locator('text=New File').hover();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowUp');
    await expect(page.locator(highlightedSelector)).toHaveText('New Window');
  });

  test('keyboard character input change highlighted item through type-ahead', async ({ page }) => {
    await mount(page, 'menu--child');
    await page.locator('text=New File').hover();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('a');
    await expect(page.locator(highlightedSelector)).toHaveText('Add Folder to Workspace...');
  });

  test('type-ahead can have fulltext match', async ({ page }) => {
    await mount(page, 'menu--child');
    await page.locator('text=New File').hover();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('b');
    await expect(page.locator(highlightedSelector)).toHaveText('Toggle Breakpoint');
  });

  test('unhighlights item on mouse leave', async ({ page }) => {
    await mount(page, 'menu--child');
    await page.locator('text=New File').hover();

    const highlighted = page.locator(highlightedSelector);
    await expect(highlighted).toHaveText('New File');

    await page.mouse.move(0, 0);
    await expect(highlighted).toBeHidden();
  });

  test('left and right arrows change focused menu', async ({ page }) => {
    await mount(page, 'menu--child');
    await page.locator('text=New File').hover();

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowRight');

    await expect(page.locator(childSelector)).toBeFocused();
  });

  test('can select item in child menu by keyboard navigation', async ({ browserName, page }) => {
    test.fixme(browserName === 'firefox', 'this test is unreliable in firefox');

    await mount(page, 'menu--child');
    await page.locator('text=New File').hover();

    const highlighted = page.locator(highlightedSelector);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowRight');
    // in firefox the highlighted item jumps to child menu second option
    // this is only reproducible in browser automation and not in manual testing
    // maybe it is a bug in this particular version of firefox or in playwright
    await expect(highlighted).toHaveText('Reopen Closed Editor');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await expect(page.locator(highlightedSelector)).toHaveText('More...');
  });

  test('opens child menu on hover', async ({ page }) => {
    await mount(page, 'menu--child');
    await page.locator('text=Open Recent').hover();
    await page.waitForSelector(childSelector);
  });

  test('allows child menu to release focus and closes menu when different menu item selected', async ({
    page,
  }) => {
    // this test is unreliable
    test.fixme();
    await mount(page, 'menu--child');
    await page.locator('text=Open Recent').hover();
    const childMenu = page.locator(childSelector);
    await expect(childMenu).toBeVisible();
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowDown');
    await expect(childMenu).toBeHidden();
  });

  test('highlights child menu item on hover', async ({ page }) => {
    await mount(page, 'menu--child');
    const optionWithChildren = await page.$('text=Open Recent');
    await optionWithChildren.hover();

    const firstChildOption = page.locator('text=Reopen Closed Editor');
    await firstChildOption.hover();
    const highlighted = page.locator(highlightedSelector);
    expect(highlighted).toHaveText('Reopen Closed Editor');
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
    await page.locator('text=Open Recent').click();
    const events = page.locator('#menu-child-click-log > li');
    await expect(events).toHaveCount(1);
  });

  test('renders content even when hidden: with renderAll prop', async ({ page }) => {
    await mount(page, 'menu--child-render-all');
    await page.waitForSelector(parentSelector);
    await page.waitForSelector(childSelector, { state: 'attached' });
    await page.locator('text=Server').hover();

    await expect(page.locator(parentSelector)).toBeFocused();
    await page.waitForSelector(childSelector, { state: 'attached' });
  });

  test('child menu clicks do not close if inside popover content', async ({ page }) => {
    await mount(page, 'menu--child-in-popover');
    const button = page.locator('button');
    const parent = page.locator(parentSelector);
    const child = page.locator(childSelector);

    await button.click();
    await expect(parent).toBeVisible();
    await page.locator('text=Open Recent').hover();
    await expect(child).toBeVisible();
    await page.locator('text=Reopen Closed Editor').click();
    await expect(child).toBeVisible();
    await button.click();
    await expect(child).toBeHidden();
  });

  test('keyboard navigation works when ancestor stopPropagations', async ({ page }) => {
    await mount(page, 'menu--propagation');
    await page.locator('text=Item One').hover();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowUp');
    await expect(page.locator(highlightedSelector)).toHaveText('Item Two');
  });
});
