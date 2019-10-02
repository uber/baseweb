/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-env node */

const globby = require('globby');
const {toMatchImageSnapshot} = require('jest-image-snapshot');
const {mount} = require('../e2e/helpers');

expect.extend({toMatchImageSnapshot});

/**
 * A function to run a visual regression test (vrt) suite for a component. Ex: `vrt('button')`, `vrt('datepicker')`.
 * @param {string} componentName - The name of the component to test. Searches through that component's directory to find storybook scenarios.
 * @param {Object} [interactionsByScenario] - An object keyed by scenario names. Each key should point to an array of interaction objects.
 */
function vrt(componentName, interactionsByScenario = {}) {
  describe(componentName, () => {
    getScenariosForComponent(componentName).forEach(scenarioName => {
      it(scenarioName, async () => {
        const root = await prepare(page, scenarioName);

        const image = await root.screenshot();
        expect(image).toMatchImageSnapshot({
          customSnapshotIdentifier: `${scenarioName}`,
        });
      });

      if (interactionsByScenario[scenarioName]) {
        interactionsByScenario[scenarioName].forEach(interaction => {
          it(`${scenarioName}__${interaction.name}`, async () => {
            const root = await prepare(page, scenarioName);
            // interaction `behavior` should get the page into the correct state for a snapshot
            // currently only one snapshot can be taken per interaction
            await interaction.behavior(page);
            const image = await root.screenshot();
            expect(image).toMatchImageSnapshot({
              customSnapshotIdentifier: `${scenarioName}__${interaction.name}`,
            });
          });
        });
      }
    });
  });
}

/**
 *
 * @param {Page} page - An instance of a Puppeteer Page. https://pptr.dev/#?product=Puppeteer&version=v1.20.0&show=api-class-page
 * @param {string} scenarioName - The name of a scenario to mount for the test. This correlates to the `name` parameter in a Storybook URL.
 */
async function prepare(page, scenarioName) {
  // load page and wait to settle
  await mount(page, scenarioName);

  // freeze animations
  await page.addStyleTag({
    content: `*, *::before, *::after {
-moz-transition: none !important;
transition: none !important;
-moz-animation: none !important;
animation: none !important;
}`,
  });

  // return root element for taking screenshots
  const root = await page.$('#root');
  return root;
}

/**
 *
 * @param {string} componentName - The component directory to look for scenarios in. Ex: `button`, `datepicker`...
 */
function getScenariosForComponent(componentName) {
  return globby
    .sync('./*.scenario.js', {cwd: `src/${componentName}/__tests__`})
    .map(file => file.split('.scenario.js')[0]);
}

module.exports = {
  vrt,
};
