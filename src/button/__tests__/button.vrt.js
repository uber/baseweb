/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const {vrt} = require('../../../vrt');

vrt('button', {
  button: [
    {
      name: 'hoverOverPrimary',
      behavior: async page => await page.hover('button'),
    },
  ],
});
