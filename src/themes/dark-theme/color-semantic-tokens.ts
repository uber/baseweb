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


  const tagTokens ={
    tagGrayBackgroundPrimary: primitiveDarkColors.gray400Dark,
    tagGrayBackgroundSecondary: primitiveDarkColors.gray100Dark,
    tagGrayContentPrimary: primitiveDarkColors.gray900Dark,
    tagGrayContentSecondary: primitiveDarkColors.gray700Dark,
    tagGrayBackgroundStateDisabled: primitiveDarkColors.gray100Dark,
    tagGrayContentStateDisabled: primitiveDarkColors.gray400Dark,
    tagGrayBorderPrimaryUnselected: primitiveDarkColors.gray500Dark,
    tagGrayBorderSecondaryUnselected: primitiveDarkColors.gray500Dark,
    tagGrayBorderSecondarySelected: primitiveDarkColors.gray800Dark,
    tagRedBackgroundPrimary: primitiveDarkColors.red400Dark,
    tagRedBackgroundSecondary: primitiveDarkColors.red100Dark,
    tagRedContentPrimary: primitiveDarkColors.red900Dark,
    tagRedContentSecondary: primitiveDarkColors.red700Dark,
    tagRedBackgroundStateDisabled: primitiveDarkColors.red100Dark,
    tagRedContentStateDisabled: primitiveDarkColors.red400Dark,
    tagRedBorderPrimaryUnselected: primitiveDarkColors.red500Dark,
    tagRedBorderSecondaryUnselected: primitiveDarkColors.red500Dark,
    tagRedBorderSecondarySelected: primitiveDarkColors.red800Dark,
    tagOrangeBackgroundPrimary: primitiveDarkColors.orange400Dark,
    tagOrangeBackgroundSecondary: primitiveDarkColors.orange100Dark,
    tagOrangeContentPrimary: primitiveDarkColors.orange900Dark,
    tagOrangeContentSecondary: primitiveDarkColors.orange700Dark,
    tagOrangeBackgroundStateDisabled: primitiveDarkColors.orange100Dark,
    tagOrangeContentStateDisabled: primitiveDarkColors.orange400Dark,
    tagYellowBackgroundPrimary: primitiveDarkColors.yellow700Dark,
    tagOrangeBorderPrimaryUnselected: primitiveDarkColors.orange500Dark,
    tagYellowBackgroundSecondary: primitiveDarkColors.yellow100Dark,
    tagOrangeBorderSecondaryUnselected: primitiveDarkColors.orange500Dark,
    tagOrangeBorderSecondarySelected: primitiveDarkColors.orange800Dark,
    tagYellowContentPrimary: primitiveDarkColors.yellow50Dark,
    tagYellowContentSecondary: primitiveDarkColors.yellow900Dark,
    tagYellowBackgroundStateDisabled: primitiveDarkColors.yellow100Dark,
    tagYellowContentStateDisabled: primitiveDarkColors.yellow400Dark,
    tagYellowBorderPrimaryUnselected: primitiveDarkColors.yellow800Dark,
    tagYellowBorderSecondaryUnselected: primitiveDarkColors.yellow500Dark,
    tagYellowBorderSecondarySelected: primitiveDarkColors.yellow800Dark,
    tagGreenBackgroundPrimary: primitiveDarkColors.green400Dark,
    tagGreenBackgroundSecondary: primitiveDarkColors.green100Dark,
    tagGreenContentPrimary: primitiveDarkColors.green900Dark,
    tagGreenContentSecondary: primitiveDarkColors.green700Dark,
    tagGreenBackgroundStateDisabled: primitiveDarkColors.green100Dark,
    tagGreenContentStateDisabled: primitiveDarkColors.green400Dark,
    tagGreenBorderPrimaryUnselected: primitiveDarkColors.green500Dark,
    tagBlueBackgroundPrimary: primitiveDarkColors.blue400Dark,
    tagBlueBackgroundSecondary: primitiveDarkColors.blue100Dark,
    tagGreenBorderSecondaryUnselected: primitiveDarkColors.green500Dark,
    tagBlueContentPrimary: primitiveDarkColors.blue900Dark,
    tagGreenBorderSecondarySelected: primitiveDarkColors.green800Dark,
    tagBlueContentSecondary: primitiveDarkColors.blue700Dark,
    tagBlueBackgroundStateDisabled: primitiveDarkColors.blue100Dark,
    tagBlueContentStateDisabled: primitiveDarkColors.blue400Dark,
    tagBlueBorderPrimaryUnselected: primitiveDarkColors.blue500Dark,
    tagPurpleBackgroundPrimary: primitiveDarkColors.purple400Dark,
    tagPurpleBackgroundSecondary: primitiveDarkColors.purple100Dark,
    tagBlueBorderSecondaryUnselected: primitiveDarkColors.blue500Dark,
    tagBlueBorderSecondarySelected: primitiveDarkColors.blue800Dark,
    tagPurpleContentPrimary: primitiveDarkColors.purple900Dark,
    tagPurpleContentSecondary: primitiveDarkColors.purple700Dark,
    tagPurpleBackgroundStateDisabled: primitiveDarkColors.purple100Dark,
    tagPurpleContentStateDisabled: primitiveDarkColors.purple400Dark,
    tagPurpleBorderPrimaryUnselected: primitiveDarkColors.purple500Dark,
    tagMagentaBackgroundPrimary: primitiveDarkColors.magenta400Dark,
    tagPurpleBorderSecondaryUnselected: primitiveDarkColors.purple500Dark,
    tagMagentaBackgroundSecondary: primitiveDarkColors.magenta100Dark,
    tagPurpleBorderSecondarySelected: primitiveDarkColors.purple800Dark,
    tagMagentaContentPrimary: primitiveDarkColors.magenta900Dark,
    tagMagentaContentSecondary: primitiveDarkColors.magenta700Dark,
    tagMagentaBackgroundStateDisabled: primitiveDarkColors.magenta100Dark,
    tagMagentaContentStateDisabled: primitiveDarkColors.magenta400Dark,
    tagMagentaBorderPrimaryUnselected: primitiveDarkColors.magenta500Dark,
    tagMagentaBorderSecondaryUnselected: primitiveDarkColors.magenta500Dark,
    tagMagentaBorderSecondarySelected: primitiveDarkColors.magenta800Dark,
    tagTealBackgroundPrimary: primitiveDarkColors.teal400Dark,
    tagTealBackgroundSecondary: primitiveDarkColors.teal100Dark,
    tagTealContentPrimary: primitiveDarkColors.teal900Dark,
    tagTealContentSecondary: primitiveDarkColors.teal700Dark,
    tagTealBackgroundStateDisabled: primitiveDarkColors.teal100Dark,
    tagTealContentStateDisabled: primitiveDarkColors.teal400Dark,
    tagTealBorderPrimaryUnselected: primitiveDarkColors.teal500Dark,
    tagTealBorderSecondaryUnselected: primitiveDarkColors.teal500Dark,
    tagTealBorderSecondarySelected: primitiveDarkColors.teal800Dark,
    tagLimeBackgroundPrimary: primitiveDarkColors.lime400Dark,
    tagLimeBackgroundSecondary: primitiveDarkColors.lime100Dark,
    tagLimeContentPrimary: primitiveDarkColors.lime900Dark,
    tagLimeContentSecondary: primitiveDarkColors.lime700Dark,
    tagLimeBackgroundStateDisabled: primitiveDarkColors.lime100Dark,
    tagLimeContentStateDisabled: primitiveDarkColors.lime400Dark,
    tagLimeBorderPrimaryUnselected: primitiveDarkColors.lime500Dark,
    tagLimeBorderSecondaryUnselected: primitiveDarkColors.lime500Dark,
    tagLimeBorderSecondarySelected: primitiveDarkColors.lime800Dark,
  };

  return {
    ...core,
    ...coreExtensions,
    ...tagTokens,
    ...deprecated,
  };
};
