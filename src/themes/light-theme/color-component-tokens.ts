/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { SemanticColors, ComponentColors } from '../types';
import getSemanticColors from './color-semantic-tokens';
import { primitiveLightColors } from '../../tokens';

const defaultSemanticColors = getSemanticColors();

const tagHoverBackground = `rgba(0, 0, 0, 0.08)`;

/* ---- Component colors ---- */
export default (semanticColors: SemanticColors = defaultSemanticColors): ComponentColors => ({
  // Banner
  bannerActionLowInfo: primitiveLightColors.blue100,
  bannerActionLowNegative: primitiveLightColors.red100,
  bannerActionLowPositive: primitiveLightColors.green100,
  bannerActionLowWarning: primitiveLightColors.yellow100,
  bannerActionHighInfo: primitiveLightColors.blue700,
  bannerActionHighNegative: primitiveLightColors.red700,
  bannerActionHighPositive: primitiveLightColors.green700,
  bannerActionHighWarning: primitiveLightColors.yellow200,

  // BottomNavigation
  bottomNavigationText: primitiveLightColors.gray600,
  bottomNavigationSelectedText: semanticColors.contentPrimary,

  // Buttons
  buttonPrimaryFill: semanticColors.backgroundInversePrimary,

  buttonPrimaryText: semanticColors.contentInversePrimary,
  buttonPrimaryHover: primitiveLightColors.gray900,
  buttonPrimaryActive: primitiveLightColors.gray800,
  buttonPrimarySelectedFill: semanticColors.backgroundInversePrimary,
  buttonPrimarySelectedText: semanticColors.contentInversePrimary,
  buttonPrimarySpinnerForeground: semanticColors.backgroundAccent,
  buttonPrimarySpinnerBackground: semanticColors.backgroundPrimary,
  buttonSecondaryFill: semanticColors.backgroundSecondary,
  buttonSecondaryText: semanticColors.contentPrimary,
  buttonSecondaryHover: primitiveLightColors.gray200,
  buttonSecondaryActive: primitiveLightColors.gray300,
  buttonSecondarySelectedFill: semanticColors.backgroundInversePrimary,
  buttonSecondarySelectedText: semanticColors.contentInversePrimary,
  buttonSecondarySpinnerForeground: semanticColors.backgroundAccent,
  buttonSecondarySpinnerBackground: semanticColors.backgroundPrimary,
  buttonTertiaryFill: 'transparent',
  buttonTertiaryText: semanticColors.contentPrimary,
  buttonTertiaryHover: primitiveLightColors.gray50,
  buttonTertiaryActive: primitiveLightColors.gray100,
  buttonTertiarySelectedFill: semanticColors.backgroundInversePrimary,
  buttonTertiarySelectedText: semanticColors.contentInversePrimary,
  buttonTertiaryDisabledActiveFill: semanticColors.backgroundStateDisabled,
  buttonTertiaryDisabledActiveText: semanticColors.contentStateDisabled,
  buttonTertiarySpinnerForeground: semanticColors.backgroundAccent,
  buttonTertiarySpinnerBackground: semanticColors.backgroundTertiary,
  buttonDisabledFill: semanticColors.backgroundStateDisabled,
  buttonDisabledText: semanticColors.contentStateDisabled,
  buttonDisabledActiveFill: semanticColors.backgroundStateDisabled,
  buttonDisabledActiveText: semanticColors.contentStateDisabled,
  buttonDisabledSpinnerForeground: semanticColors.contentStateDisabled,
  buttonDisabledSpinnerBackground: semanticColors.backgroundPrimary,

  // Breadcrumbs
  breadcrumbsText: semanticColors.contentPrimary,

  breadcrumbsSeparatorFill: semanticColors.contentTertiary,

  // Datepicker
  calendarBackground: semanticColors.backgroundPrimary,

  calendarForeground: semanticColors.contentPrimary,
  calendarForegroundDisabled: semanticColors.contentStateDisabled,
  calendarHeaderBackground: semanticColors.backgroundPrimary,
  calendarHeaderForeground: semanticColors.contentPrimary,
  calendarHeaderBackgroundActive: semanticColors.backgroundInversePrimary,
  calendarHeaderForegroundDisabled: semanticColors.contentStateDisabled,
  calendarDayForegroundPseudoSelected: semanticColors.backgroundInversePrimary,
  calendarDayBackgroundPseudoSelectedHighlighted: semanticColors.backgroundTertiary,
  calendarDayForegroundPseudoSelectedHighlighted: semanticColors.contentPrimary,
  calendarDayBackgroundSelected: semanticColors.backgroundInversePrimary,
  calendarDayForegroundSelected: semanticColors.contentInversePrimary,
  calendarDayBackgroundSelectedHighlighted: semanticColors.backgroundInversePrimary,
  calendarDayForegroundSelectedHighlighted: semanticColors.contentInversePrimary,

  // Combobox
  comboboxListItemFocus: semanticColors.backgroundSecondary,

  comboboxListItemHover: semanticColors.backgroundTertiary,

  // FileUploader
  fileUploaderBackgroundColor: semanticColors.backgroundSecondary,

  fileUploaderBackgroundColorActive: semanticColors.backgroundPrimary,
  fileUploaderBorderColorActive: semanticColors.borderSelected,
  fileUploaderBorderColorDefault: semanticColors.borderOpaque,
  fileUploaderMessageColor: semanticColors.contentPrimary,

  // Links
  linkText: semanticColors.contentPrimary,

  linkVisited: primitiveLightColors.gray600,
  linkHover: primitiveLightColors.gray800,
  linkActive: primitiveLightColors.gray700,

  // List
  listHeaderFill: semanticColors.backgroundPrimary,

  listBodyFill: semanticColors.backgroundPrimary,

  // ProgressSteps
  progressStepsCompletedText: semanticColors.contentInversePrimary,

  progressStepsCompletedFill: semanticColors.backgroundInversePrimary,
  progressStepsActiveText: semanticColors.contentInversePrimary,
  progressStepsActiveFill: semanticColors.backgroundInversePrimary,

  // Toggle
  toggleFill: semanticColors.backgroundPrimary,

  toggleFillChecked: semanticColors.contentPrimary,
  toggleFillDisabled: semanticColors.contentStateDisabled,
  toggleTrackFill: semanticColors.backgroundTertiary,
  toggleTrackFillDisabled: semanticColors.backgroundStateDisabled,

  // Tick
  tickFill: semanticColors.backgroundPrimary,

  tickFillHover: primitiveLightColors.gray50,
  tickFillActive: primitiveLightColors.gray100,
  tickFillSelected: semanticColors.contentPrimary,
  tickFillSelectedHover: primitiveLightColors.gray900,
  tickFillSelectedHoverActive: primitiveLightColors.gray800,
  tickFillError: semanticColors.backgroundPrimary,
  tickFillErrorHover: primitiveLightColors.gray50,
  tickFillErrorHoverActive: primitiveLightColors.gray100,
  tickFillErrorSelected: semanticColors.contentNegative,
  tickFillErrorSelectedHover: primitiveLightColors.red700,
  tickFillErrorSelectedHoverActive: primitiveLightColors.red800,
  tickFillDisabled: semanticColors.backgroundStateDisabled,
  tickBorder: semanticColors.contentTertiary,
  tickBorderError: semanticColors.borderNegative,
  tickMarkFill: semanticColors.contentInversePrimary,
  tickMarkFillError: semanticColors.contentOnColor,
  tickMarkFillDisabled: semanticColors.contentInversePrimary,

  // Slider/Toggle
  sliderTrackFill: 'transparent',

  sliderHandleFill: semanticColors.contentPrimary,
  sliderHandleFillDisabled: semanticColors.backgroundStateDisabled,
  sliderHandleInnerFill: semanticColors.contentPrimary,
  sliderTrackFillHover: primitiveLightColors.gray200,
  sliderTrackFillActive: primitiveLightColors.gray300,
  sliderTrackFillDisabled: semanticColors.backgroundStateDisabled,
  sliderHandleInnerFillDisabled: semanticColors.backgroundStateDisabled,
  sliderHandleInnerFillSelectedHover: primitiveLightColors.gray900,
  sliderHandleInnerFillSelectedActive: primitiveLightColors.gray800,

  // Inputs
  inputBorder: semanticColors.borderOpaque,

  inputFill: semanticColors.backgroundSecondary,
  inputFillError: semanticColors.backgroundPrimary,
  inputFillDisabled: semanticColors.backgroundStateDisabled,
  inputFillActive: semanticColors.backgroundPrimary,
  inputFillPositive: semanticColors.backgroundPrimary,
  inputTextDisabled: semanticColors.contentStateDisabled,
  inputBorderError: semanticColors.borderNegative,
  inputBorderPositive: semanticColors.borderPositive,
  inputEnhancerFill: semanticColors.contentPrimary,
  inputEnhancerFillDisabled: semanticColors.contentStateDisabled,
  inputEnhancerTextDisabled: semanticColors.contentStateDisabled,
  inputPlaceholder: semanticColors.contentTertiary,
  inputPlaceholderDisabled: semanticColors.contentStateDisabled,

  // Menu
  menuFill: semanticColors.backgroundPrimary,

  menuFillHover: semanticColors.backgroundSecondary,
  menuFontDefault: semanticColors.contentPrimary,
  menuFontDisabled: semanticColors.contentStateDisabled,
  menuFontHighlighted: semanticColors.contentPrimary,
  menuFontSelected: semanticColors.contentPrimary,

  // Modal
  modalCloseColor: semanticColors.contentPrimary,

  modalCloseColorHover: primitiveLightColors.gray900,
  modalCloseColorFocus: primitiveLightColors.gray800,

  // Tab
  tabBarFill: semanticColors.backgroundPrimary,

  tabColor: semanticColors.contentTertiary,

  // Notification
  notificationInfoBackground: semanticColors.backgroundAccentLight,

  notificationInfoText: semanticColors.contentPrimary,
  notificationPositiveBackground: semanticColors.backgroundPositiveLight,
  notificationPositiveText: semanticColors.contentPrimary,
  notificationWarningBackground: semanticColors.backgroundWarningLight,
  notificationWarningText: semanticColors.contentPrimary,
  notificationNegativeBackground: semanticColors.backgroundNegativeLight,
  notificationNegativeText: semanticColors.contentPrimary,

  // Tag

  // Custom ramps
  tagFontDisabledRampUnit: '200',

  tagSolidFontRampUnit: '0',
  tagSolidRampUnit: '400',
  tagOutlinedFontRampUnit: '600',
  tagOutlinedRampUnit: '600',

  // Deprecated
  tagSolidHoverRampUnit: '50',

  tagSolidActiveRampUnit: '100',
  tagSolidDisabledRampUnit: '50',
  tagSolidFontHoverRampUnit: '700',
  tagLightRampUnit: '50',
  tagLightHoverRampUnit: '100',
  tagLightActiveRampUnit: '200',
  tagLightFontRampUnit: '600',
  tagLightFontHoverRampUnit: '200',
  tagOutlinedHoverRampUnit: '700',
  tagOutlinedActiveRampUnit: '800',
  tagOutlinedFontHoverRampUnit: '700',

  // Neutral
  tagNeutralFontDisabled: primitiveLightColors.gray200,

  tagNeutralOutlinedDisabled: primitiveLightColors.gray200,
  tagNeutralSolidFont: primitiveLightColors.white,
  tagNeutralSolidBackground: primitiveLightColors.gray600,
  tagNeutralOutlinedBackground: primitiveLightColors.gray50,
  tagNeutralOutlinedFont: primitiveLightColors.gray700,

  // Deprecated
  tagNeutralSolidHover: primitiveLightColors.gray900,

  tagNeutralSolidActive: primitiveLightColors.gray800,
  tagNeutralSolidDisabled: primitiveLightColors.gray200,
  tagNeutralSolidFontHover: primitiveLightColors.gray700,
  tagNeutralLightBackground: primitiveLightColors.white,
  tagNeutralLightHover: primitiveLightColors.gray50,
  tagNeutralLightActive: primitiveLightColors.gray100,
  tagNeutralLightDisabled: primitiveLightColors.gray200,
  tagNeutralLightFont: primitiveLightColors.gray600,
  tagNeutralLightFontHover: primitiveLightColors.gray700,
  tagNeutralOutlinedActive: primitiveLightColors.gray800,
  tagNeutralOutlinedFontHover: primitiveLightColors.gray700,
  tagNeutralOutlinedHover: tagHoverBackground,

  // Primary
  tagPrimaryFontDisabled: primitiveLightColors.gray300,

  tagPrimaryOutlinedDisabled: primitiveLightColors.gray200,
  tagPrimarySolidFont: primitiveLightColors.white,
  tagPrimarySolidBackground: primitiveLightColors.gray600,
  tagPrimaryOutlinedFontHover: primitiveLightColors.gray900,
  tagPrimaryOutlinedFont: primitiveLightColors.gray700,

  // Deprecated
  tagPrimarySolidHover: primitiveLightColors.gray900,

  tagPrimarySolidActive: primitiveLightColors.gray900,
  tagPrimarySolidDisabled: primitiveLightColors.gray200,
  tagPrimarySolidFontHover: primitiveLightColors.gray900,
  tagPrimaryLightBackground: primitiveLightColors.white,
  tagPrimaryLightHover: primitiveLightColors.gray50,
  tagPrimaryLightActive: primitiveLightColors.gray100,
  tagPrimaryLightDisabled: primitiveLightColors.gray200,
  tagPrimaryLightFont: primitiveLightColors.black,
  tagPrimaryLightFontHover: primitiveLightColors.gray900,
  tagPrimaryOutlinedActive: primitiveLightColors.gray900,
  tagPrimaryOutlinedHover: tagHoverBackground,
  tagPrimaryOutlinedBackground: primitiveLightColors.gray50,

  // Accent
  tagAccentFontDisabled: primitiveLightColors.blue300,

  tagAccentOutlinedDisabled: primitiveLightColors.blue200,
  tagAccentSolidFont: primitiveLightColors.white,
  tagAccentSolidBackground: primitiveLightColors.blue600,
  tagAccentOutlinedBackground: primitiveLightColors.blue50,
  tagAccentOutlinedFont: primitiveLightColors.blue700,

  // Deprecated
  tagAccentSolidHover: primitiveLightColors.blue50,

  tagAccentSolidActive: primitiveLightColors.blue100,
  tagAccentSolidDisabled: primitiveLightColors.blue50,
  tagAccentSolidFontHover: primitiveLightColors.blue500,
  tagAccentLightBackground: primitiveLightColors.blue50,
  tagAccentLightHover: primitiveLightColors.blue100,
  tagAccentLightActive: primitiveLightColors.blue200,
  tagAccentLightDisabled: primitiveLightColors.blue50,
  tagAccentLightFont: primitiveLightColors.blue600,
  tagAccentLightFontHover: primitiveLightColors.blue700,
  tagAccentOutlinedActive: primitiveLightColors.blue800,
  tagAccentOutlinedFontHover: primitiveLightColors.blue700,
  tagAccentOutlinedHover: tagHoverBackground,

  // Positive
  tagPositiveFontDisabled: primitiveLightColors.green300,

  tagPositiveOutlinedDisabled: primitiveLightColors.green200,
  tagPositiveSolidFont: primitiveLightColors.white,
  tagPositiveSolidBackground: primitiveLightColors.green600,
  tagPositiveOutlinedBackground: primitiveLightColors.green50,
  tagPositiveOutlinedFont: primitiveLightColors.green700,

  // Deprecated
  tagPositiveSolidHover: primitiveLightColors.green50,

  tagPositiveSolidActive: primitiveLightColors.green100,
  tagPositiveSolidDisabled: primitiveLightColors.green50,
  tagPositiveSolidFontHover: primitiveLightColors.green500,
  tagPositiveLightBackground: primitiveLightColors.green50,
  tagPositiveLightHover: primitiveLightColors.green100,
  tagPositiveLightActive: primitiveLightColors.green200,
  tagPositiveLightDisabled: primitiveLightColors.green50,
  tagPositiveLightFont: primitiveLightColors.green600,
  tagPositiveLightFontHover: primitiveLightColors.green700,
  tagPositiveOutlinedActive: primitiveLightColors.green800,
  tagPositiveOutlinedFontHover: primitiveLightColors.green700,
  tagPositiveOutlinedHover: tagHoverBackground,

  // Warning
  tagWarningFontDisabled: primitiveLightColors.yellow200,

  tagWarningOutlinedDisabled: primitiveLightColors.yellow200,
  tagWarningSolidFont: primitiveLightColors.yellow900,
  tagWarningSolidBackground: primitiveLightColors.yellow300,
  tagWarningOutlinedBackground: primitiveLightColors.yellow50,
  tagWarningOutlinedFont: primitiveLightColors.yellow700,

  // Deprecated
  tagWarningSolidHover: primitiveLightColors.yellow50,

  tagWarningSolidActive: primitiveLightColors.yellow100,
  tagWarningSolidDisabled: primitiveLightColors.yellow50,
  tagWarningSolidFontHover: primitiveLightColors.yellow500,
  tagWarningLightBackground: primitiveLightColors.yellow50,
  tagWarningLightHover: primitiveLightColors.yellow100,
  tagWarningLightActive: primitiveLightColors.yellow200,
  tagWarningLightDisabled: primitiveLightColors.yellow50,
  tagWarningLightFont: primitiveLightColors.yellow600,
  tagWarningLightFontHover: primitiveLightColors.yellow700,
  tagWarningOutlinedActive: primitiveLightColors.yellow800,
  tagWarningOutlinedFontHover: primitiveLightColors.yellow700,
  tagWarningOutlinedHover: tagHoverBackground,

  // Negative
  tagNegativeFontDisabled: primitiveLightColors.red300,

  tagNegativeOutlinedDisabled: primitiveLightColors.red200,
  tagNegativeSolidFont: primitiveLightColors.white,
  tagNegativeSolidBackground: primitiveLightColors.red600,
  tagNegativeOutlinedBackground: primitiveLightColors.red50,
  tagNegativeOutlinedFont: primitiveLightColors.red700,

  // Deprecated
  tagNegativeSolidHover: primitiveLightColors.red50,

  tagNegativeSolidActive: primitiveLightColors.red100,
  tagNegativeSolidDisabled: primitiveLightColors.red50,
  tagNegativeSolidFontHover: primitiveLightColors.red500,
  tagNegativeLightBackground: primitiveLightColors.red50,
  tagNegativeLightHover: primitiveLightColors.red100,
  tagNegativeLightActive: primitiveLightColors.red200,
  tagNegativeLightDisabled: primitiveLightColors.red50,
  tagNegativeLightFont: primitiveLightColors.red600,
  tagNegativeLightFontHover: primitiveLightColors.red700,
  tagNegativeOutlinedActive: primitiveLightColors.red800,
  tagNegativeOutlinedFontHover: primitiveLightColors.red700,
  tagNegativeOutlinedHover: tagHoverBackground,

  // Table
  tableHeadBackgroundColor: semanticColors.backgroundPrimary,

  tableBackground: semanticColors.backgroundPrimary,
  tableStripedBackground: semanticColors.backgroundSecondary,
  tableFilter: semanticColors.contentTertiary,
  tableFilterHeading: semanticColors.contentPrimary,
  tableFilterBackground: semanticColors.backgroundPrimary,
  tableFilterFooterBackground: semanticColors.backgroundSecondary,

  // Toast
  toastText: semanticColors.contentOnColor,

  toastPrimaryText: semanticColors.contentOnColor,
  toastInfoBackground: semanticColors.backgroundAccent,
  toastInfoText: semanticColors.contentOnColor,
  toastPositiveBackground: semanticColors.backgroundPositive,
  toastPositiveText: semanticColors.contentOnColor,
  toastWarningBackground: semanticColors.backgroundWarning,
  toastWarningText: semanticColors.contentOnColorInverse,
  toastNegativeBackground: semanticColors.backgroundNegative,
  toastNegativeText: semanticColors.contentOnColor,

  // Spinner
  spinnerTrackFill: semanticColors.backgroundTertiary,

  // Progress bar
  progressbarTrackFill: semanticColors.backgroundTertiary,

  // Tooltip
  tooltipBackground: semanticColors.backgroundInverseSecondary,

  tooltipText: semanticColors.contentInversePrimary,

  // Rating
  ratingInactiveFill: semanticColors.backgroundPrimary,
  ratingStroke: semanticColors.contentPrimary,
});
