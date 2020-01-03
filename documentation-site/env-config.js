/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* global module process */

const prod = process.env.NODE_ENV === 'production';

// set production env for exact-react-types-loader
if (prod) {
  process.env.WEBSITE_ENV = 'production';
}

module.exports = {
  'process.env.STATIC_ROOT': '/static/',
  'process.env.GITHUB_AUTH_TOKEN': process.env.GITHUB_AUTH_TOKEN || '',
  // commit_ref used for type cheat sheet, links on doc site direct to github repo at commit
  // COMMIT_REF env var is populated from netlify build.
  // https://www.netlify.com/docs/continuous-deployment/#environment-variables
  'process.env.COMMIT_REF': process.env.COMMIT_REF || 'master',
  ...(prod
    ? {
        'process.env.WEBSITE_ENV': 'production',
      }
    : {}),
};
