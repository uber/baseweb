/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {ThemeT} from '../styles/types.js';
import type {PrimitivesT} from './types.js';
import deepMerge from '../utils/deep-merge.js';

const WHITE = '#FFFFFF';
const BLACK = '#000000';

export default function createTheme(
  primitives: PrimitivesT,
  overrides?: {},
): ThemeT {
  const theme = {
    breakpoints: {
      small: 320,
      medium: 600,
      large: 1136,
    },

    colors: {
      // Primary Palette
      primary: primitives.primary,
      primary50: primitives.primary50,
      primary100: primitives.primary100,
      primary200: primitives.primary200,
      primary300: primitives.primary300,
      primary400: primitives.primary400,
      primary500: primitives.primary500,
      primary600: primitives.primary600,
      primary700: primitives.primary700,

      // Accent Palette
      accent: primitives.accent,
      accent50: primitives.accent50,
      accent100: primitives.accent100,
      accent200: primitives.accent200,
      accent300: primitives.accent300,
      accent400: primitives.accent400,
      accent500: primitives.accent500,
      accent600: primitives.accent600,
      accent700: primitives.accent700,

      // Negative Palette
      negative: primitives.negative,
      negative50: primitives.negative50,
      negative100: primitives.negative100,
      negative200: primitives.negative200,
      negative300: primitives.negative300,
      negative400: primitives.negative400,
      negative500: primitives.negative500,
      negative600: primitives.negative600,
      negative700: primitives.negative700,

      // Warning Palette
      warning: primitives.warning,
      warning50: primitives.warning50,
      warning100: primitives.warning100,
      warning200: primitives.warning200,
      warning300: primitives.warning300,
      warning400: primitives.warning400,
      warning500: primitives.warning500,
      warning600: primitives.warning600,
      warning700: primitives.warning700,

      // Positive Palette
      positive: primitives.positive,
      positive50: primitives.positive50,
      positive100: primitives.positive100,
      positive200: primitives.positive200,
      positive300: primitives.positive300,
      positive400: primitives.positive400,
      positive500: primitives.positive500,
      positive600: primitives.positive600,
      positive700: primitives.positive700,

      // Monochrome Palette
      white: WHITE,
      mono100: primitives.mono100,
      mono200: primitives.mono200,
      mono300: primitives.mono300,
      mono400: primitives.mono400,
      mono500: primitives.mono500,
      mono600: primitives.mono600,
      mono700: primitives.mono700,
      mono800: primitives.mono800,
      mono900: primitives.mono900,
      mono1000: primitives.mono1000,
      black: BLACK,

      // Rating Palette,
      rating200: primitives.rating200,
      rating400: primitives.rating400,

      // Semantic Colors

      // Font Color
      colorPrimary: primitives.mono1000,
      colorSecondary: primitives.mono800,

      // Background
      background: primitives.mono100,
      backgroundAlt: primitives.mono100,
      backgroundInv: primitives.mono1000,

      // Foreground
      foreground: primitives.mono1000,
      foregroundAlt: primitives.mono800,
      foregroundInv: primitives.mono100,

      // Borders
      border: primitives.mono500,
      borderAlt: primitives.mono600,
      borderFocus: primitives.primary,
      borderError: primitives.negative,

      // Buttons
      buttonPrimaryFill: primitives.primary,
      buttonPrimaryText: WHITE,
      buttonPrimaryHover: primitives.primary700,
      buttonPrimaryActive: primitives.primary600,
      buttonPrimarySelectedFill: primitives.primary600,
      buttonPrimarySelectedText: WHITE,
      buttonPrimarySpinnerForeground: primitives.primary50,
      buttonPrimarySpinnerBackground: primitives.primary500,

      buttonSecondaryFill: primitives.primary100,
      buttonSecondaryText: primitives.primary,
      buttonSecondaryHover: primitives.primary200,
      buttonSecondaryActive: primitives.primary300,
      buttonSecondarySelectedFill: primitives.primary200,
      buttonSecondarySelectedText: primitives.primary,
      buttonSecondarySpinnerForeground: primitives.primary700,
      buttonSecondarySpinnerBackground: primitives.primary300,

      buttonTertiaryFill: 'transparent',
      buttonTertiaryText: primitives.primary,
      buttonTertiaryHover: primitives.primary50,
      buttonTertiaryActive: primitives.primary100,
      buttonTertiarySelectedFill: primitives.primary100,
      buttonTertiarySelectedText: primitives.primary,
      buttonTertiarySpinnerForeground: primitives.primary700,
      buttonTertiarySpinnerBackground: primitives.primary300,

      buttonMinimalFill: 'transparent',
      buttonMinimalText: primitives.primary,
      buttonMinimalHover: primitives.primary50,
      buttonMinimalActive: primitives.primary100,
      buttonMinimalSelectedFill: primitives.primary100,
      buttonMinimalSelectedText: primitives.primary,
      buttonMinimalSpinnerForeground: primitives.primary700,
      buttonMinimalSpinnerBackground: primitives.primary300,

      buttonDisabledFill: primitives.mono200,
      buttonDisabledText: primitives.mono600,
      buttonDisabledSpinnerForeground: primitives.mono600,
      buttonDisabledSpinnerBackground: primitives.mono400,

      // Breadcrumbs
      breadcrumbsText: primitives.mono900,
      breadcrumbsSeparatorFill: primitives.mono700,

      // Datepicker
      datepickerBackground: primitives.mono100,
      datepickerDayFont: primitives.mono1000,
      datepickerDayFontDisabled: primitives.mono500,
      datepickerDayPseudoSelected: primitives.primary100,
      datepickerDayPseudoHighlighted: primitives.primary200,

      // Calendar
      calendarBackground: primitives.mono100,
      calendarForeground: primitives.mono1000,
      calendarForegroundDisabled: primitives.mono500,
      calendarHeaderBackground: primitives.primary,
      calendarHeaderForeground: WHITE,
      calendarHeaderBackgroundActive: primitives.primary700,
      calendarHeaderForegroundDisabled: primitives.primary500,
      calendarDayBackgroundPseudoSelected: primitives.primary100,
      calendarDayForegroundPseudoSelected: primitives.mono1000,
      calendarDayBackgroundPseudoSelectedHighlighted: primitives.primary200,
      calendarDayForegroundPseudoSelectedHighlighted: primitives.mono1000,
      calendarDayBackgroundSelected: WHITE,
      calendarDayForegroundSelected: BLACK,
      calendarDayBackgroundSelectedHighlighted: BLACK,
      calendarDayForegroundSelectedHighlighted: WHITE,

      // FileUploader
      fileUploaderBackgroundColor: primitives.mono200,
      fileUploaderBackgroundColorActive: primitives.primary50,
      fileUploaderBorderColorActive: primitives.primary,
      fileUploaderBorderColorDefault: primitives.mono500,
      fileUploaderMessageColor: primitives.mono600,

      // Links
      linkText: primitives.primary,
      linkVisited: primitives.primary700,
      linkHover: primitives.primary600,
      linkActive: primitives.primary500,

      // Shadow
      shadowFocus: 'rgba(39, 110, 241, 0.32)',
      shadowError: 'rgba(229, 73, 55, 0.32)',

      // List
      listHeaderFill: WHITE,
      listBodyFill: primitives.mono200,
      listIconFill: primitives.mono500,
      listBorder: primitives.mono500,

      // ProgressSteps
      progressStepsCompletedText: WHITE,
      progressStepsCompletedFill: primitives.primary,
      progressStepsActiveText: WHITE,
      progressStepsActiveFill: primitives.primary,
      progressStepsIconActiveFill: primitives.primary,

      // Tick
      tickFill: primitives.mono100,
      tickFillHover: primitives.mono200,
      tickFillActive: primitives.mono300,

      tickFillSelected: primitives.primary,
      tickFillSelectedHover: primitives.primary700,
      tickFillSelectedHoverActive: primitives.primary600,

      tickFillError: primitives.negative50,
      tickFillErrorHover: primitives.negative100,
      tickFillErrorHoverActive: primitives.negative200,
      tickFillErrorSelected: primitives.negative400,
      tickFillErrorSelectedHover: primitives.negative500,
      tickFillErrorSelectedHoverActive: primitives.negative600,

      tickFillDisabled: primitives.mono300,

      tickBorder: primitives.mono700,
      tickBorderError: primitives.negative400,

      tickMarkFill: WHITE,
      tickMarkFillError: WHITE,
      tickMarkFillDisabled: primitives.mono600,

      // Slider/Toggle
      sliderTrackFill: primitives.mono400,
      sliderTrackFillHover: primitives.mono500,
      sliderTrackFillActive: primitives.mono600,
      sliderTrackFillSelected: primitives.primary,
      sliderTrackFillSelectedHover: primitives.primary,
      sliderTrackFillSelectedActive: primitives.primary500,
      sliderTrackFillDisabled: primitives.mono300,
      sliderHandleFill: WHITE,
      sliderHandleFillHover: WHITE,
      sliderHandleFillActive: WHITE,
      sliderHandleFillSelected: WHITE,
      sliderHandleFillSelectedHover: WHITE,
      sliderHandleFillSelectedActive: WHITE,
      sliderHandleFillDisabled: primitives.mono500,
      sliderHandleInnerFill: primitives.mono400,
      sliderHandleInnerFillDisabled: primitives.mono400,
      sliderHandleInnerFillSelectedHover: primitives.primary,
      sliderHandleInnerFillSelectedActive: primitives.primary500,

      sliderBorder: primitives.mono500,
      sliderBorderHover: primitives.primary,
      sliderBorderDisabled: primitives.mono600,

      // Inputs
      inputFill: primitives.mono300,
      inputFillError: primitives.negative50,
      inputFillDisabled: primitives.mono200,
      inputFillActive: primitives.mono200,
      inputFillPositive: primitives.positive50,
      inputTextDisabled: primitives.mono600,
      inputBorderError: primitives.negative200,
      inputBorderPositive: primitives.positive200,
      inputEnhancerFill: primitives.mono300,
      inputEnhancerFillDisabled: primitives.mono300,
      inputEnhancerTextDisabled: primitives.mono600,

      // Menu
      menuFill: primitives.mono100,
      menuFillHover: primitives.mono200,
      menuFontDefault: primitives.mono800,
      menuFontDisabled: primitives.mono500,
      menuFontHighlighted: primitives.mono1000,
      menuFontSelected: primitives.mono1000,

      // Modal
      modalCloseColor: primitives.mono700,
      modalCloseColorHover: primitives.mono800,
      modalCloseColorFocus: primitives.mono800,

      // Pagination
      paginationTriangleDown: primitives.mono800,

      // Header navigation
      headerNavigationFill: 'transparent',

      // Tab
      tabBarFill: primitives.mono200,
      tabColor: primitives.mono800,

      // Notification
      notificationPrimaryBackground: primitives.primary50,
      notificationPrimaryText: primitives.primary500,
      notificationInfoBackground: primitives.accent50,
      notificationInfoText: primitives.accent500,
      notificationPositiveBackground: primitives.positive50,
      notificationPositiveText: primitives.positive500,
      notificationWarningBackground: primitives.warning50,
      notificationWarningText: primitives.warning500,
      notificationNegativeBackground: primitives.negative50,
      notificationNegativeText: primitives.negative500,

      // Tag
      tagSolidRampUnit: '400',
      tagSolidHoverRampUnit: '50',
      tagSolidActiveRampUnit: '100',
      tagSolidDisabledRampUnit: '50',
      tagSolidFontRampUnit: '50',
      tagSolidFontHoverRampUnit: '500',
      tagLightRampUnit: '50',
      tagLightHoverRampUnit: '100',
      tagLightActiveRampUnit: '100',
      tagLightDisabledRampUnit: '50',
      tagLightFontRampUnit: '500',
      tagLightFontHoverRampUnit: '500',
      tagOutlinedRampUnit: '400',
      tagOutlinedHoverRampUnit: '500',
      tagOutlinedActiveRampUnit: '600',
      tagOutlinedDisabledRampUnit: '50',
      tagOutlinedFontRampUnit: '500',
      tagOutlinedFontHoverRampUnit: '50',
      tagFontDisabledRampUnit: '200',

      tagNeutralSolidBackground: primitives.mono900,
      tagNeutralSolidHover: primitives.mono300,
      tagNeutralSolidActive: primitives.mono400,
      tagNeutralSolidDisabled: primitives.mono200,
      tagNeutralSolidFont: primitives.mono100,
      tagNeutralSolidFontHover: primitives.mono900,
      tagNeutralLightBackground: primitives.mono300,
      tagNeutralLightHover: primitives.mono300,
      tagNeutralLightActive: primitives.mono400,
      tagNeutralLightDisabled: primitives.mono200,
      tagNeutralLightFont: primitives.mono900,
      tagNeutralLightFontHover: primitives.mono900,
      tagNeutralOutlinedBackground: primitives.mono900,
      tagNeutralOutlinedHover: primitives.mono800,
      tagNeutralOutlinedActive: primitives.mono900,
      tagNeutralOutlinedDisabled: primitives.mono200,
      tagNeutralOutlinedFont: primitives.mono900,
      tagNeutralOutlinedFontHover: primitives.mono200,
      tagNeutralFontDisabled: primitives.mono500,

      tagPrimarySolidBackground: primitives.primary,
      tagPrimarySolidHover: primitives.primary100,
      tagPrimarySolidActive: primitives.primary200,
      tagPrimarySolidDisabled: primitives.primary50,
      tagPrimarySolidFont: primitives.primary50,
      tagPrimarySolidFontHover: primitives.primary700,
      tagPrimaryLightBackground: primitives.primary50,
      tagPrimaryLightHover: primitives.primary100,
      tagPrimaryLightActive: primitives.primary100,
      tagPrimaryLightDisabled: primitives.primary50,
      tagPrimaryLightFont: primitives.primary500,
      tagPrimaryLightFontHover: primitives.primary500,
      tagPrimaryOutlinedBackground: primitives.primary,
      tagPrimaryOutlinedHover: primitives.primary700,
      tagPrimaryOutlinedActive: primitives.primary600,
      tagPrimaryOutlinedDisabled: primitives.primary50,
      tagPrimaryOutlinedFont: primitives.primary,
      tagPrimaryOutlinedFontHover: primitives.primary50,
      tagPrimaryFontDisabled: primitives.primary400,

      tagAccentSolidBackground: primitives.accent400,
      tagAccentSolidHover: primitives.accent50,
      tagAccentSolidActive: primitives.accent100,
      tagAccentSolidDisabled: primitives.accent50,
      tagAccentSolidFont: primitives.accent50,
      tagAccentSolidFontHover: primitives.accent500,
      tagAccentLightBackground: primitives.accent50,
      tagAccentLightHover: primitives.accent100,
      tagAccentLightActive: primitives.accent100,
      tagAccentLightDisabled: primitives.accent50,
      tagAccentLightFont: primitives.accent500,
      tagAccentLightFontHover: primitives.accent500,
      tagAccentOutlinedBackground: primitives.accent400,
      tagAccentOutlinedHover: primitives.accent500,
      tagAccentOutlinedActive: primitives.accent600,
      tagAccentOutlinedDisabled: primitives.accent50,
      tagAccentOutlinedFont: primitives.accent500,
      tagAccentOutlinedFontHover: primitives.accent50,
      tagAccentFontDisabled: primitives.accent200,

      tagPositiveSolidBackground: primitives.positive400,
      tagPositiveSolidHover: primitives.positive50,
      tagPositiveSolidActive: primitives.positive100,
      tagPositiveSolidDisabled: primitives.positive50,
      tagPositiveSolidFont: primitives.positive50,
      tagPositiveSolidFontHover: primitives.positive500,
      tagPositiveLightBackground: primitives.positive50,
      tagPositiveLightHover: primitives.positive100,
      tagPositiveLightActive: primitives.positive100,
      tagPositiveLightDisabled: primitives.positive50,
      tagPositiveLightFont: primitives.positive500,
      tagPositiveLightFontHover: primitives.positive500,
      tagPositiveOutlinedBackground: primitives.positive400,
      tagPositiveOutlinedHover: primitives.positive500,
      tagPositiveOutlinedActive: primitives.positive600,
      tagPositiveOutlinedDisabled: primitives.positive50,
      tagPositiveOutlinedFont: primitives.positive500,
      tagPositiveOutlinedFontHover: primitives.positive50,
      tagPositiveFontDisabled: primitives.positive200,

      tagWarningSolidBackground: primitives.warning400,
      tagWarningSolidHover: primitives.warning50,
      tagWarningSolidActive: primitives.warning100,
      tagWarningSolidDisabled: primitives.warning50,
      tagWarningSolidFont: primitives.warning50,
      tagWarningSolidFontHover: primitives.warning500,
      tagWarningLightBackground: primitives.warning50,
      tagWarningLightHover: primitives.warning100,
      tagWarningLightActive: primitives.warning100,
      tagWarningLightDisabled: primitives.warning50,
      tagWarningLightFont: primitives.warning500,
      tagWarningLightFontHover: primitives.warning500,
      tagWarningOutlinedBackground: primitives.warning400,
      tagWarningOutlinedHover: primitives.warning500,
      tagWarningOutlinedActive: primitives.warning600,
      tagWarningOutlinedDisabled: primitives.warning50,
      tagWarningOutlinedFont: primitives.warning500,
      tagWarningOutlinedFontHover: primitives.warning50,
      tagWarningFontDisabled: primitives.warning200,

      tagNegativeSolidBackground: primitives.negative400,
      tagNegativeSolidHover: primitives.negative50,
      tagNegativeSolidActive: primitives.negative100,
      tagNegativeSolidDisabled: primitives.negative50,
      tagNegativeSolidFont: primitives.negative50,
      tagNegativeSolidFontHover: primitives.negative500,
      tagNegativeLightBackground: primitives.negative50,
      tagNegativeLightHover: primitives.negative100,
      tagNegativeLightActive: primitives.negative100,
      tagNegativeLightDisabled: primitives.negative50,
      tagNegativeLightFont: primitives.negative500,
      tagNegativeLightFontHover: primitives.negative500,
      tagNegativeOutlinedBackground: primitives.negative400,
      tagNegativeOutlinedHover: primitives.negative500,
      tagNegativeOutlinedActive: primitives.negative600,
      tagNegativeOutlinedDisabled: primitives.negative50,
      tagNegativeOutlinedFont: primitives.negative500,
      tagNegativeOutlinedFontHover: primitives.negative50,
      tagNegativeFontDisabled: primitives.negative200,

      // Table
      tableHeadBackgroundColor: primitives.mono100,
      tableBackground: primitives.mono100,
      tableStripedBackground: primitives.mono200,
      tableFilter: primitives.mono600,
      tableFilterHeading: primitives.mono700,
      tableFilterBackground: primitives.mono100,
      tableFilterFooterBackground: primitives.mono200,

      // Toast
      toastText: WHITE,
      toastPrimaryBackground: primitives.primary500,
      toastInfoBackground: primitives.accent500,
      toastPositiveBackground: primitives.positive500,
      toastWarningBackground: primitives.warning500,
      toastNegativeBackground: primitives.negative500,

      // Spinner
      spinnerTrackFill: primitives.mono900,

      // Progress bar
      progressbarTrackFill: primitives.mono900,

      // Tooltip
      tooltipBackground: primitives.mono900,
      tooltipText: primitives.mono100,
    },
    typography: {
      font100: {
        fontFamily: primitives.primaryFontFamily,
        fontSize: '12px',
        fontWeight: 'normal',
        lineHeight: '20px',
      },
      font150: {
        fontFamily: primitives.primaryFontFamily,
        fontSize: '12px',
        fontWeight: '500',
        lineHeight: '20px',
      },
      font200: {
        fontFamily: primitives.primaryFontFamily,
        fontSize: '14px',
        fontWeight: 'normal',
        lineHeight: '20px',
      },
      font250: {
        fontFamily: primitives.primaryFontFamily,
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '20px',
      },
      font300: {
        fontFamily: primitives.primaryFontFamily,
        fontSize: '16px',
        fontWeight: 'normal',
        lineHeight: '24px',
      },
      font350: {
        fontFamily: primitives.primaryFontFamily,
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: '24px',
      },
      font400: {
        fontFamily: primitives.primaryFontFamily,
        fontSize: '18px',
        fontWeight: 'normal',
        lineHeight: '28px',
      },
      font450: {
        fontFamily: primitives.primaryFontFamily,
        fontSize: '18px',
        fontWeight: 500,
        lineHeight: '28px',
      },
      font550: {
        fontFamily: primitives.primaryFontFamily,
        fontSize: '20px',
        fontWeight: 500,
        lineHeight: '28px',
      },
      font650: {
        fontFamily: primitives.primaryFontFamily,
        fontSize: '24px',
        fontWeight: 500,
        lineHeight: '32px',
      },
      font750: {
        fontFamily: primitives.primaryFontFamily,
        fontSize: '28px',
        fontWeight: 500,
        lineHeight: '36px',
      },
      font850: {
        fontFamily: primitives.primaryFontFamily,
        fontSize: '32px',
        fontWeight: 500,
        lineHeight: '40px',
      },
      font950: {
        fontFamily: primitives.primaryFontFamily,
        fontSize: '36px',
        fontWeight: 500,
        lineHeight: '44px',
      },
      font1050: {
        fontFamily: primitives.primaryFontFamily,
        fontSize: '40px',
        fontWeight: 500,
        lineHeight: '52px',
      },
      font1150: {
        fontFamily: primitives.primaryFontFamily,
        fontSize: '36px',
        fontWeight: 500,
        lineHeight: '44px',
      },
      font1250: {
        fontFamily: primitives.primaryFontFamily,
        fontSize: '44px',
        fontWeight: 500,
        lineHeight: '52px',
      },
      font1350: {
        fontFamily: primitives.primaryFontFamily,
        fontSize: '52px',
        fontWeight: 500,
        lineHeight: '64px',
      },
      font1450: {
        fontFamily: primitives.primaryFontFamily,
        fontSize: '96px',
        fontWeight: 500,
        lineHeight: '112px',
      },
    },
    sizing: {
      scale0: '2px',
      scale100: '4px',
      scale200: '6px',
      scale300: '8px',
      scale400: '10px',
      scale500: '12px',
      scale550: '14px',
      scale600: '16px',
      scale650: '18px',
      scale700: '20px',
      scale750: '22px',
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
      radius400: '12px',
      /** Checkbox, Datepicker (Range), Progress Bar, Slider, Tag */
      useRoundedCorners: true,
      /** Button, ButtonGroup */
      buttonBorderRadius: '0px',
      /** Input, Select, Textarea */
      inputBorderRadius: '0px',
      /** Popover, Menu, Tooltip */
      popoverBorderRadius: '0px',
      /** Card, Datepicker, Modal, Toast, Notification */
      surfaceBorderRadius: '0px',
    },
    animation: {
      timing100: '0.25s',
      timing400: '0.4s',
      timing700: '0.6s',
      easeOutCurve: 'cubic-bezier(.2, .8, .4, 1)',
      easeInCurve: 'cubic-bezier(.8, .2, .6, 1)',
      easeInOutCurve: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    direction: 'auto',
    zIndex: {
      modal: 2000,
    },
  };

  // to remove the FlowFixMe, we have to make deepMerge accept a ThemeT
  // $FlowFixMe
  return deepMerge(theme, overrides);
}
