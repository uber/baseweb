/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React, {useMemo, type ComponentType, type Node} from 'react';
import {ChevronDown, ChevronUp} from '../icon/index.js';

import {
  StyledTableContainer,
  StyledTable,
  StyledTableHead,
  StyledTableHeadRow,
  StyledTableHeadCell,
  StyledTableHeadCellIcon,
  StyledTableBody,
  StyledTableBodyRow,
  StyledTableBodyCell,
} from './styled-components.js';

export type SortOrderT = 'ASC' | 'DESC';

export type TableColumnT = {
  key: string,
  header: Node,
  Cell: ComponentType<{row: any}>,
  isLiteral?: boolean,
  isNumeric?: boolean,
  isSortable?: boolean,
};

export type TableHeadCellPropsT = {
  column: TableColumnT,
  sortKey?: ?string,
  sortOrder?: ?SortOrderT,
  onSort?: (string, SortOrderT) => void,
};

export function TableHeadCell(props: TableHeadCellPropsT) {
  const {column, sortKey, sortOrder, onSort, ...rest} = props;
  const {key, header, isSortable} = column;
  const isSorted = isSortable && key === sortKey;

  const icon = isSorted && (
    <StyledTableHeadCellIcon
      $as={sortOrder === 'ASC' ? ChevronUp : ChevronDown}
    />
  );

  function handleSort() {
    if (isSortable && onSort) {
      if (key === sortKey) {
        onSort(key, sortOrder === 'ASC' ? 'DESC' : 'ASC');
      } else {
        onSort(key, 'ASC');
      }
    }
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handleSort();
    }
  }

  return (
    <StyledTableHeadCell
      $isSortable={isSortable}
      tabIndex={isSortable ? 0 : null}
      onClick={handleSort}
      onKeyPress={handleKeyPress}
      {...rest}
    >
      {header}
      &nbsp;
      {icon}
    </StyledTableHeadCell>
  );
}

export type TableBodyRowPropsT = {
  columns: Array<TableColumnT>,
  row: any,
};

export function TableBodyRow(props: TableBodyRowPropsT) {
  const {columns, row} = props;

  // Memoize row rendering to improve performance of large tables
  return useMemo(
    () => (
      <StyledTableBodyRow>
        {columns.map(column => (
          <StyledTableBodyCell
            key={column.key}
            $isLiteral={column.isLiteral}
            $isNumeric={column.isNumeric}
          >
            <column.Cell row={row} />
          </StyledTableBodyCell>
        ))}
      </StyledTableBodyRow>
    ),
    [columns, row],
  );
}

export type TablePropsT = {
  columns: Array<TableColumnT>,
  rows: Array<any>,
  sortKey?: ?string,
  sortOrder?: ?SortOrderT,
  onSort?: (string, SortOrderT) => void,
};

export function Table(props: TablePropsT) {
  const {columns, rows, sortKey, sortOrder, onSort} = props;

  return (
    <StyledTableContainer>
      <StyledTable>
        <StyledTableHead>
          <StyledTableHeadRow>
            {columns.map(column => (
              <TableHeadCell
                key={column.key}
                column={column}
                sortKey={sortKey}
                sortOrder={sortOrder}
                onSort={onSort}
              />
            ))}
          </StyledTableHeadRow>
        </StyledTableHead>
        <StyledTableBody>
          {rows.map(row => (
            <TableBodyRow key={row.key} columns={columns} row={row} />
          ))}
        </StyledTableBody>
      </StyledTable>
    </StyledTableContainer>
  );
}
