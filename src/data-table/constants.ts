/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
export const COLUMNS = Object.freeze({
  ANCHOR: 'ANCHOR',
  BOOLEAN: 'BOOLEAN',
  CATEGORICAL: 'CATEGORICAL',
  CUSTOM: 'CUSTOM',
  DATETIME: 'DATETIME',
  NUMERICAL: 'NUMERICAL',
  ROW_INDEX: 'ROW_INDEX',
  STRING: 'STRING',
} as const);

export const NUMERICAL_FORMATS = Object.freeze({
  DEFAULT: 'DEFAULT',
  ACCOUNTING: 'ACCOUNTING',
  PERCENTAGE: 'PERCENTAGE',
} as const);

export const DATETIME_OPERATIONS = Object.freeze({
  RANGE_DATETIME: 'RANGE_DATETIME',
  RANGE_DATE: 'RANGE_DATE',
  RANGE_TIME: 'RANGE_TIME',
  WEEKDAY: 'WEEKDAY',
  MONTH: 'MONTH',
  QUARTER: 'QUARTER',
  HALF: 'HALF',
  YEAR: 'YEAR',
} as const);

export const SORT_DIRECTIONS = Object.freeze({
  ASC: 'ASC',
  DESC: 'DESC',
} as const);

// If modifying this, take a look at the histogram and adjust. see HISTOGRAM_SIZE
export const FILTER_SHELL_WIDTH = '320px';

// Depends on FILTER_SHELL_WIDTH
export const HISTOGRAM_SIZE = { width: 308, height: 120 };

// Arguably visually appealing within the given width.
// Smaller and we don't have enough detail per bar.
// Larger and the bars are too granular and don't align well with the slider steps
export const MAX_BIN_COUNT = 50;
