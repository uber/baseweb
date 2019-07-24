#!/usr/bin/env node

/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
// @flow
const fs = require('fs');
const fsPromises = require('fs').promises;
const globby = require('globby');
const path = require('path');

(async () => {
  const files = await globby(['documentation-site/examples/**/*.js']);
  files.forEach(async file => {
    try {
      const from = path.join(__dirname, '../', file);
      const data = await fsPromises.readFile(from, 'utf-8');
      const lines = data.split('\n');
      if (lines[0] !== '// @flow') {
        throw new Error(`File ${file} is missing '// @flow' header comment.`);
      }
      try {
        await fsPromises.access(from.replace('.js', '.tsx'), fs.constants.F_OK);
      } catch (e) {
        throw new Error(`File ${file.replace('.js', '.tsx')} is missing.`);
      }
    } catch (e) {
      console.log(e);
      process.exit(1);
    }
  });
})();
