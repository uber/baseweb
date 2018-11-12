/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
export type ColorsT = {
  // Primary Palette
  primary50: string,
  primary100: string,
  primary200: string,
  primary300: string,
  primary400: string,
  primary: string,
  primary500: string,
  primary600: string,
  primary700: string,

  // Alert Palette
  negative50: string,
  negative100: string,
  negative200: string,
  negative300: string,
  negative400: string,
  negative: string,
  negative500: string,
  negative600: string,
  negative700: string,

  // Warning Palette
  warning50: string,
  warning100: string,
  warning200: string,
  warning300: string,
  warning400: string,
  warning: string,
  warning500: string,
  warning600: string,
  warning700: string,

  // Success Palette
  positive50: string,
  positive100: string,
  positive200: string,
  positive300: string,
  positive400: string,
  positive: string,
  positive500: string,
  positive600: string,
  positive700: string,

  // Monochrome Palette
  white: string,
  mono100: string,
  mono200: string,
  mono300: string,
  mono400: string,
  mono500: string,
  mono600: string,
  mono700: string,
  mono800: string,
  mono900: string,
  mono1000: string,
  black: string,

  // Semantic Colors

  // Background
  background: string,
  backgroundAlt: string,
  backgroundInv: string,

  // Foreground
  foreground: string,
  foregroundAlt: string,
  foregroundInv: string,

  // Borders
  border: string,
  borderAlt: string,
  borderFocus: string,
  borderError: string,

  // Buttons
  buttonPrimaryFill: string,
  buttonPrimaryText: string,
  buttonPrimaryHover: string,
  buttonPrimaryActive: string,
  buttonSecondaryFill: string,
  buttonSecondaryText: string,
  buttonSecondaryHover: string,
  buttonSecondaryActive: string,
  buttonTertiaryFill: string,
  buttonTertiaryText: string,
  buttonTertiaryHover: string,
  buttonTertiaryActive: string,
  buttonMinimalFill: string,
  buttonMinimalText: string,
  buttonMinimalHover: string,
  buttonMinimalActive: string,
  buttonDisabledFill: string,
  buttonDisabledText: string,

  // Links
  linkText: string,
  linkVisited: string,
  linkHover: string,

  // Shadow
  shadowFocus: string,
  shadowError: string,
};

export type TypographyT = {
  font100: Font,
  font200: Font,
  font250: Font,
  font300: Font,
  font350: Font,
  font400: Font,
  font450: Font,
  font500: Font,
  font600: Font,
  font700: Font,
  font800: Font,
  font900: Font,
  font1000: Font,
};

export type Font = {
  fontFamily: string,
  fontWeight: string,
  fontSize: string,
  lineHeight: string,
};

export type SizingT = {
  scale0: string,
  scale100: string,
  scale200: string,
  scale300: string,
  scale400: string,
  scale500: string,
  scale600: string,
  scale700: string,
  scale800: string,
  scale900: string,
  scale1000: string,
  scale1200: string,
  scale1400: string,
  scale1600: string,
  scale2400: string,
  scale3200: string,
  scale4800: string,
};

export type LightingT = {
  shadow400: string,
  shadow500: string,
  shadow600: string,
  shadow700: string,
  overlay0: string,
  overlay100: string,
  overlay200: string,
  overlay300: string,
  overlay400: string,
  overlay500: string,
  overlay600: string,
};

export type AnimationT = {
  timing100: string,
  timing400: string,
  timing700: string,
  easeOutCurve: string,
  easeInCurve: string,
  easeInOutCurve: string,
};

export type BorderT = {
  borderColor: string,
  borderStyle: string,
  borderWidth: string,
};

export type BordersT = {
  border100: BorderT,
  border200: BorderT,
  border300: BorderT,
  border400: BorderT,
  border500: BorderT,
  border600: BorderT,
  useRoundedCorners: boolean,
  radius100: string,
  radius200: string,
  radius300: string,
};

export type ZIndexT = {
  modal: number,
};

export type ThemeT = {|
  colors: ColorsT,
  typography: TypographyT,
  sizing: SizingT,
  lighting: LightingT,
  animation: AnimationT,
  borders: BordersT,
  zIndex: ZIndexT,
|};
