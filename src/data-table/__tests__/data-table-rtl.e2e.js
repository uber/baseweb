/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount} = require('../../../e2e/helpers');

describe('data-table-rtl', () => {
  it('renders column cells in RTL order', async () => {
    await mount(page, 'data-table-rtl');
    // Row 1, cell1 should be rendered to the right
    const cell1x1 = await page.$(
      '[data-baseweb="data-table"] > div:nth-child(2)',
    );
    expect(await cell1x1.evaluate(node => node.style.right)).toBe('0px');
  });

  it('action row in RTL order', async () => {
    await mount(page, 'data-table-rtl');
    // Row 1, cell1
    const cell1x1 = await page.$(
      '[data-baseweb="data-table"] > div:nth-child(2)',
    );
    // Hover on Cell1x1
    await cell1x1.hover();
    const actionRow = await page.$(
      '[data-baseweb="data-table"] > div:last-child',
    );
    //Action row should be in RTL order
    expect(await actionRow.evaluate(node => node.style.right)).toBe('initial');
    expect(await actionRow.evaluate(node => node.style.left)).toBe('0px');
  });
});
