/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */
/*eslint-env node*/

const mkdirp = require('mkdirp');

jest.setTimeout(20 * 1000);
jest.retryTimes(10);
