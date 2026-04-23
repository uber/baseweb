/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
export const HIERARCHY = Object.freeze({
  primary: 'primary',
  secondary: 'secondary',
});

export const NOTIFICATION_CIRCLE_SIZE = {
  small: 'small',
  medium: 'medium',
} as const;

export const SHAPE = Object.freeze({
  pill: 'pill',
  rectangle: 'rectangle',
});

export const COLOR = Object.freeze({
  accent: 'accent',
  primary: 'primary', // deprecated
  positive: 'positive',
  negative: 'negative',
  warning: 'warning',
  onBrand: 'onBrand',
});

export const PLACEMENT = Object.freeze({
  topLeft: 'topLeft',
  topRight: 'topRight',
  bottomRight: 'bottomRight',
  bottomLeft: 'bottomLeft',
  topLeftEdge: 'topLeftEdge',
  topEdge: 'topEdge',
  topRightEdge: 'topRightEdge',
  bottomRightEdge: 'bottomRightEdge',
  bottomEdge: 'bottomEdge',
  bottomLeftEdge: 'bottomLeftEdge',
  leftTopEdge: 'leftTopEdge',
  rightTopEdge: 'rightTopEdge',
  rightBottomEdge: 'rightBottomEdge',
  leftBottomEdge: 'leftBottomEdge',
});

export const ROLE = Object.freeze({
  badge: 'badge',
  notificationCircle: 'notificationCircle',
  hintDot: 'hintDot',
});
