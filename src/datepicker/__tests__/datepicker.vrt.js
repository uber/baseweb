/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const vrt = require('../../../vrt');

const rangeTest = {
  scenarioName: 'datepicker-range-highlight',
  testName: 'range sans highlight',
  ux: async function(page) {
    await page.click('input');
    await page.waitFor('[role="application"]');
    await page.click('[aria-label="Next month"]');
  },
};

vrt.test({
  name: 'datepicker',
  interactions: [rangeTest],
});
