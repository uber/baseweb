#!/usr/bin/env node
/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
/* eslint-env node */

const path = require('path');
const {spawnSync} = require('child_process');

const packagedir = path.resolve(__dirname, '..', 'packages/flow-check-build');
const spawn_args = {stdio: 'inherit', cwd: packagedir};

function flow_check_version(version) {
  spawnSync('yarn', ['add', `flow-bin@${version}`], spawn_args);
  spawnSync('yarn', ['flow', 'stop'], spawn_args);
  const cmd = spawnSync(
    'yarn',
    ['flow', 'check', '--max-warnings', '0'],
    spawn_args,
  );
  return cmd.status;
}

spawnSync('yarn', spawn_args);
spawnSync('node', ['build-dependencies.js'], spawn_args);

const versions = [
  '0.110',
  '0.111',
  // save additional versions for follow up prs
  // '0.112',
  // '0.113',
  // '0.114',
  // '0.115',
  // '0.116',
  // '0.117',
  // '0.118',
];

const exit_codes = versions.map(flow_check_version);

const exit_code = exit_codes.every(code => code === 0) ? 0 : 1;
process.exit(exit_code);
