/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
export const BEHAVIOR = Object.freeze({
  fluid: 'fluid',
  fixed: 'fixed',
});

export const ALIGNMENT = Object.freeze({
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
});

export const STYLE = Object.freeze({
  default: 'default',
  compact: 'compact',
});

export const STYLE_VALUES = Object.freeze({
  [STYLE.default]: null,
  [STYLE.compact]: {
    columns: [4, 8, 12],
    gutters: [16, 16, 16],
    margins: [16, 24, 24],
    gaps: 0,
    unit: 'px',
    maxWidth: 1280,
  },
});
