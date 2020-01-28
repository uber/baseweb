/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-env node */

const globby = require('globby');
const {configureToMatchImageSnapshot} = require('jest-image-snapshot');
const {getSnapshotConfig} = require('./config.js');
const {mount} = require('../e2e/helpers');

const THEME = {
  light: 'light',
  dark: 'dark',
};

const VIEWPORT = {
  mobile: 'mobile',
  desktop: 'desktop',
};

const VIEWPORT_WIDTH = {
  [VIEWPORT.mobile]: 375,
  [VIEWPORT.desktop]: 1200,
};

configureJest();

describe('visual snapshot tests', () => {
  getAllScenarioNames().forEach(scenarioName => {
    const snapshotConfig = getSnapshotConfig(scenarioName);

    if (snapshotConfig.skip) return;

    describe(scenarioName, () => {
      it(`desktop`, async () => {
        await preparePageForSnapshot(
          scenarioName,
          THEME.light,
          VIEWPORT.desktop,
        );
        await snapshot(`${scenarioName}__desktop`);
      });

      it(`mobile`, async () => {
        await preparePageForSnapshot(
          scenarioName,
          THEME.light,
          VIEWPORT.mobile,
        );
        await snapshot(`${scenarioName}__mobile`, VIEWPORT.mobile);
      });

      if (!scenarioName.includes('rtl')) {
        it(`dark`, async () => {
          await preparePageForSnapshot(
            scenarioName,
            THEME.dark,
            VIEWPORT.desktop,
          );
          await snapshot(`${scenarioName}__dark`);
        });
      }

      snapshotConfig.interactions.forEach(interaction => {
        it(interaction.name, async () => {
          await preparePageForSnapshot(
            scenarioName,
            THEME.light,
            VIEWPORT.desktop,
          );
          await interaction.behavior(page);
          await page.waitFor(250);
          await snapshot(`${scenarioName}__${interaction.name}`);
        });
      });
    });
  });
});

async function snapshot(identifier, viewport = VIEWPORT.desktop) {
  // Snapshots should have fixed widths but allow for scrolling in the y dimension.
  // We use the raw Chrome Devtools Protocol to get scroll height of page.
  const client = await page.target().createCDPSession();
  const metrics = await client.send('Page.getLayoutMetrics');
  const height = Math.ceil(metrics.contentSize.height);

  const image = await page.screenshot({
    clip: {
      x: 0,
      y: 0,
      width: VIEWPORT_WIDTH[viewport], // Clamp width to either mobile or desktop.
      height: height,
    },
  });

  expect(image).toMatchImageSnapshot({
    customSnapshotIdentifier: identifier,
  });
}

async function preparePageForSnapshot(
  scenarioName,
  theme = THEME.light,
  viewport = VIEWPORT.desktop,
) {
  await page.setViewport({
    width: VIEWPORT_WIDTH[viewport],
    height: 800,
  });
  await mount(page, scenarioName, theme);
  await page.waitFor(250);
}

function configureJest() {
  const toMatchImageSnapshot = configureToMatchImageSnapshot({
    customDiffDir: '__artifacts__',
    diffDirection: 'vertical',
  });
  expect.extend({toMatchImageSnapshot});
}

function getAllScenarioNames() {
  return globby
    .sync('src/**/*.scenario.js')
    .map(filePath => filePath.match(/__tests__\/(.*).scenario/)[1]);
}
