/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const scenarios = require('./examples-list');
const {getPuppeteerUrl, analyzeAccessibility} = require('../../e2e/helpers');

const suite = 'Progress Steps Test Suite';

const selectors = {
  nextButton: '[data-e2e=button-next]',
  previousButton: '[data-e2e=button-previous]',
};

describe(suite, () => {
  beforeAll(async () => {
    await page.goto(
      getPuppeteerUrl({
        suite,
        test: scenarios.DEFAULT,
      }),
    );
  });

  it('passes basic a11y tests', async () => {
    await page.waitFor(selectors.nextButton);
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('can be moved to the next step, and back too', async () => {
    await page.waitFor(selectors.nextButton);

    // verifies that the first content block is visible
    let firstContent = await page.$eval(
      '[data-e2e="content-1"]',
      input => input.textContent,
    );
    expect(firstContent).toBe('Here is some step content');

    // go to the next step
    await page.click(selectors.nextButton);
    const secondContent = await page.$eval(
      '[data-e2e="content-2"]',
      input => input.textContent,
    );
    expect(
      secondContent.startsWith(
        'Sed ut perspiciatis unde omnis iste natus error',
      ),
    ).toBeTruthy();

    // go back to step 1
    await page.click(selectors.previousButton);
    firstContent = await page.$eval(
      '[data-e2e="content-1"]',
      input => input.textContent,
    );
    expect(firstContent).toBe('Here is some step content');
  });
});
