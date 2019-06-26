/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
/*eslint-env node*/
const baseConfig = {
  coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/test'],
  rootDir: 'src',
  coverageDirectory: '../coverage',
  setupFiles: ['<rootDir>/test/test-setup.js'],
  setupFilesAfterEnv: ['<rootDir>/test/test-framework-setup.js'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testURL: 'http://localhost/',
};
module.exports = {
  projects: [
    {
      ...baseConfig,
      displayName: 'browser',
      testMatch: ['<rootDir>/**/*.browser.test.js'],
      testEnvironment: 'jsdom',
    },
    {
      ...baseConfig,
      displayName: 'node',
      testMatch: ['<rootDir>/**/*.node.test.js'],
      testEnvironment: 'node',
    },
  ],
};
