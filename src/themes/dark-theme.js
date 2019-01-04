/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import createTheme from './creator.js';
import {primitives} from './dark-theme-primitives.js';

const WHITE = '#FFFFFF';

export const DarkTheme = createTheme(
  {
    ...primitives,
  },
  {
    colors: {
      // Semantic Colors

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
      buttonPrimaryFill: primitives.primary400,
      buttonPrimaryText: '#FFFFFF',
      buttonPrimaryHover: primitives.primary500,
      buttonPrimaryActive: primitives.primary600,
      buttonSecondaryFill: primitives.mono500,
      buttonSecondaryText: primitives.mono100,
      buttonSecondaryHover: primitives.mono400,
      buttonSecondaryActive: primitives.mono300,
      buttonTertiaryFill: primitives.mono700,
      buttonTertiaryText: primitives.mono100,
      buttonTertiaryHover: primitives.mono600,
      buttonTertiaryActive: primitives.mono500,
      buttonMinimalFill: 'transparent',
      buttonMinimalText: primitives.primary400,
      buttonMinimalHover: primitives.mono600,
      buttonMinimalActive: primitives.mono500,
      buttonDisabledFill: primitives.mono700,
      buttonDisabledText: primitives.mono500,

      // Breadcrumbs
      breadcrumbsText: primitives.mono100,
      breadcrumbsSeparatorFill: primitives.mono200,

      // FileUploader
      fileUploaderBackgroundColor: primitives.mono700,
      fileUploaderBorderColorActive: primitives.primary400,
      fileUploaderBorderColorDefault: primitives.mono500,
      fileUploaderSeparatorColor: primitives.mono100,

      // Links
      linkText: primitives.primary300,
      linkVisited: primitives.primary300,
      linkHover: primitives.primary400,

      // List
      listHeaderFill: primitives.mono600,
      listBodyFill: primitives.mono700,
      listIconFill: primitives.mono100,
      listBorder: primitives.mono500,

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
      menuFillHover: primitives.mono600,
    },
    tooltip: {
      backgroundColor: primitives.mono200,
    },
  },
);
