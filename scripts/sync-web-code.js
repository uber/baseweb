/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
// @flow

const fetch = require('node-fetch').default;

const BUILDKITE_TASK_RUNNER_URL =
  'https://api.buildkite.com/v2/organizations/uber/pipelines/web-code-task-runner/builds';

function expectEnvironmentVariable(name) {
  if (!process.env[name]) {
    throw new Error(`Missing environment variable: ${name}`);
  }
}

async function createBuild(token, commitHash) {
  const body = {
    commit: 'HEAD',
    message: '[baseui-sync] Triggered from CI',
    meta_data: { task: 'baseui-sync' },
    env: {
      TASK: 'baseui-sync',
      TASK_ENV: `BASEUI_OPEN_SOURCE_COMMIT=${commitHash}`,
      PACKAGES: 'src/common/@uber/baseui',
    },
  };

  const createBuildResponse = await fetch(BUILDKITE_TASK_RUNNER_URL, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!createBuildResponse.ok) {
    throw new Error(
      `Failed to create build: ${createBuildResponse.status} ${createBuildResponse.statusText}`
    );
  }

  const json = await createBuildResponse.json();
  return json;
}

async function main() {
  expectEnvironmentVariable('BUILDKITE_API_TOKEN');
  expectEnvironmentVariable('BUILDKITE_COMMIT');

  const build = await createBuild(process.env.BUILDKITE_API_TOKEN, process.env.BUILDKITE_COMMIT);
  console.log(`View sync build at ${build.web_url}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
