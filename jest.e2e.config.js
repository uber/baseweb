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
    '/build-ladle/',
    '/dist/',
    './babel/transform-cup-globals.js',
  ],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  preset: 'jest-puppeteer',
  testRunner: 'jest-circus/runner',
  testMatch: ['**/__tests__/tabs-motion.e2e.js'],
  testTimeout: 3000,
  setupFilesAfterEnv: ['expect-puppeteer', '<rootDir>/jest.e2e.setup.js'],
};
