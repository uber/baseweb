#!/usr/bin/env node

/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
// @flow

const fs = require('fs').promises;
const globby = require('globby');
const path = require('path');

(async () => {
  const files = await globby(['src/**/*.d.ts']);
  files.forEach(async file => {
    try {
      const from = path.join(__dirname, '../', file);
      const to = path.join(__dirname, '../', file.replace('src', 'dist'));
      await fs.copyFile(from, to);
    } catch (e) {
      console.log(e);
      process.exit(1);
    }
  });
})();
