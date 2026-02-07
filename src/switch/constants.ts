/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

export const STATE_TYPE = Object.freeze({
  change: 'CHANGE',
} as const);

export const LABEL_PLACEMENT = Object.freeze({
  left: 'left',
  right: 'right',
} as const);

export const SIZE = Object.freeze({
  default: 'default',
  small: 'small',
} as const);
