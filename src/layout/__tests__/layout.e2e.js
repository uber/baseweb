/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

const selectors = {
  layout: 'input[data-test="layout"]',
};

describe('layout', () => {
  it('passes basic a11y tests', async () => {
    await mount(page, 'layout');
    await page.waitFor('div');
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('renders as column without sidebar', async () => {
    await mount(page, 'layout');
    await page.waitFor('div');

    const style = await page.evaluate(() => {
      const lyt = document.querySelector('div[data-test="layout"]');
      return JSON.parse(JSON.stringify(getComputedStyle(lyt)));
    });

    expect(style.flexDirection).toBe('column');
  });

  it('renders as row with sidebar', async () => {
    await mount(page, 'layout-sidebar-left');
    await page.waitFor('div');

    const style = await page.evaluate(() => {
      const lyt = document.querySelector('div[data-test="layout"]');
      return JSON.parse(JSON.stringify(getComputedStyle(lyt)));
    });

    expect(style.flexDirection).toBe('row');
  });
});
