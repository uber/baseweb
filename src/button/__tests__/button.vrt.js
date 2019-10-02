/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount} = require('../../../e2e/helpers');

describe('button', () => {
  it('looks the same', async () => {
    await mount(page, 'button');
    await page.waitFor('button');
  });
});
