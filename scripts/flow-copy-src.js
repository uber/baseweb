#!/usr/bin/env node

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
        '**/*stories.js',
        'test/**/*.js',
        '**/__mocks__/*.js',
        '**/e2e.js',
        'coverage/**/*.js',
        '**/*examples.js',
      ],
    },
  );
}

run();
