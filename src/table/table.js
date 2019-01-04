/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {getOverrides} from '../helpers/overrides.js';
import {
  Root as StyledRoot,
  Head as StyledHead,
  HeadCell as StyledHeadCell,
  Row as StyledRow,
  Cell as StyledCell,
} from './styled-components.js';

import {
  AutoSizer,
  Table as VTable,
  Column,
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized';

import type {TablePropsT} from './types.js';

export default function Table(props: TablePropsT) {
  const {
    overrides = {},
    columns,
    data: rows,
    estimatedRowSize,
    useDynamicRowHeight,
    ...restProps
  } = props;

  const [Root, RootProps] = getOverrides(overrides.Root, StyledRoot);
  const [Head, HeadProps] = getOverrides(overrides.Head, StyledHead);
  const [HeadCell, HeadCellProps] = getOverrides(
    overrides.HeadCell,
    StyledHeadCell,
  );
  const [Row, RowProps] = getOverrides(overrides.Row, StyledRow);
  const [Cell, CellProps] = getOverrides(overrides.Cell, StyledCell);

  const cache = new CellMeasurerCache({
    defaultWidth: 100,
    defaultHeight: estimatedRowSize,
    minWidth: 75,
    fixedWidth: true,
  });

  function rowGetter({index}) {
    return rows[index];
  }

  function headerRowRenderer({columns, style}) {
    return (
      <Head style={style} {...HeadProps}>
        {columns}
      </Head>
    );
  }

  function renderHeaderCell({dataKey, label}) {
    return (
      <HeadCell key={dataKey} {...HeadCellProps}>
        {label}
      </HeadCell>
    );
  }

  function rowRenderer({
    className,
    columns,
    index,
    key,
    onRowClick,
    onRowDoubleClick,
    onRowMouseOut,
    onRowMouseOver,
    onRowRightClick,
    rowData,
    style,
  }) {
    return (
      <Row key={key} role="row" style={style} {...RowProps}>
        {columns}
      </Row>
    );
  }

  function cellRenderer({columnIndex, key, parent, rowIndex, style}) {
    const cell = (
      <Cell
        style={{
          ...style,
        }}
        {...CellProps}
      >
        {rows[rowIndex][columnIndex]}
      </Cell>
    );
    if (useDynamicRowHeight) {
      return (
        <CellMeasurer
          cache={cache}
          columnIndex={columnIndex}
          key={key}
          parent={parent}
          rowIndex={rowIndex}
        >
          {cell}
        </CellMeasurer>
      );
    }

    return cell;
  }

  return (
    <AutoSizer>
      {({width, height}) => (
        <Root style={{width: width, height: height}}>
          <VTable
            rowGetter={rowGetter}
            headerHeight={48}
            headerRowRenderer={headerRowRenderer}
            rowRenderer={rowRenderer}
            width={width}
            height={height}
            rowCount={rows.length}
            rowHeight={useDynamicRowHeight ? cache.rowHeight : estimatedRowSize}
            {...restProps}
            {...RootProps}
          >
            {columns.map((column, index) => {
              return (
                <Column
                  key={index}
                  headerRenderer={renderHeaderCell}
                  label={column}
                  flexGrow={1}
                  columnData={Object.assign({}, rows[index])}
                  cellDataGetter={({rowData}) => rowData[index]}
                  cellRenderer={cellRenderer}
                  dataKey={index}
                  width={150}
                />
              );
            })}
          </VTable>
        </Root>
      )}
    </AutoSizer>
  );
}

Table.defaultProps = {
  columns: [],
  data: [[]],
  estimatedRowSize: 40,
  isLoading: false,
  useDynamicRowHeight: false,
};
