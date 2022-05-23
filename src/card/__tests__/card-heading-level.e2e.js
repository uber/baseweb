/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const { mount } = require('../../../e2e/helpers');

const { expect, test } = require('@playwright/test');

test.describe('card', () => {
  test('renders the correct heading tag for the card title', async ({ page }) => {
    await mount(page, 'card--header-level');

    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h2')).toHaveCount(1);
    await expect(page.locator('h3')).toHaveCount(2);
    await expect(page.locator('h4')).toHaveCount(0);

    await expect(page.locator('h3').nth(1)).toHaveText('Card Title Should be H3');
  });
});
