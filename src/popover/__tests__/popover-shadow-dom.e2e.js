/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable cup/no-undef */

const {
  mount,
  addShadowDomQuerySelector,
  waitForTimeout,
  shadowDomQuerySelector,
} = require('../../../e2e/helpers/index.js');

const webComponentTag = 'popover-scenario';

describe('popover in shadow DOM', () => {
  it('popover should be open by click', async () => {
    await mount(page, 'popover--shadow-dom');
    await page.waitForSelector(webComponentTag);
    await addShadowDomQuerySelector(page, webComponentTag);
    await page.evaluate(() => shadowDomQuerySelector('button').click());
    await waitForTimeout(150);
    const hasTooltip = await page.evaluate(
      () => !!shadowDomQuerySelector('[role="tooltip"]'),
    );
    expect(hasTooltip).toBe(true);
  });

  it('opened popover can be closed with ESC', async () => {
    await mount(page, 'popover--shadow-dom');
    await page.waitForSelector(webComponentTag);
    await addShadowDomQuerySelector(page, webComponentTag);
    await page.evaluate(() => shadowDomQuerySelector('button').click());
    await waitForTimeout(150);
    await page.keyboard.press('Escape');
    const hasTooltip = await page.evaluate(
      () => !!shadowDomQuerySelector('[role="tooltip"]'),
    );
    expect(hasTooltip).toBe(false);
  });

  it('opened popover should be closed on click outside', async () => {
    await mount(page, 'popover--shadow-dom');
    await page.waitForSelector(webComponentTag);
    await addShadowDomQuerySelector(page, webComponentTag);
    await page.evaluate(() => shadowDomQuerySelector('button').click());
    await waitForTimeout(150);
    await page.click('[data-e2e="outside-popover"]');
    const hastTooltip = await page.evaluate(
      () => !!shadowDomQuerySelector('[role="tooltip"]'),
    );
    expect(hastTooltip).toBe(false);
  });

  it('opened popover should not be closed on content click', async () => {
    await mount(page, 'popover--shadow-dom');
    await page.waitForSelector(webComponentTag);
    await addShadowDomQuerySelector(page, webComponentTag);
    await page.evaluate(() => shadowDomQuerySelector('button').click());
    await waitForTimeout(150);
    await page.evaluate(() =>
      shadowDomQuerySelector('[data-e2e="content"]').dispatchEvent(
        new MouseEvent('mousedown', {bubbles: true, composed: true}),
      ),
    );
    await waitForTimeout(150);
    const hastTooltip = await page.evaluate(
      () => !!shadowDomQuerySelector('[role="tooltip"]'),
    );
    expect(hastTooltip).toBe(true);
  });
});
