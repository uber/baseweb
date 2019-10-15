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

    shell.echo(`Pull Request created: ${newPullRequest.html_url}`);

    let ORIGINAL_PULL_REQUEST_NUMBER = null;
    if (BUILDKITE_PULL_REQUEST > 0) {
      ORIGINAL_PULL_REQUEST_NUMBER = BUILDKITE_PULL_REQUEST;
    } else {
      const originalPullRequest = await octokit.pulls.list({
        owner: `uber`,
        repo: `baseweb`,
        head: `uber:${BUILDKITE_BRANCH}`,
      });

      if (originalPullRequest.data.length === 1) {
        ORIGINAL_PULL_REQUEST_NUMBER = originalPullRequest.data[0].number;
      } else {
        shell.echo(
          `Could not find the original PR associated with these changes.`,
        );
        shell.exit(1);
      }
    }

    try {
      // Add a comment to original PR, notifying of new snapshot PR
      const comment = await octokit.issues.createComment({
        owner: `uber`,
        repo: `baseweb`,
        issue_number: ORIGINAL_PULL_REQUEST_NUMBER,
        body: `We detected some visual changes on this branch. Please review the following PR containing updated snapshots:
        ${newPullRequest.html_url}`,
      });
      shell.echo(`Posted a comment on original PR. ${comment.html_url}`);
    } catch (er) {
      shell.echo(`Failed to post a comment on PR. Request failed.`);
      await fs.writeFile(`__artifacts__/log.txt`, JSON.stringify(er));
    }
  }

  // Exit with an error to fail Buildkite
  shell.echo(`Snapshots require updating before this PR can be merged.`);
  shell.exit(1);
})();
