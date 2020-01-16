/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// Sets local package.json to current baseui version.

'use strict';

const fs = require('fs');
const baseuiVersion = require('../../package.json').version;
const packageJSON = fs.readFileSync('package.json', 'utf-8');
const packageJSONBumped = packageJSON.replace(
  '"version": "0.0.0"',
  `"version": "${baseuiVersion}"`,
);
fs.writeFileSync('package.json', packageJSONBumped, 'utf-8');
