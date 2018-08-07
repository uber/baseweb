/* eslint-env node */
// @flow

const flowCopySource = require('flow-copy-source');

async function run() {
  await flowCopySource([`${__dirname}/../src`], `${__dirname}/../dist/src`, {
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
  });
}

run();
