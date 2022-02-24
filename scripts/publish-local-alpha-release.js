/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
// @flow

const childProcess = require('child_process');
const publishToNpm = require('./publish-to-npm.js');

const hash = childProcess.execSync('git rev-parse HEAD', {encoding: 'utf-8'});
const version = publishToNpm({
  tag: 'alpha',
  commit: hash.trim(),
});

console.log(version);
