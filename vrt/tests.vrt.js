/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-env node */

const {configureToMatchImageSnapshot} = require('jest-image-snapshot');
const {mount} = require('../e2e/helpers');
const config = require('./config.js');
const {getAllScenarioNames} = require('./utils.js');

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customDiffDir: '__artifacts__',
  diffDirection: 'vertical',
});

expect.extend({toMatchImageSnapshot});

describe('visual regression tests', () => {
  getAllScenarioNames().forEach(scenarioName => {
    const {fullPage = false, interactions = [], selector = null, skip = false} =
      config[scenarioName] || {};

    if (skip) return;

    it(scenarioName, async () => {
      const root = await prepare(page, scenarioName);

      let image;
      if (selector) {
        const elementHandle = page.$(selector);
        image = await elementHandle.screenshot();
      } else if (fullPage) {
        image = await page.screenshot({fullPage: true});
      } else {
        image = await root.screenshot();
      }

      expect(image).toMatchImageSnapshot({
        customSnapshotIdentifier: scenarioName,
      });
    });

    if (interactions.length > 0) {
      interactions.forEach(interaction => {
        const testName = `${scenarioName}__${interaction.name}`;
        const _fullPage = Object.prototype.hasOwnProperty.call(
          interaction,
          'fullPage',
        )
          ? interaction.fullPage
          : fullPage;
        const _selector = Object.prototype.hasOwnProperty.call(
          interaction,
          'selector',
        )
          ? interaction.selector
          : selector;

        it(testName, async () => {
          const root = await prepare(page, scenarioName);

          // run interaction script
          await interaction.behavior(page);

          // let things settle down
          await page.waitFor(500);

          let image;
          if (_selector) {
            const elementHandle = page.$(_selector);
            image = await elementHandle.screenshot();
          } else if (_fullPage) {
            image = await page.screenshot({fullPage: true});
          } else {
            image = await root.screenshot();
          }

          expect(image).toMatchImageSnapshot({
            customSnapshotIdentifier: testName,
          });
        });
      });
    }
  });
});

async function prepare(page, scenarioName) {
  // load page
  await mount(page, scenarioName);

  // freeze animations and disable caret blinking
  await page.addStyleTag({
    content: `*, *::before, *::after {
-moz-transition: none !important;
transition: none !important;
-moz-animation: none !important;
animation: none !important;
caret-color: transparent !important;
}`,
  });

  // let things settle down
  await page.waitFor(500);

  // return root element for screenshot
  return await page.$('#root');
}
