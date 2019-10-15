/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-env node */

const fs = require('fs');
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
  `git commit -m "test(vrt): update visual snapshots for ${SHORT_BASE_COMMIT_HASH} [ci skip]"`,
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
    const openPullRequest = await octokit.pulls.create({
      owner: `uber`,
      repo: `baseweb`,
      title: `test(vrt): update visual snapshots for ${BUILDKITE_BRANCH} [ci skip]`,
      head: SNAPSHOT_BRANCH,
      base: BUILDKITE_BRANCH,
      body: `This PR was generated based on visual changes detected in ${BUILDKITE_PULL_REQUEST}. Please verify that the updated snapshots look correct before merging this PR into \`${BUILDKITE_BRANCH}\`.`,
    });

    shell.echo(`Pull Request created: ${openPullRequest.data.html_url}`);

    const addLabels = await octokit.issues.addLabels({
      owner: `uber`,
      repo: `baseweb`,
      issue_number: openPullRequest.data.number,
      labels: [`work in progress`, `ci`],
    });

    shell.echo(`Added labels to the PR.`);

    try {
      // Add a comment to original PR, notifying of new snapshot PR
      const comment = await octokit.issues.createComment({
        owner: `uber`,
        repo: `baseweb`,
        issue_number: BUILDKITE_PULL_REQUEST,
        body: `👀 Visual changes were found on this branch. Please review the following PR containing updated snapshots: ${newPullRequest.data.html_url}.`,
      });
      shell.echo(`Posted a comment on original PR. ${comment.data.html_url}`);
    } catch (er) {
      shell.echo(`Failed to post a comment on PR. Request failed.`);
      await fs.writeFile(`__artifacts__/log.txt`, JSON.stringify(er));
    }
  }
  // Exit with an error to fail Buildkite
  shell.echo(`Snapshots require updating before this PR can be merged.`);
  shell.exit(1);
})();
