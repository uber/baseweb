/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
/*eslint-env node*/

module.exports = {
  roots: ['<rootDir>/vrt'],
  preset: 'jest-puppeteer',
  testRunner: 'jest-circus/runner',
  testRegex: 'vrt.js$',
  transformIgnorePatterns: ['./babel/transform-cup-globals.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.e2e.setup.js'],
};
