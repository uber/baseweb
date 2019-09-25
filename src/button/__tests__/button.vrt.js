/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const Differencify = require('differencify');
const differencify = new Differencify();
const {mount} = require('../../../e2e/helpers');

describe('button', () => {
  it('kinds', async () => {
    await mount(page, 'button');
    await page.waitFor('button');
    await differencify
      .init()
      .launch()
      .newPage()
      .setViewport({width: 1600, height: 1200})
      .goto('http://localhost:8080?name=button')
      .screenshot()
      .toMatchSnapshot()
      .close()
      .end();
  });
});
