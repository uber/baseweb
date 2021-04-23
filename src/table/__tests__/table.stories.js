/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import TableBorderless from './table-borderless.scenario.js';
import TableCells from './table-cells.scenario.js';
import TableFewRows from './table-few-rows.scenario.js';
import TableFilter from './table-filter.scenario.js';
import TablePagination from './table-pagination.scenario.js';
import TableScroll from './table-scroll.scenario.js';
import TableSortableFillClick from './table-sortable-fill-click.scenario.js';
import TableSortable from './table-sortable.scenario.js';

export const Borderless = () => <TableBorderless />;
export const Cells = () => <TableCells />;
export const FewRows = () => <TableFewRows />;
export const Filter = () => <TableFilter />;
export const Pagination = () => <TablePagination />;
export const Scroll = () => <TableScroll />;
export const SortableFillClick = () => <TableSortableFillClick />;
export const Sortable = () => <TableSortable />;
