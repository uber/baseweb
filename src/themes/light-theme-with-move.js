/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

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
    name: 'light-theme-with-move',
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
