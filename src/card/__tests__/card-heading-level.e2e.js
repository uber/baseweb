/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const { mount } = require('../../../e2e/helpers');
const { titleText } = require('./card-header-level.scenario');

describe('card', () => {
  it('renders the correct heading tag for the card title', async () => {
    await mount(page, 'card--header-level');

    const h1Elems = await page.$$('h1');
    const h2Elems = await page.$$('h2');
    const h3Elems = await page.$$('h3');
    const h4Elems = await page.$$('h4');

    expect(h1Elems).toHaveLength(1);
    expect(h2Elems).toHaveLength(1);
    expect(h3Elems).toHaveLength(2);
    expect(h4Elems).toHaveLength(0);

    expect(await page.evaluate((el) => el.textContent, h3Elems[1])).toBe(titleText);
  });
});
