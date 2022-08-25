/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type * as React from 'react';

import type { Override } from '../helpers/overrides';
import type { SIZE, DIVIDER } from './constants';

export type Size = keyof typeof SIZE;
export type Divider = keyof typeof DIVIDER;

export type TableOverrides = {
  Root?: Override;
  Table?: Override;
  TableHead?: Override;
  TableHeadRow?: Override;
  TableHeadCell?: Override;
  TableBody?: Override;
  TableBodyRow?: Override;
  TableBodyCell?: Override;
  TableLoadingMessage?: Override;
  TableEmptyMessage?: Override;
};

export type TableProps = {
  overrides?: TableOverrides;
  columns: Array<React.ReactNode>;
  data: Array<Array<React.ReactNode>>;
  divider?: Divider;
  horizontalScrollWidth?: string;
  isLoading?: boolean;
  loadingMessage?: React.ReactNode | (() => React.ReactNode);
  emptyMessage?: React.ReactNode | (() => React.ReactNode);
  size?: Size;
};

export type BuilderOverrides = {
  TableHeadCellSortable?: Override;
  SortIconContainer?: Override;
  SortAscIcon?: Override;
  SortDescIcon?: Override;
  SortNoneIcon?: Override;
} & TableOverrides;

export type TableBuilderProps<RowT> = {
  overrides?: BuilderOverrides;
  children?: React.ReactNode;
  data: Array<RowT>;
  divider?: Divider;
  horizontalScrollWidth?: string;
  sortColumn?: string | null;
  sortOrder?: 'ASC' | 'DESC' | null;
  onSort?: (columnId: string) => void;
  isLoading?: boolean;
  loadingMessage?: React.ReactNode | (() => React.ReactNode);
  emptyMessage?: React.ReactNode | (() => React.ReactNode);
  size?: Size;
};

export type ColumnOverrides = {
  TableHeadCell?: Override;
  TableHeadCellSortable?: Override;
  TableBodyCell?: Override;
  SortAscIcon?: Override;
  SortDescIcon?: Override;
  SortNoneIcon?: Override;
};

export type TableBuilderColumnProps<RowT> = {
  overrides?: ColumnOverrides;
  children: (row: RowT, rowIndex?: number) => React.ReactNode;
  id?: string;
  header?: React.ReactNode;
  numeric?: boolean;
  sortable?: boolean;
  tableHeadAriaLabel?: string;
};
