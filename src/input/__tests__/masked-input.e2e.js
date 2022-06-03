/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */
/* global window */

const { mount, analyzeAccessibility } = require('../../../e2e/helpers');

const { expect, test } = require('@playwright/test');

test.describe('masked-input', () => {
  test('handles keyboard input', async ({ page }) => {
    await mount(page, 'input--mask');
    const inputs = page.locator('input');

    await inputs.first().type('abc1234');
    await expect(inputs.first()).toHaveValue('(12 34');
  });
});
