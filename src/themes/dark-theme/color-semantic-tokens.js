/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import type {
  ColorTokensT,
  CoreSemanticColorTokensT,
  CoreExtensionSemanticColorTokensT,
  SemanticColorTokensT,
} from '../types.js';
import colorTokens from './color-tokens.js';
import {hexToRgb as hexToRgba} from '../../styles/util.js';
import colors from '../../tokens/colors.js';

export default (
  // themePrimitives or foundation colors
  foundation: ColorTokensT = colorTokens,
): SemanticColorTokensT => {
  const core: CoreSemanticColorTokensT = {
    // Background
    backgroundPrimary: foundation.primaryB,
    backgroundSecondary: colors.gray800,
    backgroundTertiary: colors.gray700,
    backgroundInversePrimary: foundation.primaryA,
    backgroundInverseSecondary: colors.gray300,

    // Content
    contentPrimary: foundation.primaryA,
    contentSecondary: colors.gray400,
    contentTertiary: colors.gray500,
    contentInversePrimary: foundation.primaryB,
    contentInverseSecondary: colors.gray600,
    contentInverseTertiary: colors.gray500,

    // Border
    borderOpaque: colors.gray700,
    borderTransparent: hexToRgba(foundation.primaryA, '0.08'),
    borderSelected: foundation.primaryA,
    borderInverseOpaque: colors.gray400,
    borderInverseTransparent: hexToRgba(foundation.primaryB, '0.2'),
    borderInverseSelected: foundation.primaryB,
  };

  const coreExtensions: CoreExtensionSemanticColorTokensT = {
    // Backgrounds
    backgroundStateDisabled: colors.gray800,
    backgroundOverlayDark: hexToRgba(colors.black, '0.3'),
    backgroundOverlayLight: hexToRgba(colors.black, '0.08'),
    backgroundAccent: foundation.accent,
    backgroundNegative: foundation.negative,
    backgroundWarning: foundation.warning,
    backgroundPositive: foundation.positive,
    backgroundLightAccent: colors.blue700,
    backgroundLightPositive: colors.green700,
    backgroundLightNegative: colors.red700,
    backgroundLightWarning: colors.yellow700,
    backgroundAlwaysDark: colors.black,

    // Content
    contentStateDisabled: colors.gray600,
    contentAccent: colors.blue300,
    contentOnColor: colors.gray100,
    contentNegative: colors.red300,
    contentWarning: colors.yellow300,
    contentPositive: colors.green300,

    // Border
    borderStateDisabled: colors.gray800,
    borderAccent: colors.blue500,
    borderNegative: colors.red500,
    borderWarning: colors.yellow500,
    borderPositive: colors.green500,
  };

  return {
    ...core,
    ...coreExtensions,
  };
};
