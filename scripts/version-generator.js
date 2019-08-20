#!/usr/bin/env node

/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
// @flow

const {writeFileSync, unlinkSync} = require('fs');
const {resolve} = require('path');
const fetch = require('isomorphic-fetch');

const VERSIONS_PATH = resolve(__dirname, '../versions.json');

module.exports = async function generateVersions() {
  try {
    unlinkSync(VERSIONS_PATH);
  } catch (ex) {
    // do nothing
  }
  const res = await fetch(
    `https://api.github.com/repos/uber-web/baseui/releases?access_token=${process
      .env.GITHUB_AUTH_TOKEN || ''}`,
  );
  let releases = await res.json();

  if (!Array.isArray(releases)) {
    // fetching failed - probably with rate limit issues
    releases = [];
  }

  writeFileSync(VERSIONS_PATH, JSON.stringify(releases, null, 2));
};
