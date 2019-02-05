#!/usr/bin/env node

/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
// @flow

const fs = require('fs');
const path = require('path');
const util = require('util');
const recursive = require('recursive-readdir');

const asyncRecursive = util.promisify(recursive);

const packageJson = require('../package.json');

async function run() {
  const files = await asyncRecursive(path.resolve(__dirname, '../dist/esm'));
  const projectRelativePaths = files.map(file => file.split('dist/esm')[1]);

  const modules = projectRelativePaths.reduce((acc, current) => {
    acc[current] = `/esm${current}`;
    return acc;
  }, {});

  packageJson.module = modules;
  fs.writeFileSync(
    path.join(__dirname, '../dist/package.json'),
    JSON.stringify(packageJson, null, 2),
  );
}

run();
