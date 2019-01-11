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

import {
  AutoSizer,
  ScrollSync,
  CellMeasurer,
  CellMeasurerCache,
  defaultCellRangeRenderer,
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
  const [Body, BodyProps] = getOverrides(overrides.Body, StyledBody);
  const [Row, RowProps] = getOverrides(overrides.Row, StyledRow);
  const [Cell, CellProps] = getOverrides(overrides.Cell, StyledCell);

  const cache = new CellMeasurerCache({
    defaultWidth: 100,
    defaultHeight: estimatedRowSize,
    minWidth: 75,
    fixedWidth: true,
  });

  function renderHeaderCell({columnIndex, key, parent, rowIndex, style}) {
    return (
      <HeadCell
        style={{
          ...style,
        }}
        {...HeadCellProps}
      >
        {columns[columnIndex]}
      </HeadCell>
    );
  }

  function cellRangeRenderer(props) {
    const children = defaultCellRangeRenderer(props);
    children.push(<div>My custom overlay</div>);
    return children;
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
          <ScrollSync>
            {({
              clientHeight,
              clientWidth,
              onScroll,
              scrollHeight,
              scrollLeft,
              scrollTop,
              scrollWidth,
            }) => (
              <React.Fragment>
                <Head
                  {...HeadProps}
                  columnCount={columns.length}
                  columnWidth={400}
                  height={48}
                  rowCount={1}
                  width={width}
                  scrollLeft={scrollLeft}
                  rowHeight={48}
                  cellRenderer={renderHeaderCell}
                  style={{overflow: 'hidden'}}
                />
                <Body
                  {...BodyProps}
                  onScroll={onScroll}
                  cellRangeRenderer={cellRangeRenderer}
                  cellRenderer={cellRenderer}
                  columnCount={columns.length}
                  columnWidth={400}
                  height={height - 48}
                  rowCount={rows.length}
                  rowHeight={
                    useDynamicRowHeight ? cache.rowHeight : estimatedRowSize
                  }
                  width={width}
                />
              </React.Fragment>
            )}
          </ScrollSync>
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
