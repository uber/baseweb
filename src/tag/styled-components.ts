/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import tint from 'polished/lib/color/tint.js';
import shade from 'polished/lib/color/shade.js';

import { styled, type Theme } from '../styles';
import { KIND, HIERARCHY, SIZE } from './constants';
import type { SharedPropsArg } from './types';
import * as DeprecatedStyles from './deprecated-styles';

export function customOnRamp(color: string, unit?: string) {
  // This is a temporary fix to prevent the tag from crashing when the color is not defined
  if (!color && !(unit === '0' || unit === '1000')) {
    return undefined;
  }

  switch (unit) {
    case '0':
      return 'white';
    case '50':
      return tint(0.8, color);
    case '100':
      return tint(0.6, color);
    case '200':
      return tint(0.4, color);
    case '300':
      return tint(0.2, color);
    case '400':
      return color;
    case '500':
      return shade(0.2, color);
    case '600':
      return shade(0.4, color);
    case '700':
      return shade(0.6, color);
    case '800':
      return shade(0.8, color);
    case '1000':
      return 'black';
    default:
      return color;
  }
}

const COLOR_STATE = {
  disabled: 'disabled',
  primary: 'primary',
  secondary: 'secondary',
} as const;

// Probably best to bake this into the theme once we hit our next major.
// @ts-ignore
const pick = (theme, light, dark) => (theme.name && theme.name.includes('dark') ? dark : light);

const blueColorStates = {
  [COLOR_STATE.disabled]: (theme) => ({
    color: theme.colors.tagBlueContentStateDisabled,
    backgroundColor: theme.colors.tagBlueBackgroundStateDisabled,
    borderColor: null,
  }),
  [COLOR_STATE.primary]: (theme) => ({
    color: theme.colors.tagBlueContentPrimary,
    backgroundColor: theme.colors.tagBlueBackgroundPrimary,
    borderColor: theme.colors.tagBlueBorderPrimaryUnselected,
  }),
  [COLOR_STATE.secondary]: (theme) => ({
    color: theme.colors.tagBlueContentSecondary,
    backgroundColor: theme.colors.tagBlueBackgroundSecondary,
    borderColor: theme.colors.tagBlueBorderSecondaryUnselected,
  }),
};

const greenColorStates = {
  [COLOR_STATE.disabled]: (theme) => ({
    color: theme.colors.tagGreenContentStateDisabled,
    backgroundColor: theme.colors.tagGreenBackgroundStateDisabled,
    borderColor: null,
  }),
  [COLOR_STATE.primary]: (theme) => ({
    color: theme.colors.tagGreenContentPrimary,
    backgroundColor: theme.colors.tagGreenBackgroundPrimary,
    borderColor: theme.colors.tagGreenBorderPrimaryUnselected,
  }),
  [COLOR_STATE.secondary]: (theme) => ({
    color: theme.colors.tagGreenContentSecondary,
    backgroundColor: theme.colors.tagGreenBackgroundSecondary,
    borderColor: theme.colors.tagGreenBorderSecondaryUnselected,
  }),
};

const yellowColorStates = {
  [COLOR_STATE.disabled]: (theme) => ({
    color: theme.colors.tagYellowContentStateDisabled,
    backgroundColor: theme.colors.tagYellowBackgroundStateDisabled,
    borderColor: null,
  }),
  [COLOR_STATE.primary]: (theme) => ({
    color: theme.colors.tagYellowContentPrimary,
    backgroundColor: theme.colors.tagYellowBackgroundPrimary,
    borderColor: theme.colors.tagYellowBorderPrimaryUnselected,
  }),
  [COLOR_STATE.secondary]: (theme) => ({
    color: theme.colors.tagYellowContentSecondary,
    backgroundColor: theme.colors.tagYellowBackgroundSecondary,
    borderColor: theme.colors.tagYellowBorderSecondaryUnselected,
  }),
};

const redColorStates = {
  [COLOR_STATE.disabled]: (theme) => ({
    color: theme.colors.tagRedContentStateDisabled,
    backgroundColor: theme.colors.tagRedBackgroundStateDisabled,
    borderColor: null,
  }),
  [COLOR_STATE.primary]: (theme) => ({
    color: theme.colors.tagRedContentPrimary,
    backgroundColor: theme.colors.tagRedBackgroundPrimary,
    borderColor: theme.colors.tagRedBorderPrimaryUnselected,
  }),
  [COLOR_STATE.secondary]: (theme) => ({
    color: theme.colors.tagRedContentSecondary,
    backgroundColor: theme.colors.tagRedBackgroundSecondary,
    borderColor: theme.colors.tagRedBorderSecondaryUnselected,
  }),
};

const limeColorStates = {
  [COLOR_STATE.disabled]: (theme) => ({
    color: theme.colors.tagLimeContentStateDisabled,
    backgroundColor: theme.colors.tagLimeBackgroundStateDisabled,
    borderColor: null,
  }),
  [COLOR_STATE.primary]: (theme) => ({
    color: theme.colors.tagLimeContentPrimary,
    backgroundColor: theme.colors.tagLimeBackgroundPrimary,
    borderColor: theme.colors.tagLimeBorderPrimaryUnselected,
  }),
  [COLOR_STATE.secondary]: (theme) => ({
    color: theme.colors.tagLimeContentSecondary,
    backgroundColor: theme.colors.tagLimeBackgroundSecondary,
    borderColor: theme.colors.tagLimeBorderSecondaryUnselected,
  }),
};

const tealColorStates = {
  [COLOR_STATE.disabled]: (theme) => ({
    color: theme.colors.tagTealContentStateDisabled,
    backgroundColor: theme.colors.tagTealBackgroundStateDisabled,
    borderColor: null,
  }),
  [COLOR_STATE.primary]: (theme) => ({
    color: theme.colors.tagTealContentPrimary,
    backgroundColor: theme.colors.tagTealBackgroundPrimary,
    borderColor: theme.colors.tagTealBorderPrimaryUnselected,
  }),
  [COLOR_STATE.secondary]: (theme) => ({
    color: theme.colors.tagTealContentSecondary,
    backgroundColor: theme.colors.tagTealBackgroundSecondary,
    borderColor: theme.colors.tagTealBorderSecondaryUnselected,
  }),
};

const orangeColorStates = {
  [COLOR_STATE.disabled]: (theme) => ({
    color: theme.colors.tagOrangeContentStateDisabled,
    backgroundColor: theme.colors.tagOrangeBackgroundStateDisabled,
    borderColor: null,
  }),
  [COLOR_STATE.primary]: (theme) => ({
    color: theme.colors.tagOrangeContentPrimary,
    backgroundColor: theme.colors.tagOrangeBackgroundPrimary,
    borderColor: theme.colors.tagOrangeBorderPrimaryUnselected,
  }),
  [COLOR_STATE.secondary]: (theme) => ({
    color: theme.colors.tagOrangeContentSecondary,
    backgroundColor: theme.colors.tagOrangeBackgroundSecondary,
    borderColor: theme.colors.tagOrangeBorderSecondaryUnselected,
  }),
};

const purpleColorStates = {
  [COLOR_STATE.disabled]: (theme) => ({
    color: theme.colors.tagPurpleContentStateDisabled,
    backgroundColor: theme.colors.tagPurpleBackgroundStateDisabled,
    borderColor: null,
  }),
  [COLOR_STATE.primary]: (theme) => ({
    color: theme.colors.tagPurpleContentPrimary,
    backgroundColor: theme.colors.tagPurpleBackgroundPrimary,
    borderColor: theme.colors.tagPurpleBorderPrimaryUnselected,
  }),
  [COLOR_STATE.secondary]: (theme) => ({
    color: theme.colors.tagPurpleContentSecondary,
    backgroundColor: theme.colors.tagPurpleBackgroundSecondary,
    borderColor: theme.colors.tagPurpleBorderSecondaryUnselected,
  }),
};

const magentaColorStates = {
  [COLOR_STATE.disabled]: (theme) => ({
    color: theme.colors.tagMagentaContentStateDisabled,
    backgroundColor: theme.colors.tagMagentaBackgroundStateDisabled,
    borderColor: null,
  }),
  [COLOR_STATE.primary]: (theme) => ({
    color: theme.colors.tagMagentaContentPrimary,
    backgroundColor: theme.colors.tagMagentaBackgroundPrimary,
    borderColor: theme.colors.tagMagentaBorderPrimaryUnselected,
  }),
  [COLOR_STATE.secondary]: (theme) => ({
    color: theme.colors.tagMagentaContentSecondary,
    backgroundColor: theme.colors.tagMagentaBackgroundSecondary,
    borderColor: theme.colors.tagMagentaBorderSecondaryUnselected,
  }),
};

const grayColorStates = {
  [COLOR_STATE.disabled]: (theme) => ({
    color: theme.colors.tagGrayContentStateDisabled,
    backgroundColor: theme.colors.tagGrayBackgroundStateDisabled,
    borderColor: null,
  }),
  [COLOR_STATE.primary]: (theme) => ({
    color: theme.colors.tagGrayContentPrimary,
    backgroundColor: theme.colors.tagGrayBackgroundPrimary,
    borderColor: theme.colors.tagGrayBorderPrimaryUnselected,
  }),
  [COLOR_STATE.secondary]: (theme) => ({
    color: theme.colors.tagGrayContentSecondary,
    backgroundColor: theme.colors.tagGrayBackgroundSecondary,
    borderColor: theme.colors.tagGrayBorderSecondaryUnselected,
  }),
};

const customColorStates = {
  // @ts-ignore
  [COLOR_STATE.disabled]: (theme, color) => ({
    color: customOnRamp(color, theme.colors.tagFontDisabledRampUnit),
    backgroundColor: null,
    borderColor: customOnRamp(color, theme.colors.tagSolidDisabledRampUnit),
  }),
  // @ts-ignore
  [COLOR_STATE.primary]: (theme, color) => ({
    color: customOnRamp(color, theme.colors.tagSolidFontRampUnit),
    backgroundColor: customOnRamp(color, theme.colors.tagSolidRampUnit),
    borderColor: null,
  }),
  // @ts-ignore
  [COLOR_STATE.secondary]: (theme, color) => ({
    color: customOnRamp(color, theme.colors.tagOutlinedFontRampUnit),
    backgroundColor: null,
    borderColor: customOnRamp(color, theme.colors.tagOutlinedRampUnit),
  }),
};

const colorMap = {
  [KIND.neutral]: DeprecatedStyles.deprecatedNeutralColorStates,
  [KIND.primary]: DeprecatedStyles.deprecatedPrimaryColorStates,
  [KIND.accent]: DeprecatedStyles.deprecatedBlueColorStates,
  [KIND.positive]: DeprecatedStyles.deprecatedGreenColorStates,
  [KIND.warning]: DeprecatedStyles.deprecatedYellowColorStates,
  [KIND.negative]: DeprecatedStyles.deprecatedRedColorStates,
  [KIND.black]: DeprecatedStyles.deprecatedPrimaryColorStates,
  [KIND.blue]: blueColorStates,
  [KIND.green]: greenColorStates,
  [KIND.red]: redColorStates,
  [KIND.yellow]: yellowColorStates,
  [KIND.orange]: orangeColorStates,
  [KIND.purple]: purpleColorStates,
  [KIND.brown]: DeprecatedStyles.deprecatedBrownColorStates,
  [KIND.lime]: limeColorStates,
  [KIND.teal]: tealColorStates,
  [KIND.magenta]: magentaColorStates,
  [KIND.gray]: grayColorStates,
  [KIND.custom]: customColorStates,
};

// @ts-ignore
const getColorStateFromProps = (props) => {
  if (props.$disabled) return COLOR_STATE.disabled;
  if (props.$hierarchy === HIERARCHY.primary) return COLOR_STATE.primary;
  return COLOR_STATE.secondary;
};

export const Action = styled<'span', SharedPropsArg>(
  'span',
  (
    props: SharedPropsArg & {
      $theme: Theme;
    }
  ) => {
    const { $theme, $disabled, $size = SIZE.small } = props;
    const bottomRadiusDir: string =
      $theme.direction === 'rtl' ? 'borderBottomLeftRadius' : 'borderBottomRightRadius';
    const topRadiusDir: string =
      $theme.direction === 'rtl' ? 'borderTopLeftRadius' : 'borderTopRightRadius';
    const marginDir: string = $theme.direction === 'rtl' ? 'marginRight' : 'marginLeft';
    return {
      alignItems: 'center',
      [bottomRadiusDir]: $theme.borders.useRoundedCorners ? $theme.borders.radius400 : 0,
      [topRadiusDir]: $theme.borders.useRoundedCorners ? $theme.borders.radius400 : 0,
      cursor: $disabled ? 'not-allowed' : 'pointer',
      display: 'flex',
      [marginDir]: {
        [SIZE.xSmall]: $theme.sizing.scale100,
        [SIZE.small]: $theme.sizing.scale300,
        [SIZE.medium]: $theme.sizing.scale300,
        [SIZE.large]: $theme.sizing.scale500,
      }[$size],
      outline: 'none',
      transitionProperty: 'all',
      transitionDuration: 'background-color',
      transitionTimingFunction: $theme.animation.easeOutCurve,
    };
  }
);

Action.displayName = 'Action';

export const StartEnhancerContainer = styled<'div', SharedPropsArg>(
  'div',
  ({
    $theme,
    $size = SIZE.small,
  }: SharedPropsArg & {
    $theme: Theme;
  }) => {
    const paddingMagnitude = {
      [SIZE.xSmall]: $theme.sizing.scale100,
      [SIZE.small]: $theme.sizing.scale300,
      [SIZE.medium]: $theme.sizing.scale300,
      [SIZE.large]: $theme.sizing.scale500,
    }[$size];

    const paddingDir: string = $theme.direction === 'rtl' ? 'paddingLeft' : 'paddingRight';

    return {
      alignItems: 'center',
      display: 'flex',
      [paddingDir]: paddingMagnitude,
    };
  }
);

StartEnhancerContainer.displayName = 'StartEnhancerContainer';

export const Text = styled<'span', SharedPropsArg>(
  'span',
  (
    props: SharedPropsArg & {
      $theme: Theme;
    }
  ) => {
    const { $theme, $contentMaxWidth } = props;

    return {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      maxWidth:
        $contentMaxWidth === null ? 'auto' : $contentMaxWidth || props.$theme.sizing.scale3200,
      order: $theme.direction === 'rtl' ? 1 : 0,
    };
  }
);

Text.displayName = 'Text';

export const Root = styled<'span', SharedPropsArg>(
  'span',
  (
    props: SharedPropsArg & {
      $theme: Theme;
    }
  ) => {
    const {
      $theme,
      $kind = KIND.primary,
      $clickable,
      $hierarchy,
      $disabled,
      $closeable,
      $isFocusVisible,
      $color,
      $size = SIZE.small,
    } = props;
    const borderRadius =
      $size === SIZE.small || $size === SIZE.xSmall
        ? $theme.borders.radius200
        : $theme.borders.radius300;
    const paddingMagnitude = {
      [SIZE.xSmall]: $theme.sizing.scale100,
      [SIZE.small]: $theme.sizing.scale200,
      [SIZE.medium]: $theme.sizing.scale300,
      [SIZE.large]: $theme.sizing.scale400,
    }[$size];
    const paddingLongitude = {
      [SIZE.xSmall]: $theme.sizing.scale0,
      [SIZE.small]: $theme.sizing.scale100,
      [SIZE.medium]: $theme.sizing.scale100,
      [SIZE.large]: $theme.sizing.scale300,
    }[$size];
    const isActionable = !$disabled && ($clickable || $closeable);
    const borderWidthValue = {
      [SIZE.xSmall]: '1px',
      [SIZE.small]: '1px',
      [SIZE.medium]: '1px',
      [SIZE.large]: '2px',
    }[$size];

    const { color, backgroundColor, borderColor } = colorMap[$kind][getColorStateFromProps(props)](
      $theme,
      $color
    );
    // previously, only secondary and disabled custom tags had borders
    // now, it extends to actionable tags as well
    const showBorder =
      ($kind === KIND.custom && ($hierarchy === HIERARCHY.secondary || $disabled)) ||
      ($kind !== KIND.custom && isActionable && !!borderColor);
    const borderWidth = showBorder ? borderWidthValue : 0;

    return {
      ...{
        [SIZE.xSmall]: $theme.typography.LabelXSmall,
        [SIZE.small]: $theme.typography.LabelSmall,
        [SIZE.medium]: $theme.typography.LabelMedium,
        [SIZE.large]: $theme.typography.LabelLarge,
      }[$size],
      alignItems: 'center',
      color,
      backgroundColor,
      borderLeftColor: borderColor,
      borderRightColor: borderColor,
      borderTopColor: borderColor,
      borderBottomColor: borderColor,
      borderLeftStyle: 'solid',
      borderRightStyle: 'solid',
      borderTopStyle: 'solid',
      borderBottomStyle: 'solid',
      borderLeftWidth: borderWidth,
      borderRightWidth: borderWidth,
      borderTopWidth: borderWidth,
      borderBottomWidth: borderWidth,
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
      borderBottomLeftRadius: borderRadius,
      boxSizing: 'border-box',
      cursor: $disabled ? 'not-allowed' : $clickable ? 'pointer' : 'default',
      display: 'inline-flex',
      height: {
        [SIZE.xSmall]: '20px',
        [SIZE.small]: '24px',
        [SIZE.medium]: '32px',
        [SIZE.large]: '40px',
      }[$size],
      justifyContent: 'space-between',
      marginTop: '5px',
      marginBottom: '5px',
      marginLeft: '5px',
      marginRight: '5px',
      paddingTop: paddingLongitude,
      paddingBottom: paddingLongitude,
      paddingLeft: paddingMagnitude,
      paddingRight: paddingMagnitude,
      outline: 'none',
      ...(isActionable
        ? {
            // adding overlay component to cover both border and content area for hovered and pressed state
            position: 'relative',
            '::before': {
              content: "''",
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderTopLeftRadius: 'inherit',
              borderTopRightRadius: 'inherit',
              borderBottomRightRadius: 'inherit',
              borderBottomLeftRadius: 'inherit',
              backgroundColor: 'transparent',
              pointerEvents: 'none',
            },
            // end of overlay
            // Applies only on devices that support hovering, like desktop computers.
            '@media (hover: hover)': {
              ':hover::before': {
                backgroundColor: $theme.colors.hoverOverlayAlpha,
                // this box shadow is used to extend the overlay to the border
                boxShadow: `0 0 0 ${borderWidth} ${$theme.colors.hoverOverlayAlpha}`,
              },
            },
            ':active::before': {
              backgroundColor: $theme.colors.pressedOverlayAlpha,
              // this box shadow is used to extend the overlay to the border
              boxShadow: `0 0 0 ${borderWidth} ${$theme.colors.pressedOverlayAlpha}`,
            },
          }
        : {}),
      ':focus':
        $disabled || (!$clickable && !$closeable)
          ? {}
          : {
              boxShadow: $isFocusVisible
                ? `0 0 0 3px ${
                    $kind === KIND.accent
                      ? $theme.colors.backgroundInversePrimary
                      : $theme.colors.backgroundAccent
                  }`
                : 'none',
            },
    };
  }
);
Root.displayName = 'Root';
