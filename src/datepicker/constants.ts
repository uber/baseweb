/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
export const DISPLAY_FORMAT = 'L';
export const ISO_FORMAT = 'YYYY-MM-DD';
export const ISO_MONTH_FORMAT = 'YYYY-MM';

export const ORIENTATION = Object.freeze({
  horizontal: 'horizontal',
  vertical: 'vertical',
} as const);

export const STATE_CHANGE_TYPE = Object.freeze({
  change: 'change',
  moveUp: 'moveUp',
  moveDown: 'moveDown',
  moveLeft: 'moveLeft',
  moveRight: 'moveRight',
  mouseOver: 'mouseOver',
  mouseLeave: 'mouseLeave',
} as const);

export const WEEKDAYS = [0, 1, 2, 3, 4, 5, 6];

export const DEFAULT_MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export const DENSITY = {
  high: 'high',
  default: 'default',
} as const;

export const INPUT_ROLE = {
  startDate: 'startDate',
  endDate: 'endDate',
} as const;

export const RANGED_CALENDAR_BEHAVIOR = {
  default: 'default',
  locked: 'locked',
} as const;
