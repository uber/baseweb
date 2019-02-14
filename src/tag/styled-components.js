/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {COLOR_STYLE_KEYS} from './constants.js';
import {styled, hexToRgb, type ThemeT} from '../styles/index.js';
import type {SharedPropsT} from './types.js';

export function getBackgroundColor(props: SharedPropsT) {
  const {$color, $isActive, $isFocused, $kind, $theme} = props;
  const color = getColor($theme, $kind, $color);
  return hexToRgb(color, $isFocused || $isActive ? '0.2' : '0.06');
}

export function getColor(
  $theme?: ThemeT,
  $kind?: string = COLOR_STYLE_KEYS.primary,
  $color?: string = '#000',
) {
  if ($kind === 'custom') {
    return $color;
  }
  if ($theme && $theme.colors && $theme.colors[COLOR_STYLE_KEYS[$kind]]) {
    return $theme.colors[COLOR_STYLE_KEYS[$kind]];
  }
}

export function getHoverBackgroundColor(props: SharedPropsT) {
  const {$color, $disabled, $kind, $theme} = props;
  const color = getColor($theme, $kind, $color);
  return $disabled ? null : hexToRgb(color, '0.2');
}

export const Action = styled('span', props => {
  const {$disabled, $theme} = props;
  return {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '8px',
    paddingBottom: '8px',
    paddingLeft: '8px',
    paddingRight: '8px',
    borderBottomRightRadius: $theme.borders.useRoundedCorners
      ? $theme.borders.radius400
      : '0px',
    borderTopRightRadius: $theme.borders.useRoundedCorners
      ? $theme.borders.radius400
      : '0px',
    marginLeft: '8px',
    cursor: $disabled ? 'not-allowed' : 'pointer',
    ':hover': {
      backgroundColor: getBackgroundColor(props),
    },
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
  const {$color, $disabled, $kind, $theme} = props;
  const {
    sizing: {scale800, scale100, scale500},
    typography: {font250},
  } = $theme;
  const color = getColor($theme, $kind, $color);
  const paddingRightIfNotCloseable = props.$closeable
    ? {}
    : {paddingRight: scale500};

  return {
    ...font250,
    ...paddingRightIfNotCloseable,
    display: 'inline-flex',
    height: scale800,
    marginTop: '5px',
    marginBottom: '5px',
    marginLeft: '5px',
    marginRight: '5px',
    boxSizing: 'border-box',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: scale100,
    paddingBottom: scale100,
    paddingLeft: scale500,
    borderWidth: '1px',
    borderColor: color,
    color: color,
    opacity: $disabled ? '.56' : null,
    borderRadius: $theme.borders.useRoundedCorners
      ? $theme.borders.radius400
      : '0px',
    cursor: $disabled ? 'not-allowed' : 'auto',
    backgroundColor: getBackgroundColor(props),
    ':hover': {
      backgroundColor: getHoverBackgroundColor(props),
    },
  };
});
