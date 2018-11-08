/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
/*eslint-env node*/
module.exports = {
  coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/test'],
  rootDir: 'src',
  coverageDirectory: '../coverage',
  setupFiles: ['<rootDir>/test/test-setup.js'],
  setupTestFrameworkScriptFile: '<rootDir>/test/test-framework-setup.js',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testURL: 'http://localhost/',
};
