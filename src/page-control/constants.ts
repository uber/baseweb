/*
Copyright (c) Uber Technologies, Inc.
This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
export const SIZE = Object.freeze({
  large: 'large',
  medium: 'medium',
  small: 'small',
} as const);

export const KIND = Object.freeze({
  default: 'default',
  backgroundProtection: 'backgroundProtection',
  inverse: 'inverse',
  alwaysLight: 'alwaysLight',
  alwaysDark: 'alwaysDark',
} as const);
