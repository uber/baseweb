/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';

import type {OverrideT} from '../helpers/overrides.js';

export type OverridesT = {
  Root?: OverrideT<*>,
  Table?: OverrideT<*>,
  TableHead?: OverrideT<*>,
  TableHeadRow?: OverrideT<*>,
  TableHeadCell?: OverrideT<*>,
  TableBody?: OverrideT<*>,
  TableBodyRow?: OverrideT<*>,
  TableBodyCell?: OverrideT<*>,
};

export type TablePropsT = {
  overrides?: OverridesT,
  columns: Array<React.Node>,
  data: Array<Array<React.Node>>,
  horizontalScrollWidth?: string,
};

export type BuilderOverridesT = {
  ...OverridesT,
  TableHeadCellSortable?: OverrideT<*>,
  SortAscIcon?: OverrideT<*>,
  SortDescIcon?: OverrideT<*>,
  SortNoneIcon?: OverrideT<*>,
};

export type TableBuilderPropsT<RowT> = {
  overrides?: BuilderOverridesT,
  children?: React.Node,
  data: Array<RowT>,
  horizontalScrollWidth?: string,
  sortColumn?: ?string,
  sortOrder?: 'ASC' | 'DESC' | null,
  onSort?: (columnId: string) => void,
};

export type ColumnOverridesT = {
  TableHeadCell?: OverrideT<*>,
  TableHeadCellSortable?: OverrideT<*>,
  TableBodyCell?: OverrideT<*>,
  SortAscIcon?: OverrideT<*>,
  SortDescIcon?: OverrideT<*>,
  SortNoneIcon?: OverrideT<*>,
};

export type TableBuilderColumnPropsT<RowT> = {
  overrides?: ColumnOverridesT,
  children: (row: RowT, rowIndex?: number) => React.Node,
  id?: string,
  header?: React.Node,
  numeric?: boolean,
  sortable?: boolean,
};
