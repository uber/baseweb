#!/usr/bin/env node

/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
// @flow

const {writeFileSync, unlinkSync} = require('fs');
const {resolve} = require('path');
const Octokit = require('@octokit/rest');

const octokit = Octokit({auth: process.env.GITHUB_AUTH_TOKEN});
const VERSIONS_PATH = resolve(__dirname, '../versions.json');
module.exports = async function generateVersions() {
  try {
    unlinkSync(VERSIONS_PATH);
  } catch (ex) {
    // do nothing
  }

  try {
    const releases = await octokit.paginate(
      'GET /repos/:owner/:repo/releases',
      {
        owner: 'uber',
        repo: 'baseweb',
      },
    );
    writeFileSync(VERSIONS_PATH, JSON.stringify(releases, null, 2));
  } catch (error) {
    console.error(`Failed to generate baseweb versions`, error);
    writeFileSync(VERSIONS_PATH, JSON.stringify([], null, 2));
  }
};
