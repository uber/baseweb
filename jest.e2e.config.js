/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
/*eslint-env node*/

module.exports = {
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    './babel/transform-cup-globals.js',
  ],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  preset: 'jest-puppeteer',
  testRunner: 'jest-circus/runner',
  testMatch: ['**/__tests__/*.e2e.js'],
  setupFilesAfterEnv: ['expect-puppeteer', '<rootDir>/jest.e2e.setup.js'],
};
