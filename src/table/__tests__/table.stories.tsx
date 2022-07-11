/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as TableBorderless } from './table-borderless.scenario';
import { Scenario as TableCells } from './table-cells.scenario';
import { Scenario as TableFewRows } from './table-few-rows.scenario';
import { Scenario as TableFilter } from './table-filter.scenario';
import { Scenario as TablePagination } from './table-pagination.scenario';
import { Scenario as TableScroll } from './table-scroll.scenario';
import { Scenario as TableSortableFillClick } from './table-sortable-fill-click.scenario';
import { Scenario as TableSortable } from './table-sortable.scenario';

export const Borderless = () => <TableBorderless />;
export const Cells = () => <TableCells />;
export const FewRows = () => <TableFewRows />;
export const Filter = () => <TableFilter />;
export const Pagination = () => <TablePagination />;
export const Scroll = () => <TableScroll />;
export const SortableFillClick = () => <TableSortableFillClick />;
export const Sortable = () => <TableSortable />;
