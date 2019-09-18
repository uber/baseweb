#!/usr/bin/env node

/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

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
const asyncReaddir = util.promisify(fs.readdir);
const asyncStat = util.promisify(fs.stat);

const packageJson = require('../package.json');

async function run() {
  const files = await asyncRecursive(path.resolve(__dirname, '../dist/esm'));
  const projectRelativePaths = files.map(file => file.split('dist/esm')[1]);

  const modules = projectRelativePaths.reduce((acc, current) => {
    if (current.endsWith('index.js')) {
      acc[current] = `/esm${current}`;
    }
    return acc;
  }, {});

  packageJson.module = modules;
  fs.writeFileSync(
    path.join(__dirname, '../dist/package.json'),
    JSON.stringify(packageJson, null, 2),
  );
}

run();

async function buildPackageJsonFiles() {
  const distPath = path.resolve(__dirname, '../dist');
  const esmPath = path.join(distPath, 'esm');
  const dirs = [];
  for (const file of await asyncReaddir(esmPath)) {
    const fileStat = await asyncStat(path.join(esmPath, file));
    if (fileStat.isDirectory()) {
      dirs.push(file);
      const data = {
        sideEffects: false,
        module: path.join('../esm', file, 'index.js'),
      };
      fs.writeFileSync(
        path.join(distPath, file, 'package.json'),
        JSON.stringify(data, null, 2),
        err => {
          if (err) throw err;
        },
      );
    }
  }
}
buildPackageJsonFiles();
