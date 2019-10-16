/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-env node */

const shell = require('shelljs');
const Octokit = require('@octokit/rest');

// Load environment variables
const {
  GITHUB_BOT_AUTH_TOKEN,
  GITHUB_BOT_NAME,
  GITHUB_BOT_EMAIL,
  BUILDKITE_BRANCH,
  BUILDKITE_COMMIT,
  BUILDKITE_PULL_REQUEST,
} = process.env;

// Derive some useful constants
const SNAPSHOT_BRANCH = `${BUILDKITE_BRANCH}--vrt`;
const SHORT_BASE_COMMIT_HASH = BUILDKITE_COMMIT.substring(0, 7); // First 7 chars makes it linkable in GitHub

// Prepare GitHub API helper
const octokit = Octokit({
  auth: GITHUB_BOT_AUTH_TOKEN,
});

//

main();

//

async function main() {
  installChromium();
  if (buildWasTriggeredByPR()) {
    await runWithUpdates();
  } else {
    runWithNoUpdates();
  }
}

function installChromium() {
  _echo(`Add Puppeteer package to trigger Chromium installation script.`);
  _exec(`yarn add puppeteer`);
}

function buildWasTriggeredByPR() {
  // This env variable can be a PR number ("1234") or "false"
  const result = BUILDKITE_PULL_REQUEST > 0;
  if (result) {
    _echo('This build was triggerd by a PR.');
  } else {
    _echo('This build was not triggered by a PR.');
  }
  return result;
}

function runWithNoUpdates() {
  _echo('Running visual snapshot tests with no updates.');
  _echo(`⮑ We only update tests for PR builds.`);
  const testResults = _exec(`yarn vrt`);
  if (testResults.code === 0) {
    _echo(`No visual changes were detected.`);
  } else {
    _echo(`Visual changes were detected.`);
  }
  _exit(testResults.code);
}

async function runWithUpdates() {
  configureGit();
  runTestsWithUpdates();
  await updateGitHub();
}

async function updateGitHub() {
  const snapshotPullRequest = await getSnapshotPullRequest();
  if (await someSnapshotsWereUpdated()) {
    pushChangesToGitHub();
    await updatePullRequests(snapshotPullRequest);
  } else {
    await removeSnapshotsWorkFromGitHub(snapshotPullRequest);
    _exit(0);
  }
}

async function removeSnapshotsWorkFromGitHub(snapshotPullRequest) {
  if (snapshotPullRequest) {
    await closeSnapshotPullRequest(snapshotPullRequest.number);
    await removeSnapshotBranchFromGitHub();
  }
}

async function updatePullRequests(snapshotPullRequest) {
  if (snapshotPullRequest) {
    _echo(
      `The existing snapshot PR has been updated with the latest snapshot diffs.`,
    );
    await addCommentToOriginalPullRequest(snapshotPullRequest.number);
  } else {
    const newSnapshotPullRequest = await openNewSnapshotPullRequest();
    await addLabelsToNewPullRequest(newSnapshotPullRequest.number);
    await addCommentToOriginalPullRequest(newSnapshotPullRequest.number);
    await addOriginalAuthorAsReviewer(newSnapshotPullRequest.number);
    _echo(
      `Snapshots on \`${SNAPSHOT_BRANCH}\` must be merged into \`${BUILDKITE_BRANCH}\` before it can be merged into \`master\`.`,
    );
  }
  _exit(1);
}

async function addOriginalAuthorAsReviewer(newSnapshotPullRequestNumber) {
  try {
    const originalPullRequest = await octokit.pulls.get({
      owner: `uber`,
      repo: `baseweb`,
      pull_number: BUILDKITE_PULL_REQUEST,
    });
    const author = originalPullRequest.data.user;
    await octokit.pulls.createReviewRequest({
      owner: `uber`,
      repo: `baseweb`,
      pull_number: newSnapshotPullRequestNumber,
      reviewers: [author.login],
    });
    _echo(`Requested review from \`${author.login}\` on new snapshot PR.`);
  } catch (er) {
    _echo(
      `There was an error adding the original PR author as a reviewer for the new snapshot PR.`,
    );
    _echo(er);
  }
}

async function removeSnapshotBranchFromGitHub() {
  try {
    await octokit.git.deleteRef({
      owner: `uber`,
      repo: `baseweb`,
      ref: `heads/${SNAPSHOT_BRANCH}`,
    });
    _echo(`Removed the snapshot branch from GitHub`);
  } catch (er) {
    _echo(`There was an error removing the snapshot branch from GitHub.`);
    _echo(er);
  }
}

async function closeSnapshotPullRequest(snapshotPullRequestNumber) {
  await notifySnapshotPullRequestOfClosure(snapshotPullRequestNumber);
  try {
    await octokit.pulls.update({
      owner: `uber`,
      repo: `baseweb`,
      pull_number: snapshotPullRequestNumber,
      state: 'closed',
    });
    _echo(`Closed the existing snapshot PR.`);
  } catch (er) {
    _echo(`There was an error closing the existing snapshot PR.`);
    _echo(er);
  }
  await notifyOriginalPullRequestOfClosure(snapshotPullRequestNumber);
}

async function notifyOriginalPullRequestOfClosure(snapshotPullRequestNumber) {
  try {
    await octokit.issues.createComment({
      owner: `uber`,
      repo: `baseweb`,
      issue_number: BUILDKITE_PULL_REQUEST,
      body:
        `Visual changes have been resolved. #${snapshotPullRequestNumber} has been closed. ` +
        `A new snapshot branch will be created and a new PR will be opened if future commits on \`${BUILDKITE_BRANCH}\` trigger visual changes.`,
    });
    _echo(
      `Posted a comment on original PR about closure of existing snapshot PR.`,
    );
  } catch (er) {
    _echo(
      `There was an error commenting on the original PR about snapshot resolution.`,
    );
    _echo(er);
  }
}

async function notifySnapshotPullRequestOfClosure(snapshotPullRequestNumber) {
  try {
    await octokit.issues.createComment({
      owner: `uber`,
      repo: `baseweb`,
      issue_number: snapshotPullRequestNumber,
      body:
        `Visual changes have been resolved. ` +
        `This PR will be closed and \`${SNAPSHOT_BRANCH}\` will be deleted. ` +
        `A new snapshot branch will be created and a new PR will be opened if future commits on \`${BUILDKITE_BRANCH}\` trigger visual changes.`,
    });
    _echo(
      `Posted a comment on snapshot PR about visual resolution and closure.`,
    );
  } catch (er) {
    _echo(
      `There was an error commenting on the existing snapshot PR about snapshot resolution.`,
    );
    _echo(er);
  }
}

async function addLabelsToNewPullRequest(newPullRequestNumber) {
  try {
    await octokit.issues.addLabels({
      owner: `uber`,
      repo: `baseweb`,
      issue_number: newPullRequestNumber,
      labels: [`bugfix`, `ci`],
    });
    _echo(`Added labels to new snapshot PR.`);
  } catch (er) {
    _echo(`There was an error adding labels to new snapshot PR.`);
    _echo(er);
  }
}

async function addCommentToOriginalPullRequest(newPullRequestNumber) {
  try {
    const comment = await octokit.issues.createComment({
      owner: `uber`,
      repo: `baseweb`,
      issue_number: BUILDKITE_PULL_REQUEST,
      body:
        `Visual changes were detected on this branch. ` +
        `Please review the following PR containing updated snapshots: #${newPullRequestNumber}`,
    });
    _echo(
      `Posted a comment linking to snapshot PR on original PR: ${comment.data.html_url}`,
    );
  } catch (er) {
    _echo(`Error creating comment on original PR.`);
    _echo(er);
  }
}

async function openNewSnapshotPullRequest() {
  try {
    const pullRequest = await octokit.pulls.create({
      owner: `uber`,
      repo: `baseweb`,
      title: `test(vrt): update visual snapshots for ${BUILDKITE_BRANCH}`,
      head: SNAPSHOT_BRANCH,
      base: BUILDKITE_BRANCH,
      body:
        `This PR was generated based on visual changes detected in #${BUILDKITE_PULL_REQUEST}. ` +
        `Please verify that the updated snapshots look correct before merging this PR into \`${BUILDKITE_BRANCH}\`.`,
    });
    _echo(`Created a new snapshot PR: ${pullRequest.data.html_url}`);
    return pullRequest.data;
  } catch (er) {
    _echo(`There was an error creating a new snapshot PR.`);
    _echo(er);
    _exit(1);
  }
}

async function getSnapshotPullRequest() {
  try {
    const pullRequests = await octokit.pulls.list({
      owner: `uber`,
      repo: `baseweb`,
      head: `uber:${SNAPSHOT_BRANCH}`,
    });
    const pullRequest = pullRequests.data[0]; // should only ever be one PR
    if (pullRequest) {
      _echo(`An exisitng snapshot PR was found.`);
      return pullRequest;
    } else {
      _echo(`No exisitng snapshot PR was found.`);
      return null;
    }
  } catch (er) {
    _echo(`There was an error fetching existing PRs.`);
    _echo(`⮑ Could not find an existing snapshot PR.`);
    _echo(er);
    _exit(1);
  }
}

function pushChangesToGitHub() {
  _echo(
    `Creating a new snapshot branch: ${SNAPSHOT_BRANCH}. ` +
      `This will overwrite any existing snapshot branch.`,
  );
  _exec(`git checkout -b ${SNAPSHOT_BRANCH}`);
  _exec(`git add vrt/__image_snapshots__/`);
  _echo(`Commiting updated snapshots to ${SNAPSHOT_BRANCH}.`);
  _exec(
    `git commit -m "test(vrt): update visual snapshots for ${SHORT_BASE_COMMIT_HASH} [ci skip]"`,
  );
  _echo(`Force pushing updated snapshot branch to GitHub.`);
  _exec(`git push --force origin ${SNAPSHOT_BRANCH}`);
}

function configureGit() {
  _echo(`Configuring git to allow for pushing new commits & branches.`);
  _exec(
    `git config --global url."https://${GITHUB_BOT_AUTH_TOKEN}:@github.com/".insteadOf "https://github.com/"`,
  );
  _exec(`git config --global user.email ${GITHUB_BOT_EMAIL}`);
  _exec(`git config --global user.name ${GITHUB_BOT_NAME}`);
}

function runTestsWithUpdates() {
  _echo(`Running visual snapshot tests with updates.`);
  _exec(`yarn vrt -u`);
}

function someSnapshotsWereUpdated() {
  return new Promise(resolve => {
    _exec(`git status --porcelain`, (code, stdout, stderr) => {
      const changedFiles = stdout.split(`\n`);
      const updatedSnapshots = changedFiles.filter(s =>
        s.match(/vrt\/__image_snapshots__\//),
      );
      const result = updatedSnapshots.length > 0;
      if (result) {
        _echo(`Some snapshots were updated.`);
      } else {
        _echo(`No snapshots were updated.`);
      }
      resolve(result);
    });
  });
}

// A few wrappers around shell commands
function _echo(message) {
  return shell.echo(`❖ VRT: ${message}`);
}

function _exec(command, callback) {
  return shell.exec(command, {silent: true}, callback);
}

function _exit(code) {
  return shell.exit(code);
}
