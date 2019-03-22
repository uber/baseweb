/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {primitives} from './dark-theme-primitives.js';

const WHITE = '#FFFFFF';

export default {
  colors: {
    // Semantic Colors

    white: WHITE,

    // Font Color
    colorPrimary: primitives.mono100,
    colorSecondary: primitives.mono200,

    // Background
    background: primitives.mono800,
    backgroundAlt: primitives.mono700,
    backgroundInv: primitives.mono100,

    // Foreground
    foreground: primitives.mono100,
    foregroundAlt: primitives.mono300,
    foregroundInv: primitives.mono1000,

    // Borders
    border: primitives.mono600,
    borderAlt: primitives.mono700,
    borderFocus: primitives.primary400,
    borderError: primitives.negative400,

    // Buttons
    buttonPrimaryFill: primitives.primary500,
    buttonPrimaryText: primitives.mono100,
    buttonPrimaryHover: primitives.primary600,
    buttonPrimaryActive: primitives.primary700,
    buttonSecondaryFill: primitives.mono600,
    buttonSecondaryText: primitives.mono100,
    buttonSecondaryHover: primitives.mono500,
    buttonSecondaryActive: primitives.mono400,
    buttonTertiaryFill: primitives.mono800,
    buttonTertiaryText: primitives.mono100,
    buttonTertiaryHover: primitives.mono700,
    buttonTertiaryActive: primitives.mono600,
    buttonTertiarySelectedText: primitives.mono100,
    buttonTertiarySelectedFill: primitives.primary500,
    buttonMinimalFill: 'transparent',
    buttonMinimalText: primitives.primary400,
    buttonMinimalHover: primitives.mono800,
    buttonMinimalActive: primitives.mono700,
    buttonDisabledFill: primitives.mono700,
    buttonDisabledText: primitives.mono500,

    // Breadcrumbs
    breadcrumbsText: primitives.mono100,
    breadcrumbsSeparatorFill: primitives.mono200,

    // Datepicker
    datepickerBackground: primitives.mono600,
    datepickerDayFont: WHITE,
    datepickerDayFontDisabled: primitives.mono100,
    datepickerDayPseudoSelected: primitives.mono500,
    datepickerDayPseudoHighlighted: primitives.mono600,

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

    // List
    listHeaderFill: primitives.mono600,
    listBodyFill: primitives.mono700,
    listIconFill: primitives.mono100,
    listBorder: primitives.mono500,

    // Tag
    tagBackground: primitives.mono1000,
    tagNeutralBackground: primitives.mono600,
    tagPrimaryBackground: primitives.primary500,
    tagPositiveBackground: primitives.positive500,
    tagWarningBackground: primitives.warning500,
    tagNegativeBackground: primitives.negative500,

    // Tick
    tickFill: 'transparent',
    tickFillHover: primitives.mono200,
    tickFillActive: primitives.mono300,
    tickFillSelected: primitives.primary400,
    tickFillSelectedHover: primitives.primary500,
    tickFillSelectedHoverActive: primitives.primary600,
    tickFillDisabled: primitives.mono600,
    tickBorder: primitives.mono400,
    tickMarkFill: WHITE,

    // Slider
    sliderTrackFill: primitives.mono500,
    sliderTrackFillHover: primitives.mono600,
    sliderTrackFillActive: primitives.mono700,
    sliderTrackFillSelected: primitives.primary700,
    sliderTrackFillSelectedActive: primitives.primary700,
    sliderTrackFillSelectedHover: primitives.primary700,
    sliderTrackFillDisabled: primitives.mono600,
    sliderHandleFill: primitives.mono300,
    sliderHandleFillHover: primitives.mono300,
    sliderHandleFillActive: primitives.mono300,
    sliderHandleFillSelected: primitives.primary500,
    sliderHandleFillSelectedHover: primitives.primary600,
    sliderHandleFillSelectedActive: primitives.primary700,
    sliderHandleFillDisabled: primitives.mono600,
    sliderBorder: WHITE,
    sliderBorderHover: WHITE,
    sliderBorderDisabled: primitives.mono400,

    // Input
    inputFill: primitives.mono600,
    inputFillEnhancer: primitives.mono500,
    inputFillError: primitives.mono600,
    inputFillDisabled: primitives.mono700,
    inputTextDisabled: primitives.mono500,

    // Menu
    menuFillHover: primitives.mono800,
    menuFontDefault: primitives.mono400,
    menuFontDisabled: primitives.mono500,
    menuFontHighlighted: primitives.mono200,
    menuFontSelected: primitives.mono200,
  },
  tooltip: {
    backgroundColor: primitives.mono200,
  },
};
