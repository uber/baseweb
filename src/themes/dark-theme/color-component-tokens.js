/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import colorTokens from './color-tokens.js';
import type {ColorTokensT, ComponentColorTokensT} from '../types.js';

const tagHoverBackground = `rgba(255, 255, 255, 0.2)`;

/* ---- Component colors ---- */
// TODO(#2318) Make it a plain object in the next v11 major version
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

  // Custom ramps
  tagFontDisabledRampUnit: '600',
  tagOutlinedDisabledRampUnit: '600',
  tagSolidFontRampUnit: '0',
  tagSolidRampUnit: '500',
  tagOutlinedFontHoverRampUnit: '100',
  tagOutlinedHoverRampUnit: '800',
  tagOutlinedFontRampUnit: '400',
  tagOutlinedRampUnit: '500',
  // Deprecated
  tagSolidHoverRampUnit: '500',
  tagSolidActiveRampUnit: '400',
  tagSolidDisabledRampUnit: '700',
  tagSolidFontHoverRampUnit: '100',
  tagLightRampUnit: '700',
  tagLightHoverRampUnit: '700',
  tagLightActiveRampUnit: '600',
  tagLightDisabledRampUnit: '700',
  tagLightFontRampUnit: '100',
  tagLightFontHoverRampUnit: '100',
  tagOutlinedActiveRampUnit: '300',

  // Neutral
  tagNeutralFontDisabled: themePrimitives.mono500,
  tagNeutralOutlinedDisabled: themePrimitives.mono500,
  tagNeutralSolidFont: themePrimitives.mono200,
  tagNeutralSolidBackground: themePrimitives.mono600,
  tagNeutralOutlinedFontHover: themePrimitives.mono100,
  tagNeutralOutlinedHover: tagHoverBackground,
  tagNeutralOutlinedBackground: themePrimitives.mono300,
  tagNeutralOutlinedFont: themePrimitives.mono100,
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

  // Primary
  tagPrimaryFontDisabled: themePrimitives.primary500,
  tagPrimaryOutlinedDisabled: themePrimitives.primary600,
  tagPrimarySolidFont: themePrimitives.primary700,
  tagPrimarySolidBackground: themePrimitives.primary200,
  tagPrimaryOutlinedFontHover: themePrimitives.primary200,
  tagPrimaryOutlinedHover: tagHoverBackground,
  tagPrimaryOutlinedBackground: themePrimitives.primary400,
  tagPrimaryOutlinedFont: themePrimitives.primary200,
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

  // Accent
  tagAccentFontDisabled: themePrimitives.accent500,
  tagAccentOutlinedDisabled: themePrimitives.accent700,
  tagAccentSolidFont: themePrimitives.accent100,
  tagAccentSolidBackground: themePrimitives.accent500,
  tagAccentOutlinedFontHover: themePrimitives.accent200,
  tagAccentOutlinedHover: tagHoverBackground,
  tagAccentOutlinedBackground: themePrimitives.accent500,
  tagAccentOutlinedFont: themePrimitives.accent200,
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

  // Positive
  tagPositiveFontDisabled: themePrimitives.positive500,
  tagPositiveOutlinedDisabled: themePrimitives.positive700,
  tagPositiveSolidFont: themePrimitives.positive100,
  tagPositiveSolidBackground: themePrimitives.positive500,
  tagPositiveOutlinedFontHover: themePrimitives.positive200,
  tagPositiveOutlinedHover: tagHoverBackground,
  tagPositiveOutlinedBackground: themePrimitives.positive500,
  tagPositiveOutlinedFont: themePrimitives.positive200,
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

  // Warning
  tagWarningFontDisabled: themePrimitives.warning500,
  tagWarningOutlinedDisabled: themePrimitives.warning700,
  tagWarningSolidFont: themePrimitives.warning100,
  tagWarningSolidBackground: themePrimitives.warning500,
  tagWarningOutlinedFontHover: themePrimitives.warning200,
  tagWarningOutlinedHover: tagHoverBackground,
  tagWarningOutlinedBackground: themePrimitives.warning500,
  tagWarningOutlinedFont: themePrimitives.warning200,
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

  // Negative
  tagNegativeFontDisabled: themePrimitives.negative500,
  tagNegativeOutlinedDisabled: themePrimitives.negative700,
  tagNegativeSolidFont: themePrimitives.negative100,
  tagNegativeSolidBackground: themePrimitives.negative500,
  tagNegativeOutlinedFontHover: themePrimitives.negative200,
  tagNegativeOutlinedHover: tagHoverBackground,
  tagNegativeOutlinedBackground: themePrimitives.negative500,
  tagNegativeOutlinedFont: themePrimitives.negative200,
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
