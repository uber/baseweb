/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
export const MODE = Object.freeze({
  radio: 'radio',
  checkbox: 'checkbox',
} as const);

export const STATE_CHANGE_TYPE = Object.freeze({
  change: 'change',
} as const);

export const PADDING = Object.freeze({
  default: 'default',
  none: 'none',
  custom: 'custom', // expect custom padding from developer
} as const);
