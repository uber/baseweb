/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
export const KIND = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
} as const;

export const SHAPE = {
  default: 'default',
  pill: 'pill',
  round: 'round',
  circle: 'circle',
  square: 'square',
} as const;

export const SIZE = {
  mini: 'mini', // 'xSmall'
  default: 'default', // 'medium'
  compact: 'compact', // 'small'
  large: 'large', // 'large'
  xSmall: 'xSmall',
  small: 'small',
  medium: 'medium',
} as const;

export const MIN_HIT_AREA = {
  tap: 'tap',
  click: 'click',
} as const;
