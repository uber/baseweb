/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const scenarios = require('./examples-list');
const {analyzeAccessibility, getPuppeteerUrl} = require('../../e2e/helpers');

const suite = 'Popover Test Suite';

const selectors = {
  tooltip: '[role="tooltip"]',
};

describe(suite, () => {
  it('passes basic a11y tests', async () => {
    await page.goto(
      getPuppeteerUrl({
        suite,
        test: scenarios.SIMPLE_EXAMPLE,
      }),
    );
    await page.waitFor(selectors.tooltip);
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('hover opens the popover', async () => {
    await page.goto(
      getPuppeteerUrl({
        suite,
        test: scenarios.WITH_HOVER,
      }),
    );
    await page.waitFor('button');
    await page.hover('button');
    await page.waitFor(selectors.tooltip);
    await page.mouse.move(0, 0);
    await page.waitFor(selectors.tooltip, {
      hidden: true,
    });
  });

  it('opened popover can be closed with ESC', async () => {
    await page.goto(
      getPuppeteerUrl({
        suite,
        test: scenarios.WITH_CLICK,
      }),
    );
    await page.waitFor('button');
    await page.click('button');
    await page.waitFor(selectors.tooltip);
    await page.keyboard.press('Escape');
    await page.waitFor(selectors.tooltip, {
      hidden: true,
    });
  });
});
