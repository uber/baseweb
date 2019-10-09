/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-env node */

const globby = require('globby');
const {configureToMatchImageSnapshot} = require('jest-image-snapshot');
const {mount} = require('../e2e/helpers');
const interactions = require('./interactions.js');

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customDiffDir: '__vrt_diffs__',
  diffDirection: 'vertical',
});

expect.extend({toMatchImageSnapshot});

describe('visual regression tests', () => {
  getAllScenarioNames().forEach(scenarioName => {
    it(scenarioName, async () => {
      await prepare(page, scenarioName);
      const image = await page.screenshot({fullPage: true});
      expect(image).toMatchImageSnapshot({
        customSnapshotIdentifier: scenarioName,
      });
    });

    if (interactions[scenarioName]) {
      interactions[scenarioName].forEach(interaction => {
        const testName = `${scenarioName}__${interaction.name}`;
        it(testName, async () => {
          await prepare(page, scenarioName);
          await interaction.behavior(page);
          await page.waitFor(1000);
          const image = await page.screenshot({fullPage: true});
          expect(image).toMatchImageSnapshot({
            customSnapshotIdentifier: testName,
          });
        });
      });
    }
  });
});

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

  await page.$('#root');
}

function getAllScenarioNames() {
  return globby
    .sync('src/**/*.scenario.js')
    .map(filePath => filePath.match(/__tests__\/(.*).scenario/)[1]);
}
