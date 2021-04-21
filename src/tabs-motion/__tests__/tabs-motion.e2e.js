/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

const getTabs = () => page.$$('[role=tab]');

const getTabPanels = () => page.$$('[role=tabpanel]');

const isExpanded = t => {
  return page.evaluate(tab => tab.getAttribute('aria-expanded') === 'true', t);
};

const isHidden = t => {
  return page.evaluate(tab => tab.hidden, t);
};

const isSelected = t => {
  return page.evaluate(tab => tab.getAttribute('aria-selected') === 'true', t);
};

const isEqual = (e1, e2) => page.evaluate((e1, e2) => e1 === e2, e1, e2);

const isActiveEl = async el => {
  const activeEl = await page.evaluateHandle(`document.activeElement`);
  const result = await isEqual(activeEl, el);
  activeEl.dispose();
  return result;
};

describe('tabs', () => {
  it('passes basic a11y tests', async () => {
    await mount(page, 'tabs-motion--tabs-motion');
    await page.waitForSelector('[role="tab"]');
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('only the selected tab has visible content', async () => {
    await mount(page, 'tabs-motion--tabs-motion');
    const tabs = await getTabs();
    const tabPanels = await getTabPanels();
    expect(await isSelected(tabs[0])).toBeTruthy();
    expect(await isExpanded(tabPanels[0])).toBeTruthy();
    expect(await isHidden(tabPanels[0])).toBeFalsy();
    expect(await isSelected(tabs[1])).toBeFalsy();
    expect(await isExpanded(tabPanels[1])).toBeFalsy();
    expect(await isHidden(tabPanels[1])).toBeTruthy();
    expect(await isSelected(tabs[2])).toBeFalsy();
    expect(await isExpanded(tabPanels[2])).toBeFalsy();
    expect(await isHidden(tabPanels[2])).toBeTruthy();
  });

  it('*click* selects tab', async () => {
    await mount(page, 'tabs-motion--tabs-motion');
    const tabs = await getTabs();
    expect(await isSelected(tabs[0])).toBeTruthy();
    await tabs[1].click();
    expect(await isSelected(tabs[1])).toBeTruthy();
  });

  it('*click* does not select disabled tab', async () => {
    await mount(page, 'tabs-motion--disabled');
    const tabs = await getTabs();
    expect(await isSelected(tabs[0])).toBeTruthy();
    await tabs[1].click();
    expect(await isSelected(tabs[0])).toBeTruthy();
  });

  it('does not mount non selected tab content', async () => {
    await mount(page, 'tabs-motion--tabs-motion');
    const tabs = await getTabs();
    expect(await isSelected(tabs[0])).toBeTruthy();
    expect(await page.evaluate(`window.__e2e__mounted`)).toBe(false);
  });

  it('[renderAll] mounts non selected tab content', async () => {
    await mount(page, 'tabs-motion--render-all');
    const tabs = await getTabs();
    expect(await isSelected(tabs[0])).toBeTruthy();
    expect(await page.evaluate(`window.__e2e__mounted`)).toBe(true);
  });

  it('{regression} conditional tab does not throw error', async () => {
    await mount(page, 'tabs-motion--conditional');
    const button = await page.$('#toggle-robot-tab');
    let firstTab = await page.$('#tabs-1-tab-robot');
    expect(firstTab).toBeFalsy();
    await button.click();
    firstTab = await page.$('#tabs-1-tab-robot');
    expect(firstTab).toBeTruthy();
    expect(await page.evaluate(`window.__e2e__error`)).toBe(false);
  });

  it('*tab* moves focus to active tab', async () => {
    await mount(page, 'tabs-motion--focus');
    const firstFocusElement = await page.$('#first-focus');
    await firstFocusElement.focus();
    expect(await isActiveEl(firstFocusElement)).toBeTruthy();
    await page.keyboard.press('Tab');
    const tabs = await getTabs();
    expect(await isActiveEl(tabs[1])).toBeTruthy();
  });

  it('*tab* moves focus to tab content', async () => {
    await mount(page, 'tabs-motion--focus');
    const tabs = await getTabs();
    await tabs[1].focus();
    expect(await isActiveEl(tabs[1])).toBeTruthy();
    await page.keyboard.press('Tab');
    const tabContent = await page.$('#tab-content');
    expect(await isActiveEl(tabContent)).toBeTruthy();
  });

  it('*direction* moves focus to tab and selects tab', async () => {
    await mount(page, 'tabs-motion--tabs-motion');
    const tabs = await getTabs();
    await tabs[0].focus();
    expect(await isActiveEl(tabs[0])).toBeTruthy();
    expect(await isSelected(tabs[0])).toBeTruthy();
    await page.keyboard.press('ArrowRight');
    expect(await isActiveEl(tabs[1])).toBeTruthy();
    expect(await isSelected(tabs[1])).toBeTruthy();
  });

  it('*direction* moves focus to tab and *enter* selects tab when [manual]', async () => {
    await mount(page, 'tabs-motion--manual');
    const tabs = await getTabs();
    await tabs[0].focus();
    expect(await isActiveEl(tabs[0])).toBeTruthy();
    expect(await isSelected(tabs[0])).toBeTruthy();
    await page.keyboard.press('ArrowRight');
    expect(await isActiveEl(tabs[1])).toBeTruthy();
    expect(await isSelected(tabs[0])).toBeTruthy();
    await page.keyboard.press('Enter');
    expect(await isSelected(tabs[1])).toBeTruthy();
  });

  it('*direction* moves focus to tab and *space* selects tab when [manual]', async () => {
    await mount(page, 'tabs-motion--manual');
    const tabs = await getTabs();
    await tabs[0].focus();
    expect(await isActiveEl(tabs[0])).toBeTruthy();
    expect(await isSelected(tabs[0])).toBeTruthy();
    await page.keyboard.press('ArrowRight');
    expect(await isActiveEl(tabs[1])).toBeTruthy();
    expect(await isSelected(tabs[0])).toBeTruthy();
    await page.keyboard.press('Space');
    expect(await isSelected(tabs[1])).toBeTruthy();
  });

  it('*direction* moves focus and skips disabled tabs', async () => {
    await mount(page, 'tabs-motion--disabled');
    const tabs = await getTabs();
    await tabs[0].focus();
    expect(await isActiveEl(tabs[0])).toBeTruthy();
    expect(await isSelected(tabs[0])).toBeTruthy();
    await page.keyboard.press('ArrowRight');
    expect(await isActiveEl(tabs[2])).toBeTruthy();
    expect(await isSelected(tabs[2])).toBeTruthy();
  });

  describe('ltr', () => {
    it('*direction* moves focus to next tab', async () => {
      await mount(page, 'tabs-motion--tabs-motion');
      const tabs = await getTabs();
      await tabs[0].focus();
      expect(await isActiveEl(tabs[0])).toBeTruthy();
      await page.keyboard.press('ArrowRight');
      expect(await isActiveEl(tabs[1])).toBeTruthy();
    });

    it('*direction* moves focus to previous tab', async () => {
      await mount(page, 'tabs-motion--tabs-motion');
      const tabs = await getTabs();
      await tabs[1].focus();
      expect(await isActiveEl(tabs[1])).toBeTruthy();
      await page.keyboard.press('ArrowLeft');
      expect(await isActiveEl(tabs[0])).toBeTruthy();
    });

    it('*direction* moves focus to first tab', async () => {
      await mount(page, 'tabs-motion--tabs-motion');
      const tabs = await getTabs();
      await tabs[2].focus();
      expect(await isActiveEl(tabs[2])).toBeTruthy();
      await page.keyboard.press('ArrowRight');
      expect(await isActiveEl(tabs[0])).toBeTruthy();
    });

    it('*direction* moves focus to last tab', async () => {
      await mount(page, 'tabs-motion--tabs-motion');
      const tabs = await getTabs();
      await tabs[0].focus();
      expect(await isActiveEl(tabs[0])).toBeTruthy();
      await page.keyboard.press('ArrowLeft');
      expect(await isActiveEl(tabs[2])).toBeTruthy();
    });
  });

  describe('rtl', () => {
    it('*direction* moves focus to next tab', async () => {
      await mount(page, 'tabs-motion--tabs-motion', 'light', true);
      const tabs = await getTabs();
      await tabs[0].focus();
      expect(await isActiveEl(tabs[0])).toBeTruthy();
      await page.keyboard.press('ArrowLeft');
      expect(await isActiveEl(tabs[1])).toBeTruthy();
    });

    it('*direction* moves focus to previous tab', async () => {
      await mount(page, 'tabs-motion--tabs-motion', 'light', true);
      const tabs = await getTabs();
      await tabs[1].focus();
      expect(await isActiveEl(tabs[1])).toBeTruthy();
      await page.keyboard.press('ArrowRight');
      expect(await isActiveEl(tabs[0])).toBeTruthy();
    });

    it('*direction* moves focus to first tab', async () => {
      await mount(page, 'tabs-motion--tabs-motion', 'light', true);
      const tabs = await getTabs();
      await tabs[2].focus();
      expect(await isActiveEl(tabs[2])).toBeTruthy();
      await page.keyboard.press('ArrowLeft');
      expect(await isActiveEl(tabs[0])).toBeTruthy();
    });

    it('*direction* moves focus to last tab', async () => {
      await mount(page, 'tabs-motion--tabs-motion', 'light', true);
      const tabs = await getTabs();
      await tabs[0].focus();
      expect(await isActiveEl(tabs[0])).toBeTruthy();
      await page.keyboard.press('ArrowRight');
      expect(await isActiveEl(tabs[2])).toBeTruthy();
    });
  });

  describe('vertical', () => {
    it('*direction* moves focus to next tab', async () => {
      await mount(page, 'tabs-motion--vertical');
      const tabs = await getTabs();
      await tabs[0].focus();
      expect(await isActiveEl(tabs[0])).toBeTruthy();
      await page.keyboard.press('ArrowDown');
      expect(await isActiveEl(tabs[1])).toBeTruthy();
    });

    it('*direction* moves focus to previous tab', async () => {
      await mount(page, 'tabs-motion--vertical');
      const tabs = await getTabs();
      await tabs[1].focus();
      expect(await isActiveEl(tabs[1])).toBeTruthy();
      await page.keyboard.press('ArrowUp');
      expect(await isActiveEl(tabs[0])).toBeTruthy();
    });

    it('*direction* moves focus to first tab', async () => {
      await mount(page, 'tabs-motion--vertical');
      const tabs = await getTabs();
      await tabs[2].focus();
      expect(await isActiveEl(tabs[2])).toBeTruthy();
      await page.keyboard.press('ArrowDown');
      expect(await isActiveEl(tabs[0])).toBeTruthy();
    });

    it('*direction* moves focus to last tab', async () => {
      await mount(page, 'tabs-motion--vertical');
      const tabs = await getTabs();
      await tabs[0].focus();
      expect(await isActiveEl(tabs[0])).toBeTruthy();
      await page.keyboard.press('ArrowUp');
      expect(await isActiveEl(tabs[2])).toBeTruthy();
    });
  });
});
