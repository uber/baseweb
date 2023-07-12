/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type {
  ColorTokens,
  CoreSemanticColorTokens,
  CoreExtensionSemanticColorTokens,
  DeprecatedSemanticColorTokens,
  SemanticColorTokens,
} from '../types';
import colorTokens from './color-tokens';
import { hexToRgb as hexToRgba } from '../../styles/util';
import colors from '../../tokens/colors';

export default (
  // themePrimitives or foundation colors
  foundation: ColorTokens = colorTokens
): SemanticColorTokens => {
  const core: CoreSemanticColorTokens = {
    // Background
    backgroundPrimary: foundation.primaryB,
    backgroundSecondary: colors.gray800,
    backgroundTertiary: colors.gray700,
    backgroundInversePrimary: foundation.primaryA,
    backgroundInverseSecondary: colors.gray300,

    // Content
    contentPrimary: colors.white,
    contentSecondary: colors.gray300,
    contentTertiary: colors.gray400,
    contentInversePrimary: colors.black,
    contentInverseSecondary: colors.gray700,
    contentInverseTertiary: colors.gray600,

    // Border
    borderOpaque: colors.gray700,
    // @ts-ignore
    borderTransparent: hexToRgba(foundation.primaryA, '0.08'),
    borderSelected: foundation.primaryA,
    borderInverseOpaque: colors.gray400,
    // @ts-ignore
    borderInverseTransparent: hexToRgba(foundation.primaryB, '0.2'),
    borderInverseSelected: foundation.primaryB,
  };

  const coreExtensions: CoreExtensionSemanticColorTokens = {
    // Backgrounds
    backgroundStateDisabled: colors.gray800,
    // @ts-ignore
    backgroundOverlay: hexToRgba(colors.black, '0.7'),
    // @ts-ignore
    backgroundOverlayArt: hexToRgba(colors.black, '0.16'),
    backgroundAccent: foundation.accent,
    backgroundNegative: foundation.negative,
    backgroundWarning: foundation.warning,
    backgroundPositive: colors.green500,
    backgroundAccentLight: colors.blue700,
    backgroundPositiveLight: colors.green700,
    backgroundNegativeLight: colors.red700,
    backgroundWarningLight: colors.yellow700,
    backgroundAlwaysDark: colors.gray900,
    backgroundAlwaysLight: colors.gray100,

    // Content
    contentStateDisabled: colors.gray600,
    contentAccent: colors.blue300,
    contentOnColor: colors.white,
    contentOnColorInverse: colors.black,
    contentNegative: colors.red300,
    contentWarning: colors.yellow300,
    contentPositive: colors.green300,

    // Border
    borderStateDisabled: colors.gray800,
    borderAccent: colors.blue400,
    borderAccentLight: colors.blue500,
    borderNegative: colors.red500,
    borderWarning: colors.yellow500,
    borderPositive: colors.green500,
    borderNegativeLight: colors.red200,
    borderWarningLight: colors.yellow200,
    borderPositiveLight: colors.green200,

    // Programs
    safety: colors.blue400,
    eatsGreen400: colors.green400,
    freightBlue400: colors.cobalt400,
    jumpRed400: colors.red400,
    rewardsTier1: colors.blue400,
    rewardsTier2: colors.yellow400,
    rewardsTier3: colors.platinum400,
    rewardsTier4: colors.gray200,
    membership: colors.yellow600,
  };
  const deprecated: DeprecatedSemanticColorTokens = {
    backgroundOverlayLight: coreExtensions.backgroundOverlay,
    backgroundOverlayDark: coreExtensions.backgroundOverlay,
  };

  return {
    ...core,
    ...coreExtensions,
    ...deprecated,
  };
};
