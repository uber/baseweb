#!/usr/bin/env node
/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const childProcess = require('child_process');
const fetch = require('isomorphic-fetch');

const {
  BUILDKITE_COMMIT,
  BUILDKITE_BRANCH,
  BUILDKITE_PULL_REQUEST_REPO,
  ZEIT_NOW_TOKEN,
  ZEIT_NOW_TEAM_ID,
  ZEIT_NOW_PROJECT_ID,
} = process.env;

main().catch(er => {
  console.error(er);
  process.exit(1);
});

async function main() {
  console.log('Checking documentation site links');
  console.log('Resolving deployment URL');

  let url = await getDeploymentURL();

  console.log(`Resolved URL to [${url}]`);

  let attemptCounter = 0;
  let maxAttempts = 35;
  let urlExists = false;

  process.stdout.write('Pinging URL...');
  do {
    attemptCounter += 1;
    try {
      await fetch(url);
      urlExists = true;
    } catch (er) {
      process.stdout.write('.');
      await sleep(30000);
    }
  } while (!urlExists && attemptCounter < maxAttempts);

  if (urlExists) {
    console.log(' Connected!');
    console.log('Running link checker');
    childProcess.execSync(
      `yarn blc ${url} -ro --exclude components/avatar --exclude example.com --exclude github.com --exclude zeit.co`,
      {stdio: 'inherit'},
    );
  } else {
    console.log('');
    throw new Error('Maximum number of attempts reached.');
  }
}

async function getDeploymentURL() {
  // Don't bother with Zeit API for master, it should always be the same.
  if (BUILDKITE_BRANCH === 'master') {
    return 'https://baseweb-git-master.uber-ui-platform.now.sh';
  }

  // Find deployment with matching commit sha
  try {
    const getDeployments = await fetch(
      `https://api.zeit.co/v5/now/deployments?projectId=${ZEIT_NOW_PROJECT_ID}&teamId=${ZEIT_NOW_TEAM_ID}&meta-githubCommitSha=${BUILDKITE_COMMIT}`,
      {
        headers: {
          Authorization: `Bearer ${ZEIT_NOW_TOKEN}`,
        },
      },
    );
    const {deployments} = await getDeployments.json();
    if (deployments && deployments.length) {
      return `https://${deployments[0].url}`;
    } else {
      throw new Error(
        `No deployments found with commit sha: ${BUILDKITE_COMMIT}`,
      );
    }
  } catch (er) {
    console.error(er);

    // If no deployment was found or there was a request failure,
    // fallback to this format, though it might not always work
    // because ZEIT truncates long urls with a hash.
    console.log('Trying fallback URLs');
    if (
      BUILDKITE_PULL_REQUEST_REPO === '' ||
      BUILDKITE_PULL_REQUEST_REPO.includes('uber/baseweb')
    ) {
      return `https://baseweb-git-${sanitizeBranch()}.uber-ui-platform.now.sh/`;
    } else {
      return `https://baseweb-git-fork-${getRepositoryOwnerFromURL()}-${sanitizeBranch()}.uber-ui-platform.now.sh/`;
    }
  }
}

function getRepositoryOwnerFromURL() {
  const [, , , owner] = BUILDKITE_PULL_REQUEST_REPO.replace('.git', '').split(
    '/',
  );
  return owner;
}

// Best guess of how ZEIT sanitizes branch names
function sanitizeBranch() {
  return BUILDKITE_BRANCH.replace(/\//g, '')
    .replace(/_/g, '')
    .replace(/#/g, '-')
    .toLowerCase();
}

function sleep(n) {
  return new Promise(r => setTimeout(r, n));
}
