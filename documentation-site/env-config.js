/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* global module process */

const prod = process.env.BUILD_ENV === 'production';

// set production env for exact-react-types-loader
if (prod) {
  process.env.WEBSITE_ENV = 'production';
}

module.exports = {
  'process.env.STATIC_ROOT': '/static/',
  'process.env.GITHUB_AUTH_TOKEN': process.env.GITHUB_AUTH_TOKEN || '',
};
