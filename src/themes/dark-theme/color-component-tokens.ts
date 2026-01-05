/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { SemanticColors, ComponentColors } from '../types';
import getSemanticColors from './color-semantic-tokens';
import { primitiveDarkColors } from '../../tokens';

const defaultSemanticColors = getSemanticColors();

const tagHoverBackground = `rgba(255, 255, 255, 0.2)`;

/* ---- Component colors ---- */
export default (semanticColors: SemanticColors = defaultSemanticColors): ComponentColors => ({
  //Banner
  bannerActionLowInfo: primitiveDarkColors.blue100Dark,
  bannerActionLowNegative: primitiveDarkColors.red200Dark,
  bannerActionLowPositive: primitiveDarkColors.green200Dark,
  bannerActionLowWarning: primitiveDarkColors.yellow200Dark,
  bannerActionHighInfo: primitiveDarkColors.blue300Dark,
  bannerActionHighNegative: primitiveDarkColors.red300Dark,
  bannerActionHighPositive: primitiveDarkColors.green300Dark,
  bannerActionHighWarning: primitiveDarkColors.yellow300Dark,

  // BottomNavigation
  bottomNavigationText: primitiveDarkColors.gray600Dark,
  bottomNavigationSelectedText: semanticColors.contentPrimary,

  // Buttons
  buttonPrimaryFill: semanticColors.backgroundInversePrimary,
  buttonPrimaryText: semanticColors.contentInversePrimary,
  buttonPrimaryHover: primitiveDarkColors.gray700Dark,
  buttonPrimaryActive: primitiveDarkColors.gray600Dark,
  buttonPrimaryHoverOverlay: semanticColors.hoverOverlayInverseAlpha,
  buttonPrimaryActiveOverlay: semanticColors.pressedOverlayInverseAlpha,
  buttonPrimarySelectedFill: semanticColors.backgroundInversePrimary,
  buttonPrimarySelectedText: semanticColors.contentInversePrimary,
  buttonPrimaryLoadingFill: semanticColors.backgroundInversePrimary,
  buttonPrimarySpinnerForeground: semanticColors.backgroundAccent,
  buttonPrimarySpinnerBackground: semanticColors.backgroundPrimary,

  buttonSecondaryFill: semanticColors.backgroundSecondary,
  buttonSecondaryText: semanticColors.contentPrimary,
  buttonSecondaryHover: primitiveDarkColors.gray300Dark,
  buttonSecondaryActive: primitiveDarkColors.gray400Dark,
  buttonSecondaryHoverOverlay: semanticColors.hoverOverlayAlpha,
  buttonSecondaryActiveOverlay: semanticColors.pressedOverlayAlpha,
  buttonSecondarySelectedFill: semanticColors.backgroundInversePrimary,
  buttonSecondarySelectedText: semanticColors.contentInversePrimary,
  buttonSecondaryLoadingFill: semanticColors.backgroundSecondary,
  buttonSecondarySpinnerForeground: semanticColors.backgroundAccent,
  buttonSecondarySpinnerBackground: semanticColors.backgroundPrimary,

  buttonTertiaryFill: 'transparent',
  buttonTertiaryText: semanticColors.contentPrimary,
  buttonTertiaryHover: primitiveDarkColors.gray100Dark,
  buttonTertiaryActive: primitiveDarkColors.gray200Dark,
  buttonTertiaryHoverOverlay: semanticColors.hoverOverlayAlpha,
  buttonTertiaryActiveOverlay: semanticColors.pressedOverlayAlpha,
  buttonTertiarySelectedFill: 'transparent',
  buttonTertiarySelectedText: semanticColors.contentPrimary,
  buttonTertiaryLoadingFill: 'transparent',
  buttonTertiaryFocusFill: semanticColors.backgroundTertiary,
  buttonTertiaryDisabledActiveFill: semanticColors.backgroundStateDisabled,
  buttonTertiaryDisabledActiveText: semanticColors.contentStateDisabled,
  buttonTertiarySpinnerForeground: semanticColors.backgroundAccent,
  buttonTertiarySpinnerBackground: semanticColors.backgroundTertiary,

  buttonDangerPrimaryFill: semanticColors.backgroundNegative,
  buttonDangerPrimaryText: semanticColors.contentOnColor,
  buttonDangerPrimaryHoverOverlay: semanticColors.hoverOverlayAlpha,
  buttonDangerPrimaryActiveOverlay: semanticColors.pressedOverlayAlpha,
  buttonDangerPrimarySelectedFill: semanticColors.backgroundNegative,
  buttonDangerPrimarySelectedText: semanticColors.contentOnColor,
  buttonDangerPrimaryLoadingFill: semanticColors.backgroundNegative,
  buttonDangerPrimarySpinnerForeground: semanticColors.backgroundAccent,
  buttonDangerPrimarySpinnerBackground: semanticColors.backgroundPrimary,

  buttonDangerSecondaryFill: semanticColors.backgroundSecondary,
  buttonDangerSecondaryText: semanticColors.contentNegative,
  buttonDangerSecondaryHoverOverlay: semanticColors.hoverOverlayAlpha,
  buttonDangerSecondaryActiveOverlay: semanticColors.pressedOverlayAlpha,
  buttonDangerSecondarySelectedFill: semanticColors.backgroundNegative,
  buttonDangerSecondarySelectedText: semanticColors.contentOnColor,
  buttonDangerSecondaryLoadingFill: semanticColors.backgroundSecondary,
  buttonDangerSecondarySpinnerForeground: semanticColors.backgroundAccent,
  buttonDangerSecondarySpinnerBackground: semanticColors.backgroundPrimary,

  buttonDangerTertiaryFill: 'transparent',
  buttonDangerTertiaryText: semanticColors.contentNegative,
  buttonDangerTertiaryHoverOverlay: semanticColors.hoverOverlayAlpha,
  buttonDangerTertiaryActiveOverlay: semanticColors.pressedOverlayAlpha,
  buttonDangerTertiarySelectedFill: semanticColors.backgroundPrimary,
  buttonDangerTertiarySelectedText: semanticColors.contentNegative,
  buttonDangerTertiaryLoadingFill: 'transparent',
  buttonDangerTertiarySpinnerForeground: semanticColors.backgroundAccent,
  buttonDangerTertiarySpinnerBackground: semanticColors.backgroundPrimary,

  buttonOutlineFill: 'transparent',
  buttonOutlineText: semanticColors.contentPrimary,
  buttonOutlineHoverOverlay: semanticColors.hoverOverlayAlpha,
  buttonOutlineActiveOverlay: semanticColors.pressedOverlayAlpha,
  buttonOutlineSelectedFill: 'transparent',
  buttonOutlineSelectedText: semanticColors.contentPrimary,
  buttonOutlineFocusFill: semanticColors.backgroundTertiary,
  buttonOutlineLoadingFill: 'transparent',
  buttonOutlineSpinnerForeground: semanticColors.backgroundAccent,
  buttonOutlineSpinnerBackground: semanticColors.backgroundPrimary,

  buttonDisabledFill: semanticColors.backgroundStateDisabled,
  buttonDisabledText: semanticColors.contentStateDisabled,
  buttonDisabledActiveFill: semanticColors.backgroundStateDisabled,
  buttonDisabledActiveText: semanticColors.contentStateDisabled,
  buttonDisabledSpinnerForeground: semanticColors.contentStateDisabled,
  buttonDisabledSpinnerBackground: semanticColors.backgroundPrimary,

  buttonOuterBorder: semanticColors.borderSelected,
  buttonOutlineOuterBorder: semanticColors.borderOpaque,
  buttonDangerTertiaryOuterBorder: semanticColors.tagRedBorderSecondarySelected,
  buttonInnerBorder: semanticColors.contentInversePrimary,
  buttonTransparentBorder: 'transparent',
  buttonFocusOuterBorder: semanticColors.borderAccent,
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

  linkVisited: primitiveDarkColors.gray500Dark,
  linkHover: primitiveDarkColors.gray700Dark,
  linkActive: primitiveDarkColors.gray600Dark,

  // List
  listHeaderFill: semanticColors.backgroundPrimary,

  listBodyFill: semanticColors.backgroundPrimary,

  // ProgressSteps
  progressStepsCompletedText: semanticColors.contentInversePrimary,

  progressStepsCompletedFill: semanticColors.backgroundInversePrimary,
  progressStepsActiveText: semanticColors.contentInversePrimary,
  progressStepsActiveFill: semanticColors.backgroundInversePrimary,

  // Modal
  modalCloseColor: semanticColors.contentPrimary,

  modalCloseColorHover: primitiveDarkColors.gray700Dark,
  modalCloseColorFocus: primitiveDarkColors.gray600Dark,

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
  tagFontDisabledRampUnit: '600',

  tagSolidFontRampUnit: '0',
  tagSolidRampUnit: '600',
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
  tagNeutralFontDisabled: primitiveDarkColors.gray400Dark,

  tagNeutralOutlinedDisabled: primitiveDarkColors.gray400Dark,
  tagNeutralSolidFont: primitiveDarkColors.gray900Dark,
  tagNeutralSolidBackground: primitiveDarkColors.gray400Dark,
  tagNeutralOutlinedBackground: primitiveDarkColors.gray100Dark,
  tagNeutralOutlinedFont: primitiveDarkColors.gray700Dark,

  // Deprecated
  tagNeutralSolidHover: primitiveDarkColors.gray700Dark,

  tagNeutralSolidActive: primitiveDarkColors.gray600Dark,
  tagNeutralSolidDisabled: primitiveDarkColors.gray100Dark,
  tagNeutralSolidFontHover: primitiveDarkColors.gray800Dark,
  tagNeutralLightBackground: primitiveDarkColors.gray100Dark,
  tagNeutralLightHover: primitiveDarkColors.gray800Dark,
  tagNeutralLightActive: primitiveDarkColors.gray700Dark,
  tagNeutralLightDisabled: primitiveDarkColors.gray400Dark,
  tagNeutralLightFont: primitiveDarkColors.gray900Dark,
  tagNeutralLightFontHover: primitiveDarkColors.gray800Dark,
  tagNeutralOutlinedActive: primitiveDarkColors.gray700Dark,
  tagNeutralOutlinedFontHover: primitiveDarkColors.gray700Dark,
  tagNeutralOutlinedHover: tagHoverBackground,

  // Primary
  tagPrimaryOutlinedFont: primitiveDarkColors.gray700Dark,

  tagPrimaryOutlinedBackground: primitiveDarkColors.gray100Dark,
  tagPrimarySolidFont: primitiveDarkColors.gray900Dark,
  tagPrimarySolidBackground: primitiveDarkColors.gray400Dark,
  tagPrimaryFontDisabled: primitiveDarkColors.gray400Dark,
  tagPrimaryOutlinedDisabled: primitiveDarkColors.gray400Dark,

  // Deprecated
  tagPrimarySolidHover: primitiveDarkColors.gray300Dark,

  tagPrimarySolidActive: primitiveDarkColors.gray200Dark,
  tagPrimarySolidDisabled: primitiveDarkColors.gray100Dark,
  tagPrimarySolidFontHover: primitiveDarkColors.gray800Dark,
  tagPrimaryLightBackground: primitiveDarkColors.gray100Dark,
  tagPrimaryLightHover: primitiveDarkColors.gray200Dark,
  tagPrimaryLightActive: primitiveDarkColors.gray300Dark,
  tagPrimaryLightDisabled: primitiveDarkColors.gray400Dark,
  tagPrimaryLightFont: primitiveDarkColors.gray900Dark,
  tagPrimaryLightFontHover: primitiveDarkColors.gray800Dark,
  tagPrimaryOutlinedActive: primitiveDarkColors.gray700Dark,
  tagPrimaryOutlinedFontHover: primitiveDarkColors.gray700Dark,
  tagPrimaryOutlinedHover: tagHoverBackground,

  // Accent
  tagAccentOutlinedFont: primitiveDarkColors.blue700Dark,

  tagAccentOutlinedBackground: primitiveDarkColors.blue100Dark,
  tagAccentSolidFont: primitiveDarkColors.blue900Dark,
  tagAccentSolidBackground: primitiveDarkColors.blue500Dark,
  tagAccentFontDisabled: primitiveDarkColors.blue400Dark,
  tagAccentOutlinedDisabled: primitiveDarkColors.blue400Dark,

  // Deprecated
  tagAccentSolidHover: primitiveDarkColors.blue300Dark,

  tagAccentSolidActive: primitiveDarkColors.blue200Dark,
  tagAccentSolidDisabled: primitiveDarkColors.blue100Dark,
  tagAccentSolidFontHover: primitiveDarkColors.gray800Dark,
  tagAccentLightBackground: primitiveDarkColors.blue100Dark,
  tagAccentLightHover: primitiveDarkColors.blue200Dark,
  tagAccentLightActive: primitiveDarkColors.blue300Dark,
  tagAccentLightDisabled: primitiveDarkColors.blue400Dark,
  tagAccentLightFont: primitiveDarkColors.blue900Dark,
  tagAccentLightFontHover: primitiveDarkColors.blue800Dark,
  tagAccentOutlinedActive: primitiveDarkColors.blue700Dark,
  tagAccentOutlinedFontHover: primitiveDarkColors.blue700Dark,
  tagAccentOutlinedHover: tagHoverBackground,

  // Positive
  tagPositiveFontDisabled: primitiveDarkColors.green400Dark,

  tagPositiveOutlinedDisabled: primitiveDarkColors.green400Dark,
  tagPositiveSolidFont: primitiveDarkColors.green900Dark,
  tagPositiveSolidBackground: primitiveDarkColors.green500Dark,
  tagPositiveOutlinedBackground: primitiveDarkColors.green100Dark,
  tagPositiveOutlinedFont: primitiveDarkColors.green700Dark,

  // Deprecated
  tagPositiveSolidHover: primitiveDarkColors.green300Dark,

  tagPositiveSolidActive: primitiveDarkColors.green200Dark,
  tagPositiveSolidDisabled: primitiveDarkColors.green100Dark,
  tagPositiveSolidFontHover: primitiveDarkColors.gray800Dark,
  tagPositiveLightBackground: primitiveDarkColors.green100Dark,
  tagPositiveLightHover: primitiveDarkColors.green200Dark,
  tagPositiveLightActive: primitiveDarkColors.green300Dark,
  tagPositiveLightDisabled: primitiveDarkColors.green400Dark,
  tagPositiveLightFont: primitiveDarkColors.green900Dark,
  tagPositiveLightFontHover: primitiveDarkColors.green800Dark,
  tagPositiveOutlinedActive: primitiveDarkColors.green700Dark,
  tagPositiveOutlinedFontHover: primitiveDarkColors.green700Dark,
  tagPositiveOutlinedHover: tagHoverBackground,

  // Warning
  tagWarningOutlinedFont: primitiveDarkColors.yellow700Dark,

  tagWarningOutlinedBackground: primitiveDarkColors.yellow100Dark,
  tagWarningSolidFont: primitiveDarkColors.yellow50Dark,
  tagWarningSolidBackground: primitiveDarkColors.yellow700Dark,
  tagWarningFontDisabled: primitiveDarkColors.yellow400Dark,
  tagWarningOutlinedDisabled: primitiveDarkColors.yellow400Dark,

  // Deprecated
  tagWarningSolidHover: primitiveDarkColors.yellow300Dark,

  tagWarningSolidActive: primitiveDarkColors.yellow200Dark,
  tagWarningSolidDisabled: primitiveDarkColors.yellow100Dark,
  tagWarningSolidFontHover: primitiveDarkColors.gray800Dark,
  tagWarningLightBackground: primitiveDarkColors.yellow100Dark,
  tagWarningLightHover: primitiveDarkColors.yellow200Dark,
  tagWarningLightActive: primitiveDarkColors.yellow300Dark,
  tagWarningLightDisabled: primitiveDarkColors.yellow400Dark,
  tagWarningLightFont: primitiveDarkColors.yellow900Dark,
  tagWarningLightFontHover: primitiveDarkColors.yellow800Dark,
  tagWarningOutlinedActive: primitiveDarkColors.yellow700Dark,
  tagWarningOutlinedFontHover: primitiveDarkColors.yellow700Dark,
  tagWarningOutlinedHover: tagHoverBackground,

  // Negative
  tagNegativeOutlinedFont: primitiveDarkColors.red700Dark,

  tagNegativeOutlinedBackground: primitiveDarkColors.red100Dark,
  tagNegativeSolidFont: primitiveDarkColors.gray900Dark,
  tagNegativeSolidBackground: primitiveDarkColors.red500Dark,
  tagNegativeFontDisabled: primitiveDarkColors.red400Dark,
  tagNegativeOutlinedDisabled: primitiveDarkColors.red400Dark,

  // Deprecated
  tagNegativeSolidHover: primitiveDarkColors.red300Dark,

  tagNegativeSolidActive: primitiveDarkColors.red200Dark,
  tagNegativeSolidDisabled: primitiveDarkColors.red100Dark,
  tagNegativeSolidFontHover: primitiveDarkColors.gray800Dark,
  tagNegativeLightBackground: primitiveDarkColors.red100Dark,
  tagNegativeLightHover: primitiveDarkColors.red200Dark,
  tagNegativeLightActive: primitiveDarkColors.red300Dark,
  tagNegativeLightDisabled: primitiveDarkColors.red400Dark,
  tagNegativeLightFont: primitiveDarkColors.red900Dark,
  tagNegativeLightFontHover: primitiveDarkColors.red800Dark,
  tagNegativeOutlinedActive: primitiveDarkColors.red700Dark,
  tagNegativeOutlinedFontHover: primitiveDarkColors.red700Dark,
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

  // Toggle
  toggleFill: semanticColors.backgroundPrimary,

  toggleFillChecked: semanticColors.contentPrimary,
  toggleFillDisabled: semanticColors.contentStateDisabled,
  toggleTrackFill: semanticColors.backgroundTertiary,
  toggleTrackFillDisabled: semanticColors.backgroundStateDisabled,

  // Tick
  tickFill: semanticColors.backgroundPrimary,

  tickFillHover: primitiveDarkColors.gray100Dark,
  tickFillActive: primitiveDarkColors.gray200Dark,
  tickFillSelected: semanticColors.contentPrimary,
  tickFillSelectedHover: primitiveDarkColors.gray800Dark,
  tickFillSelectedHoverActive: primitiveDarkColors.gray700Dark,
  tickFillError: semanticColors.backgroundPrimary,
  tickFillErrorHover: primitiveDarkColors.gray100Dark,
  tickFillErrorHoverActive: primitiveDarkColors.gray200Dark,
  tickFillErrorSelected: semanticColors.contentNegative,
  tickFillErrorSelectedHover: primitiveDarkColors.red500Dark,
  tickFillErrorSelectedHoverActive: primitiveDarkColors.red400Dark,
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
  sliderTrackFillHover: primitiveDarkColors.gray300Dark,
  sliderTrackFillActive: primitiveDarkColors.gray400Dark,
  sliderTrackFillDisabled: semanticColors.backgroundStateDisabled,
  sliderHandleInnerFillDisabled: semanticColors.backgroundStateDisabled,
  sliderHandleInnerFillSelectedHover: primitiveDarkColors.gray600Dark,
  sliderHandleInnerFillSelectedActive: primitiveDarkColors.gray700Dark,

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

  // Tab
  tabBarFill: semanticColors.backgroundPrimary,

  tabColor: semanticColors.contentTertiary,

  // Spinner
  spinnerTrackFill: semanticColors.backgroundTertiary,

  // Progress bar
  progressbarTrackFill: semanticColors.backgroundTertiary,

  // Tooltip
  tooltipBackground: semanticColors.backgroundInverseSecondary,

  tooltipText: semanticColors.contentInversePrimary,

  // Rating
  ratingInactiveFill: primitiveDarkColors.gray500Dark,
  ratingStroke: primitiveDarkColors.gray700Dark,
});
