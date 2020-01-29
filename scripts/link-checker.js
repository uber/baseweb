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
const {BUILDKITE_BRANCH, BUILDKITE_PULL_REQUEST_REPO} = process.env;

main().catch(er => {
  console.error(er);
  process.exit(1);
});

async function main() {
  let url = null;
  let branchUrl = BUILDKITE_BRANCH.replace('/', '-').replace('_', '');

  if (
    BUILDKITE_PULL_REQUEST_REPO === '' ||
    BUILDKITE_PULL_REQUEST_REPO === 'uber/baseweb'
  ) {
    url = `https://baseweb-git-${branchUrl}.uber-ui-platform.now.sh/`;
  } else {
    let author = getRepositoryOwnerFromURL(BUILDKITE_PULL_REQUEST_REPO);
    url = `https://baseweb-git-fork-${author}-${branchUrl}.uber-ui-platform.now.sh/`;
  }

  console.log('Checking links for:');
  console.log(url);

  let attemptCounter = 0;
  let maxAttempts = 5;
  let urlExists = false;

  do {
    console.log(`Attempting to connect...`);
    attemptCounter += 1;
    try {
      await fetch(url);
      urlExists = true;
    } catch (er) {
      await sleep(1000);
    }
  } while (!urlExists && attemptCounter < maxAttempts);

  if (urlExists) {
    childProcess.execSync(
      `yarn blc ${url} -ro --exclude components/avatar --exclude example.com --exclude github.com`,
      {stdio: 'inherit'},
    );
  } else {
    throw new Error('Maximum number of attempts reached.');
  }
}

function getRepositoryOwnerFromURL(url) {
  const [, , , owner] = url.replace('.git', '').split('/');
  return owner;
}

function sleep(n) {
  return new Promise(r => setTimeout(r, n));
}
