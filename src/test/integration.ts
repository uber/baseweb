/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import type { ElementHandle, Page } from '@playwright/test';
import { expect } from '@playwright/test';

import axeCore from 'axe-core';
import type { AxeResults, Rule, RunOptions } from 'axe-core';
import queryString from 'query-string';
import { printReceived } from 'jest-matcher-utils';
import { resolve } from 'path';
import { realpathSync } from 'fs';

const PATH_TO_AXE = './node_modules/axe-core/axe.min.js';
const appDirectory = realpathSync(process.cwd());

const resolvePath = (relativePath) => resolve(appDirectory, relativePath);

export const addTestStyles = async (page: Page) => {
  await page.addStyleTag({
    content: `*,
    *::before,
    *::after {
      -moz-transition: none !important;
      transition: none !important;
      transition-duration: 0s !important;
      -moz-transition-duration: 0s !important;
      transition-property: none !important;
      -moz-transition-property: none !important;
      -moz-animation: none !important;
      animation: none !important;
      animation-delay: -0.0001s !important;
      animation-duration: 0s !important;
      animation-play-state: paused !important;
      caret-color: transparent !important;
    }`,
  });
};

export async function mount(page: Page, name: string, theme?: string, rtl?: boolean) {
  const base = process.env.PUPPETEER_TARGET_URL || 'http://localhost:8080';
  const url = `${base}?${queryString.stringify({
    story: name,
    theme,
    mode: 'preview',
    rtl: rtl === true ? 'true' : undefined,
  })}`;

  await page.goto(url);
  await page.waitForSelector('[data-storyloaded]');
  await addTestStyles(page);
}

declare global {
  interface Window {
    axe: typeof axeCore;
  }
}

export async function analyzeAccessibility(page: Page, rules: Rule[] = []) {
  // Inject the axe script in our page
  await page.addScriptTag({ path: resolvePath(PATH_TO_AXE) });
  // we make sure that axe is executed in the next tick after
  // the page emits the load event, giving priority for the
  // original JS to be evaluated
  const accessibilityReport = await page.evaluate((axeRules) => {
    return new Promise((resolve) => {
      setTimeout(resolve, 0);
    }).then(() => {
      window.axe.configure({
        rules: [
          {
            id: 'region',
            enabled: false,
          },
          {
            id: 'landmark-one-main',
            enabled: false,
          },
          {
            id: 'bypass',
            enabled: false,
          },
          {
            id: 'page-has-heading-one',
            enabled: false,
          },
          {
            id: 'color-contrast',
            enabled: false,
          },
          ...axeRules,
        ],
      });
      return window.axe.run();
    });
  }, rules);

  return accessibilityReport;
}

export function isSameNode(page: Page, a: ElementHandle, b: ElementHandle) {
  return page.evaluate(({ a, b }) => a === b, { a, b });
}

const defaultOptions = {
  violationsThreshold: 0,
  incompleteThreshold: 0,
};

const printInvalidNode = (node) =>
  `- ${printReceived(node.html)}\n\t${node.any.map((check) => check.message).join('\n\t')}`;

const printInvalidRule = (rule) =>
  `Violated rule: ${printReceived(rule.id)}\nReasoning: ${printReceived(rule.help)}\n${
    rule.nodes.length
  } nodes involved:\n\n${rule.nodes.map(printInvalidNode).join('\n')}`;

// Add a new method to expect assertions with a very detailed error report
expect.extend({
  toHaveNoAccessibilityIssues(accessibilityReport: AxeResults, options?: RunOptions) {
    let violations = [];
    let incomplete = [];
    const finalOptions = Object.assign({}, defaultOptions, options);

    if (accessibilityReport.violations.length > finalOptions.violationsThreshold) {
      violations = [
        `Expected to have no more than ${finalOptions.violationsThreshold} violations. Detected ${accessibilityReport.violations.length} violations:\n`,
      ].concat(accessibilityReport.violations.map(printInvalidRule));
    }
    if (accessibilityReport.incomplete.length > finalOptions.incompleteThreshold) {
      incomplete = [
        `Expected to have no more than ${finalOptions.incompleteThreshold} incomplete. Detected ${accessibilityReport.incomplete.length} incomplete:\n`,
      ].concat(accessibilityReport.incomplete.map(printInvalidRule));
    }
    const message = [].concat(violations, incomplete).join('\n');
    const pass =
      accessibilityReport.violations.length <= finalOptions.violationsThreshold &&
      accessibilityReport.incomplete.length <= finalOptions.incompleteThreshold;

    return {
      pass,
      message: () => message,
    };
  },
});
