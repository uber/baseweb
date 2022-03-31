/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/*eslint-env node*/
/* eslint-disable flowtype/require-valid-file-annotation */

const { mount, analyzeAccessibility } = require('../../../e2e/helpers');

const selectors = {
  collapsed: '[aria-expanded=false]',
  expanded: '[aria-expanded=true]',
  secondPanel: 'ul[data-baseweb="accordion"] li:nth-of-type(2) div:first-child',
  lastPanel: 'ul[data-baseweb="accordion"] li:last-of-type div:first-child',
};

describe('accordion', () => {
  it('passes basic a11y tests', async () => {
    await mount(page, 'accordion--accordion');
    await page.waitForSelector('ul');
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('expands once the title is clicked', async () => {
    await mount(page, 'accordion--accordion');
    await page.click(selectors.collapsed);
    await page.waitForSelector(selectors.expanded);
    await expect(page).toMatchElement('li', { text: 'panel 1' });
  });

  it('collapses once expanded title is clicked', async () => {
    await mount(page, 'accordion--accordion');

    const initialCount = await page.$$eval(selectors.collapsed, (panels) => panels.length);

    await page.click(selectors.collapsed);
    await page.waitForSelector(selectors.expanded);

    await page.click(selectors.expanded);
    const count = await page.$$eval(selectors.collapsed, (panels) => panels.length);
    expect(count).toBe(initialCount);
  });

  it('correctly shifts focus when End and Home keys are pressed', async () => {
    await mount(page, 'accordion--accordion');

    await page.keyboard.press('Tab');
    await page.keyboard.press('End');

    // eslint-disable-next-line cup/no-undef
    const activeEl = await page.evaluateHandle(() => window.document.activeElement);
    const lastPanel = await page.$(selectors.lastPanel);
    const isLastPanelFocused = await page.evaluate((e1, e2) => e1 === e2, activeEl, lastPanel);
    expect(isLastPanelFocused).toBe(true);

    await page.keyboard.press('Home');

    // eslint-disable-next-line cup/no-undef
    const activeEl2 = await page.evaluateHandle(() => window.document.activeElement);
    const firstPanel = await page.$(selectors.collapsed);
    const isFirstPanelFocused = await page.evaluate((e1, e2) => e1 === e2, activeEl2, firstPanel);
    expect(isFirstPanelFocused).toBe(true);
  });

  it('correctly shifts focus when Arrow Up and Arrow Down are pressed', async () => {
    await mount(page, 'accordion--accordion');

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');

    // eslint-disable-next-line cup/no-undef
    const activeEl = await page.evaluateHandle(() => window.document.activeElement);
    const secondPanel = await page.$(selectors.secondPanel);
    const isSecondPanelFocused = await page.evaluate((e1, e2) => e1 === e2, activeEl, secondPanel);
    expect(isSecondPanelFocused).toBe(true);

    await page.keyboard.press('ArrowUp');

    // eslint-disable-next-line cup/no-undef
    const activeEl2 = await page.evaluateHandle(() => window.document.activeElement);
    const firstPanel = await page.$(selectors.collapsed);
    const isFirstPanelFocused = await page.evaluate((e1, e2) => e1 === e2, activeEl2, firstPanel);
    expect(isFirstPanelFocused).toBe(true);
  });

  it('only moves between panel headers, ignoring panel bodies', async () => {
    await mount(page, 'accordion--accordion');

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.keyboard.press('End');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowUp');

    // eslint-disable-next-line cup/no-undef
    const activeEl = await page.evaluateHandle(() => window.document.activeElement);
    const firstPanel = await page.$(selectors.collapsed);
    const isFirstPanelFocused = await page.evaluate((e1, e2) => e1 === e2, activeEl, firstPanel);
    expect(isFirstPanelFocused).toBe(true);
  });
});

describe('stateless accordion', () => {
  it('correctly shifts focus when End and Home keys are pressed', async () => {
    await mount(page, 'accordion--stateless-accordion');

    await page.keyboard.press('Tab');
    await page.keyboard.press('End');

    // eslint-disable-next-line cup/no-undef
    const activeEl = await page.evaluateHandle(() => window.document.activeElement);
    const lastPanel = await page.$(selectors.lastPanel);
    const isLastPanelFocused = await page.evaluate((e1, e2) => e1 === e2, activeEl, lastPanel);
    expect(isLastPanelFocused).toBe(true);

    await page.keyboard.press('Home');

    // eslint-disable-next-line cup/no-undef
    const activeEl2 = await page.evaluateHandle(() => window.document.activeElement);
    const firstPanel = await page.$(selectors.expanded);
    const isFirstPanelFocused = await page.evaluate((e1, e2) => e1 === e2, activeEl2, firstPanel);
    expect(isFirstPanelFocused).toBe(true);
  });

  it('correctly shifts focus when Arrow Up and Arrow Down are pressed', async () => {
    await mount(page, 'accordion--stateless-accordion');

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');

    // eslint-disable-next-line cup/no-undef
    const activeEl = await page.evaluateHandle(() => window.document.activeElement);
    const secondPanel = await page.$(selectors.secondPanel);
    const isSecondPanelFocused = await page.evaluate((e1, e2) => e1 === e2, activeEl, secondPanel);
    expect(isSecondPanelFocused).toBe(true);

    await page.keyboard.press('ArrowUp');

    // eslint-disable-next-line cup/no-undef
    const activeEl2 = await page.evaluateHandle(() => window.document.activeElement);
    const firstPanel = await page.$(selectors.expanded);
    const isFirstPanelFocused = await page.evaluate((e1, e2) => e1 === e2, activeEl2, firstPanel);
    expect(isFirstPanelFocused).toBe(true);
  });
});
