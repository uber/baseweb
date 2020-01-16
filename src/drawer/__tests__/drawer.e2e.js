/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */
/* global document */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

const selectors = {
  closeButton: 'button[aria-label="Close"]',
  openDrawer: '[data-e2e="open-drawer-button"]',
  selectInput: 'input[role="combobox"]',
  drawer: 'div[aria-label="drawer"]',
  selectDropDown: '[role="listbox"]',
  selectedList: '[data-id="selected"]',
  dropDownOption: '[role="option"]',
};

const optionAtPosition = position =>
  `${selectors.selectDropDown} ${selectors.dropDownOption}:nth-child(${position})`;

jest.setTimeout(60000);
describe('drawer', () => {
  it('drawer component handles focus changes properly', async () => {
    await mount(page, 'drawer');
    await page.waitFor(selectors.closeButton);
    // close drawer to start fresh
    await page.click(selectors.closeButton);
    await page.waitFor(selectors.closeButton, {
      hidden: true,
    });
    await page.click(selectors.openDrawer);
    await page.waitFor(selectors.drawer);

    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');

    const closeButtonIsFocused = await page.$eval(
      selectors.closeButton,
      closeButton => closeButton === document.activeElement,
    );

    // focus should be trapped in drawer and go to close button
    expect(closeButtonIsFocused).toBe(true);

    // drawer should be accessible
    const accessibilityReport = await analyzeAccessibility(page, {
      // disable tabindex rule because react-focus-lock uses tabindex to trap focus
      rules: [{id: 'tabindex', enabled: false}],
    });
    expect(accessibilityReport).toHaveNoAccessibilityIssues();

    // close again
    await page.click(selectors.closeButton);
    await page.waitFor(selectors.closeButton, {
      hidden: true,
    });

    const openIsFocused = await page.$eval(
      selectors.openDrawer,
      button => button === document.activeElement,
    );
    expect(openIsFocused).toBe(true);
  });

  // This is a regression test to verify that elements in a portal will still work.
  it('allows interaction with select', async () => {
    await mount(page, 'drawer-select');
    await page.waitFor(selectors.drawer);

    await page.click(selectors.selectInput);
    await page.waitFor(selectors.selectDropDown);
    await page.click(optionAtPosition(1));
    await page.waitFor(selectors.selectDropDown, {
      hidden: true,
    });

    const selectedValue = await page.$eval(
      selectors.selectedList,
      select => select.textContent,
    );
    expect(selectedValue).toBe('AliceBlue');
  });
});
