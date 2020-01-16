/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* global document */
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

describe('menu', () => {
  it('passes basic a11y tests', async () => {
    await mount(page, 'menu');
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });
});

const parentSelector = '[data-e2e="parent-menu"]';
const childSelector = '[data-e2e="child-menu"]';
const highlightedSelector = '[aria-selected="true"]';

function hoverItem(page, x, y) {
  const MENU_MARGIN_TOP = 16;
  const MENU_ITEM_HEIGHT = 26;

  const MENU_WIDTH = 300;
  const MENU_WIDTH_OFFSET = MENU_WIDTH / 2;

  const xPos = MENU_WIDTH_OFFSET + MENU_WIDTH * x;
  const yPos = MENU_MARGIN_TOP + MENU_ITEM_HEIGHT * y;

  return page.mouse.move(xPos, yPos);
}

function findActiveElement(page) {
  return page.evaluateHandle(() => document.activeElement);
}

async function findHighlightedLabel(page) {
  const highlightedItem = await page.$(highlightedSelector);
  return await page.evaluate(
    highlightedItem => highlightedItem.textContent,
    highlightedItem,
  );
}

function compareElements(page, a, b) {
  return page.evaluate((a, b) => a === b, a, b);
}

describe('menu-child', () => {
  it('focuses menu on mouse enter and blurs on mouse leave', async () => {
    await mount(page, 'menu-child');
    await hoverItem(page, 0, 0);

    const parent = await page.$(parentSelector);
    const activeElement = await findActiveElement(page);
    const isEqual = await compareElements(page, parent, activeElement);
    expect(isEqual).toBe(true);
  });

  it('up/down arrows change highlighted item', async () => {
    await mount(page, 'menu-child');
    await hoverItem(page, 0, 0);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowUp');

    const text = await findHighlightedLabel(page);
    expect(text).toBe('New Window');
  });

  it('left/right arrows change focused menu', async () => {
    await mount(page, 'menu-child');
    await hoverItem(page, 0, 0);

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowRight');

    const child = await page.$(childSelector);
    const activeElement = await findActiveElement(page);
    const isEqual = await compareElements(page, child, activeElement);
    expect(isEqual).toBe(true);
  });

  it('can select item in child menu by keyboard navigation', async () => {
    await mount(page, 'menu-child');
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

  it('opens child menu on hover', async () => {
    await mount(page, 'menu-child');
    await hoverItem(page, 0, 5);
    await page.waitFor(childSelector);
  });

  it('highlights child menu item on hover', async () => {
    await mount(page, 'menu-child');
    await hoverItem(page, 0, 5);
    await page.waitFor(childSelector);

    await hoverItem(page, 1, 5);
    const text = await findHighlightedLabel(page);
    expect(text).toBe('Reopen Closed Editor');
  });
});
