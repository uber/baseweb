/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const Differencify = require('differencify');
const differencify = new Differencify();

describe('button', () => {
  beforeAll(async () => {
    await differencify.launchBrowser({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  });

  afterAll(async () => {
    await differencify.cleanup();
  });

  [
    'button',
    'button-shapes',
    'button-sizes',
    'button-rtl',
    'button-enhancers',
    'button-enhancers-compact',
  ].forEach(name => {
    it(
      name,
      async () => {
        const target = differencify.init({chain: false});
        const page = await target.newPage();
        await page.goto(`http://localhost:8080?name=${name}`);
        await page.setViewport({width: 1600, height: 1200});
        await page.waitFor(1000);
        const image = await page.screenshot();
        const result = await target.toMatchSnapshot(image);
        await page.close();
        expect(result).toEqual(true);
      },
      30000,
    );
  });
});
