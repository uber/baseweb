#!/usr/bin/env node
/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */
const path = require('path');
const {spawn} = require('child_process');

const basedir = path.resolve(__dirname, '..');
const packagedir = path.resolve(basedir, 'packages/flow-check-build');

const spawn_args = {stdio: 'inherit', cwd: packagedir};

function install_flow_at_version(version) {
  console.log(`Installing flow at ${version}`);
  return new Promise(resolve => {
    const cmd = spawn('yarn', ['add', `flow-bin@${version}`], spawn_args);
    cmd.on('close', code => {
      if (code !== 0) {
        console.error(`Failed to install flow at ${version}`);
        process.exit(code);
      } else {
        console.log(`Successfully installed flow at ${version}`);
        resolve();
      }
    });
  });
}

function flow_stop() {
  return new Promise(resolve => {
    const cmd = spawn('yarn', ['flow', 'stop'], spawn_args);
    cmd.on('close', resolve);
  });
}

function flow_check() {
  return new Promise(resolve => {
    const cmd = spawn('yarn', ['flow'], spawn_args);
    cmd.on('close', resolve);
  });
}

function copy_build() {
  return new Promise(resolve => {
    const src = `${basedir}/dist/`;
    const dest = `${packagedir}/node_modules/baseui/`;
    const cmd = spawn('cp', ['-r', src, dest]);
    cmd.on('close', code => {
      if (code !== 0) {
        console.error('Failed to copy build to test directory');
        process.exit(code);
      } else {
        console.error('Successfully copied build to test directory');
        resolve();
      }
    });
  });
}

function build_dependencies() {
  return new Promise(resolve => {
    const cmd = spawn('node', ['build-dependencies.js'], spawn_args);
    cmd.on('close', resolve);
  });
}

async function flow_check_version(version) {
  await install_flow_at_version(version);
  await flow_stop();
  await copy_build();
  await flow_check();
}

async function main() {
  await build_dependencies();

  const exit_code_110 = await flow_check_version('0.110');
  const exit_code_111 = await flow_check_version('0.111');
  const exit_code_112 = await flow_check_version('0.112');
  const exit_code_113 = await flow_check_version('0.113');
  const exit_code_114 = await flow_check_version('0.114');
  const exit_code_115 = await flow_check_version('0.115');
  const exit_code_116 = await flow_check_version('0.116');
  const exit_code_117 = await flow_check_version('0.117');
  const exit_code_118 = await flow_check_version('0.118');

  const results = [
    exit_code_110,
    exit_code_111,
    exit_code_112,
    exit_code_113,
    exit_code_114,
    exit_code_115,
    exit_code_116,
    exit_code_117,
    exit_code_118,
  ];

  const exit_code = results.every(code => code === 0) ? 0 : 1;
  process.exit(exit_code);
}

main();
/* eslint-enable flowtype/require-valid-file-annotation */
