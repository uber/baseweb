#!/usr/bin/env node
/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
/* eslint-env node */

const fetch = require('isomorphic-fetch');

if (!process.env.GITHUB_AUTH_TOKEN) {
  throw new Error('No GITHUB_AUTH_TOKEN set.');
}

const repo = 'uber/baseweb';
const root = `https://api.github.com/repos/${repo}`;
const headers = {Authorization: `token ${process.env.GITHUB_AUTH_TOKEN}`};

// https://github.com/uber-workflow/probot-app-release-notes/blob/master/pr-for-commit.js
async function prFromCommit(sha) {
  const res = await fetch(`https://github.com/${repo}/branch_commits/${sha}`);
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
  const tagsResponse = await fetch(`${root}/tags`, {headers});
  if (!tagsResponse.ok) {
    throw new Error(`Failed to fetch tags. ${tagsResponse.statusText}`);
  }
  const tags = await tagsResponse.json();

  const commitsResponse = await fetch(`${root}/commits`, {headers});
  if (!commitsResponse.ok) {
    throw new Error(`Failed to fetch commits. ${commitsResponse.statusText}`);
  }
  const [releaseCommit, ...commits] = await commitsResponse.json();

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

  const options = {
    method: 'POST',
    headers: {
      ...headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tag_name: releaseVersion,
      name: releaseVersion,
      body: '## Changelog\n' + changelogEntries.join('\n'),
    }),
  };

  const releaseResponse = await fetch(`${root}/releases`, options);
  if (!releaseResponse.ok) {
    throw new Error(`Failed to create release. ${releaseResponse.statusText}`);
  }

  const release = await releaseResponse.json();
  console.log(`Successfully created release at: ${release.html_url}`);
}

main().catch(console.error);
