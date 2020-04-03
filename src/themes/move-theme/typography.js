/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import type {FontTokensT} from '../types.js';

export const fontTokens: FontTokensT = {
  primaryFontFamily:
    'UberMoveText, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif',
};

const secondaryFontFamily =
  'UberMove, UberMoveText, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif';

export const typography = {
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
  DisplayLarge: {
    fontFamily: secondaryFontFamily,
  },
  DisplayMedium: {
    fontFamily: secondaryFontFamily,
  },
  DisplaySmall: {
    fontFamily: secondaryFontFamily,
  },
  DisplayXSmall: {
    fontFamily: secondaryFontFamily,
  },
};
