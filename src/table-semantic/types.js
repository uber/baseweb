/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

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
  TableHeadCellSortable?: OverrideT<*>,
  TableBody?: OverrideT<*>,
  TableBodyRow?: OverrideT<*>,
  TableBodyCell?: OverrideT<*>,
  SortAscIcon?: OverrideT<*>,
  SortDescIcon?: OverrideT<*>,
  SortNoneIcon?: OverrideT<*>,
};

export type TablePropsT = {
  overrides?: OverridesT,
  columns: Array<React.Node>,
  data: Array<Array<React.Node>>,
  horizontalScrollWidth?: string,
};

export type TableBuilderPropsT<T> = {
  overrides?: OverridesT,
  children?: React.Node,
  data: Array<T>,
  horizontalScrollWidth?: string,
  sortColumn?: ?string,
  sortOrder?: 'asc' | 'desc' | null,
  onSort?: string => void,
};

export type TableBuilderColumnPropsT<T> = {
  overrides?: OverridesT,
  children: (T, ?number) => React.Node,
  id?: string,
  header?: React.Node,
  numeric?: boolean,
  sortable?: boolean,
};
