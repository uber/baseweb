/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {COLUMNS, NUMERICAL_FORMATS} from './constants.js';

export type CategoricalColumn = {|
  title: string,
  sortable?: boolean,
  filterable?: boolean,
  kind: typeof COLUMNS.CATEGORICAL,
|};

export type NumericalColumn = {|
  title: string,
  sortable?: boolean,
  filterable?: boolean,
  kind: typeof COLUMNS.NUMERICAL,
  format:
    | typeof NUMERICAL_FORMATS.DEFAULT
    | typeof NUMERICAL_FORMATS.ACCOUNTING
    | typeof NUMERICAL_FORMATS.PERCENTAGE,
  highlight?: number => boolean,
  precision?: number,
|};

export type BooleanColumn = {|
  title: string,
  sortable?: boolean,
  filterable?: boolean,
  kind: typeof COLUMNS.BOOLEAN,
|};

export type StringColumn = {|
  title: string,
  sortable?: boolean,
  filterable?: boolean,
  kind: typeof COLUMNS.STRING,
|};

export type CustomColumn = {|
  title: string,
  sortable?: boolean,
  filterable?: boolean,
  kind: typeof COLUMNS.CUSTOM,
  // eslint-disable-next-line flowtype/no-weak-types
  renderCell: React.ComponentType<{data: any}>,
  renderFilter?: React.ComponentType<{
    // eslint-disable-next-line flowtype/no-weak-types
    setFilter: (filterParams: any, description: string) => void,
    close: () => void,
  }>,
  // eslint-disable-next-line flowtype/no-weak-types
  buildFilter?: any => any => boolean,
  // eslint-disable-next-line flowtype/no-weak-types
  sortFn?: (any, any) => number,
|};

export type Row = {
  // eslint-disable-next-line flowtype/no-weak-types
  data: any[],
};

export type Columns =
  | CategoricalColumn
  | NumericalColumn
  | BooleanColumn
  | StringColumn
  | CustomColumn;

export type Props = {
  columns: Array<Columns>,
  rows: Row[],
};

export type CategoricalFilterParameters = {|
  selection: Set<string>,
  exclude: boolean,
|};
