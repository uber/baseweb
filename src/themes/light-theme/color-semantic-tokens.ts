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
  HoveredAndPressedSemanticColors,
} from '../types';
import defaultFoundationColors from './color-foundation-tokens';
import { hexToRgb as hexToRgba } from '../../styles/util';
import primitiveLightColors from '../../tokens/color-primitive-tokens';

export default (
  // themePrimitives or foundation colors
  foundation: FoundationColors = defaultFoundationColors
): SemanticColors => {
  const core: CoreSemanticColors = {
    // Background
    backgroundPrimary: foundation.primaryB,
    backgroundSecondary: primitiveLightColors.gray50,
    backgroundTertiary: primitiveLightColors.gray100,
    backgroundInversePrimary: foundation.primaryA,
    backgroundInverseSecondary: primitiveLightColors.gray900,

    // Content
    contentPrimary: foundation.primaryA,
    contentSecondary: primitiveLightColors.gray800,
    contentTertiary: primitiveLightColors.gray700,
    contentInversePrimary: foundation.primaryB,
    contentInverseSecondary: primitiveLightColors.gray200,
    contentInverseTertiary: primitiveLightColors.gray400,

    // Border
    borderOpaque: primitiveLightColors.gray50,
    borderTransparent:
      hexToRgba(foundation.primaryA, '0.08') ||
      hexToRgba(defaultFoundationColors.primaryA, '0.08') ||
      '',
    borderSelected: foundation.primaryA,
    borderInverseOpaque: primitiveLightColors.gray800,
    borderInverseTransparent:
      hexToRgba(foundation.primaryB, '0.2') ||
      hexToRgba(defaultFoundationColors.primaryB, '0.2') ||
      '',
    borderInverseSelected: foundation.primaryB,
  };

  const coreExtensions: CoreExtensionSemanticColors = {
    // Backgrounds
    backgroundStateDisabled: primitiveLightColors.gray50,
    backgroundOverlay: hexToRgba(primitiveLightColors.black, '0.5') || '',
    backgroundOverlayArt: hexToRgba(primitiveLightColors.black, '0.00') || '',
    backgroundAccent: foundation.accent,
    backgroundNegative: foundation.negative,
    backgroundWarning: foundation.warning,
    backgroundPositive: foundation.positive,
    backgroundAccentLight: primitiveLightColors.blue50,
    backgroundNegativeLight: primitiveLightColors.red50,
    backgroundWarningLight: primitiveLightColors.yellow50,
    backgroundPositiveLight: primitiveLightColors.green50,
    backgroundAlwaysDark: primitiveLightColors.black,
    backgroundAlwaysLight: primitiveLightColors.white,

    // Content
    contentStateDisabled: primitiveLightColors.gray400,
    contentOnColor: primitiveLightColors.white,
    contentOnColorInverse: primitiveLightColors.black,
    contentAccent: primitiveLightColors.blue600,
    contentNegative: primitiveLightColors.red600,
    contentWarning: primitiveLightColors.yellow600,
    contentPositive: primitiveLightColors.green600,
    tagRedContentSecondary: primitiveLightColors.red700,

    // Border
    borderStateDisabled: primitiveLightColors.gray50,
    borderAccent: primitiveLightColors.blue600,
    borderAccentLight: primitiveLightColors.blue300,
    borderNegative: primitiveLightColors.red600,
    borderNegativeLight: primitiveLightColors.red300,
    borderWarning: primitiveLightColors.yellow600,
    borderWarningLight: primitiveLightColors.yellow200,
    borderPositive: primitiveLightColors.green600,
    borderPositiveLight: primitiveLightColors.green300,
    tagRedBorderSecondarySelected: primitiveLightColors.red700,

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
  /** @deprecated these tokens are deprecated */
  const deprecated: DeprecatedSemanticColors = {
    jumpRed400: primitiveLightColors.red400,
    backgroundOverlayLight: coreExtensions.backgroundOverlay,
    backgroundOverlayDark: coreExtensions.backgroundOverlay,
    backgroundLightAccent: coreExtensions.backgroundAccentLight,
    backgroundLightPositive: coreExtensions.backgroundPositiveLight,
    backgroundLightWarning: coreExtensions.backgroundWarningLight,
    backgroundLightNegative: coreExtensions.backgroundNegativeLight,
  };

  const tagTokens = {
    tagGrayBackgroundPrimary: primitiveLightColors.gray600,
    tagGrayBackgroundSecondary: primitiveLightColors.gray50,
    tagGrayContentPrimary: primitiveLightColors.white,
    tagGrayContentSecondary: primitiveLightColors.gray700,
    tagGrayBackgroundStateDisabled: primitiveLightColors.gray50,
    tagGrayContentStateDisabled: primitiveLightColors.gray300,
    tagGrayBorderPrimaryUnselected: primitiveLightColors.gray700,
    tagGrayBorderSecondaryUnselected: primitiveLightColors.gray100,
    tagGrayBorderSecondarySelected: primitiveLightColors.gray600,
    tagRedBackgroundPrimary: primitiveLightColors.red600,
    tagRedBackgroundSecondary: primitiveLightColors.red50,
    tagRedContentPrimary: primitiveLightColors.white,
    tagRedContentSecondary: primitiveLightColors.red700,
    tagRedBackgroundStateDisabled: primitiveLightColors.red50,
    tagRedContentStateDisabled: primitiveLightColors.red300,
    tagRedBorderPrimaryUnselected: primitiveLightColors.red700,
    tagRedBorderSecondaryUnselected: primitiveLightColors.red100,
    tagRedBorderSecondarySelected: primitiveLightColors.red700,
    tagOrangeBackgroundPrimary: primitiveLightColors.orange600,
    tagOrangeBackgroundSecondary: primitiveLightColors.orange50,
    tagOrangeContentPrimary: primitiveLightColors.white,
    tagOrangeContentSecondary: primitiveLightColors.orange700,
    tagOrangeBackgroundStateDisabled: primitiveLightColors.orange50,
    tagOrangeContentStateDisabled: primitiveLightColors.orange300,
    tagYellowBackgroundPrimary: primitiveLightColors.yellow300,
    tagOrangeBorderPrimaryUnselected: primitiveLightColors.orange700,
    tagYellowBackgroundSecondary: primitiveLightColors.yellow50,
    tagOrangeBorderSecondaryUnselected: primitiveLightColors.orange100,
    tagOrangeBorderSecondarySelected: primitiveLightColors.orange700,
    tagYellowContentPrimary: primitiveLightColors.black,
    tagYellowContentSecondary: primitiveLightColors.yellow700,
    tagYellowBackgroundStateDisabled: primitiveLightColors.yellow50,
    tagYellowContentStateDisabled: primitiveLightColors.yellow200,
    tagYellowBorderPrimaryUnselected: primitiveLightColors.yellow400,
    tagYellowBorderSecondaryUnselected: primitiveLightColors.yellow100,
    tagYellowBorderSecondarySelected: primitiveLightColors.yellow700,
    tagGreenBackgroundPrimary: primitiveLightColors.green600,
    tagGreenBackgroundSecondary: primitiveLightColors.green50,
    tagGreenContentPrimary: primitiveLightColors.white,
    tagGreenContentSecondary: primitiveLightColors.green700,
    tagGreenBackgroundStateDisabled: primitiveLightColors.green50,
    tagGreenContentStateDisabled: primitiveLightColors.green300,
    tagGreenBorderPrimaryUnselected: primitiveLightColors.green700,
    tagBlueBackgroundPrimary: primitiveLightColors.blue600,
    tagBlueBackgroundSecondary: primitiveLightColors.blue50,
    tagGreenBorderSecondaryUnselected: primitiveLightColors.green100,
    tagBlueContentPrimary: primitiveLightColors.white,
    tagGreenBorderSecondarySelected: primitiveLightColors.green700,
    tagBlueContentSecondary: primitiveLightColors.blue700,
    tagBlueBackgroundStateDisabled: primitiveLightColors.blue50,
    tagBlueContentStateDisabled: primitiveLightColors.blue300,
    tagBlueBorderPrimaryUnselected: primitiveLightColors.blue700,
    tagPurpleBackgroundPrimary: primitiveLightColors.purple600,
    tagPurpleBackgroundSecondary: primitiveLightColors.purple50,
    tagBlueBorderSecondaryUnselected: primitiveLightColors.blue100,
    tagBlueBorderSecondarySelected: primitiveLightColors.blue700,
    tagPurpleContentPrimary: primitiveLightColors.white,
    tagPurpleContentSecondary: primitiveLightColors.purple700,
    tagPurpleBackgroundStateDisabled: primitiveLightColors.purple50,
    tagPurpleContentStateDisabled: primitiveLightColors.purple300,
    tagPurpleBorderPrimaryUnselected: primitiveLightColors.purple700,
    tagMagentaBackgroundPrimary: primitiveLightColors.magenta600,
    tagPurpleBorderSecondaryUnselected: primitiveLightColors.purple100,
    tagMagentaBackgroundSecondary: primitiveLightColors.magenta50,
    tagPurpleBorderSecondarySelected: primitiveLightColors.purple700,
    tagMagentaContentPrimary: primitiveLightColors.white,
    tagMagentaContentSecondary: primitiveLightColors.magenta700,
    tagMagentaBackgroundStateDisabled: primitiveLightColors.magenta50,
    tagMagentaContentStateDisabled: primitiveLightColors.magenta300,
    tagMagentaBorderPrimaryUnselected: primitiveLightColors.magenta700,
    tagMagentaBorderSecondaryUnselected: primitiveLightColors.magenta100,
    tagMagentaBorderSecondarySelected: primitiveLightColors.magenta700,
    tagTealBackgroundPrimary: primitiveLightColors.teal600,
    tagTealBackgroundSecondary: primitiveLightColors.teal50,
    tagTealContentPrimary: primitiveLightColors.white,
    tagTealContentSecondary: primitiveLightColors.teal700,
    tagTealBackgroundStateDisabled: primitiveLightColors.teal50,
    tagTealContentStateDisabled: primitiveLightColors.teal300,
    tagTealBorderPrimaryUnselected: primitiveLightColors.teal700,
    tagTealBorderSecondaryUnselected: primitiveLightColors.teal100,
    tagTealBorderSecondarySelected: primitiveLightColors.teal700,
    tagLimeBackgroundPrimary: primitiveLightColors.lime600,
    tagLimeBackgroundSecondary: primitiveLightColors.lime50,
    tagLimeContentPrimary: primitiveLightColors.white,
    tagLimeContentSecondary: primitiveLightColors.lime700,
    tagLimeBackgroundStateDisabled: primitiveLightColors.lime50,
    tagLimeContentStateDisabled: primitiveLightColors.lime300,
    tagLimeBorderPrimaryUnselected: primitiveLightColors.lime700,
    tagLimeBorderSecondaryUnselected: primitiveLightColors.lime100,
    tagLimeBorderSecondarySelected: primitiveLightColors.lime700,
  }
  const hoveredAndPressedColors: HoveredAndPressedSemanticColors = {
    hoverOverlayInverseAlpha: 'rgba(255, 255, 255, 0.1)',
    hoverOverlayAlpha: 'rgba(0, 0, 0, 0.04)',
    hoverNegativeAlpha: 'rgba(222, 17, 53, 0.1)',
    pressedOverlayAlpha: 'rgba(0, 0, 0, 0.08)',
    pressedOverlayInverseAlpha: 'rgba(255, 255, 255, 0.2)',
    pressedNegativeAlpha: 'rgba(222, 17, 53, 0.15)',
  };

  return {
    ...core,
    ...coreExtensions,
    ...tagTokens,
    ...hoveredAndPressedColors,
    ...deprecated,
  };
};
