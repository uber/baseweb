#!/usr/bin/env node
/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
/* eslint-env node */

const Octokit = require('@octokit/rest');
const fetch = require('isomorphic-fetch');

if (!process.env.GITHUB_AUTH_TOKEN) {
  throw new Error('No GITHUB_AUTH_TOKEN set.');
}

const octokit = Octokit({auth: process.env.GITHUB_AUTH_TOKEN});

const owner = 'uber';
const repo = 'baseweb';

// https://github.com/uber-workflow/probot-app-release-notes/blob/master/pr-for-commit.js
async function prFromCommit(sha) {
  const res = await fetch(
    `https://github.com/${owner}/${repo}/branch_commits/${sha}`,
  );
  if (res.ok) {
    const text = await res.text();
    const mergedRegex = /<li class="pull-request">\((?:.+?)(\d+)<\/a>\)<\/li>/;
    const pr = text.match(mergedRegex);
    if (pr) {
      return parseInt(pr[1], 10);
    }
  } else {
    throw new Error(res.statusText);
  }
}

async function main() {
  const tagsResponse = await octokit.repos.listTags({owner, repo});
  if (tagsResponse.status !== 200) {
    throw new Error(`Failed to fetch tags. ${tagsResponse.statusText}`);
  }
  const tags = await tagsResponse.data;

  const commitsResponse = await octokit.repos.listCommits({owner, repo});
  if (commitsResponse.status !== 200) {
    throw new Error(`Failed to fetch commits. ${commitsResponse.statusText}`);
  }
  const [releaseCommit, ...commits] = await commitsResponse.data;

  const releaseMessageRgx = /^Release (v[0-9]+\.[0-9]+\.[0-9]+)/;
  const match = releaseMessageRgx.exec(releaseCommit.commit.message);
  if (!Array.isArray(match) || typeof match[1] !== 'string') {
    throw new Error(
      `Failed to parse release commit message: ${releaseCommit.commit.message}`,
    );
  }
  const releaseVersion = match[1];

  const commitsSinceTag = [];
  for (let commit of commits) {
    if (commit.sha === tags[0].commit.sha) {
      break;
    }
    commitsSinceTag.push(commit);
  }
  const prs = await Promise.all(commitsSinceTag.map(c => prFromCommit(c.sha)));

  const changelogEntries = [];
  for (let i = 0; i < commitsSinceTag.length; i++) {
    const commit = commitsSinceTag[i];
    const pr = prs[i];
    if (pr) {
      changelogEntries.push(`- ${commit.commit.message} (#${pr})`);
    } else {
      changelogEntries.push(`- ${commit.commit.message}`);
    }
  }

  const releaseResponse = await octokit.repos.createRelease({
    owner,
    repo,
    tag_name: releaseVersion,
    name: releaseVersion,
    body: '## Changelog\n' + changelogEntries.join('\n'),
  });
  if (releaseResponse.status !== 201) {
    throw new Error(`Failed to create release. ${releaseResponse.status}`);
  }
  console.log(
    `Successfully created release at: ${releaseResponse.data.html_url}`,
  );
}

main();
