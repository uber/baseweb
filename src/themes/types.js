/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {ResponsiveT} from '../layout-grid/types.js';
export type ColorTokensT = {
  // Primary Palette
  primaryA: string,
  primaryB: string,
  primary: string,
  primary50: string,
  primary100: string,
  primary200: string,
  primary300: string,
  primary400: string,
  primary500: string,
  primary600: string,
  primary700: string,

  // Accent Palette
  accent: string,
  accent50: string,
  accent100: string,
  accent200: string,
  accent300: string,
  accent400: string,
  accent500: string,
  accent600: string,
  accent700: string,

  // Alert Palette
  negative: string,
  negative50: string,
  negative100: string,
  negative200: string,
  negative300: string,
  negative400: string,
  negative500: string,
  negative600: string,
  negative700: string,

  // Warning Palette
  warning: string,
  warning50: string,
  warning100: string,
  warning200: string,
  warning300: string,
  warning400: string,
  warning500: string,
  warning600: string,
  warning700: string,

  // Success Palette
  positive: string,
  positive50: string,
  positive100: string,
  positive200: string,
  positive300: string,
  positive400: string,
  positive500: string,
  positive600: string,
  positive700: string,

  // Monochrome Palette
  white: string,
  black: string,
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

  // Rating Palette
  rating200: string,
  rating400: string,
};

export type CoreSemanticColorTokensT = {
  // Background
  backgroundPrimary: string,
  backgroundSecondary: string,
  backgroundTertiary: string,
  backgroundInversePrimary: string,
  backgroundInverseSecondary: string,

  // Content
  contentPrimary: string,
  contentSecondary: string,
  contentTertiary: string,
  contentInversePrimary: string,
  contentInverseSecondary: string,
  contentInverseTertiary: string,

  // Border
  borderOpaque: string,
  borderTransparent: ?string,
  borderSelected: string,
  borderInverseOpaque: string,
  borderInverseTransparent: ?string,
  borderInverseSelected: string,
};
export type CoreExtensionSemanticColorTokensT = {
  // Backgrounds
  backgroundStateDisabled: string,
  backgroundOverlayDark: ?string,
  backgroundOverlayLight: ?string,
  backgroundAccent: string,
  backgroundNegative: string,
  backgroundWarning: string,
  backgroundPositive: string,
  backgroundLightAccent: string,
  backgroundLightPositive: string,
  backgroundLightNegative: string,
  backgroundLightWarning: string,
  backgroundAlwaysDark: string,

  // Content
  contentStateDisabled: string,
  contentAccent: string,
  contentOnColor: string,
  contentNegative: string,
  contentWarning: string,
  contentPositive: string,

  // Border
  borderStateDisabled: string,
  borderAccent: string,
  borderNegative: string,
  borderWarning: string,
  borderPositive: string,
};
export type SemanticColorTokensT = CoreSemanticColorTokensT &
  CoreExtensionSemanticColorTokensT;

export type ComponentColorTokensT = {
  // Buttons
  buttonPrimaryFill: string,
  buttonPrimaryText: string,
  buttonPrimaryHover: string,
  buttonPrimaryActive: string,
  buttonPrimarySelectedText: string,
  buttonPrimarySelectedFill: string,
  buttonPrimarySpinnerForeground: string,
  buttonPrimarySpinnerBackground: string,
  buttonSecondaryFill: string,
  buttonSecondaryText: string,
  buttonSecondaryHover: string,
  buttonSecondaryActive: string,
  buttonSecondarySelectedText: string,
  buttonSecondarySelectedFill: string,
  buttonSecondarySpinnerForeground: string,
  buttonSecondarySpinnerBackground: string,
  buttonTertiaryFill: string,
  buttonTertiaryText: string,
  buttonTertiaryHover: string,
  buttonTertiaryActive: string,
  buttonTertiarySelectedText: string,
  buttonTertiarySelectedFill: string,
  buttonTertiarySpinnerForeground: string,
  buttonTertiarySpinnerBackground: string,
  buttonMinimalFill: string,
  buttonMinimalText: string,
  buttonMinimalHover: string,
  buttonMinimalActive: string,
  buttonMinimalSelectedText: string,
  buttonMinimalSelectedFill: string,
  buttonMinimalSpinnerForeground: string,
  buttonMinimalSpinnerBackground: string,
  buttonDisabledFill: string,
  buttonDisabledText: string,
  buttonDisabledSpinnerForeground: string,
  buttonDisabledSpinnerBackground: string,

  // Breadcrumbs
  breadcrumbsText: string,
  breadcrumbsSeparatorFill: string,

  // Datepicker
  datepickerBackground: string,
  datepickerDayFont: string,
  datepickerDayFontDisabled: string,
  datepickerDayPseudoSelected: string,
  datepickerDayPseudoHighlighted: string,

  calendarBackground: string,
  calendarForeground: string,
  calendarForegroundDisabled: string,
  calendarHeaderBackground: string,
  calendarHeaderForeground: string,
  calendarHeaderBackgroundActive: string,
  calendarHeaderForegroundDisabled: string,
  calendarDayBackgroundPseudoSelected: string,
  calendarDayForegroundPseudoSelected: string,
  calendarDayBackgroundPseudoSelectedHighlighted: string,
  calendarDayForegroundPseudoSelectedHighlighted: string,
  calendarDayBackgroundSelected: string,
  calendarDayForegroundSelected: string,
  calendarDayBackgroundSelectedHighlighted: string,
  calendarDayForegroundSelectedHighlighted: string,

  // FileUploader
  fileUploaderBackgroundColor: string,
  fileUploaderBackgroundColorActive: string,
  fileUploaderBorderColorActive: string,
  fileUploaderBorderColorDefault: string,
  fileUploaderMessageColor: string,

  // Links
  linkText: string,
  linkVisited: string,
  linkHover: string,
  linkActive: string,

  // Lists
  listHeaderFill: string,
  listBodyFill: string,
  listIconFill: string,
  listBorder: string,

  // ProgressSteps
  progressStepsCompletedText: string,
  progressStepsCompletedFill: string,
  progressStepsActiveText: string,
  progressStepsActiveFill: string,
  progressStepsIconActiveFill: string,

  // Toggle
  toggleFill: string,
  toggleFillChecked: string,
  toggleFillDisabled: string,
  toggleTrackFill: string,
  toggleTrackFillDisabled: string,

  // Ticks
  tickFill: string,
  tickFillHover: string,
  tickFillActive: string,
  tickFillSelected: string,
  tickFillSelectedHover: string,
  tickFillSelectedHoverActive: string,
  tickFillError: string,
  tickFillErrorHover: string,
  tickFillErrorHoverActive: string,
  tickFillErrorSelected: string,
  tickFillErrorSelectedHover: string,
  tickFillErrorSelectedHoverActive: string,
  tickFillDisabled: string,
  tickBorder: string,
  tickBorderError: string,
  tickMarkFill: string,
  tickMarkFillDisabled: string,
  tickMarkFillError: string,

  // Slider/Toggle
  sliderTrackFill: string,
  sliderTrackFillHover: string,
  sliderTrackFillActive: string,
  sliderTrackFillSelected: string,
  sliderTrackFillSelectedHover: string,
  sliderTrackFillSelectedActive: string,
  sliderTrackFillDisabled: string,
  sliderHandleFill: string,
  sliderHandleFillHover: string,
  sliderHandleFillActive: string,
  sliderHandleFillSelected: string,
  sliderHandleFillSelectedHover: string,
  sliderHandleFillSelectedActive: string,
  sliderHandleFillDisabled: string,
  sliderHandleInnerFill: string,
  sliderHandleInnerFillDisabled: string,
  sliderHandleInnerFillSelectedHover: string,
  sliderHandleInnerFillSelectedActive: string,
  sliderBorder: string,
  sliderBorderHover: string,
  sliderBorderDisabled: string,

  // Input
  inputFill: string,
  inputFillError: string,
  inputFillDisabled: string,
  inputFillActive: string,
  inputFillPositive: string,
  inputTextDisabled: string,
  inputBorderError: string,
  inputBorderPositive: string,
  inputEnhancerFill: string,
  inputEnhancerFillDisabled: string,
  inputEnhancerTextDisabled: string,

  // Notification
  notificationPrimaryBackground: string,
  notificationPrimaryText: string,
  notificationInfoBackground: string,
  notificationInfoText: string,
  notificationPositiveBackground: string,
  notificationPositiveText: string,
  notificationWarningBackground: string,
  notificationWarningText: string,
  notificationNegativeBackground: string,
  notificationNegativeText: string,

  // Menu
  menuFill: string,
  menuFillHover: string,
  menuFontDefault: string,
  menuFontDisabled: string,
  menuFontHighlighted: string,
  menuFontSelected: string,

  // Modal
  modalCloseColor: string,
  modalCloseColorHover: string,
  modalCloseColorFocus: string,

  // Pagination
  paginationTriangleDown: string,

  // Header navigation
  headerNavigationFill: string,

  // Tab
  tabBarFill: string,
  tabColor: string,

  // Tag
  tagSolidRampUnit: string,
  tagSolidHoverRampUnit: string,
  tagSolidActiveRampUnit: string,
  tagSolidDisabledRampUnit: string,
  tagSolidFontRampUnit: string,
  tagSolidFontHoverRampUnit: string,
  tagLightRampUnit: string,
  tagLightHoverRampUnit: string,
  tagLightActiveRampUnit: string,
  tagLightDisabledRampUnit: string,
  tagLightFontRampUnit: string,
  tagLightFontHoverRampUnit: string,
  tagOutlinedRampUnit: string,
  tagOutlinedHoverRampUnit: string,
  tagOutlinedActiveRampUnit: string,
  tagOutlinedDisabledRampUnit: string,
  tagOutlinedFontRampUnit: string,
  tagOutlinedFontHoverRampUnit: string,
  tagFontDisabledRampUnit: string,

  tagNeutralSolidBackground: string,
  tagNeutralSolidHover: string,
  tagNeutralSolidActive: string,
  tagNeutralSolidDisabled: string,
  tagNeutralSolidFont: string,
  tagNeutralSolidFontHover: string,
  tagNeutralLightBackground: string,
  tagNeutralLightHover: string,
  tagNeutralLightActive: string,
  tagNeutralLightDisabled: string,
  tagNeutralLightFont: string,
  tagNeutralLightFontHover: string,
  tagNeutralOutlinedBackground: string,
  tagNeutralOutlinedHover: string,
  tagNeutralOutlinedActive: string,
  tagNeutralOutlinedDisabled: string,
  tagNeutralOutlinedFont: string,
  tagNeutralOutlinedFontHover: string,
  tagNeutralFontDisabled: string,

  tagPrimarySolidBackground: string,
  tagPrimarySolidHover: string,
  tagPrimarySolidActive: string,
  tagPrimarySolidDisabled: string,
  tagPrimarySolidFont: string,
  tagPrimarySolidFontHover: string,
  tagPrimaryLightBackground: string,
  tagPrimaryLightHover: string,
  tagPrimaryLightActive: string,
  tagPrimaryLightDisabled: string,
  tagPrimaryLightFont: string,
  tagPrimaryLightFontHover: string,
  tagPrimaryOutlinedBackground: string,
  tagPrimaryOutlinedHover: string,
  tagPrimaryOutlinedActive: string,
  tagPrimaryOutlinedDisabled: string,
  tagPrimaryOutlinedFont: string,
  tagPrimaryOutlinedFontHover: string,
  tagPrimaryFontDisabled: string,

  tagAccentSolidBackground: string,
  tagAccentSolidHover: string,
  tagAccentSolidActive: string,
  tagAccentSolidDisabled: string,
  tagAccentSolidFont: string,
  tagAccentSolidFontHover: string,
  tagAccentLightBackground: string,
  tagAccentLightHover: string,
  tagAccentLightActive: string,
  tagAccentLightDisabled: string,
  tagAccentLightFont: string,
  tagAccentLightFontHover: string,
  tagAccentOutlinedBackground: string,
  tagAccentOutlinedHover: string,
  tagAccentOutlinedActive: string,
  tagAccentOutlinedDisabled: string,
  tagAccentOutlinedFont: string,
  tagAccentOutlinedFontHover: string,
  tagAccentFontDisabled: string,

  tagPositiveSolidBackground: string,
  tagPositiveSolidHover: string,
  tagPositiveSolidActive: string,
  tagPositiveSolidDisabled: string,
  tagPositiveSolidFont: string,
  tagPositiveSolidFontHover: string,
  tagPositiveLightBackground: string,
  tagPositiveLightHover: string,
  tagPositiveLightActive: string,
  tagPositiveLightDisabled: string,
  tagPositiveLightFont: string,
  tagPositiveLightFontHover: string,
  tagPositiveOutlinedBackground: string,
  tagPositiveOutlinedHover: string,
  tagPositiveOutlinedActive: string,
  tagPositiveOutlinedDisabled: string,
  tagPositiveOutlinedFont: string,
  tagPositiveOutlinedFontHover: string,
  tagPositiveFontDisabled: string,

  tagWarningSolidBackground: string,
  tagWarningSolidHover: string,
  tagWarningSolidActive: string,
  tagWarningSolidDisabled: string,
  tagWarningSolidFont: string,
  tagWarningSolidFontHover: string,
  tagWarningLightBackground: string,
  tagWarningLightHover: string,
  tagWarningLightActive: string,
  tagWarningLightDisabled: string,
  tagWarningLightFont: string,
  tagWarningLightFontHover: string,
  tagWarningOutlinedBackground: string,
  tagWarningOutlinedHover: string,
  tagWarningOutlinedActive: string,
  tagWarningOutlinedDisabled: string,
  tagWarningOutlinedFont: string,
  tagWarningOutlinedFontHover: string,
  tagWarningFontDisabled: string,

  tagNegativeSolidBackground: string,
  tagNegativeSolidHover: string,
  tagNegativeSolidActive: string,
  tagNegativeSolidDisabled: string,
  tagNegativeSolidFont: string,
  tagNegativeSolidFontHover: string,
  tagNegativeLightBackground: string,
  tagNegativeLightHover: string,
  tagNegativeLightActive: string,
  tagNegativeLightDisabled: string,
  tagNegativeLightFont: string,
  tagNegativeLightFontHover: string,
  tagNegativeOutlinedBackground: string,
  tagNegativeOutlinedHover: string,
  tagNegativeOutlinedActive: string,
  tagNegativeOutlinedDisabled: string,
  tagNegativeOutlinedFont: string,
  tagNegativeOutlinedFontHover: string,
  tagNegativeFontDisabled: string,

  // Table
  tableHeadBackgroundColor: string,
  tableBackground: string,
  tableStripedBackground: string,
  tableFilter: string,
  tableFilterHeading: string,
  tableFilterBackground: string,
  tableFilterFooterBackground: string,

  // Toast
  toastText: string,
  toastPrimaryBackground: string,
  toastInfoBackground: string,
  toastPositiveBackground: string,
  toastWarningBackground: string,
  toastNegativeBackground: string,

  // Spinner
  spinnerTrackFill: string,

  // Progress bar
  progressbarTrackFill: string,

  // Tooltip
  tooltipBackground: string,
  tooltipText: string,
};

export type DeprecatedSemanticColorTokensT = {
  // Font Color
  colorPrimary: string,
  colorSecondary: string,

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

  // Shadow
  shadowFocus: string,
  shadowError: string,
};

export type FontTokensT = {
  primaryFontFamily: string,
};

// TODO(#2318) Deprecate in the next major version
export type PrimitivesT = ColorTokensT & FontTokensT;

export type FontT = {
  fontFamily: string,
  // eslint-disable-next-line flowtype/space-after-type-colon
  fontWeight:
    | '-moz-initial'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'unset'
    | 'bold'
    | 'normal'
    | 'bolder'
    | 'lighter'
    | number,
  fontSize: string,
  lineHeight: string | number,
};
export type TypographyT = {
  font100: FontT,
  font150: FontT,
  font200: FontT,
  font250: FontT,
  font300: FontT,
  font350: FontT,
  font400: FontT,
  font450: FontT,
  font550: FontT,
  font650: FontT,
  font750: FontT,
  font850: FontT,
  font950: FontT,
  font1050: FontT,
  font1150: FontT,
  font1250: FontT,
  font1350: FontT,
  font1450: FontT,
  ParagraphXSmall: FontT,
  ParagraphSmall: FontT,
  ParagraphMedium: FontT,
  ParagraphLarge: FontT,
  LabelXSmall: FontT,
  LabelSmall: FontT,
  LabelMedium: FontT,
  LabelLarge: FontT,
  HeadingXSmall: FontT,
  HeadingSmall: FontT,
  HeadingMedium: FontT,
  HeadingLarge: FontT,
  HeadingXLarge: FontT,
  HeadingXXLarge: FontT,
  DisplayXSmall: FontT,
  DisplaySmall: FontT,
  DisplayMedium: FontT,
  DisplayLarge: FontT,
};

export type SizingT = {
  scale0: string,
  scale100: string,
  scale200: string,
  scale300: string,
  scale400: string,
  scale500: string,
  scale550: string,
  scale600: string,
  scale650: string,
  scale700: string,
  scale750: string,
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

export type BreakpointsT = {
  small: number,
  medium: number,
  large: number,
};

export type MediaQueryT = {
  small: string,
  medium: string,
  large: string,
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
  timing1000: string,
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
  radius100: string,
  radius200: string,
  radius300: string,
  radius400: string,
  useRoundedCorners: boolean,
  buttonBorderRadius: string,
  surfaceBorderRadius: string,
  inputBorderRadius: string,
  popoverBorderRadius: string,
};

export type GridT = {
  columns: ResponsiveT<number>,
  gutters: ResponsiveT<number>,
  margins: ResponsiveT<number>,
  gaps: ResponsiveT<number>,
  maxWidth: number,
};

// TODO(#2318) Deprecate in the next major
export type ZIndexT = {
  modal: number,
};
