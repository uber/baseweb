/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

// color constants
const defaultTheme = {
  primary50: '#EDF3FE',
  primary100: '#D2E0FC',
  primary200: '#9CBCF8',
  primary300: '#548BF4',
  primary400: '#276EF1',
  primary500: '#174EB6',
  primary600: '#123D90',
  primary700: '#0C2960',

  negative50: '#FDF0EF',
  negative100: '#FADBD7',
  negative200: '#F4AFA7',
  negative300: '#EB7567',
  negative400: '#E54937',
  negative500: '#AE372A',
  negative600: '#892C21',
  negative700: '#5C1D16',

  warning50: '#FEF3EC',
  warning100: '#FBE2CF',
  warning200: '#F6BA8B',
  warning300: '#F19248',
  warning400: '#ED6F0E',
  warning500: '#B4540B',
  warning600: '#8E4308',
  warning700: '#5F2C06',

  positive50: '#EBF8F2',
  positive100: '#CDEDDE',
  positive200: '#88D3B0',
  positive300: '#43B982',
  positive400: '#07A35A',
  positive500: '#057C44',
  positive600: '#046236',
  positive700: '#034124',

  mono100: '#FFFFFF',
  mono200: '#F7F7F7',
  mono300: '#F0F0F0',
  mono400: '#E5E5E5',
  mono500: '#CCCCCC',
  mono600: '#B3B3B3',
  mono700: '#999999',
  mono800: '#666666',
  mono900: '#333333',
  mono1000: '#000000',

  primaryFontFamily: '"Helvetica Neue", arial, sans-serif',
};

// $FlowFixMe
export default function(overrides) {
  const theme = Object.assign({}, defaultTheme, overrides);
  return {
    colors: {
      // Primary Palette
      primary50: theme.primary50,
      primary100: theme.primary100,
      primary200: theme.primary200,
      primary300: theme.primary300,
      primary400: theme.primary400,
      primary: theme.primary400,
      primary500: theme.primary500,
      primary600: theme.primary600,
      primary700: theme.primary700,

      // Negative Palette
      negative50: theme.negative50,
      negative100: theme.negative100,
      negative200: theme.negative200,
      negative300: theme.negative300,
      negative400: theme.negative400,
      negative: theme.negative400,
      negative500: theme.negative500,
      negative600: theme.negative600,
      negative700: theme.negative700,

      // Warning Palette
      warning50: theme.warning50,
      warning100: theme.warning100,
      warning200: theme.warning200,
      warning300: theme.warning300,
      warning400: theme.warning400,
      warning: theme.warning400,
      warning500: theme.warning500,
      warning600: theme.warning600,
      warning700: theme.warning700,

      // Positive Palette
      positive50: theme.positive50,
      positive100: theme.positive100,
      positive200: theme.positive200,
      positive300: theme.positive300,
      positive400: theme.positive400,
      positive: theme.positive400,
      positive500: theme.positive500,
      positive600: theme.positive600,
      positive700: theme.positive700,

      // Monochrome Palette
      white: theme.mono100,
      mono100: theme.mono100,
      mono200: theme.mono200,
      mono300: theme.mono300,
      mono400: theme.mono400,
      mono500: theme.mono500,
      mono600: theme.mono600,
      mono700: theme.mono700,
      mono800: theme.mono800,
      mono900: theme.mono900,
      mono1000: theme.mono1000,
      black: theme.mono1000,

      // Semantic Colors

      // Background
      background: theme.mono100,
      backgroundAlt: theme.mono800,
      backgroundInv: theme.mono100,

      // Foreground
      foreground: theme.mono1000,
      foregroundAlt: theme.mono800,
      foregroundInv: theme.mono100,

      // Borders
      border: theme.mono500,
      borderAlt: theme.mono600,
      borderFocus: theme.primary400,
      borderError: theme.negative400,

      // Buttons
      buttonPrimaryFill: theme.primary400,
      buttonPrimaryText: theme.mono100, // white
      buttonPrimaryHover: theme.primary500,
      buttonPrimaryActive: theme.primary600,
      buttonSecondaryFill: theme.primary50,
      buttonSecondaryText: theme.primary400,
      buttonSecondaryHover: theme.primary100,
      buttonSecondaryActive: theme.primary200,
      buttonTertiaryFill: theme.mono200,
      buttonTertiaryText: theme.primary400,
      buttonTertiaryHover: theme.mono400,
      buttonTertiaryActive: theme.mono500,
      buttonMinimalFill: 'transparent',
      buttonMinimalText: theme.primary400,
      buttonMinimalHover: theme.mono200,
      buttonMinimalActive: theme.mono400,
      buttonDisabledFill: theme.mono300,
      buttonDisabledText: theme.mono600,

      // Links
      linkText: theme.primary400,
      linkVisited: theme.primary500,
      linkHover: theme.primary600,

      // Shadow
      shadowFocus: 'rgba(39, 110, 241, 0.32)',
      shadowError: 'rgba(229, 73, 55, 0.32)',
    },
    typography: {
      font100: {
        fontFamily: theme.primaryFontFamily,
        fontSize: '11px',
        fontWeight: 'normal',
        lineHeight: '16px',
      },
      font200: {
        fontFamily: theme.primaryFontFamily,
        fontSize: '12px',
        fontWeight: 'normal',
        lineHeight: '20px',
      },
      font250: {
        fontFamily: theme.primaryFontFamily,
        fontSize: '12px',
        fontWeight: 'bold',
        lineHeight: '20px',
      },
      font300: {
        fontFamily: theme.primaryFontFamily,
        fontSize: '14px',
        fontWeight: 'normal',
        lineHeight: '24px',
      },
      font350: {
        fontFamily: theme.primaryFontFamily,
        fontSize: '14px',
        fontWeight: 'bold',
        lineHeight: '24px',
      },
      font400: {
        fontFamily: theme.primaryFontFamily,
        fontSize: '16px',
        fontWeight: 'normal',
        lineHeight: '28px',
      },
      font450: {
        fontFamily: theme.primaryFontFamily,
        fontSize: '16px',
        fontWeight: 'bold',
        lineHeight: '28px',
      },
      font500: {
        fontFamily: theme.primaryFontFamily,
        fontSize: '20px',
        fontWeight: 'bold',
        lineHeight: '28px',
      },
      font600: {
        fontFamily: theme.primaryFontFamily,
        fontSize: '24px',
        fontWeight: 'bold',
        lineHeight: '36px',
      },
      font700: {
        fontFamily: theme.primaryFontFamily,
        fontSize: '28px',
        fontWeight: 'bold',
        lineHeight: '40px',
      },
      font800: {
        fontFamily: theme.primaryFontFamily,
        fontSize: '32px',
        fontWeight: 'bold',
        lineHeight: '48px',
      },
      font900: {
        fontFamily: theme.primaryFontFamily,
        fontSize: '40px',
        fontWeight: 'bold',
        lineHeight: '56px',
      },
      font1000: {
        fontFamily: theme.primaryFontFamily,
        fontSize: '56px',
        fontWeight: 'normal',
        lineHeight: '80px',
      },
    },
    sizing: {
      scale0: '2px',
      scale100: '4px',
      scale200: '6px',
      scale300: '8px',
      scale400: '10px',
      scale500: '12px',
      scale600: '16px',
      scale700: '20px',
      scale800: '24px',
      scale900: '32px',
      scale1000: '40px',
      scale1200: '48px',
      scale1400: '56px',
      scale1600: '64px',
      scale2400: '96px',
      scale3200: '128px',
      scale4800: '192px',
    },
    lighting: {
      shadow400: '0 1px 4px hsla(0, 0%, 0%, 0.16)',
      shadow500: '0 2px 8px hsla(0, 0%, 0%, 0.16)',
      shadow600: '0 4px 16px hsla(0, 0%, 0%, 0.16)',
      shadow700: '0 8px 24px hsla(0, 0%, 0%, 0.16)',
      overlay0: 'inset 0 0 0 1000px hsla(0, 0%, 0%, 0)',
      overlay100: 'inset 0 0 0 1000px hsla(0, 0%, 0%, 0.04)',
      overlay200: 'inset 0 0 0 1000px hsla(0, 0%, 0%, 0.08)',
      overlay300: 'inset 0 0 0 1000px hsla(0, 0%, 0%, 0.12)',
      overlay400: 'inset 0 0 0 1000px hsla(0, 0%, 0%, 0.16)',
      overlay500: 'inset 0 0 0 1000px hsla(0, 0%, 0%, 0.2)',
      overlay600: 'inset 0 0 0 1000px hsla(0, 0%, 0%, 0.24)',
    },
    borders: {
      border100: {
        borderColor: 'hsla(0, 0%, 0%, 0.04)',
        borderStyle: 'solid',
        borderWidth: '1px',
      },
      border200: {
        borderColor: 'hsla(0, 0%, 0%, 0.08)',
        borderStyle: 'solid',
        borderWidth: '1px',
      },
      border300: {
        borderColor: 'hsla(0, 0%, 0%, 0.12)',
        borderStyle: 'solid',
        borderWidth: '1px',
      },
      border400: {
        borderColor: 'hsla(0, 0%, 0%, 0.16)',
        borderStyle: 'solid',
        borderWidth: '1px',
      },
      border500: {
        borderColor: 'hsla(0, 0%, 0%, 0.2)',
        borderStyle: 'solid',
        borderWidth: '1px',
      },
      border600: {
        borderColor: 'hsla(0, 0%, 0%, 0.24)',
        borderStyle: 'solid',
        borderWidth: '1px',
      },
      radius100: '2px',
      radius200: '4px',
      radius300: '8px',
      useRoundedCorners: true,
    },
    animation: {
      timing100: '0.25s',
      timing400: '0.4s',
      timing700: '0.6s',
      easeOutCurve: 'cubic-bezier(.2, .8, .4, 1)',
      easeInCurve: 'cubic-bezier(.8, .2, .6, 1)',
      easeInOutCurve: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    zIndex: {
      modal: 2000,
    },
    tooltip: {
      backgroundColor: theme.mono900,
    },
  };
}
