/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {SORT_DIRECTIONS} from './constants.js';
import type {ColumnT, StatefulContainerPropsT} from './types.js';

function useDuplicateColumnTitleWarning(columns: ColumnT<>[]) {
  React.useEffect(() => {
    if (__DEV__) {
      const titles = columns.reduce(
        (set, column) => set.add(column.title),
        new Set(),
      );
      if (titles.size < columns.length) {
        console.warn(
          'BaseWeb DataTable: Column titles must be unique else will result in non-deterministic filtering.',
        );
      }
    }
  }, [columns]);
}

function useSortParameters() {
  const [sortIndex, setSortIndex] = React.useState(-1);
  const [sortDirection, setSortDirection] = React.useState(null);

  function handleSort(columnIndex) {
    if (columnIndex === sortIndex) {
      if (sortDirection === SORT_DIRECTIONS.ASC) {
        setSortIndex(-1);
        setSortDirection(SORT_DIRECTIONS.DESC);
      } else {
        setSortDirection(SORT_DIRECTIONS.ASC);
      }
    } else {
      setSortIndex(columnIndex);
      setSortDirection(SORT_DIRECTIONS.DESC);
    }
  }

  return [sortIndex, sortDirection, handleSort];
}

export function Unstable_StatefulContainer(props: StatefulContainerPropsT) {
  useDuplicateColumnTitleWarning(props.columns);
  const [sortIndex, sortDirection, handleSort] = useSortParameters();
  const [filters, setFilters] = React.useState(new Map());
  const [textQuery, setTextQuery] = React.useState('');

  function handleFilterAdd(filterParams, title) {
    filters.set(title, filterParams);
    setFilters(new Map(filters));
  }
  function handleFilterRemove(title) {
    filters.delete(title);
    setFilters(new Map(filters));
  }

  const [selectedRowIds, setSelectedRowIds] = React.useState(new Set());
  function handleSelectChange(next) {
    setSelectedRowIds(next);

    const selectionCallback = props.onSelectionChange;
    if (selectionCallback) {
      selectionCallback(props.rows.filter(r => next.has(r.id)));
    }
  }
  function handleSelectMany(incomingRows) {
    // only adds rows that are visible in the table
    handleSelectChange(
      new Set([...selectedRowIds, ...incomingRows.map(r => r.id)]),
    );
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

  const handleRowHighlightChange = React.useCallback(
    (rowIndex, row) => {
      if (props.onRowHighlightChange) {
        props.onRowHighlightChange(rowIndex, row);
      }
    },
    [props.rowHighlightIndex],
  );

  return props.children({
    filters,
    onFilterAdd: handleFilterAdd,
    onFilterRemove: handleFilterRemove,
    onRowHighlightChange: handleRowHighlightChange,
    onSelectMany: handleSelectMany,
    onSelectNone: handleSelectNone,
    onSelectOne: handleSelectOne,
    onSort: handleSort,
    onTextQueryChange: setTextQuery,
    rowHighlightIndex: props.rowHighlightIndex,
    selectedRowIds,
    sortIndex,
    sortDirection,
    textQuery,
  });
}
