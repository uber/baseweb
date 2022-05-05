/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const { mount, analyzeAccessibility, waitForTimeout } = require('../../../e2e/helpers');

const { expect, test } = require('@playwright/test');

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
    await page.waitForSelector(selectors.tooltip);
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  test('hover opens the popover', async ({ page }) => {
    await mount(page, 'popover--hover');
    await page.waitForSelector('button');
    await page.hover('button');
    await page.waitForSelector(selectors.tooltip);
    await page.mouse.move(200, 200);
    await page.waitForSelector(selectors.tooltip, { state: 'hidden' });
  });

  test('opened popover can be closed with ESC', async ({ page }) => {
    await mount(page, 'popover--click');
    await page.waitForSelector('button');
    await page.click('button');
    await page.waitForSelector(selectors.tooltip);
    await page.keyboard.press('Escape');
    await page.waitForSelector(selectors.tooltip, { state: 'hidden' });
  });

  test('allows interaction with select', async ({ page }) => {
    await mount(page, 'popover--select');
    await page.waitForSelector('button');
    await page.click('button');
    await page.waitForSelector(selectors.tooltip);
    await page.waitForSelector(selectors.selectInput);
    await page.click(selectors.selectInput);
    await page.waitForSelector(selectors.selectDropDown);
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
    // Select an option from the select dropdown
    const options = await page.$$(selectors.dropDownOption);
    await options[0].click();
    await page.waitForSelector(selectors.selectDropDown, { state: 'hidden' });

    const selectedValue = await page.$eval(selectors.selectedList, (select) => select.textContent);
    expect(selectedValue).toBe('AliceBlue');
    // Click outside to close the initial popover
    await page.click(selectors.outsideOfPopover);
    await page.waitForSelector(selectors.selectInput, { state: 'hidden' });
  });

  test('renders content even when hidden: with renderAll prop', async ({ page }) => {
    await mount(page, 'popover--render-all');
    await page.waitForSelector('button');
    await page.waitForSelector(selectors.content, { state: 'attached' });
    await page.click('button');
    await page.waitForSelector(selectors.tooltip);
    await page.waitForSelector(selectors.content);
    await page.keyboard.press('Escape');
    await page.waitForSelector(selectors.tooltip, { state: 'hidden' });
    await page.waitForSelector(selectors.content, { state: 'attached' });
  });

  test('updates position when width of popover changes', async ({ page }) => {
    await mount(page, 'popover--reposition');
    await page.click('#e2e-open');
    let popover = await page.$('#e2e-popover');
    const { x: startX, width: startWidth } = await popover.boundingBox();
    await page.click('#e2e-update');
    await page.waitForSelector('#e2e-expanded');
    await waitForTimeout(1000); // wait for animation
    const { x: endX, width: endWidth } = await popover.boundingBox();
    expect(endWidth).toBeGreaterThan(startWidth);
    expect(endX).toBeLessThan(startX);
  });
});
