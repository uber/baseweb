/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-env node */

const {configureToMatchImageSnapshot} = require('jest-image-snapshot');
const {getSnapshotConfig} = require('./config.js');
const {mount, waitForTimeout, addTestStyles} = require('../e2e/helpers');

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

    it(`${scenarioName}__desktop`, async () => {
      await preparePageForSnapshot(scenarioName, THEME.light, VIEWPORT.desktop);
      await snapshot(`${scenarioName}__desktop`);
    });

    it(`${scenarioName}__mobile`, async () => {
      await preparePageForSnapshot(scenarioName, THEME.light, VIEWPORT.mobile);
      await snapshot(`${scenarioName}__mobile`, VIEWPORT.mobile);
    });

    if (!scenarioName.includes('rtl')) {
      it(`${scenarioName}__dark`, async () => {
        await preparePageForSnapshot(
          scenarioName,
          THEME.dark,
          VIEWPORT.desktop,
        );
        await snapshot(`${scenarioName}__dark`);
      });
    }

    snapshotConfig.interactions.forEach(interaction => {
      it(`${scenarioName}__${interaction.name}`, async () => {
        await preparePageForSnapshot(
          scenarioName,
          THEME.light,
          VIEWPORT.desktop,
        );

        await interaction.behavior(page);

        // Bad, but lets let things settle down after the interaction.
        await waitForTimeout(100);

        await snapshot(`${scenarioName}__${interaction.name}`);
      });
    });
  });
});

async function snapshot(identifier, viewport = VIEWPORT.desktop) {
  const image = await page.screenshot();
  expect(image).toMatchImageSnapshot({
    customSnapshotIdentifier: identifier,
  });
}

async function preparePageForSnapshot(
  scenarioName,
  theme = THEME.light,
  viewport = VIEWPORT.desktop,
) {
  // Set initial viewport size.
  await page.setViewport({
    width: VIEWPORT_WIDTH[viewport],
    height: 800,
  });

  await mount(page, scenarioName, theme);

  // disables CSS transitions
  await addTestStyles(page);

  // Set the viewport to our final screenshot dimensions.
  // When we take a screenshot we do not want any resizing, which can cause flakiness.
  // We will set the viewport now and take a straight-up screenshot later.
  // The screenshot dimensions will use the scroll height of the page but clamp the width.
  await page.setViewport({
    width: VIEWPORT_WIDTH[viewport],
    height: await getPageScrollHeight(),
  });

  // eslint-disable-next-line cup/no-undef
  await page.evaluate(() => window.dispatchEvent(new Event('resize')));

  // Bad, but lets let things settle down after resizing.
  await waitForTimeout(300);
}

async function getPageScrollHeight() {
  // Snapshots should have fixed widths but allow for scrolling in the y dimension.
  // We use the raw Chrome Devtools Protocol to get the scroll height of page.
  try {
    const client = await page.target().createCDPSession();
    const metrics = await client.send('Page.getLayoutMetrics');
    return Math.ceil(metrics.contentSize.height);
  } catch (er) {
    // If something went wrong, just return a decent default height.
    return 800;
  }
}

function configureJest() {
  const toMatchImageSnapshot = configureToMatchImageSnapshot({
    customDiffDir: '__artifacts__',
    diffDirection: 'vertical',
  });
  expect.extend({toMatchImageSnapshot});
}

function getAllScenarioNames() {
  let names = [];
  try {
    const metaFile = require('../build-ladle/meta.json');
    names = Object.keys(metaFile.stories);
  } catch (e) {
    console.log('build-ladle/meta.json not found. Build ladle first.');
  }
  return names;
}
