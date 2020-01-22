/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

export const COLUMNS = Object.freeze({
  ANCHOR: 'ANCHOR',
  BOOLEAN: 'BOOLEAN',
  CATEGORICAL: 'CATEGORICAL',
  CUSTOM: 'CUSTOM',
  DATETIME: 'DATETIME',
  NUMERICAL: 'NUMERICAL',
  STRING: 'STRING',
});

export const NUMERICAL_FORMATS = Object.freeze({
  DEFAULT: 'DEFAULT',
  ACCOUNTING: 'ACCOUNTING',
  PERCENTAGE: 'PERCENTAGE',
});

export const NUMERICAL_OPERATIONS = Object.freeze({
  EQ: 'EQ',
  GT: 'GT',
  GTE: 'GTE',
  LT: 'LT',
  LTE: 'LTE',
});

export const DATETIME_OPERATIONS = Object.freeze({
  RANGE_DATETIME: 'RANGE_DATETIME',
  RANGE_DATE: 'RANGE_DATE',
  RANGE_TIME: 'RANGE_TIME',
  WEEKDAY: 'WEEKDAY',
  MONTH: 'MONTH',
  QUARTER: 'QUARTER',
  HALF: 'HALF',
  YEAR: 'YEAR',
});

export const SORT_DIRECTIONS = Object.freeze({
  ASC: 'ASC',
  DESC: 'DESC',
});
