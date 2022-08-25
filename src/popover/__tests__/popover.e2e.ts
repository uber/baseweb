/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount, analyzeAccessibility } from '../../test/integration';

const selectors = {
  popover: '[data-baseweb="popover"]',
  outsideOfPopover: '[data-e2e="outside-popover"]',
  tooltip: '[role="tooltip"]',
  selectInput: 'input[role="combobox"]',
  selectDropDown: '[role="listbox"]',
  selectedList: '[data-id="selected"]',
  dropDownOption: '[role="option"]',
  content: '#content',
};

test.describe('popover', () => {
  test('passes basic a11y tests', async ({ page }) => {
    await mount(page, 'popover--popover');
    await expect(page.locator('button')).toBeVisible();
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  test('hover opens the popover', async ({ page }) => {
    await mount(page, 'popover--hover');
    await page.locator('button').hover();
    const content = page.locator('text="content"');
    await expect(content).toBeVisible();
    await page.mouse.move(200, 200);
    await expect(content).toBeHidden();
  });

  test('opened popover can be closed with ESC', async ({ page }) => {
    await mount(page, 'popover--click');
    await page.locator('button').click();
    const content = page.locator('text="content"');
    await expect(content).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(content).toBeHidden();
  });

  test('allows interaction with select', async ({ page }) => {
    await mount(page, 'popover--select');
    await page.locator('button').click();
    const input = page.locator('input');
    const listbox = page.locator('[role="listbox"]');
    await expect(input).toBeVisible();
    await input.click();
    await expect(listbox).toBeVisible();

    // Both popovers opened at this point.
    // Make sure that layers rendered flat and not nested.
    const noNestedPopovers = await page.$$eval(selectors.popover, (popovers) => {
      let notNested = true;
      for (let i = 0; i < popovers.length; i++) {
        notNested = notNested && !popovers[i].querySelector('[data-baseweb="popover"]');
      }
      return notNested;
    });
    expect(noNestedPopovers).toBe(true);

    const options = listbox.locator('[role="option"]');
    await options.first().click();
    await expect(listbox).toBeHidden();
    await expect(page.locator('text="AliceBlue"')).toBeVisible();
    await page.locator(selectors.outsideOfPopover).click();
    await expect(input).toBeHidden();
  });

  test('renders content even when hidden: with renderAll prop', async ({ page }) => {
    await mount(page, 'popover--render-all');
    const content = page.locator(selectors.content);
    await content.waitFor({ state: 'attached' });
    await page.locator('button').click();
    await expect(content).toBeVisible();
    await page.keyboard.press('Escape');
    await content.waitFor({ state: 'attached' });
  });

  test('updates position when width of popover changes', async ({ page }) => {
    await mount(page, 'popover--reposition');
    await page.click('#e2e-open');
    let popover = await page.$('#e2e-popover');
    const { x: startX, width: startWidth } = await popover.boundingBox();
    await page.click('#e2e-update');
    await page.waitForSelector('#e2e-expanded');
    await page.waitForTimeout(1000); // wait for animation
    const { x: endX, width: endWidth } = await popover.boundingBox();
    expect(endWidth).toBeGreaterThan(startWidth);
    expect(endX).toBeLessThan(startX);
  });
});
