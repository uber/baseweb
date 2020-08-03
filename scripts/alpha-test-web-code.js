/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// Sets local package.json to current baseui version.

/* eslint-env node */
// @flow

const fetch = require('node-fetch').default;
const publishToNpm = require('./publish-to-npm.js');

const BUILDKITE_TASK_RUNNER_URL =
  'https://api.buildkite.com/v2/organizations/uber/pipelines/web-code-task-runner/builds';

function wait(ms) {
  return new Promise(res => setTimeout(res, ms));
}

async function createBuild(token, version) {
  const body = {
    commit: 'HEAD',
    branch: 'master',
    message: '[alpha-test-baseui] Triggered from CI',
    meta_data: {task: 'baseui-alpha-test'},
    env: {
      TASK: 'baseui-alpha-test',
      TASK_ENV: `PACKAGE_VERSION=baseui@${version}`,
    },
  };

  const createBuildResponse = await fetch(BUILDKITE_TASK_RUNNER_URL, {
    method: 'post',
    body: JSON.stringify(body),
    headers: {Authorization: `Bearer ${token}`},
  });

  if (!createBuildResponse.ok) {
    throw new Error(
      `Failed to create build. Status: ${createBuildResponse.status}. Message: ${createBuildResponse.statusText}`,
    );
  }

  const json = await createBuildResponse.json();
  return json;
}

async function getBuild(token, number) {
  const getBuildResponse = await fetch(
    `${BUILDKITE_TASK_RUNNER_URL}/${number}`,
    {headers: {Authorization: `Bearer ${token}`}},
  );

  if (!getBuildResponse.ok) {
    throw new Error(
      `Failed to create build. Status: ${getBuildResponse.status}. Message: ${getBuildResponse.statusText}`,
    );
  }

  const json = await getBuildResponse.json();
  return json;
}

async function main() {
  const buildkiteToken = process.env.BUILDKITE_API_TOKEN;

  if (!buildkiteToken) {
    throw new Error(
      'Failed to alpha test web-code. BUILDKITE_API_TOKEN env var not set.',
    );
  }

  const {version} = publishToNpm({
    tag: 'alpha',
    commit: process.env.BUILDKITE_COMMIT,
  });

  const {web_url, number} = await createBuild(buildkiteToken, version);

  console.log(`View alpha build CI checks at ${web_url}.`);

  // eslint-disable-next-line no-constant-condition
  while (true) {
    await wait(60 * 1000);
    const {state} = await getBuild(buildkiteToken, number);

    if (state === 'passed') {
      console.log('Alpha build passed CI checks.');
      break;
    } else if (state === 'running' || state === 'scheduled') {
      console.log(
        `Alpha build CI checks are ${state}. Waiting 60s before polling again.`,
      );
    } else {
      throw new Error(
        `Alpha build CI checks failed with ${state || 'UNDEFINED'} state.`,
      );
    }
  }
}

main();
