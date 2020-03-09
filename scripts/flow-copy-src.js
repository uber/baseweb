#!/usr/bin/env node

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
// @flow

const fs = require('fs').promises;
const path = require('path');
const glob = require('glob');

const src = path.resolve(__dirname, '../src');
const dist = path.resolve(__dirname, '../dist');
const ignore = [
  '**/*.test.js',
  '**/*.setup.js',
  '**/*.scenario.js',
  '**/*stories.js',
  'test/**/*.js',
  '**/__tests__/*',
  '**/__mocks__/*.js',
  '**/e2e.js',
  'coverage/**/*.js',
  '**/*examples.js',
  'template-component/*',
  'test/*',
  'codemods/*',
];

async function run() {
  const filepaths = glob.sync('**/*.js', {cwd: src, ignore});

  const sourceCodes = await Promise.all(
    filepaths.map(async filepath => {
      const fullPath = path.resolve(src, filepath);
      const sourceCode = await fs.readFile(fullPath, 'utf-8');
      return `${sourceCode}
declare var __DEV__: boolean;
declare var __NODE__: boolean;
declare var __BROWSER__: boolean;
`;
    }),
  );

  await Promise.all(
    filepaths.map(async (filepath, index) => {
      const destination = path.resolve(dist, filepath);
      const sourceCode = sourceCodes[index];
      return fs.writeFile(`${destination}.flow`, sourceCode);
    }),
  );
}

run();
