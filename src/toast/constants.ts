/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
export const KIND = Object.freeze({
  info: 'info',
  positive: 'positive',
  warning: 'warning',
  negative: 'negative',
} as const);

export const TYPE = Object.freeze({
  inline: 'inline',
  toast: 'toast',
} as const);

export const PLACEMENT = Object.freeze({
  topLeft: 'topLeft',
  top: 'top',
  topRight: 'topRight',
  bottomRight: 'bottomRight',
  bottom: 'bottom',
  bottomLeft: 'bottomLeft',
} as const);

export const TOAST_ROLE = Object.freeze({
  alert: 'alert',
  alertdialog: 'alertdialog',
  dialog: 'dialog',
  status: 'status',
  log: 'log',
} as const);
