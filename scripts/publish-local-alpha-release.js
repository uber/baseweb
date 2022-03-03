/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
// @flow

const childProcess = require('child_process');
const path = require('path');
const publishToNpm = require('./publish-to-npm.js');

const hash = childProcess.execSync('git rev-parse HEAD', {encoding: 'utf-8'});
const version = publishToNpm({
  tag: 'alpha',
  commit: hash.trim(),
});

// resets package.jsons so that development can continue locally without needing to
// do this manually
const ROOT_DIR = path.join(__dirname, '..');
const rootPkg = path.join(ROOT_DIR, 'package.json');
const eslintPkg = path.join(
  ROOT_DIR,
  'packages/eslint-plugin-baseui/package.json',
);
childProcess.execSync(`git checkout ${rootPkg}`);
childProcess.execSync(`git checkout ${eslintPkg}`);

console.log(version);
