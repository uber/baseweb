/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { COLUMNS, SORT_DIRECTIONS } from './constants';

import type { SyntheticEvent } from 'react';

export type SortDirectionsT = typeof SORT_DIRECTIONS.ASC | typeof SORT_DIRECTIONS.DESC | null;

export type ColumnsT =
  | typeof COLUMNS.ANCHOR
  | typeof COLUMNS.BOOLEAN
  | typeof COLUMNS.CATEGORICAL
  | typeof COLUMNS.CUSTOM
  | typeof COLUMNS.DATETIME
  | typeof COLUMNS.NUMERICAL
  | typeof COLUMNS.STRING;

// These options are available on all column kinds. Most have additional
// unique options depending on the data visualization requirements.
export type SharedColumnOptionsT<ValueT> = {
  cellBlockAlign?: 'start' | 'center' | 'end';
  fillWidth?: boolean;
  filterable?: boolean;
  // flowlint-next-line unclear-type:off
  mapDataToValue: (data: any) => ValueT;
  maxWidth?: number;
  minWidth?: number;
  sortable?: boolean;
  title: string;
};

export type RenderCellT<ValueT> = React.ComponentType<{
  value: ValueT;
  isMeasured?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  textQuery?: string;
  x: number;
  y: number;
}>;

export type RenderFilterT<ValueT, FilterParamsT> = React.ComponentType<{
  close: () => void;
  data: ValueT[];
  filterParams?: FilterParamsT;
  setFilter: (a: FilterParamsT) => void;
}>;

// flowlint-next-line unclear-type:off
export type ColumnT<ValueT = any, FilterParamsT = any> = {
  kind: ColumnsT;
  sortable: boolean;
  renderCell: RenderCellT<ValueT>;
  renderFilter: RenderFilterT<ValueT, FilterParamsT>;
  buildFilter: (a: FilterParamsT) => (a: ValueT) => boolean;
  textQueryFilter?: (b: string, a: ValueT) => boolean;
  sortFn: (b: ValueT, a: ValueT) => number;
} & SharedColumnOptionsT<ValueT>;

export type RowT = {
  id: number | string;
  // flowlint-next-line unclear-type:off
  data: any;
};

export type BatchActionT = {
  label: string;
  onClick: (a: {
    clearSelection: () => unknown;
    event: SyntheticEvent<HTMLButtonElement>;
    selection: RowT[];
  }) => unknown;
  renderIcon?: React.ComponentType<{
    size: number;
  }>;
};

export type RowActionT = {
  label: string;
  onClick: (a: { event: SyntheticEvent<HTMLButtonElement>; row: RowT }) => unknown;
  renderIcon: React.ComponentType<{
    size: number;
  }>;
  renderButton?: React.ComponentType<{}>;
};

type ImperativeMethodsT = {
  getRows: () => RowT[];
};

export type ControlRefT = {
  current: ImperativeMethodsT | null;
};

export type StatefulDataTablePropsT = {
  batchActions?: BatchActionT[];
  columns: ColumnT[];
  emptyMessage?: string | React.ComponentType<{}>;
  filterable?: boolean;
  initialFilters?: Map<
    string,
    {
      description: string;
    }
  >;
  initialSelectedRowIds?: Set<number | string>;
  initialSortIndex?: number;
  initialSortDirection?: SortDirectionsT;
  loading?: boolean;
  loadingMessage?: string | React.ComponentType<{}>;
  onFilterAdd?: (
    b: string,
    a: {
      description: string;
    }
  ) => unknown;
  onFilterRemove?: (a: string) => unknown;
  onIncludedRowsChange?: (rows: RowT[]) => void;
  onRowHighlightChange?: (rowIndex: number, row: RowT) => void;
  onSelectionChange?: (a: RowT[]) => unknown;
  resizableColumnWidths?: boolean;
  rows: RowT[];
  rowActions?: RowActionT[] | ((a: RowT) => RowActionT[]);
  rowHeight?: number;
  rowHighlightIndex?: number;
  searchable?: boolean;
  controlRef?: ControlRefT;
};

export type DataTablePropsT = {
  emptyMessage?: string | React.ComponentType<{}>;
  filters?: Map<
    string,
    {
      description: string;
    }
  >;
  loading?: boolean;
  loadingMessage?: string | React.ComponentType<{}>;
  onIncludedRowsChange?: (rows: RowT[]) => void;
  onRowHighlightChange?: (rowIndex: number, row: RowT) => void;
  onSelectMany?: (rows: RowT[]) => void;
  onSelectNone?: () => void;
  onSelectOne?: (row: RowT) => void;
  onSort?: (columnIndex: number) => void;
  resizableColumnWidths?: boolean;
  rowHighlightIndex?: number;
  selectedRowIds?: Set<string | number>;
  sortIndex?: number;
  sortDirection?: SortDirectionsT;
  textQuery?: string;
} & StatefulDataTablePropsT;

export type StatefulContainerPropsT = {
  children: (a: {
    filters: Map<
      string,
      {
        description: string;
      }
    >;
    onFilterAdd: (
      title: string,
      filterParams: {
        description: string;
      }
    ) => void;
    onFilterRemove: (title: string) => void;
    onIncludedRowsChange: (rows: RowT[]) => void;
    onRowHighlightChange: (rowIndex: number, row: RowT) => void;
    onSelectMany: (rows: RowT[]) => void;
    onSelectNone: () => void;
    onSelectOne: (row: RowT) => void;
    onSort: (columnIndex: number) => void;
    onTextQueryChange: (query: string) => void;
    resizableColumnWidths: boolean;
    rowHighlightIndex?: number;
    selectedRowIds: Set<string | number>;
    sortIndex: number;
    sortDirection: SortDirectionsT;
    textQuery: string;
  }) => React.ReactNode;
} & StatefulDataTablePropsT;
