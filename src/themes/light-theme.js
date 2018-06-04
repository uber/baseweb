// color constants
const primary100 = 'hsl(215, 77%, 95%)';
const primary200 = 'hsl(215, 77%, 90%)';
const primary300 = 'hsl(215, 75%, 75%)';
const primary400 = 'hsl(215, 78%, 49%)';
const primary500 = 'hsl(215, 79%, 25%)';
const alert400 = 'hsl(6, 77%, 56%)';
const warning400 = 'hsl(26, 89%, 49%)';
const success400 = 'hsl(152, 92%, 33%)';
const mono100 = 'hsl(0, 0%, 100%)';
const mono200 = 'hsl(0, 0%, 97%)';
const mono300 = 'hsl(0, 0%, 94%)';
const mono400 = 'hsl(0, 0%, 90%)';
const mono500 = 'hsl(0, 0%, 80%)';
const mono600 = 'hsl(0, 0%, 70%)';
const mono700 = 'hsl(0, 0%, 60%)';
const mono800 = 'hsl(0, 0%, 40%)';
const mono900 = 'hsl(0, 0%, 20%)';
const mono1000 = 'hsl(0, 0%, 0%)';

// font constants
const primaryFontFamily = '"Helvetica Neue", arial, sans-serif';

export default {
  colors: {
    // Primary Palette
    primary100,
    primary200,
    primary300,
    primary400,
    primary: primary400,
    primary500,

    // Alert Palette
    alert100: 'hsl(6, 83%, 95%)',
    alert200: 'hsl(6, 83%, 91%)',
    alert300: 'hsl(6, 83%, 77%)',
    alert400,
    alert: alert400,
    alert500: 'hsl(6, 72%, 27%)',

    // Warning Palette
    warning100: 'hsl(26, 85%, 95%)',
    warning200: 'hsl(26, 85%, 90%)',
    warning300: 'hsl(26, 86%, 75%)',
    warning400,
    warning: warning400,
    warning500: 'hsl(26, 89%, 25%)',

    // Success Palette
    success100: 'hsl(152, 49%, 93%)',
    success200: 'hsl(152, 48%, 86%)',
    success300: 'hsl(152, 47%, 66%)',
    success400,
    success: success400,
    success500: 'hsl(152, 100%, 16%)',

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
    borderError: alert400,

    // Buttons
    buttonPrimaryFill: primary400,
    buttonPrimaryText: mono100,
    buttonPrimaryHover: primary500,
    buttonPrimaryActive: primary500,
    buttonSecondaryFill: primary100,
    buttonSecondaryText: primary400,
    buttonTertiaryFill: mono200,
    buttonTertiaryText: primary400,
    buttonMinimalFill: mono100,
    buttonMinimalText: primary400,
    buttonDisabledFill: mono300,
    buttonDisabledText: mono600,

    // Links
    linkText: primary400,
    linkVisited: primary500,
    linkHover: primary500,

    // Shadow
    shadowFocus: mono600,
    shadowError: mono600,
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
      lineHeight: '16px',
    },
    font300: {
      fontFamily: primaryFontFamily,
      fontSize: '12px',
      fontWeight: 'normal',
      lineHeight: '20px',
    },
    font400: {
      fontFamily: primaryFontFamily,
      fontSize: '14px',
      fontWeight: 'normal',
      lineHeight: '24px',
    },
    font500: {
      fontFamily: primaryFontFamily,
      fontSize: '16px',
      fontWeight: 'bold',
      lineHeight: '24px',
    },
    font600: {
      fontFamily: primaryFontFamily,
      fontSize: '20px',
      fontWeight: 'bold',
      lineHeight: '28px',
    },
    font700: {
      fontFamily: primaryFontFamily,
      fontSize: '28px',
      fontWeight: 'bold',
      lineHeight: '40px',
    },
    font800: {
      fontFamily: primaryFontFamily,
      fontSize: '32px',
      fontWeight: 'bold',
      lineHeight: '48px',
    },
    font900: {
      fontFamily: primaryFontFamily,
      fontSize: '40px',
      fontWeight: 'bold',
      lineHeight: '56px',
    },
    font1000: {
      fontFamily: primaryFontFamily,
      fontSize: '56px',
      fontWeight: 'normal',
      lineHeight: '80px',
    },
  },
  sizing: {
    scale0: '2px',
    scale100: '4px',
    scale200: '8px',
    scale300: '12px',
    scale400: '16px',
    scale500: '20px',
    scale600: '24px',
    scale800: '32px',
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
  animation: {
    timing100: '0.25s',
    timing400: '0.4s',
    timing700: '0.6s',
    easeOutCurve: 'cubic-bezier(.2, .8, .4, 1)',
    easeInCurve: 'cubic-bezier(.8, .2, .6, 1)',
    easeInOutCurve: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};
