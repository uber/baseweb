/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import createTheme from './creator.js';
import {primitives} from './dark-theme-primitives.js';
import colors from './dark-theme-colors.js';

export const DarkTheme = createTheme(
  {
    ...primitives,
  },
  {
    name: 'dark-theme',
    ...colors,
  },
);
