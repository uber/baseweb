/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {primitives} from './light-theme-primitives.js';

// baseui v9 brings some big style updates.
// Use these theme values to override most of those updates
export default {
  colors: {
    // Borders
    borderFocus: primitives.primary400,

    // Buttons
    // Primary
    buttonPrimaryFill: primitives.primary400,
    buttonPrimaryText: primitives.white,
    buttonPrimaryHover: primitives.primary500,
    buttonPrimaryActive: primitives.primary600,
    buttonPrimaryDisabledFill: primitives.mono100,
    // Secondary
    buttonSecondaryFill: primitives.primary50,
    buttonSecondaryText: primitives.primary400,
    buttonSecondaryHover: primitives.primary100,
    buttonSecondaryActive: primitives.primary200,
    buttonSecondaryDisabledFill: primitives.mono100,
    // Tertiary
    buttonTertiaryFill: primitives.mono50,
    buttonTertiaryText: primitives.primary400,
    buttonTertiaryHover: primitives.mono100,
    buttonTertiaryActive: primitives.mono200,
    buttonTertiaryDisabledFill: primitives.mono100,
    // Minimal
    buttonMinimalFill: 'transparent',
    buttonMinimalText: primitives.primary400,
    buttonMinimalHover: primitives.mono50,
    buttonMinimalActive: primitives.mono100,
    buttonMinimalDisabledFill: primitives.mono100,

    // Button Group
    buttonGroupSelectedFill: primitives.primary400,
    buttonGroupSelectedText: primitives.white,

    // Tick
    tickFillSelected: primitives.primary400,
    tickFillSelectedHover: primitives.primary500,
    tickFillSelectedHoverActive: primitives.primary600,

    // Slider
    sliderFill: primitives.primary400,
    sliderHandleInnerFillSelectedHover: primitives.primary400,
    sliderHandleInnerFillSelectedActive: primitives.primary500,

    // Calendar
    calendarBackground: primitives.white,
    calendarForeground: primitives.black,
    calendarForegroundDisabled: primitives.mono300,
    calendarHeaderBackground: primitives.primary400,
    calendarHeaderForeground: primitives.white,
    calendarHeaderBackgroundActive: primitives.primary500,
    calendarHeaderForegroundDisabled: primitives.primary200,
    calendarDayBackgroundPseudoSelected: primitives.primary100,
    calendarDayForegroundPseudoSelected: primitives.black,
    calendarDayBackgroundPseudoSelectedHighlighted: primitives.primary200,
    calendarDayForegroundPseudoSelectedHighlighted: primitives.black,
    calendarDayBackgroundSelected: primitives.primary400,
    calendarDayForegroundSelected: primitives.white,
    calendarDayBackgroundSelectedHighlighted: primitives.primary500,
    calendarDayForegroundSelectedHighlighted: primitives.white,

    // Progress Steps
    progressCompletedLine: primitives.primary400,
    progressCompletedNodeBackground: primitives.primary400,
    progressCompletedNodeForeground: primitives.white,
    progressActiveNodeBackground: primitives.primary100,
    progressActiveNodeForeground: primitives.primary400,
  },
};
