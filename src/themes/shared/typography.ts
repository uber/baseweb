/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { Typography, FontTokens, Font } from '../types';

export const fontTokens: FontTokens = {
  primaryFontFamily: 'UberMoveText, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif',
  secondaryFontFamily:
    'UberMove, UberMoveText, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif',
  monoFontFamily: 'UberMoveMono, "Lucida Console", Monaco, monospace',
};

const font100: Font = {
  fontFamily: fontTokens.primaryFontFamily,
  fontSize: '12px',
  fontWeight: 'normal',
  lineHeight: '20px',
};
const font150: Font = {
  fontFamily: fontTokens.primaryFontFamily,
  fontSize: '12px',
  fontWeight: 500,
  lineHeight: '16px',
};
const font200: Font = {
  fontFamily: fontTokens.primaryFontFamily,
  fontSize: '14px',
  fontWeight: 'normal',
  lineHeight: '20px',
};
const font250: Font = {
  fontFamily: fontTokens.primaryFontFamily,
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '16px',
};
const font300: Font = {
  fontFamily: fontTokens.primaryFontFamily,
  fontSize: '16px',
  fontWeight: 'normal',
  lineHeight: '24px',
};
const font350: Font = {
  fontFamily: fontTokens.primaryFontFamily,
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: '20px',
};
const font400: Font = {
  fontFamily: fontTokens.primaryFontFamily,
  fontSize: '18px',
  fontWeight: 'normal',
  lineHeight: '28px',
};
const font450: Font = {
  fontFamily: fontTokens.primaryFontFamily,
  fontSize: '18px',
  fontWeight: 500,
  lineHeight: '24px',
};
const font550: Font = {
  fontFamily: fontTokens.secondaryFontFamily,
  fontSize: '20px',
  fontWeight: 700,
  lineHeight: '28px',
};
const font650: Font = {
  fontFamily: fontTokens.secondaryFontFamily,
  fontSize: '24px',
  fontWeight: 700,
  lineHeight: '32px',
};
const font750: Font = {
  fontFamily: fontTokens.secondaryFontFamily,
  fontSize: '28px',
  fontWeight: 700,
  lineHeight: '36px',
};
const font850: Font = {
  fontFamily: fontTokens.secondaryFontFamily,
  fontSize: '32px',
  fontWeight: 700,
  lineHeight: '40px',
};
const font950: Font = {
  fontFamily: fontTokens.secondaryFontFamily,
  fontSize: '36px',
  fontWeight: 700,
  lineHeight: '44px',
};
const font1050: Font = {
  fontFamily: fontTokens.secondaryFontFamily,
  fontSize: '40px',
  fontWeight: 700,
  lineHeight: '52px',
};
const font1150: Font = {
  fontFamily: fontTokens.secondaryFontFamily,
  fontSize: '36px',
  fontWeight: 700,
  lineHeight: '44px',
};
const font1250: Font = {
  fontFamily: fontTokens.secondaryFontFamily,
  fontSize: '44px',
  fontWeight: 700,
  lineHeight: '52px',
};
const font1350: Font = {
  fontFamily: fontTokens.secondaryFontFamily,
  fontSize: '52px',
  fontWeight: 700,
  lineHeight: '64px',
};
const font1450: Font = {
  fontFamily: fontTokens.secondaryFontFamily,
  fontSize: '96px',
  fontWeight: 700,
  lineHeight: '112px',
};

const typography: Typography = {
  font100,
  font150,
  font200,
  font250,
  font300,
  font350,
  font400,
  font450,
  font550,
  font650,
  font750,
  font850,
  font950,
  font1050,
  font1150,
  font1250,
  font1350,
  font1450,

  ParagraphXSmall: font100,
  ParagraphSmall: font200,
  ParagraphMedium: font300,
  ParagraphLarge: font400,
  LabelXSmall: font150,
  LabelSmall: font250,
  LabelMedium: font350,
  LabelLarge: font450,
  HeadingXSmall: font550,
  HeadingSmall: font650,
  HeadingMedium: font750,
  HeadingLarge: font850,
  HeadingXLarge: font950,
  HeadingXXLarge: font1050,
  DisplayXSmall: font1150,
  DisplaySmall: font1250,
  DisplayMedium: font1350,
  DisplayLarge: font1450,

  MonoParagraphXSmall: { ...font100, fontFamily: fontTokens.monoFontFamily },
  MonoParagraphSmall: { ...font200, fontFamily: fontTokens.monoFontFamily },
  MonoParagraphMedium: { ...font300, fontFamily: fontTokens.monoFontFamily },
  MonoParagraphLarge: { ...font400, fontFamily: fontTokens.monoFontFamily },
  MonoLabelXSmall: { ...font150, fontFamily: fontTokens.monoFontFamily },
  MonoLabelSmall: { ...font250, fontFamily: fontTokens.monoFontFamily },
  MonoLabelMedium: { ...font350, fontFamily: fontTokens.monoFontFamily },
  MonoLabelLarge: { ...font450, fontFamily: fontTokens.monoFontFamily },
  MonoHeadingXSmall: { ...font550, fontFamily: fontTokens.monoFontFamily },
  MonoHeadingSmall: { ...font650, fontFamily: fontTokens.monoFontFamily },
  MonoHeadingMedium: { ...font750, fontFamily: fontTokens.monoFontFamily },
  MonoHeadingLarge: { ...font850, fontFamily: fontTokens.monoFontFamily },
  MonoHeadingXLarge: { ...font950, fontFamily: fontTokens.monoFontFamily },
  MonoHeadingXXLarge: { ...font1050, fontFamily: fontTokens.monoFontFamily },
  MonoDisplayXSmall: { ...font1150, fontFamily: fontTokens.monoFontFamily },
  MonoDisplaySmall: { ...font1250, fontFamily: fontTokens.monoFontFamily },
  MonoDisplayMedium: { ...font1350, fontFamily: fontTokens.monoFontFamily },
  MonoDisplayLarge: { ...font1450, fontFamily: fontTokens.monoFontFamily },
};

export default typography;
