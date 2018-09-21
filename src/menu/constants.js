/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

export const STATE_CHANGE_TYPES = {
  moveUp: 'moveUp',
  moveDown: 'moveDown',
};

// Dict of props to prepend $ to pass thru to styletron
export const SHARED_PROPS_MAPPER = {
  ref: true,
  isHighlighted: true,
};

export const KEY_STRINGS = {
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
  Enter: 'Enter',
  Space: ' ',
  Escape: 'Escape',
  Backspace: 'Backspace',
};

export const OPTION_LIST_SIZE = {
  default: 'default',
  compact: 'compact',
};
