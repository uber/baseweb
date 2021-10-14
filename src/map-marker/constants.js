/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

export const NEEDLE_SIZES = Object.freeze({
  none: 'none',
  short: 'short',
  medium: 'medium',
  tall: 'tall',
});

export const NEEDLE_HEIGHTS = Object.freeze({
  [NEEDLE_SIZES.none]: 0,
  [NEEDLE_SIZES.short]: 4,
  [NEEDLE_SIZES.medium]: 12,
  [NEEDLE_SIZES.tall]: 20,
});

export const PINHEAD_SIZES_SHAPES = Object.freeze({
  xSmallCircle: 'x-small-circle',
  xSmallSquare: 'x-small-square',
  small: 'small',
  medium: 'medium',
  large: 'large',
});

export const xSmallPinheadDimension = {
  height: 16,
  icon: 4,
};
export const PINHEAD_DIMENSIONS = Object.freeze({
  [PINHEAD_SIZES_SHAPES.xSmallSquare]: xSmallPinheadDimension,
  [PINHEAD_SIZES_SHAPES.xSmallCircle]: xSmallPinheadDimension,
  [PINHEAD_SIZES_SHAPES.small]: {height: 24, icon: 16},
  [PINHEAD_SIZES_SHAPES.medium]: {height: 36, icon: 16},
  [PINHEAD_SIZES_SHAPES.large]: {height: 48, icon: 24},
});

export const PINHEAD_TYPES = Object.freeze({
  floating: 'floating',
  fixed: 'fixed',
});

export const FLOATING_MARKER_SIZES = Object.freeze({
  small: 'small',
  medium: 'medium',
  large: 'large',
});

export const FLOATING_MARKER_ANCHOR_POSITIONS = Object.freeze({
  none: 'none',
  topLeft: 'top-left',
  topRight: 'top-right',
  bottomRight: 'bottom-right',
  bottomLeft: 'bottom-left',
});

export const FLOATING_MARKER_ANCHOR_TYPES = Object.freeze({
  circle: 'circle',
  square: 'square',
});

export const dragShadowHeight = 4;
export const dragShadowMarginTop = 6;
export const dragShadowWidth = 6;
export const anchorSize = 16;
