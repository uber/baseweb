/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { FontTokens } from '../types';

export const fontTokens: FontTokens = {
  primaryFontFamily: 'UberMoveText, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif',
  secondaryFontFamily:
    'UberMove, UberMoveText, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif',
  monoFontFamily: 'UberMoveMono, "Lucida Console", Monaco, monospace',
};

export const typography = {
  font1450: { fontFamily: fontTokens.secondaryFontFamily },
  font1350: { fontFamily: fontTokens.secondaryFontFamily },
  font1250: { fontFamily: fontTokens.secondaryFontFamily },
  font1150: { fontFamily: fontTokens.secondaryFontFamily },
  font1050: { fontFamily: fontTokens.secondaryFontFamily },
  font950: { fontFamily: fontTokens.secondaryFontFamily },
  font850: { fontFamily: fontTokens.secondaryFontFamily },
  font750: { fontFamily: fontTokens.secondaryFontFamily },
  font650: { fontFamily: fontTokens.secondaryFontFamily },
  font550: { fontFamily: fontTokens.secondaryFontFamily },
  DisplayLarge: { fontFamily: fontTokens.secondaryFontFamily },
  DisplayMedium: { fontFamily: fontTokens.secondaryFontFamily },
  DisplaySmall: { fontFamily: fontTokens.secondaryFontFamily },
  DisplayXSmall: { fontFamily: fontTokens.secondaryFontFamily },
  HeadingXXLarge: { fontFamily: fontTokens.secondaryFontFamily },
  HeadingXLarge: { fontFamily: fontTokens.secondaryFontFamily },
  HeadingLarge: { fontFamily: fontTokens.secondaryFontFamily },
  HeadingMedium: { fontFamily: fontTokens.secondaryFontFamily },
  HeadingSmall: { fontFamily: fontTokens.secondaryFontFamily },
  HeadingXSmall: { fontFamily: fontTokens.secondaryFontFamily },

  MonoParagraphXSmall: { fontFamily: fontTokens.monoFontFamily },
  MonoParagraphSmall: { fontFamily: fontTokens.monoFontFamily },
  MonoParagraphMedium: { fontFamily: fontTokens.monoFontFamily },
  MonoParagraphLarge: { fontFamily: fontTokens.monoFontFamily },
  MonoLabelXSmall: { fontFamily: fontTokens.monoFontFamily },
  MonoLabelSmall: { fontFamily: fontTokens.monoFontFamily },
  MonoLabelMedium: { fontFamily: fontTokens.monoFontFamily },
  MonoLabelLarge: { fontFamily: fontTokens.monoFontFamily },
  MonoHeadingXSmall: { fontFamily: fontTokens.monoFontFamily },
  MonoHeadingSmall: { fontFamily: fontTokens.monoFontFamily },
  MonoHeadingMedium: { fontFamily: fontTokens.monoFontFamily },
  MonoHeadingLarge: { fontFamily: fontTokens.monoFontFamily },
  MonoHeadingXLarge: { fontFamily: fontTokens.monoFontFamily },
  MonoHeadingXXLarge: { fontFamily: fontTokens.monoFontFamily },
  MonoDisplayXSmall: { fontFamily: fontTokens.monoFontFamily },
  MonoDisplaySmall: { fontFamily: fontTokens.monoFontFamily },
  MonoDisplayMedium: { fontFamily: fontTokens.monoFontFamily },
  MonoDisplayLarge: { fontFamily: fontTokens.monoFontFamily },
};
