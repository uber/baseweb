/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const { mount } = require('../../../e2e/helpers');

const isActiveEl = async (page, selector) => {
  // eslint-disable-next-line cup/no-undef
  const activeEl = await page.evaluateHandle(() => document.activeElement);
  const selectedEl = await page.$(selector);
  const equal = await page.evaluate((e1, e2) => e1 === e2, activeEl, selectedEl);
  activeEl.dispose();
  return equal;
};

const inputSelector = 'input';

describe('popover', () => {
  it('contents are auto-focused but not focus-locked', async () => {
    await mount(page, 'popover--auto-focus-without-focus-lock');
    await page.waitForSelector('button');
    await page.click('button');
    await page.waitForSelector(inputSelector);

    const inputIsActiveOnOpening = await isActiveEl(page, inputSelector);
    expect(inputIsActiveOnOpening).toBe(true);

    await page.keyboard.press('Tab');

    const inputIsActiveAfterTabbingOut = await isActiveEl(page, inputSelector);
    expect(inputIsActiveAfterTabbingOut).toBe(false);
  });
});
