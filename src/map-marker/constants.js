/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

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

export const PIN_SIZES = Object.freeze({
  small: 'small',
  medium: 'medium',
  large: 'large',
});

export const PINHEAD_SIZES = Object.freeze({
  xSmallSquare: 'x-small-square',
  xSmallRound: 'x-small-round',
  small: 'small',
  medium: 'medium',
  large: 'large',
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
