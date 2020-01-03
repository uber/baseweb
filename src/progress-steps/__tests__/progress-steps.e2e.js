/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

const selectors = {
  nextButton: '[data-e2e=button-next]',
  previousButton: '[data-e2e=button-previous]',
  contentAtPosition: position => `[data-e2e="content-${position}"]`,
};

describe('progress steps', () => {
  it('passes basic a11y tests', async () => {
    await mount(page, 'progress-steps');
    await page.waitFor(selectors.nextButton);
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('can be moved to the next step, and back too', async () => {
    await mount(page, 'progress-steps');
    await page.waitFor(selectors.nextButton);

    // verifies that the first content block is visible
    let firstContent = await page.$eval(
      selectors.contentAtPosition(1),
      input => input.textContent,
    );
    expect(firstContent).toBe('Here is some step content');

    // go to the next step
    await page.click(selectors.nextButton);
    const secondContent = await page.$eval(
      selectors.contentAtPosition(2),
      input => input.textContent,
    );
    expect(secondContent.startsWith('Here is some more content')).toBeTruthy();

    // go back to step 1
    await page.click(selectors.previousButton);
    firstContent = await page.$eval(
      selectors.contentAtPosition(1),
      input => input.textContent,
    );
    expect(firstContent).toBe('Here is some step content');
  });
});
