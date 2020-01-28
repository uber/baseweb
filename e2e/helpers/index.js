/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-env node */

const config = require('../../jest-puppeteer.config.js');

const axe = require('axe-core');
const {printReceived} = require('jest-matcher-utils');
const {resolve} = require('path');
const {realpathSync} = require('fs');

const PATH_TO_AXE = './node_modules/axe-core/axe.min.js';
const appDirectory = realpathSync(process.cwd());

const resolvePath = relativePath => resolve(appDirectory, relativePath);

function getUrl({launchUrl, name, theme}) {
  const query = [[name, 'name'], [theme, 'theme']]
    .filter(([value]) => Boolean(value))
    .map(([value, key]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  return `${launchUrl}?${query}`;
}

function getPuppeteerUrl(name, theme) {
  return getUrl({
    launchUrl: config.tests.url,
    name,
    theme,
  });
}

async function mount(page, scenarioName, theme) {
  // replicate console events into terminal
  page.on('console', msg => {
    if (msg.type() === 'warning') return;
    for (let i = 0; i < msg.args().length; ++i) {
      // eslint-disable-next-line no-console
      console.log(`${msg.args()[i]}`);
    }
  });

  await page.goto(getPuppeteerUrl(scenarioName, theme));
}

async function analyzeAccessibility(page, options = {rules: []}) {
  // Inject the axe script in our page
  await page.addScriptTag({path: resolvePath(PATH_TO_AXE)});
  // we make sure that axe is executed in the next tick after
  // the page emits the load event, giving priority for the
  // original JS to be evaluated
  const accessibilityReport = await page.evaluate(axeOptions => {
    return new Promise(resolve => {
      setTimeout(resolve, 0);
    }).then(() => {
      axe.configure({
        rules: [
          {
            id: 'region',
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
        ].concat(axeOptions.rules),
      });
      return axe.run();
    });
  }, options);

  return accessibilityReport;
}

const defaultOptions = {
  violationsThreshold: 0,
  incompleteThreshold: 0,
};

const printInvalidNode = node =>
  `- ${printReceived(node.html)}\n\t${node.any
    .map(check => check.message)
    .join('\n\t')}`;

const printInvalidRule = rule =>
  `Violated rule: ${printReceived(rule.id)}\nReasoning: ${printReceived(
    rule.help,
  )}\n${rule.nodes.length} nodes involved:\n\n${rule.nodes
    .map(printInvalidNode)
    .join('\n')}`;

// Add a new method to expect assertions with a very detailed error report
expect.extend({
  toHaveNoAccessibilityIssues(accessibilityReport, options) {
    let violations = [];
    let incomplete = [];
    const finalOptions = Object.assign({}, defaultOptions, options);

    if (
      accessibilityReport.violations.length > finalOptions.violationsThreshold
    ) {
      violations = [
        `Expected to have no more than ${finalOptions.violationsThreshold} violations. Detected ${accessibilityReport.violations.length} violations:\n`,
      ].concat(accessibilityReport.violations.map(printInvalidRule));
    }
    if (
      finalOptions.incompleteThreshold !== false &&
      accessibilityReport.incomplete.length > finalOptions.incompleteThreshold
    ) {
      incomplete = [
        `Expected to have no more than ${finalOptions.incompleteThreshold} incomplete. Detected ${accessibilityReport.incomplete.length} incomplete:\n`,
      ].concat(accessibilityReport.incomplete.map(printInvalidRule));
    }
    const message = [].concat(violations, incomplete).join('\n');
    const pass =
      accessibilityReport.violations.length <=
        finalOptions.violationsThreshold &&
      (finalOptions.incompleteThreshold === false ||
        accessibilityReport.incomplete.length <=
          finalOptions.incompleteThreshold);

    return {
      pass,
      message: () => message,
    };
  },
});

module.exports = {
  analyzeAccessibility,
  mount,
};
