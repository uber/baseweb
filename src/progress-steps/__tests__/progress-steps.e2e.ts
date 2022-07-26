/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { expect, test } from '@playwright/test';
import { mount, analyzeAccessibility } from '../../test/integration';

const selectors = {
  nextButton: '[data-e2e=button-next]',
  previousButton: '[data-e2e=button-previous]',
  contentAtPosition: (position) => `[data-e2e="content-${position}"]`,
};

test.describe('progress steps', () => {
  test('passes basic a11y tests', async ({ page }) => {
    await mount(page, 'progress-steps--progress-steps');
    await page.waitForSelector(selectors.nextButton);
    const accessibilityReport = await analyzeAccessibility(page);
    // @ts-expect-error todo(starr): unsure how to fix
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  test('can be moved to the next step, and back too', async ({ page }) => {
    await mount(page, 'progress-steps--progress-steps');
    await page.waitForSelector(selectors.nextButton);

    // verifies that the first content block is visible
    let firstContent = await page.$eval(
      selectors.contentAtPosition(1),
      (input) => input.textContent
    );
    expect(firstContent).toBe('Here is some step content');

    // go to the next step
    await page.click(selectors.nextButton);
    const secondContent = await page.$eval(
      selectors.contentAtPosition(2),
      (input) => input.textContent
    );
    expect(secondContent.startsWith('Here is some more content')).toBeTruthy();

    // go back to step 1
    await page.click(selectors.previousButton);
    firstContent = await page.$eval(selectors.contentAtPosition(1), (input) => input.textContent);
    expect(firstContent).toBe('Here is some step content');
  });
});
