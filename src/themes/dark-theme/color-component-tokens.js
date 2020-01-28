/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import colorTokens from './color-tokens.js';
import type {ColorTokensT, ComponentColorTokensT} from '../types.js';

/* ---- Component colors ---- */
// TODO(#2318) Make it a plain object in the next v10 major version
// with values taken from `colorTokens`.
// Due to the legacy `createTheme` type the values
// need to be overrideable through primitives
export default (
  themePrimitives: ColorTokensT = colorTokens,
): ComponentColorTokensT => ({
  // Buttons
  buttonPrimaryFill: themePrimitives.primary,
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
  buttonTertiarySpinnerForeground: themePrimitives.primary50,
  buttonTertiarySpinnerBackground: themePrimitives.primary500,

  buttonMinimalFill: 'transparent',
  buttonMinimalText: themePrimitives.primary,
  buttonMinimalHover: themePrimitives.primary700,
  buttonMinimalActive: themePrimitives.primary600,
  buttonMinimalSelectedText: themePrimitives.primary,
  buttonMinimalSelectedFill: themePrimitives.primary600,
  buttonMinimalSpinnerForeground: themePrimitives.primary50,
  buttonMinimalSpinnerBackground: themePrimitives.primary500,

  buttonDisabledFill: themePrimitives.mono600,
  buttonDisabledText: themePrimitives.mono300,
  buttonDisabledSpinnerForeground: themePrimitives.mono200,
  buttonDisabledSpinnerBackground: themePrimitives.mono400,

  // Breadcrumbs
  breadcrumbsText: themePrimitives.mono100,
  breadcrumbsSeparatorFill: themePrimitives.mono200,

  // Datepicker
  datepickerBackground: themePrimitives.mono600,
  datepickerDayFont: themePrimitives.white,
  datepickerDayFontDisabled: themePrimitives.mono100,
  datepickerDayPseudoSelected: themePrimitives.mono500,
  datepickerDayPseudoHighlighted: themePrimitives.mono600,

  // Calendar
  calendarBackground: themePrimitives.mono800,
  calendarForeground: themePrimitives.white,
  calendarForegroundDisabled: themePrimitives.mono300,
  calendarHeaderBackground: themePrimitives.primary700,
  calendarHeaderForeground: themePrimitives.primary,
  calendarHeaderBackgroundActive: themePrimitives.primary600,
  calendarHeaderForegroundDisabled: themePrimitives.primary500,
  calendarDayBackgroundPseudoSelected: themePrimitives.primary700,
  calendarDayForegroundPseudoSelected: themePrimitives.primary,
  calendarDayBackgroundPseudoSelectedHighlighted: themePrimitives.primary600,
  calendarDayForegroundPseudoSelectedHighlighted: themePrimitives.primary,
  calendarDayBackgroundSelected: themePrimitives.primary,
  calendarDayForegroundSelected: themePrimitives.black,
  calendarDayBackgroundSelectedHighlighted: themePrimitives.primary100,
  calendarDayForegroundSelectedHighlighted: themePrimitives.black,

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
  listBodyFill: themePrimitives.mono700,
  listIconFill: themePrimitives.mono100,
  listBorder: themePrimitives.mono500,

  // ProgressSteps
  progressStepsCompletedText: themePrimitives.black,
  progressStepsCompletedFill: themePrimitives.primary,
  progressStepsActiveText: themePrimitives.black,
  progressStepsActiveFill: themePrimitives.primary,
  progressStepsIconActiveFill: themePrimitives.primary,

  // Modal
  modalCloseColor: themePrimitives.mono300,
  modalCloseColorHover: themePrimitives.mono400,
  modalCloseColorFocus: themePrimitives.mono400,

  // Notification
  notificationPrimaryBackground: themePrimitives.primary700,
  notificationPrimaryText: themePrimitives.primary200,
  notificationInfoBackground: themePrimitives.accent700,
  notificationInfoText: themePrimitives.accent200,
  notificationPositiveBackground: themePrimitives.positive700,
  notificationPositiveText: themePrimitives.positive200,
  notificationWarningBackground: themePrimitives.warning700,
  notificationWarningText: themePrimitives.warning200,
  notificationNegativeBackground: themePrimitives.negative700,
  notificationNegativeText: themePrimitives.negative200,

  // Tag
  tagSolidRampUnit: '500',
  tagSolidHoverRampUnit: '500',
  tagSolidActiveRampUnit: '400',
  tagSolidDisabledRampUnit: '700',
  tagSolidFontRampUnit: '100',
  tagSolidFontHoverRampUnit: '100',
  tagLightRampUnit: '700',
  tagLightHoverRampUnit: '700',
  tagLightActiveRampUnit: '600',
  tagLightDisabledRampUnit: '700',
  tagLightFontRampUnit: '100',
  tagLightFontHoverRampUnit: '100',
  tagOutlinedRampUnit: '500',
  tagOutlinedHoverRampUnit: '400',
  tagOutlinedActiveRampUnit: '300',
  tagOutlinedDisabledRampUnit: '700',
  tagOutlinedFontRampUnit: '200',
  tagOutlinedFontHoverRampUnit: '700',
  tagFontDisabledRampUnit: '500',

  tagNeutralSolidBackground: themePrimitives.mono600,
  tagNeutralSolidHover: themePrimitives.mono600,
  tagNeutralSolidActive: themePrimitives.mono500,
  tagNeutralSolidDisabled: themePrimitives.mono700,
  tagNeutralSolidFont: themePrimitives.mono200,
  tagNeutralSolidFontHover: themePrimitives.mono200,
  tagNeutralLightBackground: themePrimitives.mono800,
  tagNeutralLightHover: themePrimitives.mono800,
  tagNeutralLightActive: themePrimitives.mono700,
  tagNeutralLightDisabled: themePrimitives.mono700,
  tagNeutralLightFont: themePrimitives.mono200,
  tagNeutralLightFontHover: themePrimitives.mono200,
  tagNeutralOutlinedBackground: themePrimitives.mono600,
  tagNeutralOutlinedHover: themePrimitives.mono500,
  tagNeutralOutlinedActive: themePrimitives.mono400,
  tagNeutralOutlinedDisabled: themePrimitives.mono700,
  tagNeutralOutlinedFont: themePrimitives.mono200,
  tagNeutralOutlinedFontHover: themePrimitives.mono900,
  tagNeutralFontDisabled: themePrimitives.mono500,

  tagPrimarySolidBackground: themePrimitives.primary,
  tagPrimarySolidHover: themePrimitives.primary700,
  tagPrimarySolidActive: themePrimitives.primary400,
  tagPrimarySolidDisabled: themePrimitives.primary700,
  tagPrimarySolidFont: themePrimitives.primary700,
  tagPrimarySolidFontHover: themePrimitives.primary100,
  tagPrimaryLightBackground: themePrimitives.primary700,
  tagPrimaryLightHover: themePrimitives.primary700,
  tagPrimaryLightActive: themePrimitives.primary600,
  tagPrimaryLightDisabled: themePrimitives.primary700,
  tagPrimaryLightFont: themePrimitives.primary100,
  tagPrimaryLightFontHover: themePrimitives.primary100,
  tagPrimaryOutlinedBackground: themePrimitives.primary,
  tagPrimaryOutlinedHover: themePrimitives.primary700,
  tagPrimaryOutlinedActive: themePrimitives.primary600,
  tagPrimaryOutlinedDisabled: themePrimitives.primary700,
  tagPrimaryOutlinedFont: themePrimitives.primary,
  tagPrimaryOutlinedFontHover: themePrimitives.primary50,
  tagPrimaryFontDisabled: themePrimitives.primary500,

  tagAccentSolidBackground: themePrimitives.accent500,
  tagAccentSolidHover: themePrimitives.accent500,
  tagAccentSolidActive: themePrimitives.accent400,
  tagAccentSolidDisabled: themePrimitives.accent700,
  tagAccentSolidFont: themePrimitives.accent100,
  tagAccentSolidFontHover: themePrimitives.accent100,
  tagAccentLightBackground: themePrimitives.accent700,
  tagAccentLightHover: themePrimitives.accent700,
  tagAccentLightActive: themePrimitives.accent600,
  tagAccentLightDisabled: themePrimitives.accent700,
  tagAccentLightFont: themePrimitives.accent100,
  tagAccentLightFontHover: themePrimitives.accent100,
  tagAccentOutlinedBackground: themePrimitives.accent500,
  tagAccentOutlinedHover: themePrimitives.accent400,
  tagAccentOutlinedActive: themePrimitives.accent300,
  tagAccentOutlinedDisabled: themePrimitives.accent700,
  tagAccentOutlinedFont: themePrimitives.accent200,
  tagAccentOutlinedFontHover: themePrimitives.accent700,
  tagAccentFontDisabled: themePrimitives.accent500,

  tagPositiveSolidBackground: themePrimitives.positive500,
  tagPositiveSolidHover: themePrimitives.positive500,
  tagPositiveSolidActive: themePrimitives.positive400,
  tagPositiveSolidDisabled: themePrimitives.positive700,
  tagPositiveSolidFont: themePrimitives.positive100,
  tagPositiveSolidFontHover: themePrimitives.positive100,
  tagPositiveLightBackground: themePrimitives.positive700,
  tagPositiveLightHover: themePrimitives.positive700,
  tagPositiveLightActive: themePrimitives.positive600,
  tagPositiveLightDisabled: themePrimitives.positive700,
  tagPositiveLightFont: themePrimitives.positive100,
  tagPositiveLightFontHover: themePrimitives.positive100,
  tagPositiveOutlinedBackground: themePrimitives.positive500,
  tagPositiveOutlinedHover: themePrimitives.positive400,
  tagPositiveOutlinedActive: themePrimitives.positive300,
  tagPositiveOutlinedDisabled: themePrimitives.positive700,
  tagPositiveOutlinedFont: themePrimitives.positive200,
  tagPositiveOutlinedFontHover: themePrimitives.positive700,
  tagPositiveFontDisabled: themePrimitives.positive500,

  tagWarningSolidBackground: themePrimitives.warning500,
  tagWarningSolidHover: themePrimitives.warning500,
  tagWarningSolidActive: themePrimitives.warning400,
  tagWarningSolidDisabled: themePrimitives.warning700,
  tagWarningSolidFont: themePrimitives.warning100,
  tagWarningSolidFontHover: themePrimitives.warning100,
  tagWarningLightBackground: themePrimitives.warning700,
  tagWarningLightHover: themePrimitives.warning700,
  tagWarningLightActive: themePrimitives.warning600,
  tagWarningLightDisabled: themePrimitives.warning700,
  tagWarningLightFont: themePrimitives.warning100,
  tagWarningLightFontHover: themePrimitives.warning100,
  tagWarningOutlinedBackground: themePrimitives.warning500,
  tagWarningOutlinedHover: themePrimitives.warning400,
  tagWarningOutlinedActive: themePrimitives.warning300,
  tagWarningOutlinedDisabled: themePrimitives.warning700,
  tagWarningOutlinedFont: themePrimitives.warning200,
  tagWarningOutlinedFontHover: themePrimitives.warning700,
  tagWarningFontDisabled: themePrimitives.warning500,

  tagNegativeSolidBackground: themePrimitives.negative500,
  tagNegativeSolidHover: themePrimitives.negative500,
  tagNegativeSolidActive: themePrimitives.negative400,
  tagNegativeSolidDisabled: themePrimitives.negative700,
  tagNegativeSolidFont: themePrimitives.negative100,
  tagNegativeSolidFontHover: themePrimitives.negative100,
  tagNegativeLightBackground: themePrimitives.negative700,
  tagNegativeLightHover: themePrimitives.negative700,
  tagNegativeLightActive: themePrimitives.negative600,
  tagNegativeLightDisabled: themePrimitives.negative700,
  tagNegativeLightFont: themePrimitives.negative100,
  tagNegativeLightFontHover: themePrimitives.negative100,
  tagNegativeOutlinedBackground: themePrimitives.negative500,
  tagNegativeOutlinedHover: themePrimitives.negative400,
  tagNegativeOutlinedActive: themePrimitives.negative300,
  tagNegativeOutlinedDisabled: themePrimitives.negative700,
  tagNegativeOutlinedFont: themePrimitives.negative200,
  tagNegativeOutlinedFontHover: themePrimitives.negative700,
  tagNegativeFontDisabled: themePrimitives.negative500,

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
  toastPrimaryBackground: themePrimitives.primary500,
  toastInfoBackground: themePrimitives.accent500,
  toastPositiveBackground: themePrimitives.positive500,
  toastWarningBackground: themePrimitives.warning500,
  toastNegativeBackground: themePrimitives.negative500,

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
  sliderTrackFill: themePrimitives.mono600,
  sliderTrackFillHover: themePrimitives.mono500,
  sliderTrackFillActive: themePrimitives.mono400,
  sliderTrackFillSelected: themePrimitives.primary500,
  sliderTrackFillSelectedActive: themePrimitives.primary600,
  sliderTrackFillSelectedHover: themePrimitives.primary700,
  sliderTrackFillDisabled: themePrimitives.mono700,
  sliderHandleFill: themePrimitives.mono300,
  sliderHandleFillHover: themePrimitives.mono300,
  sliderHandleFillActive: themePrimitives.mono300,
  sliderHandleFillSelected: themePrimitives.primary500,
  sliderHandleFillSelectedHover: themePrimitives.primary600,
  sliderHandleFillSelectedActive: themePrimitives.primary700,
  sliderHandleFillDisabled: themePrimitives.mono600,
  sliderHandleInnerFill: themePrimitives.mono300,
  sliderHandleInnerFillDisabled: themePrimitives.mono500,
  sliderHandleInnerFillSelectedHover: themePrimitives.primary600,
  sliderHandleInnerFillSelectedActive: themePrimitives.primary700,

  sliderBorder: themePrimitives.white,
  sliderBorderHover: themePrimitives.white,
  sliderBorderDisabled: themePrimitives.mono400,

  // Input
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

  // Menu
  menuFill: themePrimitives.mono600,
  menuFillHover: themePrimitives.mono700,
  menuFontDefault: themePrimitives.mono300,
  menuFontDisabled: themePrimitives.mono400,
  menuFontHighlighted: themePrimitives.mono200,
  menuFontSelected: themePrimitives.white,

  // Pagination
  paginationTriangleDown: themePrimitives.mono100,

  // Header navigation
  headerNavigationFill: themePrimitives.mono700,

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
