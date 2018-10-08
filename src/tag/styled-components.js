/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {COLOR_STYLE_KEYS} from './constants';
import {styled, hexToRgb, type ThemeT} from '../styles/index';
import type {SharedPropsT} from './types';

export function getBackgroundColor(props: SharedPropsT) {
  const {$color, $isActive, $isFocused, $tagType, $theme} = props;
  const color = getColor($theme, $tagType, $color);
  return hexToRgb(color, $isFocused || $isActive ? '0.2' : '0.06');
}

export function getColor(
  $theme?: ThemeT,
  $tagType?: string = COLOR_STYLE_KEYS.primary,
  $color?: string,
  defaultColor?: string = '#000',
) {
  let themeColor;
  if ($theme && $theme.colors && $theme.colors[COLOR_STYLE_KEYS[$tagType]]) {
    themeColor = $theme.colors[COLOR_STYLE_KEYS[$tagType]];
  }
  return $color || themeColor || defaultColor;
}

export function getHoverBackgroundColor(props: SharedPropsT) {
  const {$color, $disabled, $tagType, $theme} = props;
  const color = getColor($theme, $tagType, $color);
  return $disabled ? null : hexToRgb(color, '0.2');
}

export const Action = styled('div', props => {
  const {$hoverBackgroundColor = getHoverBackgroundColor, $disabled} = props;
  return {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    borderTopRightRadius: '2px',
    borderBottomRightRadius: '2px',
    marginLeft: '8px',
    cursor: $disabled ? 'not-allowed' : 'pointer',
    ':hover': {
      backgroundColor:
        typeof $hoverBackgroundColor === 'function'
          ? $hoverBackgroundColor(props)
          : $hoverBackgroundColor,
    },
  };
});

export const ActionIcon = styled('svg', () => {
  return {};
});

export const Root = styled('span', props => {
  const {
    $backgroundColor = getBackgroundColor,
    $color,
    $disabled,
    $hoverBackgroundColor = getHoverBackgroundColor,
    $tagType,
    $theme,
  } = props;
  const {
    sizing: {scale800, scale100, scale300},
    typography: {font200},
  } = $theme;
  const color = getColor($theme, $tagType, $color);
  return {
    ...font200,
    display: 'inline-flex',
    height: scale800,
    fontWeight: 'bold',
    margin: '5px',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: scale100,
    paddingBottom: scale100,
    paddingLeft: scale300,
    borderWidth: '1px',
    borderColor: color,
    color: color,
    opacity: $disabled ? '.56' : null,
    borderRadius: $theme.borders.useRoundedCorners
      ? $theme.borders.radius100
      : '0px',
    cursor: $disabled ? 'not-allowed' : 'auto',
    backgroundColor:
      typeof $backgroundColor === 'function'
        ? $backgroundColor(props)
        : $backgroundColor,
    ':hover': {
      backgroundColor:
        typeof $hoverBackgroundColor === 'function'
          ? $hoverBackgroundColor(props)
          : $hoverBackgroundColor,
    },
  };
});
