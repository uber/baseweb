/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
/*eslint-env node*/

module.exports = {
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  preset: 'jest-puppeteer',
  testRegex: './*\\pup-e2e\\.js$', //only for now, will be changed back to e2e.js
};
