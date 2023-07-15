/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { colors } from '../../tokens';
import type { ColorTokens } from '../types';

// color constants
const lightColorTokens: ColorTokens = {
  // Primary Palette
  primaryA: colors.black,
  primaryB: colors.white,
  primary: colors.black,
  primary50: '#F6F6F6',
  primary100: '#EEEEEE',
  primary200: '#E2E2E2',
  primary300: '#CBCBCB',
  primary400: '#AFAFAF',
  primary500: '#6B6B6B',
  primary600: '#545454',
  primary700: '#333333',
  // Accent Palette
  accent: colors.blue400,
  accent50: '#EFF3FE',
  accent100: '#D4E2FC',
  accent200: '#A0BFF8',
  accent300: '#5B91F5',
  accent400: '#276EF1',
  accent500: '#1E54B7',
  accent600: '#174291',
  accent700: '#102C60',
  // Negative Palette
  negative: colors.red400,
  negative50: '#FFEFED',
  negative100: '#FED7D2',
  negative200: '#F1998E',
  negative300: '#E85C4A',
  negative400: '#E11900',
  negative500: '#AB1300',
  negative600: '#870F00',
  negative700: '#5A0A00',
  // Warning Palette
  warning: colors.yellow400,
  warning50: '#FFFAF0',
  warning100: '#FFF2D9',
  warning200: '#FFE3AC',
  warning300: '#FFCF70',
  warning400: '#FFC043',
  warning500: '#BC8B2C',
  warning600: '#996F00',
  warning700: '#674D1B',
  // Positive Palette
  positive: colors.green500,
  positive50: '#E6F2ED',
  positive100: '#ADDEC9',
  positive200: '#66D19E',
  positive300: '#06C167',
  positive400: '#048848',
  positive500: '#03703C',
  positive600: '#03582F',
  positive700: '#10462D',
  // Monochrome Palette
  white: '#FFFFFF',
  black: '#000000',
  mono100: '#FFFFFF',
  mono200: '#F6F6F6',
  mono300: '#EEEEEE',
  mono400: '#E2E2E2',
  mono500: '#CBCBCB',
  mono600: '#AFAFAF',
  mono700: '#6B6B6B',
  mono800: '#545454',
  mono900: '#333333',
  mono1000: '#000000',
  // Rating Palette,
  ratingInactiveFill: colors.gray100,
  ratingStroke: colors.gray300,
};

export default lightColorTokens;
