/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';

import {
  StyledRoot,
  StyledTable,
  StyledTableHead,
  StyledTableHeadRow,
  StyledTableHeadCell,
  StyledTableHeadCellSortable,
  StyledTableBody,
  StyledTableBodyRow,
  StyledTableBodyCell,
  StyledSortAscIcon,
  StyledSortDescIcon,
  StyledSortNoneIcon,
} from './styled-components.js';
import {getOverrides} from '../helpers/overrides.js';

import type {TableBuilderPropsT} from './types.js';

export default class TableBuilder<T> extends React.Component<
  TableBuilderPropsT<T>,
> {
  static defaultProps = {
    data: [],
  };

  render() {
    const {
      overrides = {},
      children,
      data,
      horizontalScrollWidth,
      sortColumn,
      sortOrder = 'ASC',
      onSort,
      ...rest
    } = this.props;

    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);

    const [Table, tableProps] = getOverrides(overrides.Table, StyledTable);

    const [TableHead, tableHeadProps] = getOverrides(
      overrides.TableHead,
      StyledTableHead,
    );

    const [TableHeadRow, tableHeadRowProps] = getOverrides(
      overrides.TableHeadRow,
      StyledTableHeadRow,
    );

    const [TableHeadCell, tableHeadCellProps] = getOverrides(
      overrides.TableHeadCell,
      StyledTableHeadCell,
    );

    const [TableHeadCellSortable, tableHeadCellSortableProps] = getOverrides(
      overrides.TableHeadCellSortable,
      StyledTableHeadCellSortable,
    );

    const [TableBody, tableBodyProps] = getOverrides(
      overrides.TableBody,
      StyledTableBody,
    );

    const [TableBodyRow, tableBodyRowProps] = getOverrides(
      overrides.TableBodyRow,
      StyledTableBodyRow,
    );

    const [TableBodyCell, tableBodyCellProps] = getOverrides(
      overrides.TableBodyCell,
      StyledTableBodyCell,
    );

    const [SortAscIcon, sortAscIconProps] = getOverrides(
      overrides.SortAscIcon,
      StyledSortAscIcon,
    );

    const [SortDescIcon, sortDescIconProps] = getOverrides(
      overrides.SortDescIcon,
      StyledSortDescIcon,
    );

    const [SortNoneIcon, sortNoneIconProps] = getOverrides(
      overrides.SortNoneIcon,
      StyledSortNoneIcon,
    );

    const columns = React.Children.toArray(children)
      .filter(Boolean)
      .map(child => child.props);

    function renderHeader(col, colIndex) {
      const colOverrides = col.overrides || {};

      if (!col.sortable) {
        const [ColTableHeadCell, colTableHeadCellProps] = getOverrides(
          colOverrides.TableHeadCell,
          TableHeadCell,
        );

        return (
          <ColTableHeadCell
            key={colIndex}
            {...tableHeadCellProps}
            {...colTableHeadCellProps}
          >
            {col.header}
          </ColTableHeadCell>
        );
      }

      const [
        ColTableHeadCellSortable,
        colTableHeadCellSortableProps,
      ] = getOverrides(
        colOverrides.TableHeadCellSortable,
        TableHeadCellSortable,
      );

      let sortIcon = null;

      switch (col.id === sortColumn && sortOrder) {
        case 'ASC':
          sortIcon = <SortAscIcon {...sortAscIconProps} />;
          break;
        case 'DESC':
          sortIcon = <SortDescIcon {...sortDescIconProps} />;
          break;
        default:
          sortIcon = <SortNoneIcon {...sortNoneIconProps} />;
          break;
      }

      return (
        <ColTableHeadCellSortable
          key={colIndex}
          role="button"
          tabIndex="0"
          onClick={() => onSort && onSort(col.id)}
          {...tableHeadCellSortableProps}
          {...colTableHeadCellSortableProps}
        >
          {col.header}
          {sortIcon}
        </ColTableHeadCellSortable>
      );
    }

    function renderCell(col, colIndex, row, rowIndex) {
      const colOverrides = col.overrides || {};

      const [ColTableBodyCell, colTableBodyCellProps] = getOverrides(
        colOverrides.TableBodyCell,
        TableBodyCell,
      );

      return (
        <ColTableBodyCell
          key={colIndex}
          $isNumeric={col.numeric}
          {...tableBodyCellProps}
          {...colTableBodyCellProps}
        >
          {col.children(row, rowIndex)}
        </ColTableBodyCell>
      );
    }

    return (
      <Root data-baseweb="table-builder-semantic" {...rootProps} {...rest}>
        <Table $width={horizontalScrollWidth} {...tableProps}>
          <TableHead {...tableHeadProps}>
            <TableHeadRow {...tableHeadRowProps}>
              {columns.map((col, colIndex) => renderHeader(col, colIndex))}
            </TableHeadRow>
          </TableHead>
          <TableBody {...tableBodyProps}>
            {data.map((row, rowIndex) => (
              <TableBodyRow key={rowIndex} {...tableBodyRowProps}>
                {columns.map((col, colIndex) =>
                  renderCell(col, colIndex, row, rowIndex),
                )}
              </TableBodyRow>
            ))}
          </TableBody>
        </Table>
      </Root>
    );
  }
}
