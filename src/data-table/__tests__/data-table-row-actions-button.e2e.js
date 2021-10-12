/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount} = require('../../../e2e/helpers');

describe('data-table-row-actions-button', () => {
  it('renders provided row action buttons', async () => {
    await mount(page, 'data-table--row-actions-button');

    // hover first row
    await page.mouse.move(150, 175);

    const a = await page.$('#hello');
    expect(a).toBeTruthy();

    const b = await page.$('#world');
    expect(b).toBeFalsy();

    // hover second row
    await page.mouse.move(150, 215);

    const c = await page.$('#hello');
    expect(c).toBeTruthy();

    const d = await page.$('#world');
    expect(d).toBeTruthy();
  });
});
