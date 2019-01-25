/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/*eslint-env node*/
/* eslint-disable flowtype/require-valid-file-annotation */

const {getPuppeteerUrl} = require('../../e2e/helpers');

const scenarios = require('./examples-list');
const suite = 'Accordion Test Suite';

describe(suite, () => {
  beforeAll(async () => {
    await page.goto(
      getPuppeteerUrl({
        suite,
        test: scenarios.ACCORDION_EXAMPLE,
      }),
    );
  });

  it('expands once the title is clicked', async () => {
    await page.click('[aria-expanded=false]');
    // header changed
    await page.waitForSelector('[aria-expanded=true]');
    // content appeared
    await expect(page).toMatchElement('h3 + div', {
      text: 'Praesent condimentum',
    });
  });
});
