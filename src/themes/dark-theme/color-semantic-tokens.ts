/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type {
  FoundationColors,
  CoreSemanticColors,
  CoreExtensionSemanticColors,
  DeprecatedSemanticColors,
  SemanticColors,
} from '../types';
import defaultFoundationColors from './color-foundation-tokens';
import { hexToRgb as hexToRgba } from '../../styles/util';
import { primitiveLightColors, primitiveDarkColors } from '../../tokens/color-primitive-tokens';

export default (foundation: FoundationColors = defaultFoundationColors): SemanticColors => {
  const core: CoreSemanticColors = {
    // Background
    backgroundPrimary: foundation.primaryB,
    backgroundSecondary: primitiveDarkColors.gray100Dark,
    backgroundTertiary: primitiveDarkColors.gray200Dark,
    backgroundInversePrimary: primitiveDarkColors.gray800Dark,
    backgroundInverseSecondary: primitiveDarkColors.gray700Dark,

    // Content
    contentPrimary: foundation.primaryA,
    contentSecondary: primitiveDarkColors.gray800Dark,
    contentTertiary: primitiveDarkColors.gray700Dark,
    contentInversePrimary: primitiveDarkColors.black,
    contentInverseSecondary: primitiveDarkColors.gray200Dark,
    contentInverseTertiary: primitiveDarkColors.gray300Dark,

    // Border
    borderOpaque: primitiveDarkColors.gray100Dark,
    borderTransparent: hexToRgba(foundation.primaryA, '0.08') || '',
    borderSelected: foundation.primaryA,
    borderInverseOpaque: primitiveDarkColors.gray300Dark,
    borderInverseTransparent: hexToRgba(foundation.primaryB, '0.2') || '',
    borderInverseSelected: foundation.primaryB,

    // Brand theme colors
    brandBackgroundPrimary: primitiveDarkColors.brandDefault500Dark,
    brandBackgroundSecondary: primitiveDarkColors.brandDefault100Dark,
    brandBackgroundDisabled: primitiveDarkColors.brandDefault100Dark,
    brandContentPrimary: primitiveDarkColors.brandDefault600Dark,
    brandContentOnPrimary: primitiveDarkColors.white,
    brandContentOnSecondary: primitiveDarkColors.brandDefault700Dark,
    brandContentDisabled: primitiveDarkColors.brandDefault400Dark,
    brandBorderAccessible: primitiveDarkColors.brandDefault600Dark,
    brandBorderSubtle: primitiveDarkColors.brandDefault400Dark,
  };

  const coreExtensions: CoreExtensionSemanticColors = {
    // Backgrounds
    backgroundStateDisabled: primitiveDarkColors.gray100Dark,
    backgroundOverlay: hexToRgba(primitiveDarkColors.black, '0.7') || '',
    backgroundOverlayArt: hexToRgba(primitiveDarkColors.black, '0.16') || '',
    backgroundAccent: foundation.accent,
    backgroundNegative: foundation.negative,
    backgroundWarning: foundation.warning,
    backgroundPositive: foundation.positive,
    backgroundAccentLight: primitiveDarkColors.blue100Dark,
    backgroundPositiveLight: primitiveDarkColors.green100Dark,
    backgroundNegativeLight: primitiveDarkColors.red100Dark,
    backgroundWarningLight: primitiveDarkColors.yellow100Dark,
    backgroundAlwaysDark: primitiveDarkColors.gray100Dark,
    backgroundAlwaysLight: primitiveDarkColors.gray900Dark,

    // Content
    contentStateDisabled: primitiveDarkColors.gray400Dark,
    contentAccent: primitiveDarkColors.blue600Dark,
    contentOnColor: primitiveDarkColors.gray900Dark,
    contentOnColorInverse: primitiveDarkColors.black,
    contentNegative: primitiveDarkColors.red600Dark,
    contentWarning: primitiveDarkColors.yellow600Dark,
    contentPositive: primitiveDarkColors.green600Dark,

    // Border
    borderStateDisabled: primitiveDarkColors.gray100Dark,
    borderAccent: primitiveDarkColors.blue500Dark,
    borderAccentLight: primitiveDarkColors.blue400Dark,
    borderNegative: primitiveDarkColors.red500Dark,
    borderNegativeLight: primitiveDarkColors.red400Dark,
    borderWarning: primitiveDarkColors.yellow500Dark,
    borderWarningLight: primitiveDarkColors.yellow400Dark,
    borderPositive: primitiveDarkColors.green500Dark,
    borderPositiveLight: primitiveDarkColors.green400Dark,

    // Programs
    safety: primitiveLightColors.blue600,
    eatsGreen400: primitiveLightColors.green600,
    freightBlue400: primitiveLightColors.cobalt400,
    rewardsTier1: primitiveLightColors.blue600,
    rewardsTier2: primitiveLightColors.yellow300,
    rewardsTier3: primitiveLightColors.platinum400,
    rewardsTier4: primitiveLightColors.black,
    membership: primitiveLightColors.yellow600,
  };
  const deprecated: DeprecatedSemanticColors = {
    jumpRed400: primitiveLightColors.red600,
    backgroundOverlayLight: coreExtensions.backgroundOverlay,
    backgroundOverlayDark: coreExtensions.backgroundOverlay,
    backgroundLightAccent: coreExtensions.backgroundAccentLight,
    backgroundLightPositive: coreExtensions.backgroundPositiveLight,
    backgroundLightWarning: coreExtensions.backgroundWarningLight,
    backgroundLightNegative: coreExtensions.backgroundNegativeLight,
  };

  return {
    ...core,
    ...coreExtensions,
    ...deprecated,
  };
};
