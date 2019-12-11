/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import type {
  FoundationSemanticColorTokensT,
  CoreSemanticColorTokensT,
  CoreExtensionSemanticColorTokensT,
  SemanticColorTokensT,
} from '../types.js';
import {hexToRgb as hexToRgba} from '../../styles/util.js';
import colors from '../../tokens/colors.js';

const foundation: FoundationSemanticColorTokensT = {
  primaryA: colors.black,
  primaryB: colors.white,
  accent: colors.blue400,
  negative: colors.red400,
  warning: colors.yellow400,
  positive: colors.green400,
};

const core: CoreSemanticColorTokensT = {
  // Background
  backgroundPrimary: foundation.primaryB,
  backgroundSecondary: colors.gray50,
  backgroundTertiary: colors.gray100,
  backgroundInversePrimary: foundation.primaryA,
  backgroundInverseSecondary: colors.gray800,

  // Content
  contentPrimary: foundation.primaryA,
  contentSecondary: colors.gray600,
  contentTertiary: colors.gray500,
  contentInversePrimary: foundation.primaryB,
  contentInverseSecondary: colors.gray300,
  contentInverseTertiary: colors.gray400,

  // Border
  borderOpaque: colors.gray200,
  borderTransparent: hexToRgba(foundation.primaryA, '0.08'),
  borderSelected: foundation.primaryA,
  borderInverseOpaque: colors.gray700,
  borderInverseTransparent: hexToRgba(foundation.primaryB, '0.2'),
  borderInverseSelected: foundation.primaryB,
};

const coreExtensions: CoreExtensionSemanticColorTokensT = {
  // Backgrounds
  backgroundStateDisabled: colors.gray50,
  backgroundOverlayDark: hexToRgba(colors.black, '0.3'),
  backgroundOverlayLight: hexToRgba(colors.black, '0.08'),
  backgroundAccent: foundation.accent,
  backgroundNegative: foundation.negative,
  backgroundWarning: foundation.warning,
  backgroundPositive: foundation.positive,
  backgroundLightAccent: colors.blue50,
  backgroundLightPositive: colors.green50,
  backgroundLightNegative: colors.red50,
  backgroundLightWarning: colors.yellow50,
  backgroundAlwaysDark: colors.black,

  // Content
  contentStateDisabled: colors.gray400,
  contentAccent: foundation.accent,
  contentOnColor: colors.white,
  contentNegative: foundation.negative,
  contentWarning: colors.yellow500,
  contentPositive: foundation.positive,

  // Border
  borderStateDisabled: colors.gray50,
  borderAccent: colors.blue200,
  borderNegative: colors.red200,
  borderWarning: colors.yellow200,
  borderPositive: colors.green200,
};

const semantic: SemanticColorTokensT = {
  ...foundation,
  ...core,
  ...coreExtensions,
};

export default semantic;
