/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable flowtype/require-valid-file-annotation */

export default function getFillColors(theme) {
  if (theme.name === 'light-theme') {
    return [theme.colors.mono200, theme.colors.mono400, theme.colors.mono600];
  } else {
    return [theme.colors.mono700, theme.colors.mono500, theme.colors.mono300];
  }
}
