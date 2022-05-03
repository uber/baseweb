/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */
/* global document */

const { mount, analyzeAccessibility } = require('../../../e2e/helpers');

const selectors = {
  closeButton: 'button[aria-label="Close"]',
  openDrawer: '[data-e2e="open-drawer-button"]',
  drawerContent: '[data-e2e="drawer-content"]',
  selectInput: 'input[role="combobox"]',
  drawer: '[data-e2e="drawer-container"]',
  selectDropDown: '[role="listbox"]',
  selectedList: '[data-id="selected"]',
  dropDownOption: '[role="option"]',
};

const optionAtPosition = (position) =>
  `${selectors.selectDropDown} ${selectors.dropDownOption}:nth-child(${position})`;

describe('drawer', () => {
  it('drawer component handles focus changes properly', async () => {
    await mount(page, 'drawer--drawer');
    await page.waitForSelector(selectors.closeButton);
    // close drawer to start fresh
    await page.click(selectors.closeButton);
    await page.waitForSelector(selectors.closeButton, {
      state: 'hidden',
    });
    await page.click(selectors.openDrawer);
    await page.waitForSelector(selectors.drawer);

    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');

    const closeButtonIsFocused = await page.$eval(
      selectors.closeButton,
      (closeButton) => closeButton === document.activeElement
    );

    // focus should be trapped in drawer and go to close button
    expect(closeButtonIsFocused).toBe(true);

    // drawer should be accessible
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();

    // close again
    await page.click(selectors.closeButton);
    await page.waitForSelector(selectors.closeButton, {
      state: 'hidden',
    });

    const openIsFocused = await page.$eval(
      selectors.openDrawer,
      (button) => button === document.activeElement
    );
    expect(openIsFocused).toBe(true);
  });

  // This is a regression test to verify that elements in a portal will still work.
  it('allows interaction with select', async () => {
    await mount(page, 'drawer--select');
    await page.waitForSelector(selectors.drawer);

    await page.click(selectors.selectInput);
    await page.waitForSelector(selectors.selectDropDown);
    await page.click(optionAtPosition(1));
    await page.waitForSelector(selectors.selectDropDown, {
      state: 'hidden',
    });

    const selectedValue = await page.$eval(selectors.selectedList, (select) => select.textContent);
    expect(selectedValue).toBe('AliceBlue');
  });

  it('closes one popover at a time on esc key press', async () => {
    await mount(page, 'drawer--select');
    await page.waitForSelector(selectors.drawer);

    await page.click(selectors.selectInput);
    await page.waitForSelector(selectors.selectDropDown);

    await page.keyboard.press('Escape');
    await page.waitForSelector(selectors.selectDropDown, { state: 'hidden' });
    await page.waitForSelector(selectors.selectInput);

    await page.keyboard.press('Escape');
    await page.waitForSelector(selectors.selectInput, { state: 'hidden' });
  });

  it('renders content even when hidden: with renderAll prop', async () => {
    await mount(page, 'drawer--render-all');
    // check for content while drawer is closed, then open
    await page.waitForSelector(selectors.drawerContent);
    await page.click(selectors.openDrawer);
    await page.waitForSelector(selectors.drawer);

    // check for content while drawer is open, then close
    await page.waitForSelector(selectors.drawerContent);
    await page.waitForSelector(selectors.closeButton);
    await page.click(selectors.closeButton);
    await page.waitForSelector(selectors.closeButton, {
      state: 'hidden',
    });

    // check for content again
    await page.waitForSelector(selectors.drawerContent);
  });
});
