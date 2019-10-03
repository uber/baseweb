/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-env node */

const fs = require('fs');
const globby = require('globby');
const {configureToMatchImageSnapshot} = require('jest-image-snapshot');
const {mount} = require('../e2e/helpers');

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customDiffDir: '__vrt_diffs__',
  diffDirection: 'vertical',
});

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
          customSnapshotIdentifier: scenarioName,
        });
      });

      if (interactionsByScenario[scenarioName]) {
        interactionsByScenario[scenarioName].forEach(interaction => {
          const testName = `${scenarioName}__${interaction.name}`;
          it(testName, async () => {
            const root = await prepare(page, scenarioName);
            await interaction.behavior(page);
            const image = await root.screenshot();
            expect(image).toMatchImageSnapshot({
              customSnapshotIdentifier: testName,
            });
          });
        });
      }
    });
  });
}

/**
 *
 * A function for capturing an image of a failed test. This will be more useful
 * for E2E tests in the future but saving just in case.
 * @param {ImageBuffer} image - An image buffer
 * @param {string} name - The name of the test and, if neccessary, the file to write.
 */
async function snapshot(image, name) {
  try {
    expect(image).toMatchImageSnapshot({
      customSnapshotIdentifier: name,
    });
  } catch (er) {
    const path = name + '.png';
    await fs.writeFile(path, image);
    printToBuildKiteConsole(path);
    throw er;
  }
}

/**
 *
 * A function wrapper around the e2e helper, `mount`, that freezes animations and waits until the `#root` element is ready.
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
 * A function for grabbing all scenarios for a component. Just looks for `*.scenario.js`
 * files in the specfied directory.
 * @param {string} componentName - The component directory to look for scenarios in. Ex: `button`, `datepicker`...
 */
function getScenariosForComponent(componentName) {
  return globby
    .sync('./*.scenario.js', {cwd: `src/${componentName}/__tests__`})
    .map(file => file.split('.scenario.js')[0]);
}

/**
 * A function for logging a file to the BuildKite console.
 * @param {string} path - The path to the file to log.
 */
function printToBuildKiteConsole(path) {
  if (process.env.CI) {
    console.log(`\u001B]1338;url="artifact://${path}";alt="Screenshot"\u0007`);
  }
}

module.exports = {
  vrt,
};
