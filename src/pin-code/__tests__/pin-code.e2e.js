/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* global document */
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

const selectors = {
  input: 'input',
};

function findActiveElement(page) {
  return page.evaluateHandle(() => document.activeElement);
}

function compareElements(page, a, b) {
  return page.evaluate((a, b) => a === b, a, b);
}

describe('PinCode', () => {
  beforeEach(async () => {
    await mount(page, 'pin-code');
    await page.waitFor(selectors.input);
  });

  it('passes basic a11y tests', async () => {
    const accessibilityReport = await analyzeAccessibility(page, {
      rules: [
        {
          id: 'autocomplete-valid', // one-time-code has limited support but is useful for iOS
          enabled: false,
        },
      ],
    });
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('can enter a pin code', async () => {
    const inputs = await page.$$(selectors.input);
    await page.focus(selectors.input);
    await page.keyboard.press('1');
    await page.keyboard.press('2');
    await page.keyboard.press('3');
    await page.keyboard.press('4');
    expect(await page.evaluate(el => el.value, inputs[0])).toBe('1');
    expect(await page.evaluate(el => el.value, inputs[1])).toBe('2');
    expect(await page.evaluate(el => el.value, inputs[2])).toBe('3');
    expect(await page.evaluate(el => el.value, inputs[3])).toBe('4');
  });

  it('transfers focus to next input when a digit is entered', async () => {
    const inputs = await page.$$(selectors.input);
    await page.focus(selectors.input);
    await page.keyboard.press('1');
    let activeElement = await findActiveElement(page);
    let isEqual = await compareElements(page, inputs[1], activeElement);
    expect(isEqual).toBe(true);
  });

  it('only accepts digits', async () => {
    const input = await page.$(selectors.input);
    await page.focus(selectors.input);
    await page.keyboard.press('a');
    expect(await page.evaluate(el => el.value, input)).toBe('');
    await page.keyboard.press('1');
    expect(await page.evaluate(el => el.value, input)).toBe('1');
  });

  it('deleting empty input transfers focus to previous input & clears that input', async () => {
    const inputs = await page.$$(selectors.input);
    await page.focus(selectors.input);
    await page.keyboard.press('1');
    expect(await page.evaluate(el => el.value, inputs[0])).toBe('1');
    await page.keyboard.press('Backspace');
    expect(await page.evaluate(el => el.value, inputs[0])).toBe('');
    let activeElement = await findActiveElement(page);
    let isEqual = await compareElements(page, inputs[0], activeElement);
    expect(isEqual).toBe(true);
  });

  // This test is validating that when you focus on an input
  // you do not have to have the current value selected to overwrite
  // the input value. So long as you enter a digit, the input will
  // be updated.
  it('does not require text selection to update input value', async () => {
    const input = await page.$(selectors.input);
    await page.focus(selectors.input);
    await page.keyboard.press('1');
    await page.focus(selectors.input);
    // verify that cursor position does not matter by entering text on left side
    await page.keyboard.press('ArrowLeft'); // ensures no text is selected
    await page.keyboard.press('2');
    expect(await page.evaluate(el => el.value, input)).toBe('2');
    // verify that cursor position does not matter by entering text on right side
    await page.focus(selectors.input);
    await page.keyboard.press('ArrowRight'); // ensures no text is selected
    await page.keyboard.press('3');
    expect(await page.evaluate(el => el.value, input)).toBe('3');
  });
});
