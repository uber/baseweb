/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

export const HIERARCHY = Object.freeze({
  primary: 'primary',
  secondary: 'secondary',
});

export const SHAPE = Object.freeze({
  pill: 'pill',
  rectangle: 'rectangle',
});

export const COLOR = Object.freeze({
  accent: 'accent',
  primary: 'primary',
  positive: 'positive',
  negative: 'negative',
  warning: 'warning',
});

export const PLACEMENT = Object.freeze({
  topLeft: 'topLeft',
  top: 'top',
  topRight: 'topRight',
  bottomRight: 'bottomRight',
  bottom: 'bottom',
  bottomLeft: 'bottomLeft',
});

export const ROLES = Object.freeze({
  badge: 'badge',
  // hintDot: 'hintDot',
  // notificationCircle: 'notificationCircle',
});

export const POSITION_STYLES = Object.freeze({
  [ROLES.badge]: {
    [PLACEMENT.topLeft]: {
      top: '16px',
      left: '16px',
      right: null,
      bottom: null,
    },
    [PLACEMENT.top]: {
      top: '-10px',
      left: '50%',
      right: null,
      bottom: null,
      transform: 'translateX(-50%)',
    },
    [PLACEMENT.topRight]: {
      top: '16px',
      right: '16px',
      left: null,
      bottom: null,
    },
    [PLACEMENT.bottomRight]: {
      bottom: '16px',
      right: '16px',
      left: null,
      top: null,
    },
    [PLACEMENT.bottom]: {
      bottom: '-10px',
      left: '50%',
      right: null,
      top: null,
      transform: 'translateX(-50%)',
    },
    [PLACEMENT.bottomLeft]: {
      bottom: '16px',
      left: '16px',
      right: null,
      top: null,
    },
  },
  // [ROLES.notificationCircle]: {
  //   [PLACEMENT.topLeft]: {},
  //   [PLACEMENT.topRight]: {},
  // },
  // [ROLES.hintDot]: {
  //   [PLACEMENT.topLeft]: {},
  //   [PLACEMENT.topRight]: {},
  // },
});
