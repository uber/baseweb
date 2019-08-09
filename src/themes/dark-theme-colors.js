/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {primitives} from './dark-theme-primitives.js';

export default {
  colors: {
    // Semantic Colors

    white: primitives.white,

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
    borderFocus: primitives.white,
    borderError: primitives.negative400,

    // Buttons
    buttonDisabledText: primitives.mono500,
    buttonPrimaryFill: primitives.mono100,
    buttonPrimaryText: primitives.mono1000,
    buttonPrimaryHover: primitives.mono300,
    buttonPrimaryActive: primitives.mono400,
    buttonPrimaryDisabledFill: primitives.mono700,
    buttonSecondaryFill: primitives.mono800,
    buttonSecondaryText: primitives.mono100,
    buttonSecondaryHover: primitives.mono700,
    buttonSecondaryActive: primitives.mono600,
    buttonSecondaryDisabledFill: primitives.mono800,
    buttonSecondarySelectedFill: primitives.mono600,
    buttonSecondarySelectedText: primitives.mono100,
    buttonTertiaryFill: 'transparent',
    buttonTertiaryText: primitives.mono100,
    buttonTertiaryHover: primitives.mono800,
    buttonTertiaryActive: primitives.mono700,
    buttonTertiaryDisabledFill: 'transparent',
    // deprecated (to be removed)
    buttonMinimalFill: 'transparent',
    buttonMinimalText: primitives.mono100,
    buttonMinimalHover: primitives.mono800,
    buttonMinimalActive: primitives.mono700,
    buttonMinimalDisabledFill: 'transparent',
    // deprecated: no longer in use
    buttonDisabledFill: primitives.mono700,
    buttonTertiarySelectedFill: primitives.mono100,
    buttonTertiarySelectedText: primitives.primary500,

    // Breadcrumbs
    breadcrumbsText: primitives.mono100,
    breadcrumbsSeparatorFill: primitives.mono200,

    // Datepicker
    // deprecated: no longer in use
    datepickerBackground: primitives.mono600,
    datepickerDayFont: primitives.white,
    datepickerDayFontDisabled: primitives.mono100,
    datepickerDayPseudoSelected: primitives.mono500,
    datepickerDayPseudoHighlighted: primitives.mono600,

    // Calendar
    calendarBackground: primitives.mono800,
    calendarForeground: primitives.mono100,
    calendarForegroundDisabled: primitives.mono600,
    calendarHeaderBackground: primitives.mono700,
    calendarHeaderForeground: primitives.mono100,
    calendarHeaderBackgroundActive: primitives.mono800,
    calendarHeaderForegroundDisabled: primitives.mono600,
    calendarDayBackgroundPseudoSelected: primitives.mono700,
    calendarDayForegroundPseudoSelected: primitives.mono100,
    calendarDayBackgroundPseudoSelectedHighlighted: primitives.mono600,
    calendarDayForegroundPseudoSelectedHighlighted: primitives.mono100,
    calendarDayBackgroundSelected: primitives.mono100,
    calendarDayForegroundSelected: primitives.mono1000,
    calendarDayBackgroundSelectedHighlighted: primitives.mono200,
    calendarDayForegroundSelectedHighlighted: primitives.mono1000,

    // FileUploader
    fileUploaderBackgroundColor: primitives.mono700,
    fileUploaderBackgroundColorActive: primitives.mono600,
    fileUploaderBorderColorActive: primitives.primary400,
    fileUploaderBorderColorDefault: primitives.mono500,
    fileUploaderMessageColor: primitives.mono100,

    // Links
    linkText: primitives.primary300,
    linkVisited: primitives.primary300,
    linkHover: primitives.primary400,
    linkActive: primitives.primary400,

    // List
    listHeaderFill: primitives.mono600,
    listBodyFill: primitives.mono700,
    listIconFill: primitives.mono100,
    listBorder: primitives.mono500,

    // ProgressSteps
    progressUncompletedLine: primitives.mono700,
    progressUncompletedNodeBackground: primitives.mono700,
    progressUncompletedNodeForeground: primitives.mono300,
    progressActiveNodeBackground: primitives.white,
    progressActiveNodeForeground: primitives.mono1000,
    progressCompletedLine: primitives.white,
    progressCompletedNodeBackground: primitives.white,
    progressCompletedNodeForeground: primitives.mono1000,
    // deprecated: no longer in use
    progressStepsIconActiveFill: primitives.mono100,

    // Notification
    notificationPrimaryBackground: primitives.primary700,
    notificationPrimaryText: primitives.primary200,
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

    tagPrimarySolidBackground: primitives.primary500,
    tagPrimarySolidHover: primitives.primary500,
    tagPrimarySolidActive: primitives.primary400,
    tagPrimarySolidDisabled: primitives.primary700,
    tagPrimarySolidFont: primitives.primary100,
    tagPrimarySolidFontHover: primitives.primary100,
    tagPrimaryLightBackground: primitives.primary700,
    tagPrimaryLightHover: primitives.primary700,
    tagPrimaryLightActive: primitives.primary600,
    tagPrimaryLightDisabled: primitives.primary700,
    tagPrimaryLightFont: primitives.primary100,
    tagPrimaryLightFontHover: primitives.primary100,
    tagPrimaryOutlinedBackground: primitives.primary500,
    tagPrimaryOutlinedHover: primitives.primary400,
    tagPrimaryOutlinedActive: primitives.primary300,
    tagPrimaryOutlinedDisabled: primitives.primary700,
    tagPrimaryOutlinedFont: primitives.primary200,
    tagPrimaryOutlinedFontHover: primitives.primary700,
    tagPrimaryFontDisabled: primitives.primary500,

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
    tickFillHover: primitives.mono800,
    tickFillActive: primitives.mono600,
    tickFillSelected: primitives.white,
    tickFillSelectedHover: primitives.mono100,
    tickFillSelectedHoverActive: primitives.mono200,
    tickFillError: primitives.negative700,
    tickFillErrorHover: primitives.negative600,
    tickFillErrorHoverActive: primitives.negative500,
    tickFillErrorSelected: primitives.negative500,
    tickFillErrorSelectedHover: primitives.negative600,
    tickFillErrorSelectedHoverActive: primitives.negative700,
    tickBorder: primitives.mono300,
    tickBorderError: primitives.negative400,
    tickMarkFill: primitives.mono1000,
    tickMarkFillError: primitives.white,
    tickMarkFillDisabled: primitives.mono400,
    tickFillDisabled: primitives.mono700,

    // Slider/Toggle
    sliderFill: primitives.white,
    sliderFillDisabled: primitives.mono300,
    sliderTrackFill: primitives.mono600,
    sliderTrackFillHover: primitives.mono500,
    sliderTrackFillActive: primitives.mono400,
    sliderTrackFillDisabled: primitives.mono700,
    sliderHandleInnerFill: primitives.mono300,
    sliderHandleInnerFillDisabled: primitives.mono500,
    sliderHandleInnerFillSelectedHover: primitives.mono600,
    sliderHandleInnerFillSelectedActive: primitives.mono700,
    // deprecated: no longer in use
    sliderTrackFillSelected: primitives.primary500,
    sliderTrackFillSelectedActive: primitives.primary600,
    sliderTrackFillSelectedHover: primitives.primary700,
    sliderHandleFill: primitives.mono300,
    sliderHandleFillHover: primitives.mono300,
    sliderHandleFillActive: primitives.mono300,
    sliderHandleFillSelected: primitives.primary500,
    sliderHandleFillSelectedHover: primitives.primary600,
    sliderHandleFillSelectedActive: primitives.primary700,
    sliderHandleFillDisabled: primitives.mono600,
    sliderBorder: primitives.white,
    sliderBorderHover: primitives.white,
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
    menuFontSelected: primitives.white,

    // Pagination
    paginationTriangleDown: primitives.mono100,

    // Header navigation
    headerNavigationFill: primitives.mono700,

    // Tab
    tabBarFill: primitives.mono1000,
    tabColor: primitives.mono300,
    tabBorder: primitives.mono100,

    // Spinner
    spinnerTrackFill: primitives.mono100,

    // Progress bar
    progressbarTrackFill: primitives.mono100,

    // Tooltip
    tooltipBackground: primitives.mono200,
    tooltipText: primitives.mono1000,
  },
};
