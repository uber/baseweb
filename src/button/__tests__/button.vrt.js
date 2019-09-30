/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const Differencify = require('differencify');
const {getPuppeteerUrl} = require('../../../e2e/helpers');

it('testing normal stuff', async () => {
  await page.goto(getPuppeteerUrl('button'));
  await page.waitFor('#root');
});

it('testing differencify stuff', async () => {
  // spin up differencify
  const differencify = new Differencify({debug: true});
  await differencify.launchBrowser({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const target = differencify.init({chain: false});
  const page = await target.newPage();

  await page.goto(getPuppeteerUrl('button'));
  await page.setViewport({width: 1600, height: 1200});

  const root = await page.$('#root');
  const image = await root.screenshot();
  const result = await target.toMatchSnapshot(image);

  expect(result).toEqual(true);

  // clean up differencify
  await page.close();
  await differencify.cleanup();
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
