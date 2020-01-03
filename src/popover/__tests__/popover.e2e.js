/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

const selectors = {
  tooltip: '[role="tooltip"]',
};

describe('popover', () => {
  it('passes basic a11y tests', async () => {
    await mount(page, 'popover');
    await page.waitFor(selectors.tooltip);
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('hover opens the popover', async () => {
    await mount(page, 'popover-hover');
    await page.waitFor('button');
    await page.hover('button');
    await page.waitFor(selectors.tooltip);
    await page.mouse.move(0, 0);
    await page.waitFor(selectors.tooltip, {hidden: true});
  });

  it('opened popover can be closed with ESC', async () => {
    await mount(page, 'popover-click');
    await page.waitFor('button');
    await page.click('button');
    await page.waitFor(selectors.tooltip);
    await page.keyboard.press('Escape');
    await page.waitFor(selectors.tooltip, {hidden: true});
  });
});
