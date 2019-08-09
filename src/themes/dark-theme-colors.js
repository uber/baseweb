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
    colorPrimary: primitives.mono300,
    colorSecondary: primitives.mono400,

    // Background
    background: primitives.black,
    backgroundAlt: primitives.mono900,
    backgroundInv: primitives.mono300,

    // Foreground
    foreground: primitives.mono300,
    foregroundAlt: primitives.mono500,
    foregroundInv: primitives.black,

    // Borders
    border: primitives.mono800,
    borderAlt: primitives.mono900,
    borderFocus: primitives.white,
    borderError: primitives.negative400,

    // Buttons
    buttonDisabledText: primitives.mono700,
    buttonPrimaryFill: primitives.mono300,
    buttonPrimaryText: primitives.black,
    buttonPrimaryHover: primitives.mono500,
    buttonPrimaryActive: primitives.mono600,
    buttonPrimaryDisabledFill: primitives.mono900,
    buttonSecondaryFill: primitives.mono1000,
    buttonSecondaryText: primitives.mono300,
    buttonSecondaryHover: primitives.mono900,
    buttonSecondaryActive: primitives.mono800,
    buttonSecondaryDisabledFill: primitives.mono1000,
    buttonSecondarySelectedFill: primitives.mono800,
    buttonSecondarySelectedText: primitives.mono300,
    buttonTertiaryFill: 'transparent',
    buttonTertiaryText: primitives.mono300,
    buttonTertiaryHover: primitives.mono1000,
    buttonTertiaryActive: primitives.mono900,
    buttonTertiaryDisabledFill: 'transparent',
    // deprecated (to be removed)
    buttonMinimalFill: 'transparent',
    buttonMinimalText: primitives.mono300,
    buttonMinimalHover: primitives.mono1000,
    buttonMinimalActive: primitives.mono900,
    buttonMinimalDisabledFill: 'transparent',
    // deprecated: no longer in use
    buttonDisabledFill: primitives.mono900,
    buttonTertiarySelectedFill: primitives.mono300,
    buttonTertiarySelectedText: primitives.primary500,

    // Breadcrumbs
    breadcrumbsText: primitives.mono300,
    breadcrumbsSeparatorFill: primitives.mono400,

    // Datepicker
    // deprecated: no longer in use
    datepickerBackground: primitives.mono800,
    datepickerDayFont: primitives.white,
    datepickerDayFontDisabled: primitives.mono300,
    datepickerDayPseudoSelected: primitives.mono700,
    datepickerDayPseudoHighlighted: primitives.mono800,

    // Calendar
    calendarBackground: primitives.mono1000,
    calendarForeground: primitives.mono300,
    calendarForegroundDisabled: primitives.mono800,
    calendarHeaderBackground: primitives.mono900,
    calendarHeaderForeground: primitives.mono300,
    calendarHeaderBackgroundActive: primitives.mono1000,
    calendarHeaderForegroundDisabled: primitives.mono800,
    calendarDayBackgroundPseudoSelected: primitives.mono900,
    calendarDayForegroundPseudoSelected: primitives.mono300,
    calendarDayBackgroundPseudoSelectedHighlighted: primitives.mono800,
    calendarDayForegroundPseudoSelectedHighlighted: primitives.mono300,
    calendarDayBackgroundSelected: primitives.mono300,
    calendarDayForegroundSelected: primitives.black,
    calendarDayBackgroundSelectedHighlighted: primitives.mono400,
    calendarDayForegroundSelectedHighlighted: primitives.black,

    // FileUploader
    fileUploaderBackgroundColor: primitives.mono900,
    fileUploaderBackgroundColorActive: primitives.mono800,
    fileUploaderBorderColorActive: primitives.primary400,
    fileUploaderBorderColorDefault: primitives.mono700,
    fileUploaderMessageColor: primitives.mono300,

    // Links
    linkText: primitives.primary300,
    linkVisited: primitives.primary300,
    linkHover: primitives.primary400,
    linkActive: primitives.primary400,

    // List
    listHeaderFill: primitives.mono800,
    listBodyFill: primitives.mono900,
    listIconFill: primitives.mono300,
    listBorder: primitives.mono700,

    // Accordian
    accordianHeaderBorder: primitives.mono600,
    accordianHeaderBorderExpanded: primitives.mono700,

    // ProgressSteps
    progressUncompletedLine: primitives.mono900,
    progressUncompletedNodeBackground: primitives.mono900,
    progressUncompletedNodeForeground: primitives.mono500,
    progressActiveNodeBackground: primitives.white,
    progressActiveNodeForeground: primitives.black,
    progressCompletedLine: primitives.white,
    progressCompletedNodeBackground: primitives.white,
    progressCompletedNodeForeground: primitives.black,
    // deprecated: no longer in use
    progressStepsIconActiveFill: primitives.mono300,

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

    tagNeutralSolidBackground: primitives.mono800,
    tagNeutralSolidHover: primitives.mono800,
    tagNeutralSolidActive: primitives.mono700,
    tagNeutralSolidDisabled: primitives.mono900,
    tagNeutralSolidFont: primitives.mono400,
    tagNeutralSolidFontHover: primitives.mono400,
    tagNeutralLightBackground: primitives.mono1000,
    tagNeutralLightHover: primitives.mono1000,
    tagNeutralLightActive: primitives.mono900,
    tagNeutralLightDisabled: primitives.mono900,
    tagNeutralLightFont: primitives.mono400,
    tagNeutralLightFontHover: primitives.mono400,
    tagNeutralOutlinedBackground: primitives.mono800,
    tagNeutralOutlinedHover: primitives.mono700,
    tagNeutralOutlinedActive: primitives.mono600,
    tagNeutralOutlinedDisabled: primitives.mono900,
    tagNeutralOutlinedFont: primitives.mono400,
    tagNeutralOutlinedFontHover: primitives.black,
    tagNeutralFontDisabled: primitives.mono700,

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
    tableHeadBackgroundColor: primitives.mono900,
    tableBackground: primitives.mono1000,
    tableStripedBackground: primitives.mono900,
    tableFilter: primitives.mono600,
    tableFilterHeading: primitives.mono500,
    tableFilterBackground: primitives.mono900,
    tableFilterFooterBackground: primitives.mono1000,

    // Tick
    tickFill: primitives.black,
    tickFillHover: primitives.mono1000,
    tickFillActive: primitives.mono800,
    tickFillSelected: primitives.white,
    tickFillSelectedHover: primitives.mono300,
    tickFillSelectedHoverActive: primitives.mono400,
    tickFillError: primitives.negative700,
    tickFillErrorHover: primitives.negative600,
    tickFillErrorHoverActive: primitives.negative500,
    tickFillErrorSelected: primitives.negative500,
    tickFillErrorSelectedHover: primitives.negative600,
    tickFillErrorSelectedHoverActive: primitives.negative700,
    tickBorder: primitives.mono500,
    tickBorderError: primitives.negative400,
    tickMarkFill: primitives.black,
    tickMarkFillError: primitives.white,
    tickMarkFillDisabled: primitives.mono600,
    tickFillDisabled: primitives.mono900,

    // Slider/Toggle
    sliderFill: primitives.white,
    sliderFillDisabled: primitives.mono500,
    sliderTrackFill: primitives.mono800,
    sliderTrackFillHover: primitives.mono700,
    sliderTrackFillActive: primitives.mono600,
    sliderTrackFillDisabled: primitives.mono900,
    sliderHandleFill: primitives.mono500,
    sliderHandleBorder: primitives.mono600,
    sliderHandleInnerFill: primitives.mono500,
    sliderHandleInnerFillDisabled: primitives.mono700,
    sliderHandleInnerFillSelectedHover: primitives.mono800,
    sliderHandleInnerFillSelectedActive: primitives.mono900,
    // deprecated: no longer in use
    sliderTrackFillSelected: primitives.primary500,
    sliderTrackFillSelectedActive: primitives.primary600,
    sliderTrackFillSelectedHover: primitives.primary700,
    sliderHandleFillHover: primitives.mono500,
    sliderHandleFillActive: primitives.mono500,
    sliderHandleFillSelected: primitives.primary500,
    sliderHandleFillSelectedHover: primitives.primary600,
    sliderHandleFillSelectedActive: primitives.primary700,
    sliderHandleFillDisabled: primitives.mono800,
    sliderBorder: primitives.white,
    sliderBorderHover: primitives.white,
    sliderBorderDisabled: primitives.mono600,

    // Input
    inputFill: primitives.mono800,
    inputFillActive: primitives.mono700,
    inputFillError: primitives.negative700,
    inputFillDisabled: primitives.mono1000,
    inputFillPositive: primitives.positive700,
    inputTextDisabled: primitives.mono700,
    inputBorderError: primitives.negative400,
    inputBorderPositive: primitives.positive400,
    inputEnhancerFill: primitives.mono700,
    inputEnhancerFillDisabled: primitives.mono900,
    inputEnhancerTextDisabled: primitives.mono700,

    // Menu
    menuFill: primitives.mono800,
    menuFillHover: primitives.mono900,
    menuFontDefault: primitives.mono500,
    menuFontDisabled: primitives.mono600,
    menuFontHighlighted: primitives.mono400,
    menuFontSelected: primitives.white,

    // Pagination
    paginationTriangleDown: primitives.mono300,

    // Header navigation
    headerNavigationFill: primitives.mono900,

    // Tab
    tabBarFill: primitives.black,
    tabColor: primitives.mono500,
    tabBorder: primitives.mono300,

    // Spinner
    spinnerTrackFill: primitives.mono300,

    // Progress bar
    progressbarTrackFill: primitives.mono300,

    // Tooltip
    tooltipBackground: primitives.mono400,
    tooltipText: primitives.black,

    // Avatar
    avatarForeground: primitives.mono300,

    // Toggle
    toggleBackground: primitives.mono300,

    // Rating
    ratingStarStroke: primitives.mono700,
    ratingStarFill: primitives.mono500,

    // Modal
    modalFooterBorder: primitives.mono600,

    // Emoticon
    emoticonFill: primitives.mono700,
  },
};
