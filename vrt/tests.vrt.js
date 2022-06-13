/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-env node */

const { test, expect } = require('@playwright/test');
const { config, getSnapshotConfig } = require('./config.js');
const { mount, waitForTimeout, addTestStyles } = require('../e2e/helpers');

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

test.describe.configure({ mode: 'parallel' });

const scenarioNames = getAllScenarioNames();

test('snapshot config does not reference missing scenario', () => {
  const names = new Set(scenarioNames);
  for (const key in config) {
    expect(names).toContain(key);
  }
});

scenarioNames.forEach((scenarioName) => {
  const snapshotConfig = getSnapshotConfig(scenarioName);

  if (snapshotConfig.skip) return;

  test(`${scenarioName}__desktop`, async ({ page }) => {
    await preparePageForSnapshot(page, scenarioName, THEME.light, VIEWPORT.desktop);
    await snapshot(page, `${scenarioName}__desktop`);
  });

  test(`${scenarioName}__mobile`, async ({ page }) => {
    await preparePageForSnapshot(page, scenarioName, THEME.light, VIEWPORT.mobile);
    await snapshot(page, `${scenarioName}__mobile`, VIEWPORT.mobile);
  });

  if (!scenarioName.includes('rtl')) {
    test(`${scenarioName}__dark`, async ({ page }) => {
      await preparePageForSnapshot(page, scenarioName, THEME.dark, VIEWPORT.desktop);
      await snapshot(page, `${scenarioName}__dark`);
    });
  }

  snapshotConfig.interactions.forEach((interaction) => {
    test(`${scenarioName}__${interaction.name}`, async ({ page }) => {
      await preparePageForSnapshot(page, scenarioName, THEME.light, VIEWPORT.desktop);

      await interaction.behavior(page);

      // Bad, but lets let things settle down after the interaction.
      await waitForTimeout(100);

      await snapshot(page, `${scenarioName}__${interaction.name}`);
    });
  });
});

async function snapshot(page, identifier, viewport = VIEWPORT.desktop) {
  const image = await page.screenshot({ animations: 'disabled' });
  expect(image).toMatchSnapshot(identifier + '.png');
}

async function preparePageForSnapshot(
  page,
  scenarioName,
  theme = THEME.light,
  viewport = VIEWPORT.desktop
) {
  // Set initial viewport size.
  await page.setViewportSize({
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
  await page.setViewportSize({
    width: VIEWPORT_WIDTH[viewport],
    height: await getPageScrollHeight(page),
  });

  // Bad, but lets let things settle down after resizing.
  await waitForTimeout(100);
}

async function getPageScrollHeight(page) {
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
