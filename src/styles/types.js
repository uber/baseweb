/*
MIT License

Copyright (c) 2018 Uber Technologies, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
// @flow
type Colors = {
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
  buttonTertiaryFill: string,
  buttonTertiaryText: string,
  buttonMinimalFill: string,
  buttonMinimalText: string,
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

type Typography = {
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

type Font = {
  fontFamily: string,
  fontWeight: string,
  fontSize: string,
  lineHeight: string,
};

type Sizing = {
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

type Lighting = {
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

type Animation = {
  timing100: string,
  timing400: string,
  timing700: string,
  easeOutCurve: string,
  easeInCurve: string,
  easeInOutCurve: string,
};

type Borders = {
  useRoundedCorners: boolean,
  radius100: string,
  radius200: string,
  radius300: string,
};

export type ThemeT = {
  colors: Colors,
  typography: Typography,
  sizing: Sizing,
  lighting: Lighting,
  animation: Animation,
  borders: Borders,
};
