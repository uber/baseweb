/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';

import type {OverrideT} from '../helpers/overrides.js';
import {SIZE, DIVIDER} from './constants.js';

export type SizeT = $Keys<typeof SIZE>;
export type DividerT = $Keys<typeof DIVIDER>;

export type OverridesT = {
  Root?: OverrideT,
  Table?: OverrideT,
  TableHead?: OverrideT,
  TableHeadRow?: OverrideT,
  TableHeadCell?: OverrideT,
  TableBody?: OverrideT,
  TableBodyRow?: OverrideT,
  TableBodyCell?: OverrideT,
  TableLoadingMessage?: OverrideT,
  TableEmptyMessage?: OverrideT,
};

export type TablePropsT = {
  overrides?: OverridesT,
  columns: Array<React.Node>,
  data: Array<Array<React.Node>>,
  divider?: DividerT,
  horizontalScrollWidth?: string,
  isLoading?: boolean,
  loadingMessage?: React.Node | (() => React.Node),
  emptyMessage?: React.Node | (() => React.Node),
  size?: SizeT,
};

export type BuilderOverridesT = {
  ...OverridesT,
  TableHeadCellSortable?: OverrideT,
  SortAscIcon?: OverrideT,
  SortDescIcon?: OverrideT,
  SortNoneIcon?: OverrideT,
};

export type TableBuilderPropsT<RowT> = {
  overrides?: BuilderOverridesT,
  children?: React.Node,
  data: Array<RowT>,
  divider?: DividerT,
  horizontalScrollWidth?: string,
  sortColumn?: ?string,
  sortOrder?: 'ASC' | 'DESC' | null,
  onSort?: (columnId: string) => void,
  isLoading?: boolean,
  loadingMessage?: React.Node | (() => React.Node),
  emptyMessage?: React.Node | (() => React.Node),
  size?: SizeT,
};

export type ColumnOverridesT = {
  TableHeadCell?: OverrideT,
  TableHeadCellSortable?: OverrideT,
  TableBodyCell?: OverrideT,
  SortAscIcon?: OverrideT,
  SortDescIcon?: OverrideT,
  SortNoneIcon?: OverrideT,
};

export type TableBuilderColumnPropsT<RowT> = {
  overrides?: ColumnOverridesT,
  children: (row: RowT, rowIndex?: number) => React.Node,
  id?: string,
  header?: React.Node,
  numeric?: boolean,
  sortable?: boolean,
  tableHeadAriaLabel?: string,
};
