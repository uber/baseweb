/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount, analyzeAccessibility } from '../../test/integration';

async function checkedByValue(page, n) {
  const input = await page.$(`input[value="${n}"]`);
  const checked = await input.getProperty('checked');
  return checked.jsonValue();
}

test.describe('radio', () => {
  test('passes basic a11y tests', async ({ page }) => {
    await mount(page, 'radio--radio');
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  test('changes selection on radio click', async ({ page }) => {
    await mount(page, 'radio--radio');
    expect(await checkedByValue(page, 2)).toBeTruthy();
    await page.click('label:nth-of-type(3)');
    expect(await checkedByValue(page, 3)).toBeTruthy();
    expect(await checkedByValue(page, 2)).toBeFalsy();
  });
});
