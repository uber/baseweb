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

const files = globby.sync(['documentation-site/examples/**/*.js']);
files.forEach(file => {
  const from = path.join(__dirname, '../', file);
  const data = fs.readFileSync(from, 'utf-8');
  const lines = data.split('\n');
  if (lines[0] !== '// @flow') {
    throw new Error(`File ${file} is missing '// @flow' header comment.`);
  }
  try {
    fs.accessSync(from.replace('.js', '.tsx'), fs.constants.F_OK);
  } catch (e) {
    throw new Error(`File ${file.replace('.js', '.tsx')} is missing.`);
  }
});
