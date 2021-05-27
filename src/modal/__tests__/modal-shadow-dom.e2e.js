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

const webComponentTag = 'modal-scenario';

describe('modal in shadow DOM', () => {
  it('modal should be possible to open', async () => {
    await mount(page, 'modal--shadow-dom');
    await page.waitForSelector(webComponentTag);
    await addShadowDomQuerySelector(page, webComponentTag);
    await page.evaluate(() =>
      shadowDomQuerySelector('.open-modal-button').click(),
    );
    await waitForTimeout(1000); // wait for animation
    const isOpen = await page.evaluate(
      () => !!shadowDomQuerySelector('[role="dialog"]'),
    );
    expect(isOpen).toBe(true);
  });

  it('open modal should be closed on backdrop click', async () => {
    await mount(page, 'modal--shadow-dom');
    await page.waitForSelector(webComponentTag);
    await addShadowDomQuerySelector(page, webComponentTag);
    await page.evaluate(() =>
      shadowDomQuerySelector('.open-modal-button').click(),
    );
    await waitForTimeout(1000); // wait for animation
    await page.evaluate(() =>
      shadowDomQuerySelector('[data-e2e="backdrop"]').dispatchEvent(
        new MouseEvent('mousedown', {bubbles: true, composed: true}),
      ),
    );
    await waitForTimeout(1000); // wait for animation
    const isClosed = await page.evaluate(
      () => !shadowDomQuerySelector('[role="dialog"]'),
    );
    expect(isClosed).toBe(true);
  });
});
