/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/*eslint-env node*/
/* eslint-disable flowtype/require-valid-file-annotation */

const {getPuppeteerUrl, analyzeAccessibility} = require('../../e2e/helpers');

const scenarios = require('./examples-list');
const suite = 'Accordion Test Suite';

const collapsed = '[aria-expanded=false]';
const expanded = '[aria-expanded=true]';

describe(suite, () => {
  beforeEach(async () => {
    await page.goto(
      getPuppeteerUrl({
        suite,
        test: scenarios.ACCORDION_EXAMPLE,
      }),
    );
  });

  it('passes basic a11y tests', async () => {
    await page.waitFor('div');
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('expands once the title is clicked', async () => {
    await page.click(collapsed);
    await page.waitForSelector(expanded);
    await expect(page).toMatchElement('div', {
      text: 'Praesent condimentum',
    });
  });

  it('collapses once expanded title is clicked', async () => {
    const initialCount = await page.$$eval(collapsed, panels => panels.length);

    await page.click(collapsed);
    await page.waitForSelector(expanded);

    await page.click(expanded);
    const count = await page.$$eval(collapsed, panels => panels.length);
    expect(count).toBe(initialCount);
  });
});
