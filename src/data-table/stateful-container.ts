/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { SORT_DIRECTIONS } from './constants';
import type { ColumnT, StatefulContainerPropsT } from './types';

function useDuplicateColumnTitleWarning(columns: ColumnT[]) {
  React.useEffect(() => {
    if (__DEV__) {
      const titles = columns.reduce((set, column) => set.add(column.title), new Set());
      if (titles.size < columns.length) {
        console.warn(
          'BaseWeb DataTable: Column titles must be unique else will result in non-deterministic filtering.'
        );
      }
    }
  }, [columns]);
}

function useSortParameters(initialSortIndex = -1, initialSortDirection = null) {
  const [sortIndex, setSortIndex] = React.useState(initialSortIndex);
  const [sortDirection, setSortDirection] = React.useState(initialSortDirection);

  function handleSort(columnIndex) {
    if (columnIndex === sortIndex) {
      if (sortDirection === SORT_DIRECTIONS.DESC) {
        setSortIndex(-1);
        setSortDirection(SORT_DIRECTIONS.ASC);
      } else {
        setSortDirection(SORT_DIRECTIONS.DESC);
      }
    } else {
      setSortIndex(columnIndex);
      setSortDirection(SORT_DIRECTIONS.ASC);
    }
  }

  return [sortIndex, sortDirection, handleSort];
}

export function StatefulContainer(props: StatefulContainerPropsT) {
  useDuplicateColumnTitleWarning(props.columns);
  const [sortIndex, sortDirection, handleSort] = useSortParameters(
    props.initialSortIndex,
    props.initialSortDirection
  );
  const [filters, setFilters] = React.useState(props.initialFilters || new Map());
  const [textQuery, setTextQuery] = React.useState('');

  function handleFilterAdd(title, filterParams) {
    filters.set(title, filterParams);
    if (props.onFilterAdd) {
      props.onFilterAdd(title, filterParams);
    }
    setFilters(new Map(filters));
  }
  function handleFilterRemove(title) {
    filters.delete(title);
    if (props.onFilterRemove) {
      props.onFilterRemove(title);
    }
    setFilters(new Map(filters));
  }

  const [selectedRowIds, setSelectedRowIds] = React.useState(
    props.initialSelectedRowIds || new Set()
  );
  function handleSelectChange(next) {
    setSelectedRowIds(next);

    const selectionCallback = props.onSelectionChange;
    if (selectionCallback) {
      selectionCallback(props.rows.filter((r) => next.has(r.id)));
    }
  }
  function handleSelectMany(incomingRows) {
    // only adds rows that are visible in the table
    handleSelectChange(new Set([...selectedRowIds, ...incomingRows.map((r) => r.id)]));
  }
  function handleSelectNone() {
    handleSelectChange(new Set());
  }
  function handleSelectOne(row) {
    if (selectedRowIds.has(row.id)) {
      selectedRowIds.delete(row.id);
    } else {
      selectedRowIds.add(row.id);
    }
    handleSelectChange(new Set(selectedRowIds));
  }

  const handleIncludedRowsChange = React.useCallback(
    (rows) => {
      if (props.onIncludedRowsChange) {
        props.onIncludedRowsChange(rows);
      }
    },
    [props.onIncludedRowsChange]
  );

  const handleRowHighlightChange = React.useCallback(
    (rowIndex, row) => {
      if (props.onRowHighlightChange) {
        props.onRowHighlightChange(rowIndex, row);
      }
    },
    [props.rowHighlightIndex]
  );

  return props.children({
    filters,
    onFilterAdd: handleFilterAdd,
    onFilterRemove: handleFilterRemove,
    onIncludedRowsChange: handleIncludedRowsChange,
    onRowHighlightChange: handleRowHighlightChange,
    onSelectMany: handleSelectMany,
    onSelectNone: handleSelectNone,
    onSelectOne: handleSelectOne,
    onSort: handleSort,
    onTextQueryChange: setTextQuery,
    resizableColumnWidths: Boolean(props.resizableColumnWidths),
    rowHighlightIndex: props.rowHighlightIndex,
    selectedRowIds,
    sortIndex,
    sortDirection,
    textQuery,
  });
}
