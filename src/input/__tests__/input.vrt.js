/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const vrt = require('../../../vrt');

const rangeTest = {
  scenarioName: 'input-password',
  testName: 'mask-toggled',
  ux: async function(page) {
    const toggleSelector = `[data-e2e="mask-toggle"]`;
    await page.click(toggleSelector);
    await page.waitFor(toggleSelector);
  },
};

vrt.test({
  name: 'input',
  interactions: [rangeTest],
});
