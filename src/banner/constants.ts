/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
export const ACTION_POSITION = Object.freeze({
  below: 'below',
  trailing: 'trailing',
} as const);

export const ARTWORK_TYPE = Object.freeze({
  icon: 'icon',
  badge: 'badge',
} as const);

export const HIERARCHY = Object.freeze({
  low: 'low',
  high: 'high',
} as const);

export const KIND = Object.freeze({
  info: 'info',
  negative: 'negative',
  positive: 'positive',
  warning: 'warning',
} as const);
