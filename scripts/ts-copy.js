#!/usr/bin/env node

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
// @flow
const fs = require('fs');
const globby = require('globby');
const path = require('path');

const files = globby.sync(['src/**/*.ts']);
files.forEach(file => {
  const from = path.join(__dirname, '../', file);
  const to = path.join(__dirname, '../', file.replace('src', 'dist'));
  fs.copyFileSync(from, to);
});
