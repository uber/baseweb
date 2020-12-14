/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
export const KIND = Object.freeze({
  info: 'info',
  positive: 'positive',
  warning: 'warning',
  negative: 'negative',
});

export const TYPE = Object.freeze({
  inline: 'inline',
  toast: 'toast',
});

export const PLACEMENT = Object.freeze({
  topLeft: 'topLeft',
  top: 'top',
  topRight: 'topRight',
  bottomRight: 'bottomRight',
  bottom: 'bottom',
  bottomLeft: 'bottomLeft',
});
