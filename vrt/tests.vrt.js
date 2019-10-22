/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-env node */

const {configureToMatchImageSnapshot} = require('jest-image-snapshot');
const {getSnapshotConfig} = require('./config.js');
const {getAllScenarioNames} = require('./utils.js');
const {mount} = require('../e2e/helpers');

const THEME = {
  light: 'light',
  dark: 'dark',
};

const VIEWPORT = {
  mobile: 'mobile',
  desktop: 'desktop',
};

const scenarioNames = getAllScenarioNames();

configureJest();

describe('visual snapshot tests', async () => {
  for (let i = 0; i < scenarioNames.length; i += 1) {
    const scenarioName = scenarioNames[i];
    const vrt = JSON.parse(
      // eslint-disable-next-line
      await page.evaluate(() => JSON.stringify(window.vry ? window.vrt : {})),
    );

    const snapshotConfig = {
      ...getSnapshotConfig(scenarioName),
      ...vrt,
    };

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
        await snapshot(`${scenarioName}__mobile`);
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
  }
});

async function snapshot(identifier) {
  const image = await page.screenshot({fullPage: true});
  expect(image).toMatchImageSnapshot({
    customSnapshotIdentifier: identifier,
  });
}

async function preparePageForSnapshot(
  scenarioName,
  theme = THEME.light,
  viewport = VIEWPORT.desktop,
) {
  await mount(page, scenarioName, theme);
  await freezeAnimations(page);
  if (viewport === VIEWPORT.mobile) {
    await setViewportToMobile(page);
  } else {
    await setViewportToDesktop(page);
  }
  await page.waitFor(250);
}

async function setViewportToDesktop() {
  await page.setViewport({
    width: 1024,
    height: 768,
  });
}

async function setViewportToMobile() {
  await page.setViewport({
    width: 375,
    height: 812,
  });
}

async function freezeAnimations() {
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
}

function configureJest() {
  const toMatchImageSnapshot = configureToMatchImageSnapshot({
    customDiffDir: '__artifacts__',
    diffDirection: 'vertical',
  });
  expect.extend({toMatchImageSnapshot});
}
