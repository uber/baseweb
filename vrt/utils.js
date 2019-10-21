/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-env node */

const globby = require('globby');

function getAllScenarioNames() {
  return globby
    .sync('src/**/*.scenario.js')
    .map(filePath => filePath.match(/__tests__\/(.*).scenario/)[1]);
}

module.exports = {
  getAllScenarioNames,
};
