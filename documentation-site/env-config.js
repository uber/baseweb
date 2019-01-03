/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* global module process */

const prod = process.env.BUILD_ENV === 'production';

module.exports = {
  'process.env.STATIC_ROOT': prod ? '/beta/static/' : '/static/',
};
