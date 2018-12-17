/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import createTheme from './creator.js';
import {primitives as lightThemePrimitives} from './light-theme-primitives.js';

const primaryFontFamily =
  'UberMoveText, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif';

const secondaryFontFamily =
  'UberMove, UberMoveText, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif';

export const LightThemeMove = createTheme(
  {
    ...lightThemePrimitives,
    primaryFontFamily,
  },
  {
    typography: {
      font250: {
        fontWeight: 500,
      },
      font350: {
        fontWeight: 500,
      },
      font450: {
        fontWeight: 500,
      },
      font500: {
        fontWeight: 500,
      },
      font600: {
        fontWeight: 500,
      },
      font700: {
        fontWeight: 500,
      },
      font800: {
        fontWeight: 500,
      },
      font900: {
        fontWeight: 500,
      },
      font1100: {
        fontFamily: secondaryFontFamily,
      },
    },
  },
);
