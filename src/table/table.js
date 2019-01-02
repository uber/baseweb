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
  Body as StyledBody,
  Row as StyledRow,
  Cell as StyledCell,
} from './styled-components.js';

import {AutoSizer, Column} from 'react-virtualized';

import type {TablePropsT} from './types.js';

export default function Table(props: TablePropsT) {
  const {overrides = {}, columns, data: rows, ...restProps} = props;

  const [Root, RootProps] = getOverrides(overrides.Root, StyledRoot);
  const [Head, HeadProps] = getOverrides(overrides.Head, StyledHead);
  const [HeadCell, HeadCellProps] = getOverrides(
    overrides.HeadCell,
    StyledHeadCell,
  );
  const [Body, BodyProps] = getOverrides(overrides.Body, StyledBody);
  const [Row, RowProps] = getOverrides(overrides.Row, StyledRow);
  const [Cell, CellProps] = getOverrides(overrides.Cell, StyledCell);

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

  function renderHeaderCell({dataKey, label}) {
    return (
      <HeadCell key={dataKey} {...HeadCellProps}>
        {label}
      </HeadCell>
    );
  }

  function cellRenderer({
    cellData,
    columnData,
    columnIndex,
    dataKey,
    isScrolling,
    rowData,
    rowIndex,
  }) {
    return <Cell {...CellProps}>{cellData}</Cell>;
  }

  return (
    <AutoSizer>
      {({width, height}) => (
        <Root
          rowGetter={rowGetter}
          headerHeight={40}
          headerRowRenderer={headerRowRenderer}
          rowRenderer={rowRenderer}
          width={width}
          height={height}
          rowCount={rows.length}
          rowHeight={40}
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
