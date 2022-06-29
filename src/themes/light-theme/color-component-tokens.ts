/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import colorTokens from './color-tokens';
import type { ColorTokens, ComponentColorTokens } from '../types';

const tagHoverBackground = `rgba(0, 0, 0, 0.08)`;

/* ---- Component colors ---- */
// TODO(#2318) Make it a plain object in the next v11 major version
// with values taken from `colorTokens`.
// Due to the legacy `createTheme` type the value need to be
// overrideable through primitives (`foundation` )
export default (themePrimitives: ColorTokens = colorTokens): ComponentColorTokens => ({
  bannerActionLowInfo: themePrimitives.accent100,
  bannerActionLowNegative: themePrimitives.negative100,
  bannerActionLowPositive: themePrimitives.positive100,
  bannerActionLowWarning: themePrimitives.warning200,
  bannerActionHighInfo: themePrimitives.accent500,
  bannerActionHighNegative: themePrimitives.negative500,
  bannerActionHighPositive: themePrimitives.positive500,
  bannerActionHighWarning: themePrimitives.warning200,

  // Buttons
  buttonPrimaryFill: themePrimitives.primary,

  buttonPrimaryText: themePrimitives.white,
  buttonPrimaryHover: themePrimitives.primary700,
  buttonPrimaryActive: themePrimitives.primary600,
  buttonPrimarySelectedFill: themePrimitives.primary600,
  buttonPrimarySelectedText: themePrimitives.white,
  buttonPrimarySpinnerForeground: themePrimitives.accent,
  buttonPrimarySpinnerBackground: themePrimitives.primaryB,
  buttonSecondaryFill: themePrimitives.primary100,
  buttonSecondaryText: themePrimitives.primary,
  buttonSecondaryHover: themePrimitives.primary200,
  buttonSecondaryActive: themePrimitives.primary300,
  buttonSecondarySelectedFill: themePrimitives.primary300,
  buttonSecondarySelectedText: themePrimitives.primary,
  buttonSecondarySpinnerForeground: themePrimitives.accent,
  buttonSecondarySpinnerBackground: themePrimitives.primaryB,
  buttonTertiaryFill: 'transparent',
  buttonTertiaryText: themePrimitives.primary,
  buttonTertiaryHover: themePrimitives.primary50,
  buttonTertiaryActive: themePrimitives.primary100,
  buttonTertiarySelectedFill: themePrimitives.primary100,
  buttonTertiarySelectedText: themePrimitives.primary,
  buttonTertiaryDisabledActiveFill: themePrimitives.primary50,
  buttonTertiaryDisabledActiveText: themePrimitives.mono600,
  buttonTertiarySpinnerForeground: themePrimitives.accent,
  buttonTertiarySpinnerBackground: themePrimitives.primary100,
  buttonDisabledFill: themePrimitives.mono200,
  buttonDisabledText: themePrimitives.mono600,
  buttonDisabledActiveFill: themePrimitives.mono700,
  buttonDisabledActiveText: themePrimitives.mono100,
  buttonDisabledSpinnerForeground: themePrimitives.mono600,
  buttonDisabledSpinnerBackground: themePrimitives.mono400,

  // Breadcrumbs
  breadcrumbsText: themePrimitives.mono900,

  breadcrumbsSeparatorFill: themePrimitives.mono700,

  // Datepicker
  calendarBackground: themePrimitives.mono100,

  calendarForeground: themePrimitives.mono1000,
  calendarForegroundDisabled: themePrimitives.mono500,
  calendarHeaderBackground: themePrimitives.white,
  calendarHeaderForeground: themePrimitives.primary,
  calendarHeaderBackgroundActive: themePrimitives.primary700,
  calendarHeaderForegroundDisabled: themePrimitives.primary500,
  calendarDayForegroundPseudoSelected: themePrimitives.mono1000,
  calendarDayBackgroundPseudoSelectedHighlighted: themePrimitives.primary200,
  calendarDayForegroundPseudoSelectedHighlighted: themePrimitives.mono1000,
  calendarDayBackgroundSelected: themePrimitives.primary,
  calendarDayForegroundSelected: themePrimitives.white,
  calendarDayBackgroundSelectedHighlighted: themePrimitives.primary,
  calendarDayForegroundSelectedHighlighted: themePrimitives.white,

  // Combobox
  comboboxListItemFocus: themePrimitives.mono200,

  comboboxListItemHover: themePrimitives.mono300,

  // FileUploader
  fileUploaderBackgroundColor: themePrimitives.mono200,

  fileUploaderBackgroundColorActive: themePrimitives.primary50,
  fileUploaderBorderColorActive: themePrimitives.primary,
  fileUploaderBorderColorDefault: themePrimitives.mono500,
  fileUploaderMessageColor: themePrimitives.mono800,

  // Links
  linkText: themePrimitives.primary,

  linkVisited: themePrimitives.primary700,
  linkHover: themePrimitives.primary600,
  linkActive: themePrimitives.primary500,

  // List
  listHeaderFill: themePrimitives.white,

  listBodyFill: themePrimitives.white,

  // ProgressSteps
  progressStepsCompletedText: themePrimitives.white,

  progressStepsCompletedFill: themePrimitives.primary,
  progressStepsActiveText: themePrimitives.white,
  progressStepsActiveFill: themePrimitives.primary,

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
  tickBorder: themePrimitives.mono700,
  tickBorderError: themePrimitives.negative400,
  tickMarkFill: themePrimitives.white,
  tickMarkFillError: themePrimitives.white,
  tickMarkFillDisabled: themePrimitives.mono100,

  // Slider/Toggle
  sliderTrackFill: 'transparent',

  sliderHandleFill: themePrimitives.primaryA,
  sliderHandleFillDisabled: themePrimitives.primary400,
  sliderHandleInnerFill: themePrimitives.primaryA,
  sliderTrackFillHover: themePrimitives.mono500,
  sliderTrackFillActive: themePrimitives.mono600,
  sliderTrackFillDisabled: themePrimitives.mono300,
  sliderHandleInnerFillDisabled: themePrimitives.mono400,
  sliderHandleInnerFillSelectedHover: themePrimitives.primary,
  sliderHandleInnerFillSelectedActive: themePrimitives.primary500,

  // Inputs
  inputBorder: themePrimitives.mono300,

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
  inputPlaceholder: themePrimitives.mono700,
  inputPlaceholderDisabled: themePrimitives.mono600,

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

  // Tab
  tabBarFill: themePrimitives.mono200,

  tabColor: themePrimitives.mono800,

  // Notification
  notificationInfoBackground: themePrimitives.accent50,

  notificationInfoText: themePrimitives.primaryA,
  notificationPositiveBackground: themePrimitives.positive50,
  notificationPositiveText: themePrimitives.primaryA,
  notificationWarningBackground: themePrimitives.warning50,
  notificationWarningText: themePrimitives.primaryA,
  notificationNegativeBackground: themePrimitives.negative50,
  notificationNegativeText: themePrimitives.primaryA,

  // Tag

  // Custom ramps
  tagFontDisabledRampUnit: '100',

  tagSolidFontRampUnit: '0',
  tagSolidRampUnit: '400',
  tagOutlinedFontRampUnit: '400',
  tagOutlinedRampUnit: '200',

  // Deprecated
  tagSolidHoverRampUnit: '50',

  tagSolidActiveRampUnit: '100',
  tagSolidDisabledRampUnit: '50',
  tagSolidFontHoverRampUnit: '500',
  tagLightRampUnit: '50',
  tagLightHoverRampUnit: '100',
  tagLightActiveRampUnit: '100',
  tagLightFontRampUnit: '500',
  tagLightFontHoverRampUnit: '500',
  tagOutlinedHoverRampUnit: '50',
  tagOutlinedActiveRampUnit: '0',
  tagOutlinedFontHoverRampUnit: '400',

  // Neutral
  tagNeutralFontDisabled: themePrimitives.mono600,

  tagNeutralOutlinedDisabled: themePrimitives.mono400,
  tagNeutralSolidFont: themePrimitives.white,
  tagNeutralSolidBackground: themePrimitives.black,
  tagNeutralOutlinedBackground: themePrimitives.mono600,
  tagNeutralOutlinedFont: themePrimitives.black,

  // Deprecated
  tagNeutralSolidHover: themePrimitives.mono300,

  tagNeutralSolidActive: themePrimitives.mono400,
  tagNeutralSolidDisabled: themePrimitives.mono200,
  tagNeutralSolidFontHover: themePrimitives.mono900,
  tagNeutralLightBackground: themePrimitives.mono300,
  tagNeutralLightHover: themePrimitives.mono300,
  tagNeutralLightActive: themePrimitives.mono400,
  tagNeutralLightDisabled: themePrimitives.mono200,
  tagNeutralLightFont: themePrimitives.mono900,
  tagNeutralLightFontHover: themePrimitives.mono900,
  tagNeutralOutlinedActive: themePrimitives.mono900,
  tagNeutralOutlinedFontHover: themePrimitives.mono800,
  tagNeutralOutlinedHover: tagHoverBackground,

  // Primary
  tagPrimaryFontDisabled: themePrimitives.primary400,

  tagPrimaryOutlinedDisabled: themePrimitives.primary200,
  tagPrimarySolidFont: themePrimitives.white,
  tagPrimarySolidBackground: themePrimitives.primary,
  tagPrimaryOutlinedFontHover: themePrimitives.primary,
  tagPrimaryOutlinedFont: themePrimitives.primary,

  // Deprecated
  tagPrimarySolidHover: themePrimitives.primary100,

  tagPrimarySolidActive: themePrimitives.primary200,
  tagPrimarySolidDisabled: themePrimitives.primary50,
  tagPrimarySolidFontHover: themePrimitives.primary700,
  tagPrimaryLightBackground: themePrimitives.primary50,
  tagPrimaryLightHover: themePrimitives.primary100,
  tagPrimaryLightActive: themePrimitives.primary100,
  tagPrimaryLightDisabled: themePrimitives.primary50,
  tagPrimaryLightFont: themePrimitives.primary500,
  tagPrimaryLightFontHover: themePrimitives.primary500,
  tagPrimaryOutlinedActive: themePrimitives.primary600,
  tagPrimaryOutlinedHover: tagHoverBackground,
  tagPrimaryOutlinedBackground: themePrimitives.primary400,

  // Accent
  tagAccentFontDisabled: themePrimitives.accent200,

  tagAccentOutlinedDisabled: themePrimitives.accent200,
  tagAccentSolidFont: themePrimitives.white,
  tagAccentSolidBackground: themePrimitives.accent400,
  tagAccentOutlinedBackground: themePrimitives.accent200,
  tagAccentOutlinedFont: themePrimitives.accent400,

  // Deprecated
  tagAccentSolidHover: themePrimitives.accent50,

  tagAccentSolidActive: themePrimitives.accent100,
  tagAccentSolidDisabled: themePrimitives.accent50,
  tagAccentSolidFontHover: themePrimitives.accent500,
  tagAccentLightBackground: themePrimitives.accent50,
  tagAccentLightHover: themePrimitives.accent100,
  tagAccentLightActive: themePrimitives.accent100,
  tagAccentLightDisabled: themePrimitives.accent50,
  tagAccentLightFont: themePrimitives.accent500,
  tagAccentLightFontHover: themePrimitives.accent500,
  tagAccentOutlinedActive: themePrimitives.accent600,
  tagAccentOutlinedFontHover: themePrimitives.accent400,
  tagAccentOutlinedHover: tagHoverBackground,

  // Positive
  tagPositiveFontDisabled: themePrimitives.positive200,

  tagPositiveOutlinedDisabled: themePrimitives.positive200,
  tagPositiveSolidFont: themePrimitives.white,
  tagPositiveSolidBackground: themePrimitives.positive400,
  tagPositiveOutlinedBackground: themePrimitives.positive200,
  tagPositiveOutlinedFont: themePrimitives.positive400,

  // Deprecated
  tagPositiveSolidHover: themePrimitives.positive50,

  tagPositiveSolidActive: themePrimitives.positive100,
  tagPositiveSolidDisabled: themePrimitives.positive50,
  tagPositiveSolidFontHover: themePrimitives.positive500,
  tagPositiveLightBackground: themePrimitives.positive50,
  tagPositiveLightHover: themePrimitives.positive100,
  tagPositiveLightActive: themePrimitives.positive100,
  tagPositiveLightDisabled: themePrimitives.positive50,
  tagPositiveLightFont: themePrimitives.positive500,
  tagPositiveLightFontHover: themePrimitives.positive500,
  tagPositiveOutlinedActive: themePrimitives.positive600,
  tagPositiveOutlinedFontHover: themePrimitives.positive400,
  tagPositiveOutlinedHover: tagHoverBackground,

  // Warning
  tagWarningFontDisabled: themePrimitives.warning300,

  tagWarningOutlinedDisabled: themePrimitives.warning300,
  tagWarningSolidFont: themePrimitives.warning700,
  tagWarningSolidBackground: themePrimitives.warning400,
  tagWarningOutlinedBackground: themePrimitives.warning300,
  tagWarningOutlinedFont: themePrimitives.warning600,

  // Deprecated
  tagWarningSolidHover: themePrimitives.warning50,

  tagWarningSolidActive: themePrimitives.warning100,
  tagWarningSolidDisabled: themePrimitives.warning50,
  tagWarningSolidFontHover: themePrimitives.warning500,
  tagWarningLightBackground: themePrimitives.warning50,
  tagWarningLightHover: themePrimitives.warning100,
  tagWarningLightActive: themePrimitives.warning100,
  tagWarningLightDisabled: themePrimitives.warning50,
  tagWarningLightFont: themePrimitives.warning500,
  tagWarningLightFontHover: themePrimitives.warning500,
  tagWarningOutlinedActive: themePrimitives.warning600,
  tagWarningOutlinedFontHover: themePrimitives.warning600,
  tagWarningOutlinedHover: tagHoverBackground,

  // Negative
  tagNegativeFontDisabled: themePrimitives.negative200,

  tagNegativeOutlinedDisabled: themePrimitives.negative200,
  tagNegativeSolidFont: themePrimitives.white,
  tagNegativeSolidBackground: themePrimitives.negative400,
  tagNegativeOutlinedBackground: themePrimitives.negative200,
  tagNegativeOutlinedFont: themePrimitives.negative400,

  // Deprecated
  tagNegativeSolidHover: themePrimitives.negative50,

  tagNegativeSolidActive: themePrimitives.negative100,
  tagNegativeSolidDisabled: themePrimitives.negative50,
  tagNegativeSolidFontHover: themePrimitives.negative500,
  tagNegativeLightBackground: themePrimitives.negative50,
  tagNegativeLightHover: themePrimitives.negative100,
  tagNegativeLightActive: themePrimitives.negative100,
  tagNegativeLightDisabled: themePrimitives.negative50,
  tagNegativeLightFont: themePrimitives.negative500,
  tagNegativeLightFontHover: themePrimitives.negative500,
  tagNegativeOutlinedActive: themePrimitives.negative600,
  tagNegativeOutlinedFontHover: themePrimitives.negative400,
  tagNegativeOutlinedHover: tagHoverBackground,

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

  toastPrimaryText: themePrimitives.white,
  toastInfoBackground: themePrimitives.accent400,
  toastInfoText: themePrimitives.white,
  toastPositiveBackground: themePrimitives.positive400,
  toastPositiveText: themePrimitives.white,
  toastWarningBackground: themePrimitives.warning400,
  toastWarningText: themePrimitives.black,
  toastNegativeBackground: themePrimitives.negative400,
  toastNegativeText: themePrimitives.white,

  // Spinner
  spinnerTrackFill: themePrimitives.mono900,

  // Progress bar
  progressbarTrackFill: themePrimitives.mono900,

  // Tooltip
  tooltipBackground: themePrimitives.mono900,

  tooltipText: themePrimitives.mono100,
});
