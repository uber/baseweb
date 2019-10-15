/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-env node */

const shell = require('shelljs');
const Octokit = require('@octokit/rest');

const {
  GITHUB_BOT_AUTH_TOKEN,
  GITHUB_BOT_NAME,
  GITHUB_BOT_EMAIL,
  BUILDKITE_BRANCH,
  BUILDKITE_COMMIT,
} = process.env;

shell.exec(
  `git config --global url."https://${GITHUB_BOT_AUTH_TOKEN}:@github.com/".insteadOf "https://github.com/"`,
);
shell.exec(`git config --global user.email ${GITHUB_BOT_EMAIL}`);
shell.exect(`git config --global user.name ${GITHUB_BOT_NAME}`);
shell.exec(`git checkout ${BUILDKITE_BRANCH}`);
shell.exec(`git reset --hard origin/${BUILDKITE_BRANCH}`);
shell.exec(`echo ${BUILDKITE_COMMIT} > foo.txt`);
shell.exec(`git checkout -b ${getSnapshotBranch()}`);
shell.exec(`git add foo.txt`);
shell.exec(
  `git commit -m "tests(vrt): update snapshots for ${getShortCommitHash()} [ci skip]"`,
);
shell.exec(`git push --force origin ${getSnapshotBranch()}`);

// const octokit = Octokit({ //   auth: GITHUB_BOT_AUTH_TOKEN, // });
// (async () => { //   octokit. // })()

function getSnapshotBranch() {
  return `${BUILDKITE_BRANCH}--vrt`;
}

function getShortCommitHash() {
  return BUILDKITE_COMMIT.substring(0, 7);
}
