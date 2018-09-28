/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
// color constants
const primary50 = '#EDF3FE';
const primary100 = '#D2E0FC';
const primary200 = '#9CBCF8';
const primary300 = '#548BF4';
const primary400 = '#276EF1';
const primary500 = '#174EB6';
const primary600 = '#123D90';
const primary700 = '#0C2960';

const negative50 = '#FDF0EF';
const negative100 = '#FADBD7';
const negative200 = '#F4AFA7';
const negative300 = '#EB7567';
const negative400 = '#E54937';
const negative500 = '#AE372A';
const negative600 = '#892C21';
const negative700 = '#5C1D16';

const warning50 = '#FEF3EC';
const warning100 = '#FBE2CF';
const warning200 = '#F6BA8B';
const warning300 = '#F19248';
const warning400 = '#ED6F0E';
const warning500 = '#B4540B';
const warning600 = '#8E4308';
const warning700 = '#5F2C06';

const positive50 = '#EBF8F2';
const positive100 = '#CDEDDE';
const positive200 = '#88D3B0';
const positive300 = '#43B982';
const positive400 = '#07A35A';
const positive500 = '#057C44';
const positive600 = '#046236';
const positive700 = '#034124';

const mono100 = '#FFFFFF';
const mono200 = '#F7F7F7';
const mono300 = '#F0F0F0';
const mono400 = '#E5E5E5';
const mono500 = '#CCCCCC';
const mono600 = '#B3B3B3';
const mono700 = '#999999';
const mono800 = '#666666';
const mono900 = '#333333';
const mono1000 = '#000000';

// font constants
const primaryFontFamily = '"Helvetica Neue", arial, sans-serif';

export default {
  colors: {
    // Primary Palette
    primary50,
    primary100,
    primary200,
    primary300,
    primary400,
    primary: primary400,
    primary500,
    primary600,
    primary700,

    // Negative Palette
    negative50,
    negative100,
    negative200,
    negative300,
    negative400,
    negative: negative400,
    negative500,
    negative600,
    negative700,

    // Warning Palette
    warning50,
    warning100,
    warning200,
    warning300,
    warning400,
    warning: warning400,
    warning500,
    warning600,
    warning700,

    // Positive Palette
    positive50,
    positive100,
    positive200,
    positive300,
    positive400,
    positive: positive400,
    positive500,
    positive600,
    positive700,

    // Monochrome Palette
    white: mono100,
    mono100,
    mono200,
    mono300,
    mono400,
    mono500,
    mono600,
    mono700,
    mono800,
    mono900,
    mono1000,
    black: mono1000,

    // Semantic Colors

    // Background
    background: mono100,
    backgroundAlt: mono800,
    backgroundInv: mono100,

    // Foreground
    foreground: mono1000,
    foregroundAlt: mono800,
    foregroundInv: mono100,

    // Borders
    border: mono500,
    borderAlt: mono600,
    borderFocus: primary400,
    borderError: negative400,

    // Buttons
    buttonPrimaryFill: primary400,
    buttonPrimaryText: mono100, // white
    buttonPrimaryHover: primary500,
    buttonPrimaryActive: primary600,
    buttonSecondaryFill: primary50,
    buttonSecondaryText: primary400,
    buttonSecondaryHover: primary100,
    buttonSecondaryActive: primary200,
    buttonTertiaryFill: mono200,
    buttonTertiaryText: primary400,
    buttonTertiaryHover: mono400,
    buttonTertiaryActive: mono500,
    buttonMinimalFill: 'transparent',
    buttonMinimalText: primary400,
    buttonMinimalHover: mono200,
    buttonMinimalActive: mono400,
    buttonDisabledFill: mono300,
    buttonDisabledText: mono600,

    // Links
    linkText: primary400,
    linkVisited: primary500,
    linkHover: primary600,

    // Shadow
    shadowFocus: 'rgba(39, 110, 241, 0.32)',
    shadowError: 'rgba(229, 73, 55, 0.32)',
  },
  typography: {
    font100: {
      fontFamily: primaryFontFamily,
      fontSize: '11px',
      fontWeight: 'normal',
      lineHeight: '16px',
    },
    font200: {
      fontFamily: primaryFontFamily,
      fontSize: '12px',
      fontWeight: 'normal',
      lineHeight: '20px',
    },
    font250: {
      fontFamily: primaryFontFamily,
      fontSize: '12px',
      fontWeight: 'bold',
      lineHeight: '20px',
    },
    font300: {
      fontFamily: primaryFontFamily,
      fontSize: '14px',
      fontWeight: 'normal',
      lineHeight: '24px',
    },
    font350: {
      fontFamily: primaryFontFamily,
      fontSize: '14px',
      fontWeight: 'bold',
      lineHeight: '24px',
    },
    font400: {
      fontFamily: primaryFontFamily,
      fontSize: '16px',
      fontWeight: 'normal',
      lineHeight: '28px',
    },
    font450: {
      fontFamily: primaryFontFamily,
      fontSize: '16px',
      fontWeight: 'bold',
      lineHeight: '28px',
    },
    font500: {
      fontFamily: primaryFontFamily,
      fontSize: '20px',
      fontWeight: 'bold',
      lineHeight: '28px',
      letterSpacing: '-0.02em',
    },
    font600: {
      fontFamily: primaryFontFamily,
      fontSize: '24px',
      fontWeight: 'bold',
      lineHeight: '36px',
      letterSpacing: '-0.02em',
    },
    font700: {
      fontFamily: primaryFontFamily,
      fontSize: '28px',
      fontWeight: 'bold',
      lineHeight: '40px',
      letterSpacing: '-0.02em',
    },
    font800: {
      fontFamily: primaryFontFamily,
      fontSize: '32px',
      fontWeight: 'bold',
      lineHeight: '48px',
      // TODO(#297): move the letter spacing in an Uber specific theme
      letterSpacing: '-0.02em',
    },
    font900: {
      fontFamily: primaryFontFamily,
      fontSize: '40px',
      fontWeight: 'bold',
      lineHeight: '56px',
      // TODO(#297): move the letter spacing in an Uber specific theme
      letterSpacing: '-0.02em',
    },
    font1000: {
      fontFamily: primaryFontFamily,
      fontSize: '56px',
      fontWeight: 'normal',
      lineHeight: '80px',
      // TODO(#297): move the letter spacing in an Uber specific theme
      letterSpacing: '-0.02em',
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
    backgroundColor: mono900,
  },
};
