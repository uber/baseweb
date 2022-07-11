/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import type { OverrideT } from '../helpers/overrides';
import { SIZE, DIVIDER } from './constants';

export type SizeT = keyof typeof SIZE;
export type DividerT = keyof typeof DIVIDER;

export type OverridesT = {
  Root?: OverrideT;
  Table?: OverrideT;
  TableHead?: OverrideT;
  TableHeadRow?: OverrideT;
  TableHeadCell?: OverrideT;
  TableBody?: OverrideT;
  TableBodyRow?: OverrideT;
  TableBodyCell?: OverrideT;
  TableLoadingMessage?: OverrideT;
  TableEmptyMessage?: OverrideT;
};

export type TablePropsT = {
  overrides?: OverridesT;
  columns: Array<React.ReactNode>;
  data: Array<Array<React.ReactNode>>;
  divider?: DividerT;
  horizontalScrollWidth?: string;
  isLoading?: boolean;
  loadingMessage?: React.ReactNode | (() => React.ReactNode);
  emptyMessage?: React.ReactNode | (() => React.ReactNode);
  size?: SizeT;
};

export type BuilderOverridesT = {
  TableHeadCellSortable?: OverrideT;
  SortIconContainer?: OverrideT;
  SortAscIcon?: OverrideT;
  SortDescIcon?: OverrideT;
  SortNoneIcon?: OverrideT;
} & OverridesT;

export type TableBuilderPropsT<RowT> = {
  overrides?: BuilderOverridesT;
  children?: React.ReactNode;
  data: Array<RowT>;
  divider?: DividerT;
  horizontalScrollWidth?: string;
  sortColumn?: string | null;
  sortOrder?: 'ASC' | 'DESC' | null;
  onSort?: (columnId: string) => void;
  isLoading?: boolean;
  loadingMessage?: React.ReactNode | (() => React.ReactNode);
  emptyMessage?: React.ReactNode | (() => React.ReactNode);
  size?: SizeT;
};

export type ColumnOverridesT = {
  TableHeadCell?: OverrideT;
  TableHeadCellSortable?: OverrideT;
  TableBodyCell?: OverrideT;
  SortAscIcon?: OverrideT;
  SortDescIcon?: OverrideT;
  SortNoneIcon?: OverrideT;
};

export type TableBuilderColumnPropsT<RowT> = {
  overrides?: ColumnOverridesT;
  children: (row: RowT, rowIndex?: number) => React.ReactNode;
  id?: string;
  header?: React.ReactNode;
  numeric?: boolean;
  sortable?: boolean;
  tableHeadAriaLabel?: string;
};
