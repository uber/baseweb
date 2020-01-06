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
// Due to the legacy `createTheme` type the value need to be
// overrideable through primitives (`foundation` )
export default (
  themePrimitives: ColorTokensT = colorTokens,
): ComponentColorTokensT => ({
  // Buttons
  buttonPrimaryFill: themePrimitives.primary,
  buttonPrimaryText: themePrimitives.white,
  buttonPrimaryHover: themePrimitives.primary700,
  buttonPrimaryActive: themePrimitives.primary600,
  buttonPrimarySelectedFill: themePrimitives.primary600,
  buttonPrimarySelectedText: themePrimitives.white,
  buttonPrimarySpinnerForeground: themePrimitives.primary50,
  buttonPrimarySpinnerBackground: themePrimitives.primary500,

  buttonSecondaryFill: themePrimitives.primary100,
  buttonSecondaryText: themePrimitives.primary,
  buttonSecondaryHover: themePrimitives.primary200,
  buttonSecondaryActive: themePrimitives.primary300,
  buttonSecondarySelectedFill: themePrimitives.primary200,
  buttonSecondarySelectedText: themePrimitives.primary,
  buttonSecondarySpinnerForeground: themePrimitives.primary700,
  buttonSecondarySpinnerBackground: themePrimitives.primary300,

  buttonTertiaryFill: 'transparent',
  buttonTertiaryText: themePrimitives.primary,
  buttonTertiaryHover: themePrimitives.primary50,
  buttonTertiaryActive: themePrimitives.primary100,
  buttonTertiarySelectedFill: themePrimitives.primary100,
  buttonTertiarySelectedText: themePrimitives.primary,
  buttonTertiarySpinnerForeground: themePrimitives.primary700,
  buttonTertiarySpinnerBackground: themePrimitives.primary300,

  buttonMinimalFill: 'transparent',
  buttonMinimalText: themePrimitives.primary,
  buttonMinimalHover: themePrimitives.primary50,
  buttonMinimalActive: themePrimitives.primary100,
  buttonMinimalSelectedFill: themePrimitives.primary100,
  buttonMinimalSelectedText: themePrimitives.primary,
  buttonMinimalSpinnerForeground: themePrimitives.primary700,
  buttonMinimalSpinnerBackground: themePrimitives.primary300,

  buttonDisabledFill: themePrimitives.mono200,
  buttonDisabledText: themePrimitives.mono600,
  buttonDisabledSpinnerForeground: themePrimitives.mono600,
  buttonDisabledSpinnerBackground: themePrimitives.mono400,

  // Breadcrumbs
  breadcrumbsText: themePrimitives.mono900,
  breadcrumbsSeparatorFill: themePrimitives.mono700,

  // Datepicker
  datepickerBackground: themePrimitives.mono100,
  datepickerDayFont: themePrimitives.mono1000,
  datepickerDayFontDisabled: themePrimitives.mono500,
  datepickerDayPseudoSelected: themePrimitives.primary100,
  datepickerDayPseudoHighlighted: themePrimitives.primary200,

  // Calendar
  calendarBackground: themePrimitives.mono100,
  calendarForeground: themePrimitives.mono1000,
  calendarForegroundDisabled: themePrimitives.mono500,
  calendarHeaderBackground: themePrimitives.primary,
  calendarHeaderForeground: themePrimitives.white,
  calendarHeaderBackgroundActive: themePrimitives.primary700,
  calendarHeaderForegroundDisabled: themePrimitives.primary500,
  calendarDayBackgroundPseudoSelected: themePrimitives.primary100,
  calendarDayForegroundPseudoSelected: themePrimitives.mono1000,
  calendarDayBackgroundPseudoSelectedHighlighted: themePrimitives.primary200,
  calendarDayForegroundPseudoSelectedHighlighted: themePrimitives.mono1000,
  calendarDayBackgroundSelected: themePrimitives.white,
  calendarDayForegroundSelected: themePrimitives.primary,
  calendarDayBackgroundSelectedHighlighted: themePrimitives.primary,
  calendarDayForegroundSelectedHighlighted: themePrimitives.white,

  // FileUploader
  fileUploaderBackgroundColor: themePrimitives.mono200,
  fileUploaderBackgroundColorActive: themePrimitives.primary50,
  fileUploaderBorderColorActive: themePrimitives.primary,
  fileUploaderBorderColorDefault: themePrimitives.mono500,
  fileUploaderMessageColor: themePrimitives.mono600,

  // Links
  linkText: themePrimitives.primary,
  linkVisited: themePrimitives.primary700,
  linkHover: themePrimitives.primary600,
  linkActive: themePrimitives.primary500,

  // List
  listHeaderFill: themePrimitives.white,
  listBodyFill: themePrimitives.mono200,
  listIconFill: themePrimitives.mono500,
  listBorder: themePrimitives.mono500,

  // ProgressSteps
  progressStepsCompletedText: themePrimitives.white,
  progressStepsCompletedFill: themePrimitives.primary,
  progressStepsActiveText: themePrimitives.white,
  progressStepsActiveFill: themePrimitives.primary,
  progressStepsIconActiveFill: themePrimitives.primary,

  // Toggle
  toggleFill: themePrimitives.white,
  toggleFillChecked: themePrimitives.primary,
  toggleFillDisabled: themePrimitives.mono600,
  toggleTrackFill: themePrimitives.mono400,
  toggleTrackFillDisabled: themePrimitives.mono300,

  // Tick
  tickFill: themePrimitives.mono100,
  tickFillHover: themePrimitives.mono200,
  tickFillActive: themePrimitives.mono300,

  tickFillSelected: themePrimitives.primary,
  tickFillSelectedHover: themePrimitives.primary700,
  tickFillSelectedHoverActive: themePrimitives.primary600,

  tickFillError: themePrimitives.negative50,
  tickFillErrorHover: themePrimitives.negative100,
  tickFillErrorHoverActive: themePrimitives.negative200,
  tickFillErrorSelected: themePrimitives.negative400,
  tickFillErrorSelectedHover: themePrimitives.negative500,
  tickFillErrorSelectedHoverActive: themePrimitives.negative600,

  tickFillDisabled: themePrimitives.mono600,

  tickBorder: themePrimitives.mono400,
  tickBorderError: themePrimitives.negative400,

  tickMarkFill: themePrimitives.white,
  tickMarkFillError: themePrimitives.white,
  tickMarkFillDisabled: themePrimitives.mono100,

  // Slider/Toggle
  sliderTrackFill: themePrimitives.mono400,
  sliderTrackFillHover: themePrimitives.mono500,
  sliderTrackFillActive: themePrimitives.mono600,
  sliderTrackFillSelected: themePrimitives.primary,
  sliderTrackFillSelectedHover: themePrimitives.primary,
  sliderTrackFillSelectedActive: themePrimitives.primary500,
  sliderTrackFillDisabled: themePrimitives.mono300,
  sliderHandleFill: themePrimitives.white,
  sliderHandleFillHover: themePrimitives.white,
  sliderHandleFillActive: themePrimitives.white,
  sliderHandleFillSelected: themePrimitives.white,
  sliderHandleFillSelectedHover: themePrimitives.white,
  sliderHandleFillSelectedActive: themePrimitives.white,
  sliderHandleFillDisabled: themePrimitives.mono500,
  sliderHandleInnerFill: themePrimitives.mono400,
  sliderHandleInnerFillDisabled: themePrimitives.mono400,
  sliderHandleInnerFillSelectedHover: themePrimitives.primary,
  sliderHandleInnerFillSelectedActive: themePrimitives.primary500,

  sliderBorder: themePrimitives.mono500,
  sliderBorderHover: themePrimitives.primary,
  sliderBorderDisabled: themePrimitives.mono600,

  // Inputs
  inputFill: themePrimitives.mono300,
  inputFillError: themePrimitives.negative50,
  inputFillDisabled: themePrimitives.mono200,
  inputFillActive: themePrimitives.mono200,
  inputFillPositive: themePrimitives.positive50,
  inputTextDisabled: themePrimitives.mono600,
  inputBorderError: themePrimitives.negative200,
  inputBorderPositive: themePrimitives.positive200,
  inputEnhancerFill: themePrimitives.mono300,
  inputEnhancerFillDisabled: themePrimitives.mono300,
  inputEnhancerTextDisabled: themePrimitives.mono600,

  // Menu
  menuFill: themePrimitives.mono100,
  menuFillHover: themePrimitives.mono200,
  menuFontDefault: themePrimitives.mono800,
  menuFontDisabled: themePrimitives.mono500,
  menuFontHighlighted: themePrimitives.mono1000,
  menuFontSelected: themePrimitives.mono1000,

  // Modal
  modalCloseColor: themePrimitives.mono1000,
  modalCloseColorHover: themePrimitives.mono800,
  modalCloseColorFocus: themePrimitives.mono800,

  // Pagination
  paginationTriangleDown: themePrimitives.mono800,

  // Header navigation
  headerNavigationFill: 'transparent',

  // Tab
  tabBarFill: themePrimitives.mono200,
  tabColor: themePrimitives.mono800,

  // Notification
  notificationPrimaryBackground: themePrimitives.primary50,
  notificationPrimaryText: themePrimitives.primary500,
  notificationInfoBackground: themePrimitives.accent50,
  notificationInfoText: themePrimitives.accent500,
  notificationPositiveBackground: themePrimitives.positive50,
  notificationPositiveText: themePrimitives.positive500,
  notificationWarningBackground: themePrimitives.warning50,
  notificationWarningText: themePrimitives.warning500,
  notificationNegativeBackground: themePrimitives.negative50,
  notificationNegativeText: themePrimitives.negative500,

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

  tagNeutralSolidBackground: themePrimitives.mono900,
  tagNeutralSolidHover: themePrimitives.mono300,
  tagNeutralSolidActive: themePrimitives.mono400,
  tagNeutralSolidDisabled: themePrimitives.mono200,
  tagNeutralSolidFont: themePrimitives.mono100,
  tagNeutralSolidFontHover: themePrimitives.mono900,
  tagNeutralLightBackground: themePrimitives.mono300,
  tagNeutralLightHover: themePrimitives.mono300,
  tagNeutralLightActive: themePrimitives.mono400,
  tagNeutralLightDisabled: themePrimitives.mono200,
  tagNeutralLightFont: themePrimitives.mono900,
  tagNeutralLightFontHover: themePrimitives.mono900,
  tagNeutralOutlinedBackground: themePrimitives.mono900,
  tagNeutralOutlinedHover: themePrimitives.mono800,
  tagNeutralOutlinedActive: themePrimitives.mono900,
  tagNeutralOutlinedDisabled: themePrimitives.mono200,
  tagNeutralOutlinedFont: themePrimitives.mono900,
  tagNeutralOutlinedFontHover: themePrimitives.mono200,
  tagNeutralFontDisabled: themePrimitives.mono500,

  tagPrimarySolidBackground: themePrimitives.primary,
  tagPrimarySolidHover: themePrimitives.primary100,
  tagPrimarySolidActive: themePrimitives.primary200,
  tagPrimarySolidDisabled: themePrimitives.primary50,
  tagPrimarySolidFont: themePrimitives.primary50,
  tagPrimarySolidFontHover: themePrimitives.primary700,
  tagPrimaryLightBackground: themePrimitives.primary50,
  tagPrimaryLightHover: themePrimitives.primary100,
  tagPrimaryLightActive: themePrimitives.primary100,
  tagPrimaryLightDisabled: themePrimitives.primary50,
  tagPrimaryLightFont: themePrimitives.primary500,
  tagPrimaryLightFontHover: themePrimitives.primary500,
  tagPrimaryOutlinedBackground: themePrimitives.primary,
  tagPrimaryOutlinedHover: themePrimitives.primary700,
  tagPrimaryOutlinedActive: themePrimitives.primary600,
  tagPrimaryOutlinedDisabled: themePrimitives.primary50,
  tagPrimaryOutlinedFont: themePrimitives.primary,
  tagPrimaryOutlinedFontHover: themePrimitives.primary50,
  tagPrimaryFontDisabled: themePrimitives.primary400,

  tagAccentSolidBackground: themePrimitives.accent400,
  tagAccentSolidHover: themePrimitives.accent50,
  tagAccentSolidActive: themePrimitives.accent100,
  tagAccentSolidDisabled: themePrimitives.accent50,
  tagAccentSolidFont: themePrimitives.accent50,
  tagAccentSolidFontHover: themePrimitives.accent500,
  tagAccentLightBackground: themePrimitives.accent50,
  tagAccentLightHover: themePrimitives.accent100,
  tagAccentLightActive: themePrimitives.accent100,
  tagAccentLightDisabled: themePrimitives.accent50,
  tagAccentLightFont: themePrimitives.accent500,
  tagAccentLightFontHover: themePrimitives.accent500,
  tagAccentOutlinedBackground: themePrimitives.accent400,
  tagAccentOutlinedHover: themePrimitives.accent500,
  tagAccentOutlinedActive: themePrimitives.accent600,
  tagAccentOutlinedDisabled: themePrimitives.accent50,
  tagAccentOutlinedFont: themePrimitives.accent500,
  tagAccentOutlinedFontHover: themePrimitives.accent50,
  tagAccentFontDisabled: themePrimitives.accent200,

  tagPositiveSolidBackground: themePrimitives.positive400,
  tagPositiveSolidHover: themePrimitives.positive50,
  tagPositiveSolidActive: themePrimitives.positive100,
  tagPositiveSolidDisabled: themePrimitives.positive50,
  tagPositiveSolidFont: themePrimitives.positive50,
  tagPositiveSolidFontHover: themePrimitives.positive500,
  tagPositiveLightBackground: themePrimitives.positive50,
  tagPositiveLightHover: themePrimitives.positive100,
  tagPositiveLightActive: themePrimitives.positive100,
  tagPositiveLightDisabled: themePrimitives.positive50,
  tagPositiveLightFont: themePrimitives.positive500,
  tagPositiveLightFontHover: themePrimitives.positive500,
  tagPositiveOutlinedBackground: themePrimitives.positive400,
  tagPositiveOutlinedHover: themePrimitives.positive500,
  tagPositiveOutlinedActive: themePrimitives.positive600,
  tagPositiveOutlinedDisabled: themePrimitives.positive50,
  tagPositiveOutlinedFont: themePrimitives.positive500,
  tagPositiveOutlinedFontHover: themePrimitives.positive50,
  tagPositiveFontDisabled: themePrimitives.positive200,

  tagWarningSolidBackground: themePrimitives.warning400,
  tagWarningSolidHover: themePrimitives.warning50,
  tagWarningSolidActive: themePrimitives.warning100,
  tagWarningSolidDisabled: themePrimitives.warning50,
  tagWarningSolidFont: themePrimitives.warning50,
  tagWarningSolidFontHover: themePrimitives.warning500,
  tagWarningLightBackground: themePrimitives.warning50,
  tagWarningLightHover: themePrimitives.warning100,
  tagWarningLightActive: themePrimitives.warning100,
  tagWarningLightDisabled: themePrimitives.warning50,
  tagWarningLightFont: themePrimitives.warning500,
  tagWarningLightFontHover: themePrimitives.warning500,
  tagWarningOutlinedBackground: themePrimitives.warning400,
  tagWarningOutlinedHover: themePrimitives.warning500,
  tagWarningOutlinedActive: themePrimitives.warning600,
  tagWarningOutlinedDisabled: themePrimitives.warning50,
  tagWarningOutlinedFont: themePrimitives.warning500,
  tagWarningOutlinedFontHover: themePrimitives.warning50,
  tagWarningFontDisabled: themePrimitives.warning200,

  tagNegativeSolidBackground: themePrimitives.negative400,
  tagNegativeSolidHover: themePrimitives.negative50,
  tagNegativeSolidActive: themePrimitives.negative100,
  tagNegativeSolidDisabled: themePrimitives.negative50,
  tagNegativeSolidFont: themePrimitives.negative50,
  tagNegativeSolidFontHover: themePrimitives.negative500,

  tagNegativeLightBackground: themePrimitives.negative50,
  tagNegativeLightHover: themePrimitives.negative100,
  tagNegativeLightActive: themePrimitives.negative100,
  tagNegativeLightDisabled: themePrimitives.negative50,
  tagNegativeLightFont: themePrimitives.negative500,
  tagNegativeLightFontHover: themePrimitives.negative500,

  tagNegativeOutlinedBackground: themePrimitives.negative400,
  tagNegativeOutlinedHover: themePrimitives.negative500,
  tagNegativeOutlinedActive: themePrimitives.negative600,
  tagNegativeOutlinedDisabled: themePrimitives.negative50,
  tagNegativeOutlinedFont: themePrimitives.negative500,
  tagNegativeOutlinedFontHover: themePrimitives.negative50,
  tagNegativeFontDisabled: themePrimitives.negative200,

  // Table
  tableHeadBackgroundColor: themePrimitives.mono100,
  tableBackground: themePrimitives.mono100,
  tableStripedBackground: themePrimitives.mono200,
  tableFilter: themePrimitives.mono600,
  tableFilterHeading: themePrimitives.mono700,
  tableFilterBackground: themePrimitives.mono100,
  tableFilterFooterBackground: themePrimitives.mono200,

  // Toast
  toastText: themePrimitives.white,
  toastPrimaryBackground: themePrimitives.primary500,
  toastInfoBackground: themePrimitives.accent500,
  toastPositiveBackground: themePrimitives.positive500,
  toastWarningBackground: themePrimitives.warning500,
  toastNegativeBackground: themePrimitives.negative500,

  // Spinner
  spinnerTrackFill: themePrimitives.mono900,

  // Progress bar
  progressbarTrackFill: themePrimitives.mono900,

  // Tooltip
  tooltipBackground: themePrimitives.mono900,
  tooltipText: themePrimitives.mono100,
});
