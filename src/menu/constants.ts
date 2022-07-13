/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
export const STATE_CHANGE_TYPES = {
  click: 'click',
  moveUp: 'moveUp',
  moveDown: 'moveDown',
  mouseEnter: 'mouseEnter',
  mouseLeave: 'mouseLeave',
  focus: 'focus',
  reset: 'reset',
  character: 'character',
  enter: 'enter',
} as const;

export const KEY_STRINGS = {
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown',
  ArrowLeft: 'ArrowLeft',
  ArrowRight: 'ArrowRight',
  Enter: 'Enter',
  Space: ' ',
  Escape: 'Escape',
  Backspace: 'Backspace',
  Home: 'Home',
  End: 'End',
} as const;

export const OPTION_LIST_SIZE = {
  default: 'default',
  compact: 'compact',
} as const;
