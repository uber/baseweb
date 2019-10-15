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
  BUILDKITE_PULL_REQUEST,
} = process.env;

const SNAPSHOT_BRANCH = `${BUILDKITE_BRANCH}--vrt`;
const SHORT_BASE_COMMIT_HASH = BUILDKITE_COMMIT.substring(0, 7); // First 7 chars makes it linkable in GitHub

shell.exec(
  `git config --global url."https://${GITHUB_BOT_AUTH_TOKEN}:@github.com/".insteadOf "https://github.com/"`,
);
shell.exec(`git config --global user.email ${GITHUB_BOT_EMAIL}`);
shell.exec(`git config --global user.name ${GITHUB_BOT_NAME}`);
shell.exec(`git checkout ${BUILDKITE_BRANCH}`);
shell.exec(`git reset --hard origin/${BUILDKITE_BRANCH}`);
shell.exec(`echo ${BUILDKITE_COMMIT} > foo.txt`);
shell.exec(`git checkout -b ${SNAPSHOT_BRANCH}`);
shell.exec(`git add foo.txt`);
shell.exec(
  `git commit -m "test(vrt): update snapshots for ${SHORT_BASE_COMMIT_HASH} [ci skip]"`,
);
shell.exec(`git push --force origin ${SNAPSHOT_BRANCH}`);

(async () => {
  const octokit = Octokit({
    auth: GITHUB_BOT_AUTH_TOKEN,
  });

  // list PRs from snapshot branch into base branch (should only be one)
  pullRequests = await octokit.pulls.list({
    owner: `uber`,
    repo: `baseweb`,
    head: `uber:${SNAPSHOT_BRANCH}`,
    base: `uber:${BUILDKITE_BRANCH}`,
  });

  // If no PR exists yet, let's make one!
  if (pullRequests.data.length === 0) {
    // Open a new PR against base branch
    const newPullRequest = await octokit.pulls.create({
      owner: `uber`,
      repo: `baseweb`,
      title: `test(vrt): update snapshots for ${BUILDKITE_BRANCH} [ci skip]`,
      head: SNAPSHOT_BRANCH,
      base: BUILDKITE_BRANCH,
    });

    // Comment on the original PR with link
    const comment = octokit.issues.createComment({
      owner: `uber`,
      repo: `baseweb`,
      issue_number: BUILDKITE_PULL_REQUEST,
      body: `We detected some visual changes on this branch. Please review the following PR containing updated snapshots:
${newPullRequest.html_url}`,
    });
  }

  // Exit with an error to fail Buildkite
  shell.echo(`Snapshots require updating before this PR can be merged.`);
  shell.exit(1);
})();
