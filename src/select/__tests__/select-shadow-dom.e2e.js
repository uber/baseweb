/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {
  mount,
  addShadowDomQuerySelector,
  waitForTimeout,
} = require('../../../e2e/helpers');

const webComponentTag = 'select-scenario';

describe('select in shadow DOM', () => {
  it('select should be open by click', async () => {
    await mount(page, 'select--shadow-dom');
    await page.waitForSelector(webComponentTag);
    await addShadowDomQuerySelector(page, webComponentTag);
    await page.evaluate(() => shadowDomQuerySelector('input[role="combobox"]').click());
    await waitForTimeout(150);
    const hasTooltip = await page.evaluate(
      () => !!shadowDomQuerySelector('[role="listbox"]'),
    );
    expect(hasTooltip).toBe(true);
  });

  it('selects option when clicked in dropdown', async () => {
    await mount(page, 'select--shadow-dom');
    await page.waitForSelector(webComponentTag);
    await addShadowDomQuerySelector(page, webComponentTag);
    await page.evaluate(() => shadowDomQuerySelector('input[role="combobox"]').click());
    await waitForTimeout(150);
    await page.evaluate(() => shadowDomQuerySelector('[role="listbox"] [role="option"]:nth-child(1)').click());
    await waitForTimeout(150);
    const selectedValue = await page.evaluate(() => shadowDomQuerySelector('[aria-selected="true"]').textContent);
    expect(selectedValue).toBe('AliceBlue');
  });

  it('should be closed on click outside', async () => {
    await mount(page, 'select--shadow-dom');
    await page.waitForSelector(webComponentTag);
    await addShadowDomQuerySelector(page, webComponentTag);
    await page.evaluate(() => shadowDomQuerySelector('input[role="combobox"]').click());
    await waitForTimeout(150);
    await page.click('[data-e2e="outside-select"]');
    const hasTooltip = await page.evaluate(
      () => !!shadowDomQuerySelector('[role="listbox"]'),
    );
    expect(hasTooltip).toBe(false);
  });
});
