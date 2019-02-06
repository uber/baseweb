/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */
/* global document */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

const selectors = {
  closeButton: 'button[aria-label="Close"]',
  openModal: '.open-modal-button',
  dialog: '[role="dialog"]',
};

describe('modal', () => {
  it('handles focus changes properly', async () => {
    await mount(page, 'modal');
    await page.waitFor(selectors.closeButton);
    // close modal to start fresh
    await page.click(selectors.closeButton);
    await page.waitFor(selectors.closeButton, {
      hidden: true,
    });
    await page.click(selectors.openModal);
    await page.waitFor(selectors.dialog);

    const dialogIsFocused = await page.$eval(
      selectors.dialog,
      dialog => dialog === document.activeElement,
    );

    // dialog should be the focused element
    expect(dialogIsFocused).toBe(true);

    // dialog should be accessible
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();

    // close again
    await page.click(selectors.closeButton);
    await page.waitFor(selectors.closeButton, {
      hidden: true,
    });

    const openIsFocused = await page.$eval(
      selectors.openModal,
      button => button === document.activeElement,
    );
    expect(openIsFocused).toBe(true);
  });
});
