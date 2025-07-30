/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
export const SIZE = Object.freeze({
  xSmall: 'xSmall',
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const);

export const PLACEMENT = Object.freeze({
  center: 'center',
  topLeft: 'topLeft',
  topCenter: 'topCenter',
  topRight: 'topRight',
  bottomLeft: 'bottomLeft',
  bottomCenter: 'bottomCenter',
  bottomRight: 'bottomRight',
} as const);

// From `Modal`. Changed `closeButton` to `dismissButton`.
export const CLOSE_SOURCE = Object.freeze({
  dismissButton: 'dismissButton',
  backdrop: 'backdrop',
  escape: 'escape',
} as const);
