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
  hintDot: 'hintDot',
  notificationCircle: 'notificationCircle',
});

export const POSITION_STYLES = {
  [PLACEMENT.topLeft]: {
    [ROLES.badge]: {
      top: '16px',
      left: '16px',
    },
    [ROLES.notificationCircle]: {},
    [ROLES.hintDot]: {},
  },
  [PLACEMENT.top]: {
    [ROLES.badge]: {
      top: '-10px',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    [ROLES.notificationCircle]: {},
    [ROLES.hintDot]: {},
  },
  [PLACEMENT.topRight]: {
    [ROLES.badge]: {
      top: '16px',
      right: '16px',
    },
    [ROLES.notificationCircle]: {},
    [ROLES.hintDot]: {
      top: '-4px',
      right: '-4px',
    },
  },
  [PLACEMENT.bottomRight]: {
    [ROLES.badge]: {
      bottom: '16px',
      right: '16px',
    },
    [ROLES.notificationCircle]: {},
    [ROLES.hintDot]: {},
  },
  [PLACEMENT.bottom]: {
    [ROLES.badge]: {
      bottom: '-10px',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    [ROLES.notificationCircle]: {},
    [ROLES.hintDot]: {},
  },
  [PLACEMENT.bottomLeft]: {
    [ROLES.badge]: {
      bottom: '16px',
      left: '16px',
    },
    [ROLES.notificationCircle]: {},
    [ROLES.hintDot]: {},
  },
};
