/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
export const SIZE = {
  xSmall: 'xSmall',
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const;

export const HIERARCHY = Object.freeze({
  primary: 'primary',
  secondary: 'secondary',
} as const);

export const DEPRECATED_KIND = Object.freeze({
  neutral: 'neutral',
  primary: 'primary',
  accent: 'accent',
  positive: 'positive',
  warning: 'warning',
  negative: 'negative',
  black: 'black',
  brown: 'brown',
} as const);

export const SUPPORTED_KIND = Object.freeze({
  custom: 'custom',
  gray: 'gray',
  red: 'red',
  orange: 'orange',
  yellow: 'yellow',
  green: 'green',
  blue: 'blue',
  purple: 'purple',
  magenta: 'magenta',
  teal: 'teal',
  lime: 'lime',
} as const);

// todo: dynamic identity map generation
export const KIND = {
  ...DEPRECATED_KIND,
  ...SUPPORTED_KIND,
} as const;
