/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import tint from 'polished/lib/color/tint.js';
import shade from 'polished/lib/color/shade.js';

import {styled} from '../styles/index.js';
import {KIND, VARIANT} from './constants.js';
import type {SharedPropsArgT} from './types.js';
import {colors as colorTokens} from '../tokens/index.js';

export function customOnRamp(color?: string, unit?: string) {
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

const STATE = {
  disabled: 'disabled',
  solid: 'solid',
  hover: 'hover',
  outline: 'outline',
};

// Probably best to bake this into the theme once we hit our next major.
const pick = (theme, light, dark) =>
  theme.name.includes('dark') ? dark : light;

const colorMatrix = {
  [KIND.neutral]: {
    [STATE.disabled]: theme => ({
      color: theme.colors.tagNeutralFontDisabled,
      backgroundColor: null,
      borderColor: theme.colors.tagNeutralOutlinedDisabled,
    }),
    [STATE.solid]: theme => ({
      color: theme.colors.tagNeutralSolidFont,
      backgroundColor: theme.colors.tagNeutralSolidBackground,
      borderColor: null,
    }),
    [STATE.hover]: theme => ({
      color: theme.colors.tagNeutralOutlinedFontHover,
      backgroundColor: theme.colors.tagNeutralOutlinedHover,
      borderColor: theme.colors.tagNeutralOutlinedBackground,
    }),
    [STATE.outline]: theme => ({
      color: theme.colors.tagNeutralOutlinedFont,
      backgroundColor: null,
      borderColor: theme.colors.tagNeutralOutlinedBackground,
    }),
  },
  [KIND.primary]: {
    [STATE.disabled]: theme => ({
      color: theme.colors.tagPrimaryFontDisabled,
      backgroundColor: null,
      borderColor: theme.colors.tagPrimaryOutlinedDisabled,
    }),
    [STATE.solid]: theme => ({
      color: theme.colors.tagPrimarySolidFont,
      backgroundColor: theme.colors.tagPrimarySolidBackground,
      borderColor: null,
    }),
    [STATE.hover]: theme => ({
      color: theme.colors.tagPrimaryOutlinedFontHover,
      backgroundColor: theme.colors.tagPrimaryOutlinedHover,
      borderColor: theme.colors.tagPrimaryOutlinedBackground,
    }),
    [STATE.outline]: theme => ({
      color: theme.colors.tagPrimaryOutlinedFont,
      backgroundColor: null,
      borderColor: theme.colors.tagPrimaryOutlinedBackground,
    }),
  },
  [KIND.accent]: {
    [STATE.disabled]: theme => ({
      color: theme.colors.tagAccentFontDisabled,
      backgroundColor: null,
      borderColor: theme.colors.tagAccentOutlinedDisabled,
    }),
    [STATE.solid]: theme => ({
      color: theme.colors.tagAccentSolidFont,
      backgroundColor: theme.colors.tagAccentSolidBackground,
      borderColor: null,
    }),
    [STATE.hover]: theme => ({
      color: theme.colors.tagAccentOutlinedFontHover,
      backgroundColor: theme.colors.tagAccentOutlinedHover,
      borderColor: theme.colors.tagAccentOutlinedBackground,
    }),
    [STATE.outline]: theme => ({
      color: theme.colors.tagAccentOutlinedFont,
      backgroundColor: null,
      borderColor: theme.colors.tagAccentOutlinedBackground,
    }),
  },
  [KIND.positive]: {
    [STATE.disabled]: theme => ({
      color: theme.colors.tagPositiveFontDisabled,
      backgroundColor: null,
      borderColor: theme.colors.tagPositiveOutlinedDisabled,
    }),
    [STATE.solid]: theme => ({
      color: theme.colors.tagPositiveSolidFont,
      backgroundColor: theme.colors.tagPositiveSolidBackground,
      borderColor: null,
    }),
    [STATE.hover]: theme => ({
      color: theme.colors.tagPositiveOutlinedFontHover,
      backgroundColor: theme.colors.tagPositiveOutlinedHover,
      borderColor: theme.colors.tagPositiveOutlinedBackground,
    }),
    [STATE.outline]: theme => ({
      color: theme.colors.tagPositiveOutlinedFont,
      backgroundColor: null,
      borderColor: theme.colors.tagPositiveOutlinedBackground,
    }),
  },
  [KIND.warning]: {
    [STATE.disabled]: theme => ({
      color: theme.colors.tagWarningFontDisabled,
      backgroundColor: null,
      borderColor: theme.colors.tagWarningOutlinedDisabled,
    }),
    [STATE.solid]: theme => ({
      color: theme.colors.tagWarningSolidFont,
      backgroundColor: theme.colors.tagWarningSolidBackground,
      borderColor: null,
    }),
    [STATE.hover]: theme => ({
      color: theme.colors.tagWarningOutlinedFontHover,
      backgroundColor: theme.colors.tagWarningOutlinedHover,
      borderColor: theme.colors.tagWarningOutlinedBackground,
    }),
    [STATE.outline]: theme => ({
      color: theme.colors.tagWarningOutlinedFont,
      backgroundColor: null,
      borderColor: theme.colors.tagWarningOutlinedBackground,
    }),
  },
  [KIND.negative]: {
    [STATE.disabled]: theme => ({
      color: theme.colors.tagNegativeFontDisabled,
      backgroundColor: null,
      borderColor: theme.colors.tagNegativeOutlinedDisabled,
    }),
    [STATE.solid]: theme => ({
      color: theme.colors.tagNegativeSolidFont,
      backgroundColor: theme.colors.tagNegativeSolidBackground,
      borderColor: null,
    }),
    [STATE.hover]: theme => ({
      color: theme.colors.tagNegativeOutlinedFontHover,
      backgroundColor: theme.colors.tagNegativeOutlinedHover,
      borderColor: theme.colors.tagNegativeOutlinedBackground,
    }),
    [STATE.outline]: theme => ({
      color: theme.colors.tagNegativeOutlinedFont,
      backgroundColor: null,
      borderColor: theme.colors.tagNegativeOutlinedBackground,
    }),
  },
  [KIND.orange]: {
    [STATE.disabled]: theme => ({
      color: pick(theme, colorTokens.orange200, colorTokens.orange600),
      backgroundColor: null,
      borderColor: pick(theme, colorTokens.orange200, colorTokens.orange600),
    }),
    [STATE.solid]: theme => ({
      color: pick(theme, colorTokens.white, colorTokens.orange50),
      backgroundColor: pick(
        theme,
        colorTokens.orange400,
        colorTokens.orange500,
      ),
      borderColor: null,
    }),
    [STATE.hover]: theme => ({
      color: colorTokens.orange400,
      backgroundColor: pick(theme, colorTokens.orange50, colorTokens.orange700),
      borderColor: pick(theme, colorTokens.orange200, colorTokens.orange500),
    }),
    [STATE.outline]: theme => ({
      color: colorTokens.orange400,
      backgroundColor: null,
      borderColor: pick(theme, colorTokens.orange200, colorTokens.orange500),
    }),
  },
  [KIND.purple]: {
    [STATE.disabled]: theme => ({
      color: pick(theme, colorTokens.purple200, colorTokens.purple600),
      backgroundColor: null,
      borderColor: pick(theme, colorTokens.purple200, colorTokens.purple600),
    }),
    [STATE.solid]: theme => ({
      color: pick(theme, colorTokens.white, colorTokens.purple50),
      backgroundColor: pick(
        theme,
        colorTokens.purple400,
        colorTokens.purple500,
      ),
      borderColor: null,
    }),
    [STATE.hover]: theme => ({
      color: colorTokens.purple400,
      backgroundColor: pick(theme, colorTokens.purple50, colorTokens.purple700),
      borderColor: pick(theme, colorTokens.purple200, colorTokens.purple500),
    }),
    [STATE.outline]: theme => ({
      color: colorTokens.purple400,
      backgroundColor: null,
      borderColor: pick(theme, colorTokens.purple200, colorTokens.purple500),
    }),
  },
  [KIND.brown]: {
    [STATE.disabled]: theme => ({
      color: pick(theme, colorTokens.brown200, colorTokens.brown600),
      backgroundColor: null,
      borderColor: pick(theme, colorTokens.brown200, colorTokens.brown600),
    }),
    [STATE.solid]: theme => ({
      color: pick(theme, colorTokens.white, colorTokens.brown50),
      backgroundColor: pick(theme, colorTokens.brown400, colorTokens.brown500),
      borderColor: null,
    }),
    [STATE.hover]: theme => ({
      color: colorTokens.brown400,
      backgroundColor: pick(theme, colorTokens.brown50, colorTokens.brown700),
      borderColor: pick(theme, colorTokens.brown200, colorTokens.brown500),
    }),
    [STATE.outline]: theme => ({
      color: colorTokens.brown400,
      backgroundColor: null,
      borderColor: pick(theme, colorTokens.brown200, colorTokens.brown500),
    }),
  },
  [KIND.custom]: {
    [STATE.disabled]: (theme, color) => ({
      color: customOnRamp(color, theme.colors.tagFontDisabledRampUnit),
      backgroundColor: null,
      borderColor: customOnRamp(
        color,
        theme.colors.tagOutlinedDisabledRampUnit,
      ),
    }),
    [STATE.solid]: (theme, color) => ({
      color: customOnRamp(color, theme.colors.tagSolidFontRampUnit),
      backgroundColor: customOnRamp(color, theme.colors.tagSolidRampUnit),
      borderColor: null,
    }),
    [STATE.hover]: (theme, color) => ({
      color: customOnRamp(color, theme.colors.tagOutlinedFontRampUnit),
      backgroundColor: customOnRamp(
        color,
        theme.colors.tagOutlinedHoverRampUnit,
      ),
      borderColor: customOnRamp(color, theme.colors.tagOutlinedRampUnit),
    }),
    [STATE.outline]: (theme, color) => ({
      color: customOnRamp(color, theme.colors.tagOutlinedFontRampUnit),
      backgroundColor: null,
      borderColor: customOnRamp(color, theme.colors.tagOutlinedRampUnit),
    }),
  },
};

const getStateFromProps = props => {
  if (props.$disabled) return STATE.disabled;
  if (props.$variant === VARIANT.solid) return STATE.solid;
  return STATE.outline;
};

// $FlowFixMe https://github.com/facebook/flow/issues/7745
export const Action = styled<SharedPropsArgT>('span', props => {
  const {$theme, $disabled, $variant} = props;
  const bottomRadiusDir: string =
    $theme.direction === 'rtl'
      ? 'borderBottomLeftRadius'
      : 'borderBottomRightRadius';
  const topRadiusDir: string =
    $theme.direction === 'rtl' ? 'borderTopLeftRadius' : 'borderTopRightRadius';
  const marginDir: string =
    $theme.direction === 'rtl' ? 'marginRight' : 'marginLeft';
  return ({
    alignItems: 'center',
    [bottomRadiusDir]: $theme.borders.useRoundedCorners
      ? $theme.borders.radius400
      : 0,
    [topRadiusDir]: $theme.borders.useRoundedCorners
      ? $theme.borders.radius400
      : 0,
    cursor: $disabled ? 'not-allowed' : 'pointer',
    display: 'flex',
    [marginDir]: '8px',
    outline: 'none',
    paddingTop: $variant === VARIANT.outlined ? '5px' : '7px',
    paddingBottom: $variant === VARIANT.outlined ? '5px' : '7px',
    paddingLeft: '8px',
    paddingRight: '8px',
    transitionProperty: 'all',
    transitionDuration: 'background-color',
    transitionTimingFunction: $theme.animation.easeOutCurve,
  }: {});
});

export const ActionIcon = styled('svg', {});

// $FlowFixMe https://github.com/facebook/flow/issues/7745
export const Text = styled<SharedPropsArgT>('span', props => {
  return {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    maxWidth: props.$theme.sizing.scale3200,
  };
});

// $FlowFixMe https://github.com/facebook/flow/issues/7745
export const Root = styled<SharedPropsArgT>('span', props => {
  const {
    $theme,
    $kind,
    $clickable,
    $variant,
    $disabled,
    $closeable,
    $isFocusVisible,
    $color,
  } = props;
  const borderRadius = $theme.borders.useRoundedCorners
    ? $theme.borders.radius400
    : 0;
  const paddingStartDir: string =
    $theme.direction === 'rtl' ? 'paddingRight' : 'paddingLeft';
  const paddingEndDir: string =
    $theme.direction === 'rtl' ? 'paddingLeft' : 'paddingRight';
  const borderWidth = !$disabled && $variant === VARIANT.solid ? 0 : '2px';
  const {color, backgroundColor, borderColor} = colorMatrix[$kind][
    getStateFromProps(props)
  ]($theme, $color);
  const {
    color: colorHover,
    backgroundColor: backgroundColorHover,
    borderColor: borderColorHover,
  } = colorMatrix[$kind][STATE.hover]($theme, $color);
  return ({
    ...$theme.typography.font150,
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
    height: $theme.sizing.scale800,
    justifyContent: 'space-between',
    marginTop: '5px',
    marginBottom: '5px',
    marginLeft: '5px',
    marginRight: '5px',
    paddingTop: $theme.sizing.scale0,
    paddingBottom: $theme.sizing.scale0,
    [paddingStartDir]: $theme.sizing.scale500,
    [paddingEndDir]: $closeable ? null : $theme.sizing.scale500,
    outline: 'none',
    ':hover':
      $disabled || !$clickable
        ? {}
        : {
            color: colorHover,
            backgroundColor: backgroundColorHover,
            borderLeftColor: borderColorHover,
            borderRightColor: borderColorHover,
            borderTopColor: borderColorHover,
            borderBottomColor: borderColorHover,
          },
    ':focus':
      $disabled || (!$clickable && !$closeable)
        ? {}
        : {
            boxShadow: $isFocusVisible
              ? `0 0 0 3px ${
                  $kind === KIND.accent
                    ? $theme.colors.primaryA
                    : $theme.colors.accent
                }`
              : 'none',
          },
  }: {});
});
