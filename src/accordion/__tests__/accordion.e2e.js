/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/*eslint-env node*/
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

const collapsed = '[aria-expanded=false]';
const expanded = '[aria-expanded=true]';

describe('accordion', () => {
  it('passes basic a11y tests', async () => {
    await mount(page, 'accordion');
    await page.waitFor('ul');
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('expands once the title is clicked', async () => {
    await mount(page, 'accordion');
    await page.click(collapsed);
    await page.waitForSelector(expanded);
    await expect(page).toMatchElement('li', {text: 'panel 1'});
  });

  it('collapses once expanded title is clicked', async () => {
    await mount(page, 'accordion');

    const initialCount = await page.$$eval(collapsed, panels => panels.length);

    await page.click(collapsed);
    await page.waitForSelector(expanded);

    await page.click(expanded);
    const count = await page.$$eval(collapsed, panels => panels.length);
    expect(count).toBe(initialCount);
  });
});
