/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
/*eslint-env node*/
module.exports = {
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/src/test',
    '<rootDir>/documentation-site',
  ],
  rootDir: '.',
  coverageDirectory: '../coverage',
  setupFiles: ['<rootDir>/src/test/test-setup.js'],
  setupFilesAfterEnv: ['<rootDir>/src/test/test-framework-setup.js'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/packages/'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  testRegex: '(.|-)test\\.(js|ts|tsx|jsx)$',
  testURL: 'http://localhost/',
  // d3 uses esm, so we have to manually map to the dist
  // see https://github.com/facebook/jest/issues/12036
  moduleNameMapper: {
    d3: '<rootDir>/node_modules/d3/dist/d3.min.js',
  },
};
