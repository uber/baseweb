/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

//TODO: consider renaming this to FLOATING_ANCHOR_POSITIONS
export const ANCHOR_POSITIONS = Object.freeze({
  none: 'none',
  topLeft: 'top-left',
  topRight: 'top-right',
  bottomRight: 'bottom-right',
  bottomLeft: 'bottom-left',
});

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

export const PIN_SIZES = Object.freeze({
  small: 'small',
  medium: 'medium',
  large: 'large',
});

export const PINHEAD_SIZES = Object.freeze({
  xSmall: 'x-small',
  small: 'small',
  medium: 'medium',
  large: 'large',
});

export const PINHEAD_SIZE = Object.freeze({
  [PINHEAD_SIZES.xSmall]: {height: 12, icon: 12},
  [PINHEAD_SIZES.small]: {height: 24, icon: 16},
  [PINHEAD_SIZES.medium]: {height: 36, icon: 16},
  [PINHEAD_SIZES.large]: {height: 48, icon: 24},
});

export const FLOATING_MARKER_SIZES = Object.freeze({
  small: 'small',
  medium: 'medium',
  large: 'large',
});

export const PINHEAD_TYPES = Object.freeze({
  floating: 'floating',
  fixed: 'fixed',
});

export const FLOATING_MARKER_ANCHOR_TYPES = Object.freeze({
  round: 'round',
  square: 'square',
});

export const dragShadowHeight = 4;
export const dragShadowMarginTop = 6;
export const dragShadowWidth = 6;
