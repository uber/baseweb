/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type * as React from 'react';

import type { COLUMNS, SORT_DIRECTIONS } from './constants';

export type SortDirections = (typeof SORT_DIRECTIONS)[keyof typeof SORT_DIRECTIONS];

export type Columns = (typeof COLUMNS)[keyof typeof COLUMNS];

// These options are available on all column kinds. Most have additional
// unique options depending on the data visualization requirements.
export type SharedColumnOptions<Value> = {
  cellBlockAlign?: 'start' | 'center' | 'end';
  fillWidth?: boolean;
  filterable?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mapDataToValue: (data: any) => Value;
  maxWidth?: number;
  minWidth?: number;
  sortable?: boolean;
  title: string;
};

export type RenderCell<Value> = React.ComponentType<{
  value: Value;
  isMeasured?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  textQuery?: string;
  x: number;
  y: number;
}>;

export type RenderFilter<Value, FilterParams> = React.ComponentType<{
  close: () => void;
  data: Value[];
  filterParams?: FilterParams;
  setFilter: (a: FilterParams) => void;
}>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ColumnOptions<Value = any, FilterParams = any> = {
  kind: Columns;
  sortable: boolean;
  renderCell: RenderCell<Value>;
  renderFilter: RenderFilter<Value, FilterParams>;
  buildFilter: (a: FilterParams) => (a: Value) => boolean;
  textQueryFilter?: (b: string, a: Value) => boolean;
  sortFn: (b: Value, a: Value) => number;
} & SharedColumnOptions<Value>;

export type Row = {
  id: number | string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

export type BatchAction = {
  label: string;
  onClick: (a: {
    clearSelection: () => unknown;
    event: React.SyntheticEvent<HTMLButtonElement>;
    selection: Row[];
  }) => unknown;
  renderIcon?: React.ComponentType<
    {
      size: number;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } & any
  >;
};

export type RowAction = {
  label: string;
  onClick: (a: { event: React.SyntheticEvent<HTMLButtonElement>; row: Row }) => unknown;
  renderIcon: React.ComponentType<
    {
      size: number;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } & any
  >;
  renderButton?: React.ComponentType<{}>;
};

export type ImperativeMethods = {
  getRows: () => Row[];
  clearSelection: () => void;
};

export type ControlRef = {
  current: ImperativeMethods | null;
};

export type StatefulDataTableProps = {
  selectable?: boolean;
  batchActions?: BatchAction[];
  columns: ColumnOptions[];
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
  initialSortDirection?: SortDirections;
  initialTextQuery?: string;
  loading?: boolean;
  loadingMessage?: string | React.ComponentType<{}>;
  onFilterAdd?: (
    b: string,
    a: {
      description: string;
    }
  ) => unknown;
  onFilterRemove?: (a: string) => unknown;
  onIncludedRowsChange?: (rows: Row[]) => void;
  onRowHighlightChange?: (rowIndex: number, row: Row) => void;
  onSelectionChange?: (a: Row[]) => unknown;
  onSort?: (columnIndex: number, sortDirection: SortDirections) => void;
  onTextQueryChange?: (textQuery: string) => void;
  resizableColumnWidths?: boolean;
  rows: Row[];
  rowActions?: RowAction[] | ((a: Row) => RowAction[]);
  rowHeight?: number;
  rowHighlightIndex?: number;
  searchable?: boolean;
  controlRef?: ControlRef;
};

export type DataTableProps = {
  selectable?: boolean;
  emptyMessage?: string | React.ComponentType<{}>;
  filters?: Map<
    string,
    {
      description: string;
    }
  >;
  loading?: boolean;
  loadingMessage?: string | React.ComponentType<{}>;
  onIncludedRowsChange?: (rows: Row[]) => void;
  onRowHighlightChange?: (rowIndex: number, row: Row) => void;
  onSelectMany?: (rows: Row[]) => void;
  onSelectNone?: () => void;
  onSelectOne?: (row: Row) => void;
  onSort?: (columnIndex: number) => void;
  resizableColumnWidths?: boolean;
  rowHighlightIndex?: number;
  selectedRowIds?: Set<string | number>;
  sortIndex?: number;
  sortDirection?: SortDirections;
  textQuery?: string;
} & StatefulDataTableProps;

export type StatefulContainerProps = {
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
    onIncludedRowsChange: (rows: Row[]) => void;
    onRowHighlightChange: (rowIndex: number, row: Row) => void;
    onSelectMany: (rows: Row[]) => void;
    onSelectNone: () => void;
    onSelectOne: (row: Row) => void;
    onSort: (columnIndex: number) => void;
    onTextQueryChange: (query: string) => void;
    resizableColumnWidths: boolean;
    rowHighlightIndex?: number;
    selectedRowIds: Set<string | number>;
    sortIndex: number;
    sortDirection: SortDirections;
    textQuery: string;
  }) => React.ReactNode;
} & StatefulDataTableProps;
