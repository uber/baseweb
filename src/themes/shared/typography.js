/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import type {FontTokensT, TypographyT} from '../types.js';

export const fontTokens: FontTokensT = {
  primaryFontFamily:
    'system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif',
};

// color constants
export default (themePrimitives: FontTokensT = fontTokens): TypographyT => {
  const font100 = {
    fontFamily: themePrimitives.primaryFontFamily,
    fontSize: '12px',
    fontWeight: 'normal',
    lineHeight: '20px',
  };
  const font150 = {
    fontFamily: themePrimitives.primaryFontFamily,
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '16px',
  };
  const font200 = {
    fontFamily: themePrimitives.primaryFontFamily,
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: '20px',
  };
  const font250 = {
    fontFamily: themePrimitives.primaryFontFamily,
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '16px',
  };
  const font300 = {
    fontFamily: themePrimitives.primaryFontFamily,
    fontSize: '16px',
    fontWeight: 'normal',
    lineHeight: '24px',
  };
  const font350 = {
    fontFamily: themePrimitives.primaryFontFamily,
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '20px',
  };
  const font400 = {
    fontFamily: themePrimitives.primaryFontFamily,
    fontSize: '18px',
    fontWeight: 'normal',
    lineHeight: '28px',
  };
  const font450 = {
    fontFamily: themePrimitives.primaryFontFamily,
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: '24px',
  };
  const font550 = {
    fontFamily: themePrimitives.primaryFontFamily,
    fontSize: '20px',
    fontWeight: 500,
    lineHeight: '28px',
  };
  const font650 = {
    fontFamily: themePrimitives.primaryFontFamily,
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: '32px',
  };
  const font750 = {
    fontFamily: themePrimitives.primaryFontFamily,
    fontSize: '28px',
    fontWeight: 500,
    lineHeight: '36px',
  };
  const font850 = {
    fontFamily: themePrimitives.primaryFontFamily,
    fontSize: '32px',
    fontWeight: 500,
    lineHeight: '40px',
  };
  const font950 = {
    fontFamily: themePrimitives.primaryFontFamily,
    fontSize: '36px',
    fontWeight: 500,
    lineHeight: '44px',
  };
  const font1050 = {
    fontFamily: themePrimitives.primaryFontFamily,
    fontSize: '40px',
    fontWeight: 500,
    lineHeight: '52px',
  };
  const font1150 = {
    fontFamily: themePrimitives.primaryFontFamily,
    fontSize: '36px',
    fontWeight: 500,
    lineHeight: '44px',
  };
  const font1250 = {
    fontFamily: themePrimitives.primaryFontFamily,
    fontSize: '44px',
    fontWeight: 500,
    lineHeight: '52px',
  };
  const font1350 = {
    fontFamily: themePrimitives.primaryFontFamily,
    fontSize: '52px',
    fontWeight: 500,
    lineHeight: '64px',
  };
  const font1450 = {
    fontFamily: themePrimitives.primaryFontFamily,
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
  };
};
