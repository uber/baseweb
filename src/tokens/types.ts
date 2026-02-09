/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
export type PrimitiveColors = {
  white: string;
  black: string;
  gray50: string;
  gray100: string;
  gray200: string;
  gray300: string;
  gray400: string;
  gray500: string;
  gray600: string;
  gray700: string;
  gray800: string;
  gray900: string;
  /** @deprecated use gray color tokens instead */
  platinum50: string;
  /** @deprecated use gray color tokens instead */
  platinum100: string;
  /** @deprecated use gray color tokens instead */
  platinum200: string;
  /** @deprecated use gray color tokens instead */
  platinum300: string;
  /** @deprecated use gray color tokens instead */
  platinum400: string;
  /** @deprecated use gray color tokens instead */
  platinum500: string;
  /** @deprecated use gray color tokens instead */
  platinum600: string;
  /** @deprecated use gray color tokens instead */
  platinum700: string;
  /** @deprecated use gray color tokens instead */
  platinum800: string;
  blue50: string;
  blue100: string;
  blue200: string;
  blue300: string;
  blue400: string;
  blue500: string;
  blue600: string;
  blue700: string;
  blue800: string;
  blue900: string;
  teal50: string;
  teal100: string;
  teal200: string;
  teal300: string;
  teal400: string;
  teal500: string;
  teal600: string;
  teal700: string;
  teal800: string;
  teal900: string;
  red50: string;
  red100: string;
  red200: string;
  red300: string;
  red400: string;
  red500: string;
  red600: string;
  red700: string;
  red800: string;
  red900: string;
  green50: string;
  green100: string;
  green200: string;
  green300: string;
  green400: string;
  green500: string;
  green600: string;
  green700: string;
  green800: string;
  green900: string;
  orange50: string;
  orange100: string;
  orange200: string;
  orange300: string;
  orange400: string;
  orange500: string;
  orange600: string;
  orange700: string;
  orange800: string;
  orange900: string;
  amber50: string;
  amber100: string;
  amber200: string;
  amber300: string;
  amber400: string;
  amber500: string;
  amber600: string;
  amber700: string;
  amber800: string;
  amber900: string;
  magenta50: string;
  magenta100: string;
  magenta200: string;
  magenta300: string;
  magenta400: string;
  magenta500: string;
  magenta600: string;
  magenta700: string;
  magenta800: string;
  magenta900: string;
  purple50: string;
  purple100: string;
  purple200: string;
  purple300: string;
  purple400: string;
  purple500: string;
  purple600: string;
  purple700: string;
  purple800: string;
  purple900: string;
  yellow50: string;
  yellow100: string;
  yellow200: string;
  yellow300: string;
  yellow400: string;
  yellow500: string;
  yellow600: string;
  yellow700: string;
  yellow800: string;
  yellow900: string;
  lime50: string;
  lime100: string;
  lime200: string;
  lime300: string;
  lime400: string;
  lime500: string;
  lime600: string;
  lime700: string;
  lime800: string;
  lime900: string;
  /** @deprecated use orange color tokens instead */
  brown50: string;
  /** @deprecated use orange color tokens instead */
  brown100: string;
  /** @deprecated use orange color tokens instead */
  brown200: string;
  /** @deprecated use orange color tokens instead */
  brown300: string;
  /** @deprecated use orange color tokens instead */
  brown400: string;
  /** @deprecated use orange color tokens instead */
  brown500: string;
  /** @deprecated use orange color tokens instead */
  brown600: string;
  /** @deprecated use orange color tokens instead */
  brown700: string;
  /** @deprecated use blue color tokens instead */
  cobalt50: string;
  /** @deprecated use blue color tokens instead */
  cobalt100: string;
  /** @deprecated use blue color tokens instead */
  cobalt200: string;
  /** @deprecated use blue color tokens instead */
  cobalt300: string;
  /** @deprecated use blue color tokens instead */
  cobalt400: string;
  /** @deprecated use blue color tokens instead */
  cobalt500: string;
  /** @deprecated use blue color tokens instead */
  cobalt600: string;
  /** @deprecated use blue color tokens instead */
  cobalt700: string;

  // brand color tokens
  brandDefault50: string;
  brandDefault100: string;
  brandDefault200: string;
  brandDefault300: string;
  brandDefault400: string;
  brandDefault500: string;
  brandDefault600: string;
  brandDefault700: string;
  brandDefault800: string;
  brandDefault900: string;

  // dark color tokens
  gray50Dark: string;
  gray100Dark: string;
  gray200Dark: string;
  gray300Dark: string;
  gray400Dark: string;
  gray500Dark: string;
  gray600Dark: string;
  gray700Dark: string;
  gray800Dark: string;
  gray900Dark: string;

  red50Dark: string;
  red100Dark: string;
  red200Dark: string;
  red300Dark: string;
  red400Dark: string;
  red500Dark: string;
  red600Dark: string;
  red700Dark: string;
  red800Dark: string;
  red900Dark: string;

  orange50Dark: string;
  orange100Dark: string;
  orange200Dark: string;
  orange300Dark: string;
  orange400Dark: string;
  orange500Dark: string;
  orange600Dark: string;
  orange700Dark: string;
  orange800Dark: string;
  orange900Dark: string;

  amber50Dark: string;
  amber100Dark: string;
  amber200Dark: string;
  amber300Dark: string;
  amber400Dark: string;
  amber500Dark: string;
  amber600Dark: string;
  amber700Dark: string;
  amber800Dark: string;
  amber900Dark: string;

  yellow50Dark: string;
  yellow100Dark: string;
  yellow200Dark: string;
  yellow300Dark: string;
  yellow400Dark: string;
  yellow500Dark: string;
  yellow600Dark: string;
  yellow700Dark: string;
  yellow800Dark: string;
  yellow900Dark: string;

  lime50Dark: string;
  lime100Dark: string;
  lime200Dark: string;
  lime300Dark: string;
  lime400Dark: string;
  lime500Dark: string;
  lime600Dark: string;
  lime700Dark: string;
  lime800Dark: string;
  lime900Dark: string;

  green50Dark: string;
  green100Dark: string;
  green200Dark: string;
  green300Dark: string;
  green400Dark: string;
  green500Dark: string;
  green600Dark: string;
  green700Dark: string;
  green800Dark: string;
  green900Dark: string;

  teal50Dark: string;
  teal100Dark: string;
  teal200Dark: string;
  teal300Dark: string;
  teal400Dark: string;
  teal500Dark: string;
  teal600Dark: string;
  teal700Dark: string;
  teal800Dark: string;
  teal900Dark: string;

  blue50Dark: string;
  blue100Dark: string;
  blue200Dark: string;
  blue300Dark: string;
  blue400Dark: string;
  blue500Dark: string;
  blue600Dark: string;
  blue700Dark: string;
  blue800Dark: string;
  blue900Dark: string;

  purple50Dark: string;
  purple100Dark: string;
  purple200Dark: string;
  purple300Dark: string;
  purple400Dark: string;
  purple500Dark: string;
  purple600Dark: string;
  purple700Dark: string;
  purple800Dark: string;
  purple900Dark: string;

  magenta50Dark: string;
  magenta100Dark: string;
  magenta200Dark: string;
  magenta300Dark: string;
  magenta400Dark: string;
  magenta500Dark: string;
  magenta600Dark: string;
  magenta700Dark: string;
  magenta800Dark: string;
  magenta900Dark: string;

  brandDefault50Dark: string;
  brandDefault100Dark: string;
  brandDefault200Dark: string;
  brandDefault300Dark: string;
  brandDefault400Dark: string;
  brandDefault500Dark: string;
  brandDefault600Dark: string;
  brandDefault700Dark: string;
  brandDefault800Dark: string;
  brandDefault900Dark: string;
};

export type PrimitiveLightColors = {
  [K in keyof PrimitiveColors as K extends `${infer _}Dark` ? never : K]: PrimitiveColors[K];
};

export type PrimitiveDarkColors = {
  [K in keyof PrimitiveColors as K extends `${infer _}Dark` | 'white' | 'black'
    ? K
    : never]: PrimitiveColors[K];
};
