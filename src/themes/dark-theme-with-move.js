/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import createTheme from './creator.js';
import {primitives as darkThemePrimitives} from './dark-theme-primitives.js';
import colors from './dark-theme-colors.js';

const primaryFontFamily =
  'UberMoveText, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif';

const secondaryFontFamily =
  'UberMove, UberMoveText, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif';

export const DarkThemeMove = createTheme(
  {
    ...darkThemePrimitives,
    primaryFontFamily,
  },
  {
    name: 'dark-theme-with-move',
    ...colors,
    typography: {
      font1450: {
        fontFamily: secondaryFontFamily,
      },
      font1350: {
        fontFamily: secondaryFontFamily,
      },
      font1250: {
        fontFamily: secondaryFontFamily,
      },
      font1150: {
        fontFamily: secondaryFontFamily,
      },
    },
  },
);
