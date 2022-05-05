/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const { mount } = require('../../../e2e/helpers');

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
  test('closes one popover at a time on esc key press', async ({ page }) => {
    await mount(page, 'popover--select');
    await page.waitForSelector('button');
    await page.click('button');
    await page.waitForSelector(selectors.tooltip);
    await page.waitForSelector(selectors.selectInput);
    await page.click(selectors.selectInput);
    await page.waitForSelector(selectors.selectDropDown);

    await page.keyboard.press('Escape');
    await page.waitForSelector(selectors.selectDropDown, { state: 'hidden' });
    await page.waitForSelector(selectors.selectInput);

    await page.keyboard.press('Escape');
    await page.waitForSelector(selectors.selectInput, { state: 'hidden' });
  });

  test('closes one popover at a time on click outside', async ({ page }) => {
    await mount(page, 'popover--select');
    await page.waitForSelector('button');
    await page.click('button');
    await page.waitForSelector(selectors.tooltip);
    await page.waitForSelector(selectors.selectInput);
    await page.click(selectors.selectInput);
    await page.waitForSelector(selectors.selectDropDown);
    // Both popovers opened at this point.
    // Verify that popovers are not nested but rendered in a flat layers way
    // where every new layer rendered as a sibling to the rest of layers
    // and not uses other layers rendered elements as a mount node.
    const noNestedPopovers = await page.$$eval(selectors.popover, (popovers) => {
      let notNested = true;
      for (let i = 0; i < popovers.length; i++) {
        notNested = notNested && !popovers[i].querySelector('[data-baseweb="popover"]');
      }
      return notNested;
    });
    expect(noNestedPopovers).toBe(true);

    // First document and outside of the popovers click
    // closes only the top-most popover
    await page.click(selectors.outsideOfPopover);
    await page.waitForSelector(selectors.selectDropDown, { state: 'hidden' });
    await page.waitForSelector(selectors.selectInput);

    // Second document and outside of the remaining popover click
    // closes only the that popover
    await page.click(selectors.outsideOfPopover);
    await page.waitForSelector(selectors.selectInput, { state: 'hidden' });
  });
});
