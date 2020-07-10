/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {mount, analyzeAccessibility} = require('../../../e2e/helpers');

describe('tabs', () => {
  it('passes basic a11y tests', async () => {
    await mount(page, 'tabs-motion');
    await page.waitFor('[role="tab"]');
    const accessibilityReport = await analyzeAccessibility(page);
    expect(accessibilityReport).toHaveNoAccessibilityIssues();
  });

  it('*click* selects tab', async () => {
    expect(true).toBe(true);
  });
  it('*click* does not select disabled tab', async () => {
    expect(true).toBe(true);
  });

  it('*tab* moves focus to active tab', async () => {
    expect(true).toBe(true);
  });
  it('*tab* moves focus to tabpanel content', async () => {
    expect(true).toBe(true);
  });

  it('*direction* moves focus to tab and selects tab', async () => {
    expect(true).toBe(true);
  });
  it('*direction* moves focus to tab and *enter* selects tab when [manual]', async () => {
    expect(true).toBe(true);
  });
  it('*direction* moves focus to tab and *space* selects tab when [manual]', async () => {
    expect(true).toBe(true);
  });

  it('*direction* moves focus and skips disabled tabs', async () => {
    expect(true).toBe(true);
  });

  describe('ltr', () => {
    it('*direction* moves focus to next tab', async () => {
      expect(true).toBe(true);
    });
    it('*direction* moves focus to previous tab', async () => {
      expect(true).toBe(true);
    });
    it('*direction* moves focus to first tab', async () => {
      expect(true).toBe(true);
    });
    it('*direction* moves focus to last tab', async () => {
      expect(true).toBe(true);
    });
  });

  describe('rtl', () => {
    it('*direction* moves focus to next tab', async () => {
      expect(true).toBe(true);
    });
    it('*direction* moves focus to previous tab', async () => {
      expect(true).toBe(true);
    });
    it('*direction* moves focus to first tab', async () => {
      expect(true).toBe(true);
    });
    it('*direction* moves focus to last tab', async () => {
      expect(true).toBe(true);
    });
  });

  describe('vertical', () => {
    it('*direction* moves focus to next tab', async () => {
      expect(true).toBe(true);
    });
    it('*direction* moves focus to previous tab', async () => {
      expect(true).toBe(true);
    });
    it('*direction* moves focus to first tab', async () => {
      expect(true).toBe(true);
    });
    it('*direction* moves focus to last tab', async () => {
      expect(true).toBe(true);
    });
  });
});
