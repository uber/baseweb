/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

export const STATE_TYPE = {
  change: 'CHANGE',
} as const;

// Note: top and bottom label placements are deprecated from checkbox v2.
// Alternatives: Change design to use left or right placement; use checkbox control only and add your own container and label to realize the top/bottom placements
export const LABEL_PLACEMENT = Object.freeze({
  right: 'right',
  left: 'left',
} as const);
