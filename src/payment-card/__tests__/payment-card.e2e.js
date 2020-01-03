/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

const selectors = {
  input: 'input',
};

describe('PaymentCard', () => {
  beforeEach(async () => {
    await mount(page, 'stateful-payment-card');
    await page.waitFor(selectors.input);
  });

  it('passes basic a11y tests', async () => {
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('enter full credit card number', async () => {
    const input = await page.$(selectors.input);
    await input.type('4111222233334444');
    const value = await page.evaluate(element => element.value, input);
    expect(value).toBe('4111 2222 3333 4444');
  });

  it('add more digits in the middle of input', async () => {
    const input = await page.$(selectors.input);
    await input.type('41112');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('5');
    expect(await page.evaluate(el => el.value, input)).toBe('4115 12');
    await page.keyboard.press('6');
    expect(await page.evaluate(el => el.value, input)).toBe('4115 612');
  });

  it('delete digits from the end of input', async () => {
    const input = await page.$(selectors.input);
    await input.type('4111 2');
    await page.keyboard.press('Backspace');
    expect(await page.evaluate(el => el.value, input)).toBe('4111');
    await page.keyboard.press('Backspace');
    expect(await page.evaluate(el => el.value, input)).toBe('411');
  });

  it('delete digits in the middle of input', async () => {
    const input = await page.$(selectors.input);
    await input.type('4111 235');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('Backspace');
    expect(await page.evaluate(el => el.value, input)).toBe('4111 35');
    await page.keyboard.press('Backspace');
    expect(await page.evaluate(el => el.value, input)).toBe('4113 5');
  });
});
