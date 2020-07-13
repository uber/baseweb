/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// Sets local package.json to current baseui version.

/* eslint-env node */
// @flow

function main() {
  const version = process.env.ALPHA_VERSION;

  if (!version) {
    throw new Error(
      'Failed to alpha test web-code. ALPHA_VERSION env var not set.',
    );
  }

  const BASE_URL =
    'https://api.buildkite.com/v2/organizations/uber/pipelines/web-code-task-runner/builds';

  const body = {
    commit: 'HEAD',
    branch: 'master',
    message: '[canary-test-baseui] Triggered from CI',
    meta_data: {task: 'upgrade-base-ui'},
    env: {
      TASK: 'upgrade-base-ui',
      TASK_ENV: `PACKAGE_VERSION=baseui@${version}`,
    },
  };

  // create build
  // throw if create fails
  // poll every minute for build status

  // while (true) {
  // if state is running/scheduled set timeout for 1 min
  // if state is passed break
  // if other state throw
  // }
}

main();
