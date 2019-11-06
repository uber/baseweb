/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {COLUMNS, SORT_DIRECTIONS} from './constants.js';

export type SortDirectionsT =
  | typeof SORT_DIRECTIONS.ASC
  | typeof SORT_DIRECTIONS.DESC
  | null;

// eslint-disable-next-line flowtype/no-weak-types
export type ColumnT<ValueT = any, FilterParamsT = any> = {|
  kind:
    | typeof COLUMNS.BOOLEAN
    | typeof COLUMNS.CATEGORICAL
    | typeof COLUMNS.CUSTOM
    | typeof COLUMNS.NUMERICAL
    | typeof COLUMNS.STRING,
  title: string,
  sortable: boolean,
  filterable: boolean,
  renderCell: React.ComponentType<{
    value: ValueT,
    isMeasured?: boolean,
    isSelected?: boolean,
    onSelect?: () => void,
    textQuery?: string,
  }>,
  renderFilter: React.ComponentType<{|
    data: ValueT[],
    close: () => void,
    setFilter: (filterParams: FilterParamsT, description: string) => void,
  |}>,
  buildFilter: FilterParamsT => ValueT => boolean,
  sortFn: (ValueT, ValueT) => number,
  minWidth?: number,
|};

export type RowT = {
  id: number | string,
  // eslint-disable-next-line flowtype/no-weak-types
  data: any[],
};

export type BatchActionT = {|
  label: string,
  onClick: ({
    clearSelection: () => mixed,
    event: SyntheticEvent<HTMLButtonElement>,
    selection: RowT[],
  }) => mixed,
  renderIcon?: React.ComponentType<{|size: number|}>,
|};

export type RowActionT = {|
  label: string,
  onClick: ({event: SyntheticEvent<HTMLButtonElement>, row: RowT}) => mixed,
  renderIcon: React.ComponentType<{|size: number|}>,
|};

export type Props = {|
  batchActions?: BatchActionT[],
  columns: ColumnT<>[],
  onSelectionChange?: (RowT[]) => mixed,
  rowActions?: RowActionT[],
  rows: RowT[],
|};
