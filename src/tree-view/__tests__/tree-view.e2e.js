/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

describe('tree view', () => {
  it('passes basic a11y tests', async () => {
    await mount(page, 'tree-view');
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('renderall: renders children even when hidden: with renderAll prop', async () => {
    await mount(page, 'tree-view-render-all');
    expect(
      (await page.$x("//div[contains(text(), 'hidden')]")).length,
    ).not.toBe(0);
  });

  it('singleExpanded: only have one node sibling isExpanded at a time', async () => {
    await mount(page, 'tree-view-single-expanded');
    expect(
      (await page.$x("//div[contains(text(), 'Child 1.1')]")).length,
    ).not.toBe(0);
    expect((await page.$x("//div[contains(text(), 'Child 2.1')]")).length).toBe(
      0,
    );
    const parentNode = (await page.$x("//div[contains(text(), 'Node 2')]"))[0];
    expect(parentNode).toBeTruthy();
    await parentNode.click();
    expect(
      (await page.$x("//div[contains(text(), 'Child 2.1')]")).length,
    ).not.toBe(0);
    expect((await page.$x("//div[contains(text(), 'Child 1.1')]")).length).toBe(
      0,
    );
  });
});
