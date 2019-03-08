/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {COLOR_STYLE_KEYS, KIND, VARIANT} from './constants.js';
import {styled, hexToRgb, type ThemeT} from '../styles/index.js';
import type {SharedPropsT} from './types.js';

export function getColor(
  $theme?: ThemeT,
  $kind?: string = COLOR_STYLE_KEYS.primary,
  $color?: string = '#000',
) {
  if ($theme && $theme.colors[COLOR_STYLE_KEYS[$kind]]) {
    return $theme.colors[COLOR_STYLE_KEYS[$kind]];
  }
  return $color;
}

function getAlpha(props: SharedPropsT, hovered: boolean = false) {
  if (hovered) {
    return '0.8';
  }
  return '0.92';
}

function getActionAlpha(
  props: SharedPropsT,
  hovered: boolean = false,
  secondary: boolean = false,
) {
  const {$clickable, $variant = VARIANT.light} = props;
  if ($variant === VARIANT.solid && (!$clickable && hovered) && secondary) {
    return '0.24';
  }
  if (hovered) {
    return '0.6';
  }
  return '0.92';
}

function getBackgroundColor(props: SharedPropsT, hovered: boolean = false) {
  const {$color, $kind, $variant, $theme} = props;
  if ($variant === VARIANT.outlined) {
    return $theme.colors.tagBackground;
  }

  const color = getColor($theme, $kind, $color);
  if ($variant === VARIANT.solid && !hovered) {
    return color;
  }

  const alpha = getAlpha(props, hovered);
  return `linear-gradient(0deg, 
    rgba(${$theme.colors.tagRGBGradient}, ${alpha}), 
    rgba(${$theme.colors.tagRGBGradient}, ${alpha})), 
    ${color}`;
}

function getBorderColor(props: SharedPropsT, hovered: boolean = false) {
  const {$color, $clickable, $kind, $variant, $theme} = props;
  if ($variant !== VARIANT.outlined) {
    return 'transparent';
  }
  const color = getColor($theme, $kind, $color);
  return hexToRgb(color, $clickable && hovered ? '0.6' : '1');
}

function getBorderWidth(props: SharedPropsT) {
  const {$variant} = props;
  if ($variant === VARIANT.outlined) {
    return '2px';
  }
  return '0';
}

function getActionBackgroundColor(
  props: SharedPropsT,
  hovered: boolean = false,
) {
  const {$color, $clickable, $kind, $variant, $theme} = props;
  const color = getColor($theme, $kind, $color);
  if (!hovered) {
    return 'transparent';
  }
  if ($variant === VARIANT.outlined) {
    return getBorderColor(props, hovered);
  }
  let alpha;
  if ($variant === VARIANT.solid && (!$clickable && hovered)) {
    alpha = getActionAlpha(props, hovered, true);
    return `linear-gradient(0deg, 
      rgba(${$theme.colors.tagRGBGradientSecondary}, ${alpha}), 
      rgba(${$theme.colors.tagRGBGradientSecondary}, ${alpha})), 
      ${color}`;
  }
  alpha = getActionAlpha(props, hovered);
  return `linear-gradient(0deg, 
    rgba(${$theme.colors.tagRGBGradient}, ${alpha}), 
    rgba(${$theme.colors.tagRGBGradient}, ${alpha})), 
    ${color}`;
}

function getActionFontColor(props: SharedPropsT, hovered: boolean = false) {
  const {$variant, $theme} = props;
  if (hovered && $variant === VARIANT.outlined && $theme) {
    return $theme.colors.mono200;
  }
  return null;
}

function getFontColor(props: SharedPropsT, hovered) {
  const {
    $theme,
    $kind = KIND.primary,
    $color = '#000',
    $variant = VARIANT.light,
  } = props;
  if ($variant === VARIANT.solid && !hovered) {
    return $theme.colors.mono200;
  }
  if ($kind === 'custom') {
    return $color;
  }
  if ($theme.colors[COLOR_STYLE_KEYS[$kind]]) {
    return $theme.colors[COLOR_STYLE_KEYS[$kind]];
  }
}

export const Action = styled('span', props => {
  const {$disabled, $variant, $theme} = props;
  const hoverStyles = $disabled
    ? {}
    : {
        background: getActionBackgroundColor(props, true),
        color: getActionFontColor(props, true),
      };
  return {
    alignItems: 'center',
    borderBottomRightRadius: $theme.borders.useRoundedCorners
      ? $theme.borders.radius400
      : '0px',
    borderTopRightRadius: $theme.borders.useRoundedCorners
      ? $theme.borders.radius400
      : '0px',
    cursor: $disabled ? 'not-allowed' : 'pointer',
    display: 'flex',
    marginLeft: '8px',
    outline: 'none',
    paddingTop: $variant === VARIANT.outlined ? '5px' : '7px',
    paddingBottom: $variant === VARIANT.outlined ? '5px' : '7px',
    paddingLeft: '8px',
    paddingRight: '8px',
    transitionProperty: 'all',
    transitionDuration: $theme.animation.timing100,
    transitionTimingFunction: $theme.animation.easeOutCurve,
    ':hover': hoverStyles,
    ':focus': hoverStyles,
  };
});

export const ActionIcon = styled('svg', () => {
  return {};
});

export const Text = styled('span', props => {
  return {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    maxWidth: props.$theme.sizing.scale3200,
  };
});

export const Root = styled('span', props => {
  const {$disabled, $theme, $closeable, $clickable} = props;
  const {
    sizing: {scale0, scale800, scale500},
    typography: {font250},
  } = $theme;
  const paddingRightIfNotCloseable = $closeable ? {} : {paddingRight: scale500};

  const hoverStyles =
    $disabled || $clickable === false
      ? {}
      : {
          background: getBackgroundColor(props, true),
          borderColor: getBorderColor(props, true),
          color: getFontColor(props, true),
        };

  return {
    ...font250,
    ...paddingRightIfNotCloseable,
    alignItems: 'center',
    background: getBackgroundColor(props),
    borderColor: getBorderColor(props),
    borderStyle: 'solid',
    borderWidth: getBorderWidth(props),
    borderRadius: $theme.borders.useRoundedCorners
      ? $theme.borders.radius400
      : '0px',
    boxSizing: 'border-box',
    color: getFontColor(props),
    cursor: $disabled ? 'not-allowed' : $clickable ? 'pointer' : 'default',
    display: 'inline-flex',
    height: scale800,
    justifyContent: 'space-between',
    marginTop: '5px',
    marginBottom: '5px',
    marginLeft: '5px',
    marginRight: '5px',
    paddingTop: scale0,
    paddingBottom: scale0,
    paddingLeft: scale500,
    opacity: $disabled ? '.56' : null,
    outline: 'none',
    transitionProperty: 'backgroundColor, borderColor',
    transitionDuration: $theme.animation.timing100,
    transitionTimingFunction: $theme.animation.easeOutCurve,
    ':hover': hoverStyles,
    ':focus': hoverStyles,
  };
});
