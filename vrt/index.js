/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const globby = require('globby');
const Differencify = require('differencify');

const {getPuppeteerUrl} = require('../e2e/helpers');

function test({name, interactions}) {
  describe(name, () => {
    const differencify = new Differencify({
      debug: true,
    });

    beforeAll(async () => {
      await differencify.launchBrowser({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
    });

    afterAll(async () => {
      await differencify.cleanup();
    });

    const scenarios = getScenariosForComponent(name);
    scenarios.forEach(name => {
      createSnapshotTest({
        differencify,
        scenarioName: name,
      });
    });

    if (interactions && interactions.length > 0) {
      interactions.forEach(interaction => {
        createSnapshotTest({
          differencify,
          scenarioName: interaction.scenarioName || name,
          testName: interaction.testName,
          interaction: interaction.ux,
        });
      });
    }
  });
}

function createSnapshotTest({
  differencify,
  scenarioName,
  testName = null,
  interaction = null,
}) {
  it(
    testName ? scenarioName + ' ' + testName : scenarioName,
    async () => {
      const target = differencify.init({chain: false});
      const page = await target.newPage();

      await page.goto(getPuppeteerUrl(scenarioName));
      await page.setViewport({width: 1600, height: 1200});
      // freeze animations
      await page.addStyleTag({
        content: `*, *::before, *::after {
        -moz-transition: none !important;
        transition: none !important;
        -moz-animation: none !important;
        animation: none !important;
       }`,
      });

      if (interaction) {
        await interaction(page);
      }

      const root = await page.$('#root');
      const image = await root.screenshot();
      const result = await target.toMatchSnapshot(image);

      await page.close();
      expect(result).toEqual(true);
    },
    30000,
  );
}

function getScenariosForComponent(name) {
  return globby
    .sync('./*.scenario.js', {cwd: `src/${name}/__tests__`})
    .map(file => file.split('.scenario.js')[0]);
}

module.exports = {
  test,
  createSnapshotTest,
  getScenariosForComponent,
};
