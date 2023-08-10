/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import defaultFoundationColorTokens from './color-tokens';
import type { FoundationColorTokens, ComponentColorTokens } from '../types';

const tagHoverBackground = `rgba(255, 255, 255, 0.2)`;

/* ---- Component colors ---- */
// TODO(#2318) Make it a plain object in the next v11 major version
// with values taken from `defaultFoundationColorTokens`.
// Due to the legacy `createTheme` type the values
// need to be overrideable through primitives
export default (
  themePrimitives: FoundationColorTokens = defaultFoundationColorTokens
): ComponentColorTokens => ({
  bannerActionLowInfo: themePrimitives.accent600,
  bannerActionLowNegative: themePrimitives.negative600,
  bannerActionLowPositive: themePrimitives.positive600,
  bannerActionLowWarning: themePrimitives.warning600,
  bannerActionHighInfo: themePrimitives.accent500,
  bannerActionHighNegative: themePrimitives.negative600,
  bannerActionHighPositive: themePrimitives.positive600,
  bannerActionHighWarning: themePrimitives.warning600,

  // Buttons
  buttonPrimaryFill: themePrimitives.primaryA,
  buttonPrimaryText: themePrimitives.black,
  buttonPrimaryHover: themePrimitives.primary100,
  buttonPrimaryActive: themePrimitives.primary200,
  buttonPrimarySelectedText: themePrimitives.black,
  buttonPrimarySelectedFill: themePrimitives.primary200,
  buttonPrimarySpinnerForeground: themePrimitives.primary700,
  buttonPrimarySpinnerBackground: themePrimitives.primary300,
  buttonSecondaryFill: themePrimitives.primary700,
  buttonSecondaryText: themePrimitives.primary,
  buttonSecondaryHover: themePrimitives.primary600,
  buttonSecondaryActive: themePrimitives.primary500,
  buttonSecondarySelectedText: themePrimitives.primary,
  buttonSecondarySelectedFill: themePrimitives.primary500,
  buttonSecondarySpinnerForeground: themePrimitives.white,
  buttonSecondarySpinnerBackground: themePrimitives.primary400,
  buttonTertiaryFill: 'transparent',
  buttonTertiaryText: themePrimitives.primary,
  buttonTertiaryHover: themePrimitives.primary700,
  buttonTertiaryActive: themePrimitives.primary600,
  buttonTertiarySelectedText: themePrimitives.primary,
  buttonTertiarySelectedFill: themePrimitives.primary600,
  buttonTertiaryDisabledActiveFill: themePrimitives.primary700,
  buttonTertiaryDisabledActiveText: themePrimitives.mono300,
  buttonTertiarySpinnerForeground: themePrimitives.primary50,
  buttonTertiarySpinnerBackground: themePrimitives.primary500,
  buttonDisabledFill: themePrimitives.mono600,
  buttonDisabledText: themePrimitives.mono300,
  buttonDisabledActiveFill: themePrimitives.mono200,
  buttonDisabledActiveText: themePrimitives.primary500,
  buttonDisabledSpinnerForeground: themePrimitives.mono200,
  buttonDisabledSpinnerBackground: themePrimitives.mono400,

  // Breadcrumbs
  breadcrumbsText: themePrimitives.white,

  breadcrumbsSeparatorFill: themePrimitives.mono200,

  // Datepicker
  calendarBackground: themePrimitives.mono800,

  calendarForeground: themePrimitives.white,
  calendarForegroundDisabled: themePrimitives.mono300,
  calendarHeaderBackground: themePrimitives.mono800,
  calendarHeaderForeground: themePrimitives.primary,
  calendarHeaderBackgroundActive: themePrimitives.primary600,
  calendarHeaderForegroundDisabled: themePrimitives.primary500,
  calendarDayForegroundPseudoSelected: themePrimitives.primary,
  calendarDayBackgroundPseudoSelectedHighlighted: themePrimitives.primary600,
  calendarDayForegroundPseudoSelectedHighlighted: themePrimitives.primary,
  calendarDayBackgroundSelected: themePrimitives.primary,
  calendarDayForegroundSelected: themePrimitives.black,
  calendarDayBackgroundSelectedHighlighted: themePrimitives.primary100,
  calendarDayForegroundSelectedHighlighted: themePrimitives.black,

  // Combobox
  comboboxListItemFocus: themePrimitives.mono600,

  comboboxListItemHover: themePrimitives.mono500,

  // FileUploader
  fileUploaderBackgroundColor: themePrimitives.mono700,

  fileUploaderBackgroundColorActive: themePrimitives.mono600,
  fileUploaderBorderColorActive: themePrimitives.primary,
  fileUploaderBorderColorDefault: themePrimitives.mono500,
  fileUploaderMessageColor: themePrimitives.mono100,

  // Links
  linkText: themePrimitives.primary,

  linkVisited: themePrimitives.primary100,
  linkHover: themePrimitives.primary200,
  linkActive: themePrimitives.primary300,

  // List
  listHeaderFill: themePrimitives.mono600,

  listBodyFill: themePrimitives.mono800,

  // ProgressSteps
  progressStepsCompletedText: themePrimitives.black,

  progressStepsCompletedFill: themePrimitives.primary,
  progressStepsActiveText: themePrimitives.black,
  progressStepsActiveFill: themePrimitives.primary,

  // Modal
  modalCloseColor: themePrimitives.mono300,

  modalCloseColorHover: themePrimitives.mono400,
  modalCloseColorFocus: themePrimitives.mono400,

  // Notification
  notificationInfoBackground: themePrimitives.accent700,

  notificationInfoText: themePrimitives.primaryA,
  notificationPositiveBackground: themePrimitives.positive700,
  notificationPositiveText: themePrimitives.primaryA,
  notificationWarningBackground: themePrimitives.warning700,
  notificationWarningText: themePrimitives.primaryA,
  notificationNegativeBackground: themePrimitives.negative700,
  notificationNegativeText: themePrimitives.primaryA,

  // Tag

  // Custom ramps
  tagFontDisabledRampUnit: '600',

  tagSolidFontRampUnit: '0',
  tagSolidRampUnit: '500',
  tagOutlinedFontRampUnit: '500',
  tagOutlinedRampUnit: '500',

  // Deprecated
  tagSolidHoverRampUnit: '500',

  tagSolidActiveRampUnit: '400',
  tagSolidDisabledRampUnit: '700',
  tagSolidFontHoverRampUnit: '100',
  tagLightRampUnit: '700',
  tagLightHoverRampUnit: '700',
  tagLightActiveRampUnit: '600',
  tagLightFontRampUnit: '100',
  tagLightFontHoverRampUnit: '100',
  tagOutlinedActiveRampUnit: '300',
  tagOutlinedHoverRampUnit: '800',
  tagOutlinedFontHoverRampUnit: '100',

  // Neutral
  tagNeutralOutlinedFont: themePrimitives.mono100,

  tagNeutralOutlinedBackground: themePrimitives.mono200,
  tagNeutralSolidFont: themePrimitives.black,

  // not much we can do to get the correct gray here
  tagNeutralSolidBackground: themePrimitives.primary200,

  tagNeutralFontDisabled: themePrimitives.mono400,
  tagNeutralOutlinedDisabled: themePrimitives.mono500,

  // Deprecated
  tagNeutralSolidHover: themePrimitives.mono600,

  tagNeutralSolidActive: themePrimitives.mono500,
  tagNeutralSolidDisabled: themePrimitives.mono700,
  tagNeutralSolidFontHover: themePrimitives.mono200,
  tagNeutralLightBackground: themePrimitives.mono800,
  tagNeutralLightHover: themePrimitives.mono800,
  tagNeutralLightActive: themePrimitives.mono700,
  tagNeutralLightDisabled: themePrimitives.mono700,
  tagNeutralLightFont: themePrimitives.mono200,
  tagNeutralLightFontHover: themePrimitives.mono200,
  tagNeutralOutlinedActive: themePrimitives.mono400,
  tagNeutralOutlinedFontHover: themePrimitives.mono100,
  tagNeutralOutlinedHover: tagHoverBackground,

  // Primary
  tagPrimaryOutlinedFont: themePrimitives.primary200,

  tagPrimaryOutlinedBackground: themePrimitives.primary400,
  tagPrimarySolidFont: themePrimitives.black,
  tagPrimarySolidBackground: themePrimitives.primary200,
  tagPrimaryFontDisabled: themePrimitives.primary600,
  tagPrimaryOutlinedDisabled: themePrimitives.primary700,

  // Deprecated
  tagPrimarySolidHover: themePrimitives.primary700,

  tagPrimarySolidActive: themePrimitives.primary400,
  tagPrimarySolidDisabled: themePrimitives.primary700,
  tagPrimarySolidFontHover: themePrimitives.primary100,
  tagPrimaryLightBackground: themePrimitives.primary700,
  tagPrimaryLightHover: themePrimitives.primary700,
  tagPrimaryLightActive: themePrimitives.primary600,
  tagPrimaryLightDisabled: themePrimitives.primary700,
  tagPrimaryLightFont: themePrimitives.primary100,
  tagPrimaryLightFontHover: themePrimitives.primary100,
  tagPrimaryOutlinedActive: themePrimitives.primary600,
  tagPrimaryOutlinedFontHover: themePrimitives.primary200,
  tagPrimaryOutlinedHover: tagHoverBackground,

  // Accent
  tagAccentOutlinedFont: themePrimitives.accent200,

  tagAccentOutlinedBackground: themePrimitives.accent500,
  tagAccentSolidFont: themePrimitives.white,
  tagAccentSolidBackground: themePrimitives.accent500,
  tagAccentFontDisabled: themePrimitives.accent600,
  tagAccentOutlinedDisabled: themePrimitives.accent700,

  // Deprecated
  tagAccentSolidHover: themePrimitives.accent500,

  tagAccentSolidActive: themePrimitives.accent400,
  tagAccentSolidDisabled: themePrimitives.accent700,
  tagAccentSolidFontHover: themePrimitives.accent100,
  tagAccentLightBackground: themePrimitives.accent700,
  tagAccentLightHover: themePrimitives.accent700,
  tagAccentLightActive: themePrimitives.accent600,
  tagAccentLightDisabled: themePrimitives.accent700,
  tagAccentLightFont: themePrimitives.accent100,
  tagAccentLightFontHover: themePrimitives.accent100,
  tagAccentOutlinedActive: themePrimitives.accent300,
  tagAccentOutlinedFontHover: themePrimitives.accent200,
  tagAccentOutlinedHover: tagHoverBackground,

  // Positive
  tagPositiveOutlinedFont: themePrimitives.positive300,

  tagPositiveOutlinedBackground: themePrimitives.positive500,
  tagPositiveSolidFont: themePrimitives.white,
  tagPositiveSolidBackground: themePrimitives.positive500,
  tagPositiveFontDisabled: themePrimitives.positive600,
  tagPositiveOutlinedDisabled: themePrimitives.positive700,

  // Deprecated
  tagPositiveSolidHover: themePrimitives.positive500,

  tagPositiveSolidActive: themePrimitives.positive400,
  tagPositiveSolidDisabled: themePrimitives.positive700,
  tagPositiveSolidFontHover: themePrimitives.positive100,
  tagPositiveLightBackground: themePrimitives.positive700,
  tagPositiveLightHover: themePrimitives.positive700,
  tagPositiveLightActive: themePrimitives.positive600,
  tagPositiveLightDisabled: themePrimitives.positive700,
  tagPositiveLightFont: themePrimitives.positive100,
  tagPositiveLightFontHover: themePrimitives.positive100,
  tagPositiveOutlinedActive: themePrimitives.positive300,
  tagPositiveOutlinedFontHover: themePrimitives.positive300,
  tagPositiveOutlinedHover: tagHoverBackground,

  // Warning
  tagWarningOutlinedFont: themePrimitives.warning300,

  tagWarningOutlinedBackground: themePrimitives.warning500,
  tagWarningSolidFont: themePrimitives.black,
  tagWarningSolidBackground: themePrimitives.warning500,
  tagWarningFontDisabled: themePrimitives.warning600,
  tagWarningOutlinedDisabled: themePrimitives.warning700,

  // Deprecated
  tagWarningSolidHover: themePrimitives.warning500,

  tagWarningSolidActive: themePrimitives.warning400,
  tagWarningSolidDisabled: themePrimitives.warning700,
  tagWarningSolidFontHover: themePrimitives.warning100,
  tagWarningLightBackground: themePrimitives.warning700,
  tagWarningLightHover: themePrimitives.warning700,
  tagWarningLightActive: themePrimitives.warning600,
  tagWarningLightDisabled: themePrimitives.warning700,
  tagWarningLightFont: themePrimitives.warning100,
  tagWarningLightFontHover: themePrimitives.warning100,
  tagWarningOutlinedActive: themePrimitives.warning300,
  tagWarningOutlinedFontHover: themePrimitives.warning300,
  tagWarningOutlinedHover: tagHoverBackground,

  // Negative
  tagNegativeOutlinedFont: themePrimitives.negative300,

  tagNegativeOutlinedBackground: themePrimitives.negative500,
  tagNegativeSolidFont: themePrimitives.white,
  tagNegativeSolidBackground: themePrimitives.negative500,
  tagNegativeFontDisabled: themePrimitives.negative600,
  tagNegativeOutlinedDisabled: themePrimitives.negative700,

  // Deprecated
  tagNegativeSolidHover: themePrimitives.negative500,

  tagNegativeSolidActive: themePrimitives.negative400,
  tagNegativeSolidDisabled: themePrimitives.negative700,
  tagNegativeSolidFontHover: themePrimitives.negative100,
  tagNegativeLightBackground: themePrimitives.negative700,
  tagNegativeLightHover: themePrimitives.negative700,
  tagNegativeLightActive: themePrimitives.negative600,
  tagNegativeLightDisabled: themePrimitives.negative700,
  tagNegativeLightFont: themePrimitives.negative100,
  tagNegativeLightFontHover: themePrimitives.negative100,
  tagNegativeOutlinedActive: themePrimitives.negative300,
  tagNegativeOutlinedFontHover: themePrimitives.negative300,
  tagNegativeOutlinedHover: tagHoverBackground,

  // Table
  tableHeadBackgroundColor: themePrimitives.mono700,

  tableBackground: themePrimitives.mono800,
  tableStripedBackground: themePrimitives.mono700,
  tableFilter: themePrimitives.mono400,
  tableFilterHeading: themePrimitives.mono300,
  tableFilterBackground: themePrimitives.mono700,
  tableFilterFooterBackground: themePrimitives.mono800,

  // Toast
  toastText: themePrimitives.white,

  toastPrimaryText: themePrimitives.white,
  toastInfoBackground: themePrimitives.accent400,
  toastInfoText: themePrimitives.white,
  toastPositiveBackground: themePrimitives.positive400,
  toastPositiveText: themePrimitives.white,
  toastWarningBackground: themePrimitives.warning400,
  toastWarningText: themePrimitives.black,
  toastNegativeBackground: themePrimitives.negative400,
  toastNegativeText: themePrimitives.white,

  // Toggle
  toggleFill: themePrimitives.mono300,

  toggleFillChecked: themePrimitives.primary,
  toggleFillDisabled: themePrimitives.mono600,
  toggleTrackFill: themePrimitives.mono400,
  toggleTrackFillDisabled: themePrimitives.mono700,

  // Tick
  tickFill: themePrimitives.mono1000,

  tickFillHover: themePrimitives.mono700,
  tickFillActive: themePrimitives.mono600,
  tickFillSelected: themePrimitives.primary,
  tickFillSelectedHover: themePrimitives.primary50,
  tickFillSelectedHoverActive: themePrimitives.primary100,
  tickFillError: themePrimitives.negative700,
  tickFillErrorHover: themePrimitives.negative600,
  tickFillErrorHoverActive: themePrimitives.negative500,
  tickFillErrorSelected: themePrimitives.negative500,
  tickFillErrorSelectedHover: themePrimitives.negative600,
  tickFillErrorSelectedHoverActive: themePrimitives.negative700,
  tickFillDisabled: themePrimitives.mono500,
  tickBorder: themePrimitives.mono300,
  tickBorderError: themePrimitives.negative400,
  tickMarkFill: themePrimitives.black,
  tickMarkFillError: themePrimitives.white,
  tickMarkFillDisabled: themePrimitives.mono800,

  // Slider/Toggle
  sliderTrackFill: 'transparent',

  sliderHandleFill: themePrimitives.primaryA,
  sliderHandleFillDisabled: themePrimitives.primary500,
  sliderHandleInnerFill: themePrimitives.primaryA,
  sliderTrackFillHover: themePrimitives.mono500,
  sliderTrackFillActive: themePrimitives.mono400,
  sliderTrackFillDisabled: themePrimitives.mono700,
  sliderHandleInnerFillDisabled: themePrimitives.mono500,
  sliderHandleInnerFillSelectedHover: themePrimitives.primary600,
  sliderHandleInnerFillSelectedActive: themePrimitives.primary700,

  // Input
  inputBorder: themePrimitives.mono600,

  inputFill: themePrimitives.mono600,
  inputFillActive: themePrimitives.mono500,
  inputFillError: themePrimitives.negative700,
  inputFillDisabled: themePrimitives.mono800,
  inputFillPositive: themePrimitives.positive700,
  inputTextDisabled: themePrimitives.mono500,
  inputBorderError: themePrimitives.negative400,
  inputBorderPositive: themePrimitives.positive400,
  inputEnhancerFill: themePrimitives.mono500,
  inputEnhancerFillDisabled: themePrimitives.mono700,
  inputEnhancerTextDisabled: themePrimitives.mono500,
  inputPlaceholder: themePrimitives.mono300,
  inputPlaceholderDisabled: themePrimitives.mono500,

  // Menu
  menuFill: themePrimitives.mono600,

  menuFillHover: themePrimitives.mono700,
  menuFontDefault: themePrimitives.mono300,
  menuFontDisabled: themePrimitives.mono400,
  menuFontHighlighted: themePrimitives.white,
  menuFontSelected: themePrimitives.white,

  // Tab
  tabBarFill: themePrimitives.mono1000,

  tabColor: themePrimitives.mono300,

  // Spinner
  spinnerTrackFill: themePrimitives.mono100,

  // Progress bar
  progressbarTrackFill: themePrimitives.mono100,

  // Tooltip
  tooltipBackground: themePrimitives.mono200,

  tooltipText: themePrimitives.mono1000,
});
