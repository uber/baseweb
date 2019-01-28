/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const scenarios = require('./examples-list');
const {getPuppeteerUrl, analyzeAccessibility} = require('../../e2e/helpers');

const suite = 'Card Test Suite';

describe(suite, () => {
  const scenariosList = Object.keys(scenarios);

  for (let i = 0; i < scenariosList.length; i++) {
    it(`passes basic a11y tests for ${scenariosList[i]}`, async () => {
      const page = await browser.newPage();
      await page.goto(
        getPuppeteerUrl({
          suite,
          test: scenarios[scenariosList[i]],
        }),
      );

      const accessibilityReport = await analyzeAccessibility(page, {
        rules: [
          {
            id: 'image-alt',
            enabled: false,
          },
        ],
      });
      expect(accessibilityReport).toHaveNoAccessibilityIssues();
    });
  }
});
