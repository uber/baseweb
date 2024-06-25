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

const neutralColorStates = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.disabled]: (theme, color) => ({
    color: theme.colors.tagNeutralFontDisabled,
    backgroundColor: pick(theme, theme.colors.gray50, theme.colors.gray100Dark),
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.primary]: (theme, color) => ({
    color: theme.colors.tagNeutralSolidFont,
    backgroundColor: theme.colors.tagNeutralSolidBackground,
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.secondary]: (theme, color) => ({
    color: theme.colors.tagNeutralOutlinedFont,
    backgroundColor: theme.colors.tagNeutralOutlinedBackground,
    borderColor: null,
  }),
};

const primaryColorStates = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.disabled]: (theme, color) => ({
    color: theme.colors.tagPrimaryFontDisabled,
    backgroundColor: pick(theme, theme.colors.gray50, theme.colors.gray100Dark),
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.primary]: (theme, color) => ({
    color: theme.colors.tagPrimarySolidFont,
    backgroundColor: theme.colors.tagPrimarySolidBackground,
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.secondary]: (theme, color) => ({
    color: theme.colors.tagPrimaryOutlinedFont,
    backgroundColor: theme.colors.tagPrimaryOutlinedBackground,
    borderColor: null,
  }),
};

const blueColorStates = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.disabled]: (theme, color) => ({
    color: theme.colors.tagAccentFontDisabled,
    backgroundColor: pick(theme, theme.colors.blue50, theme.colors.blue100Dark),
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.primary]: (theme, color) => ({
    color: theme.colors.tagAccentSolidFont,
    backgroundColor: theme.colors.tagAccentSolidBackground,
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.secondary]: (theme, color) => ({
    color: theme.colors.tagAccentOutlinedFont,
    backgroundColor: theme.colors.tagAccentOutlinedBackground,
    borderColor: null,
  }),
};

const greenColorStates = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.disabled]: (theme, color) => ({
    color: theme.colors.tagPositiveFontDisabled,
    backgroundColor: pick(theme, theme.colors.green50, theme.colors.green100Dark),
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.primary]: (theme, color) => ({
    color: theme.colors.tagPositiveSolidFont,
    backgroundColor: theme.colors.tagPositiveSolidBackground,
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.secondary]: (theme, color) => ({
    color: theme.colors.tagPositiveOutlinedFont,
    backgroundColor: theme.colors.tagPositiveOutlinedBackground,
    borderColor: null,
  }),
};

const yellowColorStates = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.disabled]: (theme, color) => ({
    color: theme.colors.tagWarningFontDisabled,
    backgroundColor: pick(theme, theme.colors.yellow50, theme.colors.yellow100Dark),
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.primary]: (theme, color) => ({
    color: theme.colors.tagWarningSolidFont,
    backgroundColor: theme.colors.tagWarningSolidBackground,
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.secondary]: (theme, color) => ({
    color: theme.colors.tagWarningOutlinedFont,
    backgroundColor: theme.colors.tagWarningOutlinedBackground,
    borderColor: null,
  }),
};

const redColorStates = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.disabled]: (theme, color) => ({
    color: theme.colors.tagNegativeFontDisabled,
    backgroundColor: pick(theme, theme.colors.red50, theme.colors.red100Dark),
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.primary]: (theme, color) => ({
    color: theme.colors.tagNegativeSolidFont,
    backgroundColor: theme.colors.tagNegativeSolidBackground,
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.secondary]: (theme, color) => ({
    color: theme.colors.tagNegativeOutlinedFont,
    backgroundColor: theme.colors.tagNegativeOutlinedBackground,
    borderColor: null,
  }),
};

const limeColorStates = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.disabled]: (theme, color) => ({
    color: pick(theme, theme.colors.lime300, theme.colors.lime400Dark),
    backgroundColor: pick(theme, theme.colors.lime50, theme.colors.lime100Dark),
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.primary]: (theme, color) => ({
    color: pick(theme, theme.colors.white, theme.colors.lime900Dark),
    backgroundColor: pick(theme, theme.colors.lime600, theme.colors.lime400Dark),
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.secondary]: (theme, color) => ({
    color: pick(theme, theme.colors.lime700, theme.colors.lime700Dark),
    backgroundColor: pick(theme, theme.colors.lime50, theme.colors.lime100Dark),
    borderColor: null,
  }),
};

const tealColorStates = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.disabled]: (theme, color) => ({
    color: pick(theme, theme.colors.teal300, theme.colors.teal400Dark),
    backgroundColor: pick(theme, theme.colors.teal50, theme.colors.teal100Dark),
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.primary]: (theme, color) => ({
    color: pick(theme, theme.colors.white, theme.colors.teal900Dark),
    backgroundColor: pick(theme, theme.colors.teal600, theme.colors.teal400Dark),
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.secondary]: (theme, color) => ({
    color: pick(theme, theme.colors.teal700, theme.colors.teal700Dark),
    backgroundColor: pick(theme, theme.colors.teal50, theme.colors.teal100Dark),
    borderColor: null,
  }),
};

const orangeColorStates = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.disabled]: (theme, color) => ({
    color: pick(theme, theme.colors.orange300, theme.colors.orange400Dark),
    backgroundColor: pick(theme, theme.colors.orange50, theme.colors.orange100Dark),
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.primary]: (theme, color) => ({
    color: pick(theme, theme.colors.white, theme.colors.orange900Dark),
    backgroundColor: pick(theme, theme.colors.orange600, theme.colors.orange400Dark),
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.secondary]: (theme, color) => ({
    color: pick(theme, theme.colors.orange700, theme.colors.orange700Dark),
    backgroundColor: pick(theme, theme.colors.orange50, theme.colors.orange100Dark),
    borderColor: null,
  }),
};

const purpleColorStates = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.disabled]: (theme, color) => ({
    color: pick(theme, theme.colors.purple300, theme.colors.purple400Dark),
    backgroundColor: pick(theme, theme.colors.purple50, theme.colors.purple100Dark),
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.primary]: (theme, color) => ({
    color: pick(theme, theme.colors.white, theme.colors.purple900Dark),
    backgroundColor: pick(theme, theme.colors.purple600, theme.colors.purple400Dark),
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.secondary]: (theme, color) => ({
    color: pick(theme, theme.colors.purple700, theme.colors.purple700Dark),
    backgroundColor: pick(theme, theme.colors.purple50, theme.colors.purple100Dark),
    borderColor: null,
  }),
};

const brownColorStates = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.disabled]: (theme, color) => ({
    color: pick(theme, theme.colors.amber200, theme.colors.amber400Dark),
    backgroundColor: null,
    borderColor: pick(theme, theme.colors.amber200, theme.colors.amber400Dark),
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.primary]: (theme, color) => ({
    color: pick(theme, theme.colors.white, theme.colors.gray900Dark),
    backgroundColor: pick(theme, theme.colors.amber600, theme.colors.amber400Dark),
    borderColor: null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  [COLOR_STATE.secondary]: (theme, color) => ({
    color: pick(theme, theme.colors.amber600, theme.colors.amber600Dark),
    backgroundColor: null,
    borderColor: pick(theme, theme.colors.amber600, theme.colors.amber600Dark),
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
  [KIND.neutral]: neutralColorStates,
  [KIND.primary]: primaryColorStates,
  [KIND.accent]: blueColorStates,
  [KIND.positive]: greenColorStates,
  [KIND.warning]: yellowColorStates,
  [KIND.negative]: redColorStates,
  [KIND.black]: primaryColorStates,
  [KIND.blue]: blueColorStates,
  [KIND.green]: greenColorStates,
  [KIND.red]: redColorStates,
  [KIND.yellow]: yellowColorStates,
  [KIND.orange]: orangeColorStates,
  [KIND.purple]: purpleColorStates,
  [KIND.brown]: brownColorStates,
  [KIND.lime]: limeColorStates,
  [KIND.teal]: tealColorStates,
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
        [SIZE.small]: '8px',
        [SIZE.medium]: '12px',
        [SIZE.large]: '16px',
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
    let paddingMagnitude = $theme.sizing.scale300;
    if ($size === SIZE.medium) {
      paddingMagnitude = $theme.sizing.scale400;
    } else if ($size === SIZE.large) {
      paddingMagnitude = $theme.sizing.scale600;
    }

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
      $contentMaxWidth,
    } = props;
    const borderRadius = $size === SIZE.small ? $theme.borders.radius200 : $theme.borders.radius300;
    const paddingMagnitude = {
      [SIZE.small]: $theme.sizing.scale300,
      [SIZE.medium]: $theme.sizing.scale500,
      [SIZE.large]: $theme.sizing.scale600,
    }[$size];
    const borderWidth =
      (!$disabled && $hierarchy === HIERARCHY.primary) || $kind !== KIND.custom ? 0 : '2px';
    const { color, backgroundColor, borderColor } = colorMap[$kind][getColorStateFromProps(props)](
      $theme,
      $color
    );
    return {
      ...{
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
        [SIZE.small]: '24px',
        [SIZE.medium]: '32px',
        [SIZE.large]: '40px',
      }[$size],
      justifyContent: 'space-between',
      maxWith: $contentMaxWidth === null ? '100%' : 'auto',
      marginTop: '5px',
      marginBottom: '5px',
      marginLeft: '5px',
      marginRight: '5px',
      paddingTop: $theme.sizing.scale0,
      paddingBottom: $theme.sizing.scale0,
      paddingLeft: paddingMagnitude,
      paddingRight: paddingMagnitude,
      outline: 'none',
      ':hover':
        $disabled || !$clickable
          ? {}
          : {
              boxShadow: `inset 0px 0px 100px ${pick(
                $theme,
                `rgba(0, 0, 0, 0.08)`,
                `rgba(255, 255, 255, 0.2)`
              )}`,
            },
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
