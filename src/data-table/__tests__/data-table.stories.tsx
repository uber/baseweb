/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as DataTableAddRemoveColumns } from './data-table-add-remove-columns.scenario';
import { Scenario as DataTableBatchAction } from './data-table-batch-action.scenario';
import { Scenario as DataTableCategoricalColumn } from './data-table-categorical-column.scenario';
import { Scenario as DataTableCellIndices } from './data-table-cell-indices.scenario';
import { Scenario as DataTableCollectionOfObjects } from './data-table-collection-of-objects.scenario';
import { Scenario as DataTableColumnWidthResize } from './data-table-column-width-resize.scenario';
import { Scenario as DataTableColumnsNotSortable } from './data-table-columns-not-sortable.scenario';
import { Scenario as DataTableColumns } from './data-table-columns.scenario';
import { Scenario as DataTableDatetimeColumn } from './data-table-datetime-column.scenario';
import { Scenario as DataTableEmpty } from './data-table-empty.scenario';
import { Scenario as DataTableExtractedFilters } from './data-table-extracted-filters.scenario';
import { Scenario as DataTableExtractedHighlight } from './data-table-extracted-highlight.scenario';
import { Scenario as DataTableFullWindow } from './data-table-full-window.scenario';
import { Scenario as DataTableIncludedRowsChange } from './data-table-included-rows-change.scenario';
import { Scenario as DataTableInitialFilters } from './data-table-initial-filters.scenario';
import { Scenario as DataTableInitialSelectedRows } from './data-table-initial-selected-rows.scenario';
import { Scenario as DataTableInitialSort } from './data-table-initial-sort.scenario';
import { Scenario as DataTableLoading } from './data-table-loading.scenario';
import { Scenario as DataTableNotFilterable } from './data-table-not-filterable.scenario';
import { Scenario as DataTableNotSearchable } from './data-table-not-searchable.scenario';
import { Scenario as DataTableNumericalColumn } from './data-table-numerical-column.scenario';
import { Scenario as DataTableResizableColumnWidths } from './data-table-resizable-column-widths.scenario';
import { Scenario as DataTableRowActions } from './data-table-row-actions.scenario';
import { Scenario as DataTableRowActionsButton } from './data-table-row-actions-button.scenario';
import { Scenario as DataTableRowActionsDynamic } from './data-table-row-actions-dynamic.scenario';
import { Scenario as DataTableRowHeight } from './data-table-row-height.scenario';
import { Scenario as DataTableStatefulCallback } from './data-table-stateful-callback.scenario';
import { Scenario as DataTableTextSearch } from './data-table-text-search.scenario';
import { Scenario as DataTableDefault } from './data-table.scenario';
import { Scenario as DataTableRtl } from './data-table-rtl.scenario';
import { Scenario as DataTableLargeData } from './data-table-large-column-data.scenario';
import { Scenario as DataTableGetRows } from './data-table-get-rows.scenario';

export const AddRemoveColumns = () => <DataTableAddRemoveColumns />;
export const BatchAction = () => <DataTableBatchAction />;
export const CategoricalColumn = () => <DataTableCategoricalColumn />;
export const CellIndices = () => <DataTableCellIndices />;
export const CollectionOfObjects = () => <DataTableCollectionOfObjects />;
export const ColumnWidthResize = () => <DataTableColumnWidthResize />;
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
export const RowActionsButton = () => <DataTableRowActionsButton />;
export const RowActionsDynamic = () => <DataTableRowActionsDynamic />;
export const RowHeight = () => <DataTableRowHeight />;
export const StatefulCallback = () => <DataTableStatefulCallback />;
export const TextSearch = () => <DataTableTextSearch />;
export const DataTable = () => <DataTableDefault />;
export const TestRtl = () => <DataTableRtl />;
export const LargeData = () => <DataTableLargeData />;
export const GetRows = () => <DataTableGetRows />;
