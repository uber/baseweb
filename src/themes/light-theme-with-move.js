/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import createTheme from './creator.js';
import {primitives as lightThemePrimitives} from './light-theme-primitives.js';

const primaryFontFamily =
  'UberMoveText, "Open Sans", "Helvetica Neue", Helvetica, sans-serif';

const secondaryFontFamily =
  'UberMove, UberMoveText, "Open Sans", "Helvetica Neue", Helvetica, sans-serif';

export const LightThemeMove = createTheme(
  {
    ...lightThemePrimitives,
    primaryFontFamily,
  },
  {
    typography: {
      font200: {
        fontFamily: primaryFontFamily,
        fontSize: '12px',
        fontWeight: 'normal',
        lineHeight: '20px',
      },
      font250: {
        fontFamily: primaryFontFamily,
        fontSize: '12px',
        fontWeight: 500,
        lineHeight: '20px',
      },
      font300: {
        fontFamily: primaryFontFamily,
        fontSize: '14px',
        fontWeight: 'normal',
        lineHeight: '20px',
      },
      font350: {
        fontFamily: primaryFontFamily,
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '20px',
      },
      font400: {
        fontFamily: primaryFontFamily,
        fontSize: '16px',
        fontWeight: 'normal',
        lineHeight: '24px',
      },
      font450: {
        fontFamily: primaryFontFamily,
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: '24px',
      },
      font500: {
        fontFamily: primaryFontFamily,
        fontSize: '20px',
        fontWeight: 500,
        lineHeight: '28px',
      },
      font600: {
        fontFamily: primaryFontFamily,
        fontSize: '24px',
        fontWeight: 500,
        lineHeight: '36px',
      },
      font700: {
        fontFamily: primaryFontFamily,
        fontSize: '32px',
        fontWeight: 500,
        lineHeight: '48px',
      },
      font800: {
        fontFamily: primaryFontFamily,
        fontSize: '40px',
        fontWeight: 500,
        lineHeight: '56px',
      },
      font900: {
        fontFamily: primaryFontFamily,
        fontSize: '52px',
        fontWeight: 500,
        lineHeight: '68px',
      },
      font1000: {
        fontFamily: primaryFontFamily,
        fontSize: '72px',
        fontWeight: 'normal',
        lineHeight: '96px',
      },
      font1100: {
        fontFamily: secondaryFontFamily,
        fontSize: '96px',
        fontWeight: 'normal',
        lineHeight: '116px',
      },
    },
  },
);
