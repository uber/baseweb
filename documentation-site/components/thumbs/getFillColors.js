/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable flowtype/require-valid-file-annotation */

export default function getFillColors(theme) {
  // SUPER HACK! Do not try this at home...
  let themeIsLight = theme.colors.primary === '#000000';
  if (themeIsLight) {
    return [theme.colors.mono300, theme.colors.mono500, theme.colors.mono600];
  } else {
    return [theme.colors.mono700, theme.colors.mono500, theme.colors.mono300];
  }
}
