/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
export const DISPLAY_FORMAT = 'L';
export const ISO_FORMAT = 'YYYY-MM-DD';
export const ISO_MONTH_FORMAT = 'YYYY-MM';

export const ORIENTATION = Object.freeze({
  horizontal: 'horizontal',
  vertical: 'vertical',
});

export const STATE_CHANGE_TYPE = Object.freeze({
  change: 'change',
  moveUp: 'moveUp',
  moveDown: 'moveDown',
  moveLeft: 'moveLeft',
  moveRight: 'moveRight',
  mouseOver: 'mouseOver',
  mouseLeave: 'mouseLeave',
});

export const WEEKDAYS = [0, 1, 2, 3, 4, 5, 6];
