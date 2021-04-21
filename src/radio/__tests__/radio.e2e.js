/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

async function checkedByValue(n) {
  const input = await page.$(`input[value="${n}"]`);
  const checked = await input.getProperty('checked');
  return checked.jsonValue();
}

describe('radio', () => {
  it('passes basic a11y tests', async () => {
    await mount(page, 'radio--radio');
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('changes selection on radio click', async () => {
    await mount(page, 'radio--radio');
    expect(await checkedByValue(2)).toBeTruthy();
    await page.click('label:nth-of-type(3)');
    expect(await checkedByValue(3)).toBeTruthy();
    expect(await checkedByValue(2)).toBeFalsy();
  });
});
