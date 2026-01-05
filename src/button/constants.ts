/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
export const KIND = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  dangerPrimary: 'dangerPrimary',
  dangerSecondary: 'dangerSecondary',
  dangerTertiary: 'dangerTertiary',
} as const;

export const BUTTON_GROUP_EXCLUSIVE_KINDS = Object.freeze({
  outline: 'outline',
} as const);

export const SHAPE = {
  default: 'default',
  rectangular: 'rectangular', // same as default
  rounded: 'rounded', // same as pill
  pill: 'pill',
  /**
   * @deprecated Use 'circle' or 'square' instead for icon-only buttons
   */
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

export const WIDTH_TYPE = {
  hug: 'hug',
  fill: 'fill',
} as const;
