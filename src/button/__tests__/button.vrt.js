/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {getPuppeteerUrl} = require('../../../e2e/helpers');

const Differencify = require('differencify');

it('testing normal stuff', async () => {
  await page.goto(getPuppeteerUrl('button'));
  await page.waitFor('#root');
});

describe('differencify', () => {
  const differencify = new Differencify({debug: true});

  beforeAll(async () => {
    await differencify.launchBrowser({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  });

  afterAll(async () => {
    await differencify.cleanup();
  });

  it('button', async () => {
    const target = differencify.init({chain: false});

    console.log('target: ');
    console.log(target);

    const page = await target.newPage();

    console.log('page: ');
    console.log(page);

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
  });
});

/*
const vrt = require('../../../vrt');

const hoverTests = ['primary', 'secondary', 'tertiary', 'minimal'].map(
  kind => ({
    testName: `hover-${kind}`,
    ux: async function(page) {
      await page.hover(`[data-vrt-id="button-${kind}"]`);
    },
  }),
);

vrt.test({
  name: 'button',
  interactions: [...hoverTests],
});
*/
