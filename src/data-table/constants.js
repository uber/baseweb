/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

export const COLUMNS = Object.freeze({
  ANCHOR: 'ANCHOR',
  CATEGORICAL: 'CATEGORICAL',
  NUMERICAL: 'NUMERICAL',
  BOOLEAN: 'BOOLEAN',
  STRING: 'STRING',
  CUSTOM: 'CUSTOM',
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

export const SORT_DIRECTIONS = Object.freeze({
  ASC: 'ASC',
  DESC: 'DESC',
});
