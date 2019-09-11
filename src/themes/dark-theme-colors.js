/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {primitives} from './dark-theme-primitives.js';

const WHITE = '#FFFFFF';
const BLACK = '#000000';

export default {
  colors: {
    // Semantic Colors

    // Font Color
    colorPrimary: primitives.mono100,
    colorSecondary: primitives.mono200,

    // Background
    background: primitives.mono1000,
    backgroundAlt: primitives.mono700,
    backgroundInv: primitives.mono100,

    // Foreground
    foreground: primitives.mono100,
    foregroundAlt: primitives.mono300,
    foregroundInv: primitives.mono1000,

    // Borders
    border: primitives.mono600,
    borderAlt: primitives.mono700,
    borderFocus: primitives.primary,
    borderError: primitives.negative,

    // Buttons
    buttonPrimaryFill: primitives.primary,
    buttonPrimaryText: BLACK,
    buttonPrimaryHover: primitives.primary100,
    buttonPrimaryActive: primitives.primary200,
    buttonPrimarySelectedText: BLACK,
    buttonPrimarySelectedFill: primitives.primary200,
    buttonPrimarySpinnerForeground: primitives.primary700,
    buttonPrimarySpinnerBackground: primitives.primary300,

    buttonSecondaryFill: primitives.primary700,
    buttonSecondaryText: primitives.primary,
    buttonSecondaryHover: primitives.primary600,
    buttonSecondaryActive: primitives.primary500,
    buttonSecondarySelectedText: primitives.primary,
    buttonSecondarySelectedFill: primitives.primary500,
    buttonSecondarySpinnerForeground: WHITE,
    buttonSecondarySpinnerBackground: primitives.primary400,

    buttonTertiaryFill: 'transparent',
    buttonTertiaryText: primitives.primary,
    buttonTertiaryHover: primitives.primary700,
    buttonTertiaryActive: primitives.primary600,
    buttonTertiarySelectedText: primitives.primary,
    buttonTertiarySelectedFill: primitives.primary600,
    buttonTertiarySpinnerForeground: primitives.primary50,
    buttonTertiarySpinnerBackground: primitives.primary500,

    buttonMinimalFill: 'transparent',
    buttonMinimalText: primitives.primary,
    buttonMinimalHover: primitives.primary700,
    buttonMinimalActive: primitives.primary600,
    buttonMinimalSelectedText: primitives.primary,
    buttonMinimalSelectedFill: primitives.primary600,
    buttonMinimalSpinnerForeground: primitives.primary50,
    buttonMinimalSpinnerBackground: primitives.primary500,

    buttonDisabledFill: primitives.mono600,
    buttonDisabledText: primitives.mono300,
    buttonDisabledSpinnerForeground: primitives.mono200,
    buttonDisabledSpinnerBackground: primitives.mono400,

    // Breadcrumbs
    breadcrumbsText: primitives.mono100,
    breadcrumbsSeparatorFill: primitives.mono200,

    // Datepicker
    datepickerBackground: primitives.mono600,
    datepickerDayFont: WHITE,
    datepickerDayFontDisabled: primitives.mono100,
    datepickerDayPseudoSelected: primitives.mono500,
    datepickerDayPseudoHighlighted: primitives.mono600,

    // Calendar
    calendarBackground: primitives.mono800,
    calendarForeground: WHITE,
    calendarForegroundDisabled: primitives.mono300,
    calendarHeaderBackground: primitives.primary700,
    calendarHeaderForeground: primitives.primary,
    calendarHeaderBackgroundActive: primitives.primary600,
    calendarHeaderForegroundDisabled: primitives.primary500,
    calendarDayBackgroundPseudoSelected: primitives.primary700,
    calendarDayForegroundPseudoSelected: primitives.primary,
    calendarDayBackgroundPseudoSelectedHighlighted: primitives.primary600,
    calendarDayForegroundPseudoSelectedHighlighted: primitives.primary,
    calendarDayBackgroundSelected: primitives.primary,
    calendarDayForegroundSelected: BLACK,
    calendarDayBackgroundSelectedHighlighted: primitives.primary100,
    calendarDayForegroundSelectedHighlighted: BLACK,

    // FileUploader
    fileUploaderBackgroundColor: primitives.mono700,
    fileUploaderBackgroundColorActive: primitives.mono600,
    fileUploaderBorderColorActive: primitives.primary,
    fileUploaderBorderColorDefault: primitives.mono500,
    fileUploaderMessageColor: primitives.mono100,

    // Links
    linkText: primitives.primary,
    linkVisited: primitives.primary100,
    linkHover: primitives.primary200,
    linkActive: primitives.primary300,

    // List
    listHeaderFill: primitives.mono600,
    listBodyFill: primitives.mono700,
    listIconFill: primitives.mono100,
    listBorder: primitives.mono500,

    // ProgressSteps
    progressStepsCompletedText: BLACK,
    progressStepsCompletedFill: primitives.primary,
    progressStepsActiveText: BLACK,
    progressStepsActiveFill: primitives.primary,

    // Modal
    modalCloseColor: primitives.mono300,
    modalCloseColorHover: primitives.mono400,
    modalCloseColorFocus: primitives.mono400,

    // Notification
    notificationPrimaryBackground: primitives.primary700,
    notificationPrimaryText: primitives.primary200,
    notificationInfoBackground: primitives.accent700,
    notificationInfoText: primitives.accent200,
    notificationPositiveBackground: primitives.positive700,
    notificationPositiveText: primitives.positive200,
    notificationWarningBackground: primitives.warning700,
    notificationWarningText: primitives.warning200,
    notificationNegativeBackground: primitives.negative700,
    notificationNegativeText: primitives.negative200,

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

    tagNeutralSolidBackground: primitives.mono600,
    tagNeutralSolidHover: primitives.mono600,
    tagNeutralSolidActive: primitives.mono500,
    tagNeutralSolidDisabled: primitives.mono700,
    tagNeutralSolidFont: primitives.mono200,
    tagNeutralSolidFontHover: primitives.mono200,
    tagNeutralLightBackground: primitives.mono800,
    tagNeutralLightHover: primitives.mono800,
    tagNeutralLightActive: primitives.mono700,
    tagNeutralLightDisabled: primitives.mono700,
    tagNeutralLightFont: primitives.mono200,
    tagNeutralLightFontHover: primitives.mono200,
    tagNeutralOutlinedBackground: primitives.mono600,
    tagNeutralOutlinedHover: primitives.mono500,
    tagNeutralOutlinedActive: primitives.mono400,
    tagNeutralOutlinedDisabled: primitives.mono700,
    tagNeutralOutlinedFont: primitives.mono200,
    tagNeutralOutlinedFontHover: primitives.mono900,
    tagNeutralFontDisabled: primitives.mono500,

    tagPrimarySolidBackground: primitives.primary,
    tagPrimarySolidHover: primitives.primary700,
    tagPrimarySolidActive: primitives.primary400,
    tagPrimarySolidDisabled: primitives.primary700,
    tagPrimarySolidFont: primitives.primary700,
    tagPrimarySolidFontHover: primitives.primary100,
    tagPrimaryLightBackground: primitives.primary700,
    tagPrimaryLightHover: primitives.primary700,
    tagPrimaryLightActive: primitives.primary600,
    tagPrimaryLightDisabled: primitives.primary700,
    tagPrimaryLightFont: primitives.primary100,
    tagPrimaryLightFontHover: primitives.primary100,
    tagPrimaryOutlinedBackground: primitives.primary,
    tagPrimaryOutlinedHover: primitives.primary700,
    tagPrimaryOutlinedActive: primitives.primary600,
    tagPrimaryOutlinedDisabled: primitives.primary700,
    tagPrimaryOutlinedFont: primitives.primary,
    tagPrimaryOutlinedFontHover: primitives.primary50,
    tagPrimaryFontDisabled: primitives.primary500,

    tagAccentSolidBackground: primitives.accent500,
    tagAccentSolidHover: primitives.accent500,
    tagAccentSolidActive: primitives.accent400,
    tagAccentSolidDisabled: primitives.accent700,
    tagAccentSolidFont: primitives.accent100,
    tagAccentSolidFontHover: primitives.accent100,
    tagAccentLightBackground: primitives.accent700,
    tagAccentLightHover: primitives.accent700,
    tagAccentLightActive: primitives.accent600,
    tagAccentLightDisabled: primitives.accent700,
    tagAccentLightFont: primitives.accent100,
    tagAccentLightFontHover: primitives.accent100,
    tagAccentOutlinedBackground: primitives.accent500,
    tagAccentOutlinedHover: primitives.accent400,
    tagAccentOutlinedActive: primitives.accent300,
    tagAccentOutlinedDisabled: primitives.accent700,
    tagAccentOutlinedFont: primitives.accent200,
    tagAccentOutlinedFontHover: primitives.accent700,
    tagAccentFontDisabled: primitives.accent500,

    tagPositiveSolidBackground: primitives.positive500,
    tagPositiveSolidHover: primitives.positive500,
    tagPositiveSolidActive: primitives.positive400,
    tagPositiveSolidDisabled: primitives.positive700,
    tagPositiveSolidFont: primitives.positive100,
    tagPositiveSolidFontHover: primitives.positive100,
    tagPositiveLightBackground: primitives.positive700,
    tagPositiveLightHover: primitives.positive700,
    tagPositiveLightActive: primitives.positive600,
    tagPositiveLightDisabled: primitives.positive700,
    tagPositiveLightFont: primitives.positive100,
    tagPositiveLightFontHover: primitives.positive100,
    tagPositiveOutlinedBackground: primitives.positive500,
    tagPositiveOutlinedHover: primitives.positive400,
    tagPositiveOutlinedActive: primitives.positive300,
    tagPositiveOutlinedDisabled: primitives.positive700,
    tagPositiveOutlinedFont: primitives.positive200,
    tagPositiveOutlinedFontHover: primitives.positive700,
    tagPositiveFontDisabled: primitives.positive500,

    tagWarningSolidBackground: primitives.warning500,
    tagWarningSolidHover: primitives.warning500,
    tagWarningSolidActive: primitives.warning400,
    tagWarningSolidDisabled: primitives.warning700,
    tagWarningSolidFont: primitives.warning100,
    tagWarningSolidFontHover: primitives.warning100,
    tagWarningLightBackground: primitives.warning700,
    tagWarningLightHover: primitives.warning700,
    tagWarningLightActive: primitives.warning600,
    tagWarningLightDisabled: primitives.warning700,
    tagWarningLightFont: primitives.warning100,
    tagWarningLightFontHover: primitives.warning100,
    tagWarningOutlinedBackground: primitives.warning500,
    tagWarningOutlinedHover: primitives.warning400,
    tagWarningOutlinedActive: primitives.warning300,
    tagWarningOutlinedDisabled: primitives.warning700,
    tagWarningOutlinedFont: primitives.warning200,
    tagWarningOutlinedFontHover: primitives.warning700,
    tagWarningFontDisabled: primitives.warning500,

    tagNegativeSolidBackground: primitives.negative500,
    tagNegativeSolidHover: primitives.negative500,
    tagNegativeSolidActive: primitives.negative400,
    tagNegativeSolidDisabled: primitives.negative700,
    tagNegativeSolidFont: primitives.negative100,
    tagNegativeSolidFontHover: primitives.negative100,
    tagNegativeLightBackground: primitives.negative700,
    tagNegativeLightHover: primitives.negative700,
    tagNegativeLightActive: primitives.negative600,
    tagNegativeLightDisabled: primitives.negative700,
    tagNegativeLightFont: primitives.negative100,
    tagNegativeLightFontHover: primitives.negative100,
    tagNegativeOutlinedBackground: primitives.negative500,
    tagNegativeOutlinedHover: primitives.negative400,
    tagNegativeOutlinedActive: primitives.negative300,
    tagNegativeOutlinedDisabled: primitives.negative700,
    tagNegativeOutlinedFont: primitives.negative200,
    tagNegativeOutlinedFontHover: primitives.negative700,
    tagNegativeFontDisabled: primitives.negative500,

    // Table
    tableHeadBackgroundColor: primitives.mono700,
    tableBackground: primitives.mono800,
    tableStripedBackground: primitives.mono700,
    tableFilter: primitives.mono400,
    tableFilterHeading: primitives.mono300,
    tableFilterBackground: primitives.mono700,
    tableFilterFooterBackground: primitives.mono800,

    // Tick
    tickFill: primitives.mono1000,
    tickFillHover: primitives.mono700,
    tickFillActive: primitives.mono600,

    tickFillSelected: primitives.primary,
    tickFillSelectedHover: primitives.primary50,
    tickFillSelectedHoverActive: primitives.primary100,

    tickFillError: primitives.negative700,
    tickFillErrorHover: primitives.negative600,
    tickFillErrorHoverActive: primitives.negative500,

    tickFillErrorSelected: primitives.negative500,
    tickFillErrorSelectedHover: primitives.negative600,
    tickFillErrorSelectedHoverActive: primitives.negative700,

    tickFillDisabled: primitives.mono700,

    tickBorder: primitives.mono300,
    tickBorderError: primitives.negative400,

    tickMarkFill: BLACK,
    tickMarkFillError: WHITE,
    tickMarkFillDisabled: primitives.mono400,

    // Slider/Toggle
    sliderTrackFill: primitives.mono600,
    sliderTrackFillHover: primitives.mono500,
    sliderTrackFillActive: primitives.mono400,
    sliderTrackFillSelected: primitives.primary500,
    sliderTrackFillSelectedActive: primitives.primary600,
    sliderTrackFillSelectedHover: primitives.primary700,
    sliderTrackFillDisabled: primitives.mono700,
    sliderHandleFill: primitives.mono300,
    sliderHandleFillHover: primitives.mono300,
    sliderHandleFillActive: primitives.mono300,
    sliderHandleFillSelected: primitives.primary500,
    sliderHandleFillSelectedHover: primitives.primary600,
    sliderHandleFillSelectedActive: primitives.primary700,
    sliderHandleFillDisabled: primitives.mono600,
    sliderHandleInnerFill: primitives.mono300,
    sliderHandleInnerFillDisabled: primitives.mono500,
    sliderHandleInnerFillSelectedHover: primitives.primary600,
    sliderHandleInnerFillSelectedActive: primitives.primary700,

    sliderBorder: WHITE,
    sliderBorderHover: WHITE,
    sliderBorderDisabled: primitives.mono400,

    // Input
    inputFill: primitives.mono600,
    inputFillActive: primitives.mono500,
    inputFillError: primitives.negative700,
    inputFillDisabled: primitives.mono800,
    inputFillPositive: primitives.positive700,
    inputTextDisabled: primitives.mono500,
    inputBorderError: primitives.negative400,
    inputBorderPositive: primitives.positive400,
    inputEnhancerFill: primitives.mono500,
    inputEnhancerFillDisabled: primitives.mono700,
    inputEnhancerTextDisabled: primitives.mono500,

    // Menu
    menuFill: primitives.mono600,
    menuFillHover: primitives.mono700,
    menuFontDefault: primitives.mono300,
    menuFontDisabled: primitives.mono400,
    menuFontHighlighted: primitives.mono200,
    menuFontSelected: WHITE,

    // Pagination
    paginationTriangleDown: primitives.mono100,

    // Header navigation
    headerNavigationFill: primitives.mono700,

    // Tab
    tabBarFill: primitives.mono1000,
    tabColor: primitives.mono300,

    // Spinner
    spinnerTrackFill: primitives.mono100,

    // Progress bar
    progressbarTrackFill: primitives.mono100,

    // Tooltip
    tooltipBackground: primitives.mono200,
    tooltipText: primitives.mono1000,
  },
};
