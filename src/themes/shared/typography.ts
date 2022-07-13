/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { TypographyT, FontTokensT, FontT } from '../types';

export const defaultFontTokens: FontTokensT = {
  primaryFontFamily: 'system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif',
};

const monoFontFamily = '"Lucida Console", Monaco, monospace';

export default (fontTokens: FontTokensT = defaultFontTokens): TypographyT => {
  const font100: FontT = {
    fontFamily: fontTokens.primaryFontFamily,
    fontSize: '12px',
    fontWeight: 'normal',
    lineHeight: '20px',
  };
  const font150: FontT = {
    fontFamily: fontTokens.primaryFontFamily,
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '16px',
  };
  const font200: FontT = {
    fontFamily: fontTokens.primaryFontFamily,
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: '20px',
  };
  const font250: FontT = {
    fontFamily: fontTokens.primaryFontFamily,
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '16px',
  };
  const font300: FontT = {
    fontFamily: fontTokens.primaryFontFamily,
    fontSize: '16px',
    fontWeight: 'normal',
    lineHeight: '24px',
  };
  const font350: FontT = {
    fontFamily: fontTokens.primaryFontFamily,
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '20px',
  };
  const font400: FontT = {
    fontFamily: fontTokens.primaryFontFamily,
    fontSize: '18px',
    fontWeight: 'normal',
    lineHeight: '28px',
  };
  const font450: FontT = {
    fontFamily: fontTokens.primaryFontFamily,
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: '24px',
  };
  const font550: FontT = {
    fontFamily: fontTokens.primaryFontFamily,
    fontSize: '20px',
    fontWeight: 500,
    lineHeight: '28px',
  };
  const font650: FontT = {
    fontFamily: fontTokens.primaryFontFamily,
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: '32px',
  };
  const font750: FontT = {
    fontFamily: fontTokens.primaryFontFamily,
    fontSize: '28px',
    fontWeight: 500,
    lineHeight: '36px',
  };
  const font850: FontT = {
    fontFamily: fontTokens.primaryFontFamily,
    fontSize: '32px',
    fontWeight: 500,
    lineHeight: '40px',
  };
  const font950: FontT = {
    fontFamily: fontTokens.primaryFontFamily,
    fontSize: '36px',
    fontWeight: 500,
    lineHeight: '44px',
  };
  const font1050: FontT = {
    fontFamily: fontTokens.primaryFontFamily,
    fontSize: '40px',
    fontWeight: 500,
    lineHeight: '52px',
  };
  const font1150: FontT = {
    fontFamily: fontTokens.primaryFontFamily,
    fontSize: '36px',
    fontWeight: 500,
    lineHeight: '44px',
  };
  const font1250: FontT = {
    fontFamily: fontTokens.primaryFontFamily,
    fontSize: '44px',
    fontWeight: 500,
    lineHeight: '52px',
  };
  const font1350: FontT = {
    fontFamily: fontTokens.primaryFontFamily,
    fontSize: '52px',
    fontWeight: 500,
    lineHeight: '64px',
  };
  const font1450: FontT = {
    fontFamily: fontTokens.primaryFontFamily,
    fontSize: '96px',
    fontWeight: 500,
    lineHeight: '112px',
  };

  return {
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

    MonoParagraphXSmall: { ...font100, fontFamily: monoFontFamily },
    MonoParagraphSmall: { ...font200, fontFamily: monoFontFamily },
    MonoParagraphMedium: { ...font300, fontFamily: monoFontFamily },
    MonoParagraphLarge: { ...font400, fontFamily: monoFontFamily },
    MonoLabelXSmall: { ...font150, fontFamily: monoFontFamily },
    MonoLabelSmall: { ...font250, fontFamily: monoFontFamily },
    MonoLabelMedium: { ...font350, fontFamily: monoFontFamily },
    MonoLabelLarge: { ...font450, fontFamily: monoFontFamily },
    MonoHeadingXSmall: { ...font550, fontFamily: monoFontFamily },
    MonoHeadingSmall: { ...font650, fontFamily: monoFontFamily },
    MonoHeadingMedium: { ...font750, fontFamily: monoFontFamily },
    MonoHeadingLarge: { ...font850, fontFamily: monoFontFamily },
    MonoHeadingXLarge: { ...font950, fontFamily: monoFontFamily },
    MonoHeadingXXLarge: { ...font1050, fontFamily: monoFontFamily },
    MonoDisplayXSmall: { ...font1150, fontFamily: monoFontFamily },
    MonoDisplaySmall: { ...font1250, fontFamily: monoFontFamily },
    MonoDisplayMedium: { ...font1350, fontFamily: monoFontFamily },
    MonoDisplayLarge: { ...font1450, fontFamily: monoFontFamily },
  };
};
