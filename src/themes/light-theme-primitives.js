/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import type {PrimitivesT} from './types.js';

// color constants
export const primitives: PrimitivesT = {
  primary50: '#EEF3FE',
  primary100: '#D4E2FC',
  primary200: '#A0BFF9',
  primary300: '#5B91F4',
  primary400: '#276EF1',
  primary500: '#1E54B7',
  primary600: '#174291',
  primary700: '#102C60',

  negative50: '#FDF0EF',
  negative100: '#FADBD7',
  negative200: '#F4AFA7',
  negative300: '#EB7567',
  negative400: '#D44333',
  negative500: '#AE372A',
  negative600: '#892C21',
  negative700: '#5C1D16',

  warning50: '#FEF3EF',
  warning100: '#FBE2D6',
  warning200: '#F7BFA5',
  warning300: '#F19164',
  warning400: '#ED6E33',
  warning500: '#B45427',
  warning600: '#8E421F',
  warning700: '#5F2C14',

  positive50: '#F0F9F4',
  positive100: '#DAF0E3',
  positive200: '#AEDDC2',
  positive300: '#73C496',
  positive400: '#3AA76D',
  positive500: '#368759',
  positive600: '#2B6B46',
  positive700: '#1C472F',

  white: '#FFFFFF',
  mono50: '#F6F6F6',
  mono100: '#EEEEEE',
  mono200: '#E2E2E2',
  mono300: '#CBCBCB',
  mono400: '#AFAFAF',
  mono500: '#757575',
  mono600: '#545454',
  mono700: '#333333',
  mono800: '#272727', // not in uber colors, used for dark theme
  mono900: '#1F1F1F', // not in uber colors, used for dark theme
  mono1000: '#141414', // not in uber colors, used for dark theme
  black: '#000000',

  rating200: '#FFE3AC',
  rating400: '#FFC043',

  primaryFontFamily:
    'system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif',
};
