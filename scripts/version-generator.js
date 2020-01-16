#!/usr/bin/env node

/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
// @flow

const {writeFileSync, unlinkSync} = require('fs');
const {resolve} = require('path');
const fetch = require('isomorphic-fetch');

const VERSIONS_PATH = resolve(__dirname, '../versions.json');

async function fetchVersionsByPage(page = 1) {
  const res = await fetch(
    `https://api.github.com/repos/uber/baseweb/releases?access_token=${process
      .env.GITHUB_AUTH_TOKEN || ''}&page=${page}`,
  );

  return res.json();
}

module.exports = async function generateVersions() {
  try {
    unlinkSync(VERSIONS_PATH);
  } catch (ex) {
    // do nothing
  }

  let versions = [];
  let page = 1;
  while (page !== -1) {
    const res = await fetchVersionsByPage(page);
    versions = versions.concat(res);
    if (res.length) {
      page += 1;
    } else {
      page = -1;
    }
  }

  if (!Array.isArray(versions)) {
    // fetching failed - probably with rate limit issues
    versions = [];
  }

  writeFileSync(VERSIONS_PATH, JSON.stringify(versions, null, 2));
};
