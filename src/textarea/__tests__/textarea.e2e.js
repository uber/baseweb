/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

const selectors = {
  textarea: 'textarea',
  clearIcon: '[data-e2e="clear-icon"]',
};

describe('textarea', () => {
  it('passes basic a11y tests', async () => {
    await mount(page, 'textarea');
    await page.waitFor(selectors.textarea);
    const accessibilityReport = await analyzeAccessibility(page, {
      rules: [
        {
          id: 'label',
          enabled: false,
        },
      ],
    });
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('preset value is displayed', async () => {
    await mount(page, 'textarea');
    await page.waitFor(selectors.textarea);

    const value = await page.$eval(selectors.textarea, input => input.value);
    expect(value).toBe('initial value');
  });

  it('entered value is displayed', async () => {
    await mount(page, 'textarea');
    await page.waitFor(selectors.textarea);
    await page.click(selectors.textarea);
    await page.keyboard.type('!');

    const value = await page.$eval(selectors.textarea, input => input.value);
    expect(value).toBe('initial value!');
  });

  it('can be cleared with a click', async () => {
    await mount(page, 'textarea');
    await page.waitFor(selectors.textarea);
    await page.click(selectors.textarea);
    await page.keyboard.type('Something or other');
    await page.click(selectors.clearIcon);
    const value = await page.$eval(selectors.textarea, input => input.value);
    expect(value).toBe('');
  });

  it('can be cleared with escape', async () => {
    await mount(page, 'textarea');
    await page.waitFor(selectors.textarea);
    await page.click(selectors.textarea);
    await page.keyboard.type('Something or other');
    await page.keyboard.press('Escape');
    const value = await page.$eval(selectors.textarea, input => input.value);
    expect(value).toBe('');
  });
});
