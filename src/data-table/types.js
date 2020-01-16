/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

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

export type ColumnsT =
  | typeof COLUMNS.BOOLEAN
  | typeof COLUMNS.CATEGORICAL
  | typeof COLUMNS.CUSTOM
  | typeof COLUMNS.NUMERICAL
  | typeof COLUMNS.STRING;

// eslint-disable-next-line flowtype/no-weak-types
export type ColumnT<ValueT = any, FilterParamsT = any> = {|
  kind: ColumnsT,
  title: string,
  sortable: boolean,
  filterable: boolean,
  // eslint-disable-next-line flowtype/no-weak-types
  mapDataToValue: (data: any) => ValueT,
  renderCell: React.ComponentType<{
    value: ValueT,
    isMeasured?: boolean,
    isSelected?: boolean,
    onSelect?: () => void,
    textQuery?: string,
  }>,
  renderFilter: React.ComponentType<{|
    close: () => void,
    data: ValueT[],
    filterParams?: FilterParamsT,
    setFilter: FilterParamsT => void,
  |}>,
  buildFilter: FilterParamsT => ValueT => boolean,
  sortFn: (ValueT, ValueT) => number,
  maxWidth?: number,
  minWidth?: number,
|};

export type RowT = {
  id: number | string,
  // eslint-disable-next-line flowtype/no-weak-types
  data: any,
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

export type StatefulDataTablePropsT = {|
  batchActions?: BatchActionT[],
  columns: ColumnT<>[],
  onRowHighlightChange?: (rowIndex: number, row: RowT) => void,
  onSelectionChange?: (RowT[]) => mixed,
  rows: RowT[],
  rowActions?: RowActionT[],
  rowHeight?: number,
  rowHighlightIndex?: number,
|};

export type DataTablePropsT = {|
  ...StatefulDataTablePropsT,
  filters?: Map<string, {description: string}>,
  onRowHighlightChange?: (rowIndex: number, row: RowT) => void,
  onSelectMany?: (rows: RowT[]) => void,
  onSelectNone?: () => void,
  onSelectOne?: (row: RowT) => void,
  onSort?: (columnIndex: number) => void,
  rowHighlightIndex?: number,
  selectedRowIds?: Set<string | number>,
  sortIndex?: number,
  sortDirection?: SortDirectionsT,
  textQuery?: string,
|};

export type StatefulContainerPropsT = {|
  ...StatefulDataTablePropsT,
  children: ({|
    filters: Map<string, {description: string}>,
    onFilterAdd: (filterParams: {description: string}, title: string) => void,
    onFilterRemove: (title: string) => void,
    onRowHighlightChange: (rowIndex: number, row: RowT) => void,
    onSelectMany: (rows: RowT[]) => void,
    onSelectNone: () => void,
    onSelectOne: (row: RowT) => void,
    onSort: (columnIndex: number) => void,
    onTextQueryChange: (query: string) => void,
    rowHighlightIndex?: number,
    selectedRowIds: Set<string | number>,
    sortIndex: number,
    sortDirection: SortDirectionsT,
    textQuery: string,
  |}) => React.Node,
|};
