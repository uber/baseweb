/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
/*eslint-env node*/

module.exports = {
  roots: ['<rootDir>/src'],
  preset: 'jest-puppeteer',
  testRunner: 'jest-circus/runner',
  testMatch: ['**/__tests__/*.e2e.js'],
  setupFilesAfterEnv: ['expect-puppeteer', '<rootDir>/jest.e2e.setup.js'],
};
