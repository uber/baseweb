/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import DataTableAddRemoveColumns from './data-table-add-remove-columns.scenario.js';
import DataTableBatchAction from './data-table-batch-action.scenario.js';
import DataTableCategoricalColumn from './data-table-categorical-column.scenario.js';
import DataTableCellIndices from './data-table-cell-indices.scenario.js';
import DataTableCollectionOfObjects from './data-table-collection-of-objects.scenario.js';
import DataTableColumnsNotSortable from './data-table-columns-not-sortable.scenario.js';
import DataTableColumns from './data-table-columns.scenario.js';
import DataTableDatetimeColumn from './data-table-datetime-column.scenario.js';
import DataTableEmpty from './data-table-empty.scenario.js';
import DataTableExtractedFilters from './data-table-extracted-filters.scenario.js';
import DataTableExtractedHighlight from './data-table-extracted-highlight.scenario.js';
import DataTableFullWindow from './data-table-full-window.scenario.js';
import DataTableIncludedRowsChange from './data-table-included-rows-change.scenario.js';
import DataTableInitialFilters from './data-table-initial-filters.scenario.js';
import DataTableInitialSelectedRows from './data-table-initial-selected-rows.scenario.js';
import DataTableInitialSort from './data-table-initial-sort.scenario.js';
import DataTableLoading from './data-table-loading.scenario.js';
import DataTableNotFilterable from './data-table-not-filterable.scenario.js';
import DataTableNotSearchable from './data-table-not-searchable.scenario.js';
import DataTableNumericalColumn from './data-table-numerical-column.scenario.js';
import DataTableResizableColumnWidths from './data-table-resizable-column-widths.scenario.js';
import DataTableRowActions from './data-table-row-actions.scenario.js';
import DataTableRowActionsDynamic from './data-table-row-actions-dynamic.scenario.js';
import DataTableRowHeight from './data-table-row-height.scenario.js';
import DataTableTextSearch from './data-table-text-search.scenario.js';
import DataTableDefault from './data-table.scenario.js';
import DataTableRtl from './data-table-rtl.scenario.js';

export const AddRemoveColumns = () => <DataTableAddRemoveColumns />;
export const BatchAction = () => <DataTableBatchAction />;
export const CategoricalColumn = () => <DataTableCategoricalColumn />;
export const CellIndices = () => <DataTableCellIndices />;
export const CollectionOfObjects = () => <DataTableCollectionOfObjects />;
export const ColumnsNotSortable = () => <DataTableColumnsNotSortable />;
export const Columns = () => <DataTableColumns />;
export const DatetimeColumn = () => <DataTableDatetimeColumn />;
export const Empty = () => <DataTableEmpty />;
export const ExtractedFilters = () => <DataTableExtractedFilters />;
export const ExtractedHighlight = () => <DataTableExtractedHighlight />;
export const FullWindow = () => <DataTableFullWindow />;
export const IncludedRowsChange = () => <DataTableIncludedRowsChange />;
export const InitialFilters = () => <DataTableInitialFilters />;
export const InitialSelectedRows = () => <DataTableInitialSelectedRows />;
export const InitialSort = () => <DataTableInitialSort />;
export const Loading = () => <DataTableLoading />;
export const NotFilterable = () => <DataTableNotFilterable />;
export const NotSearchable = () => <DataTableNotSearchable />;
export const NumericalColumn = () => <DataTableNumericalColumn />;
export const ResizableColumnWidths = () => <DataTableResizableColumnWidths />;
export const RowActions = () => <DataTableRowActions />;
export const RowActionsDynamic = () => <DataTableRowActionsDynamic />;
export const RowHeight = () => <DataTableRowHeight />;
export const TextSearch = () => <DataTableTextSearch />;
export const DataTable = () => <DataTableDefault />;
export const TestRtl = () => <DataTableRtl />;
