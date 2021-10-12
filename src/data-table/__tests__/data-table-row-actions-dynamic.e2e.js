/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount} = require('../../../e2e/helpers');

const {getActionButtonByLabel} = require('./utilities.js');

describe('data-table-row-actions-dynamic', () => {
  it('renders provided row action buttons', async () => {
    await mount(page, 'data-table--row-actions-dynamic');

    // hover first row
    await page.mouse.move(150, 175);

    const a = await getActionButtonByLabel(page, 'stable-action-icon');
    expect(a).toBeTruthy();

    const b = await getActionButtonByLabel(page, 'dynamic-action-icon');
    expect(b).toBeFalsy();

    // hover second row
    await page.mouse.move(150, 215);

    const c = await getActionButtonByLabel(page, 'stable-action-icon');
    expect(c).toBeTruthy();

    const d = await getActionButtonByLabel(page, 'dynamic-action-icon');
    expect(d).toBeTruthy();
  });
});
