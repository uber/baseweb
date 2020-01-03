#!/usr/bin/env node

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
// @flow

const flowCopySource = require('flow-copy-source');
const path = require('path');

async function run() {
  await flowCopySource(
    [path.resolve(__dirname, '../src')],
    path.resolve(__dirname, '../dist'),
    {
      ignore: [
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
      ],
    },
  );
}

run();
