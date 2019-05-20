import * as React from 'react';
import {styled} from 'baseui';
import {
  StyledTable,
  StyledContent,
  StyledHead,
  StyledHeadCell,
  StyledRow,
  StyledCell,
} from 'baseui/table';

import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import {
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized/dist/commonjs/CellMeasurer';

const DATA = [
  ['Sarah Brown', 31, '100 Broadway st. New York City, New York'],
  ['Jane Smith', 32, '100 Market st. San Francisco, California'],
  ['Joe Black', 33, '100 Macquarie st. Sydney, Australia'],
  ['Sarah Brown', 31, '100 Broadway st. New York City, New York'],
  ['Jane Smith', 32, '100 Market st. San Francisco, California'],
  ['Joe Black', 33, '100 Macquarie st. Sydney, Australia'],
  ['Sarah Brown', 31, '100 Broadway st. New York City, New York'],
  ['Jane Smith', 32, '100 Market st. San Francisco, California'],
  ['Joe Black', 33, '100 Macquarie st. Sydney, Australia'],
  ['Sarah Brown', 31, '100 Broadway st. New York City, New York'],
  ['Jane Smith', 32, '100 Market st. San Francisco, California'],
  ['Joe Black', 33, '100 Macquarie st. Sydney, Australia'],
  ['Sarah Brown', 31, '100 Broadway st. New York City, New York'],
  ['Jane Smith', 32, '100 Market st. San Francisco, California'],
  ['Joe Black', 33, '100 Macquarie st. Sydney, Australia'],
];

const COLUMNS = ['Name', 'Age', 'Address'];

const WIDTH = 1000;

const Container = styled('div', {
  height: '500px',
});

const cache = new CellMeasurerCache({
  defaultHeight: 36,
  fixedHeight: true,
});

const FullHeight = styled('div', {height: '100%'});

export default () => (
  <Container>
    <StyledTable
      role="grid"
      aria-colcount={COLUMNS.length}
      aria-rowcount={DATA.length}
    >
      <StyledHead role="row" $width={`${WIDTH}px`}>
        {COLUMNS.map((column, index) => (
          <StyledHeadCell role="columnheader" key={index}>
            {column}
          </StyledHeadCell>
        ))}
      </StyledHead>

      <FullHeight>
        <AutoSizer>
          {({height, width}) => (
            <List
              height={height}
              width={WIDTH}
              rowCount={DATA.length}
              rowHeight={cache.rowHeight}
              deferredMeasurementCache={cache}
              rowRenderer={({index, key, parent, style}) => (
                <CellMeasurer
                  cache={cache}
                  columnIndex={0}
                  key={key}
                  parent={parent}
                  rowIndex={index}
                >
                  <StyledRow role="row" key={key} style={style}>
                    {DATA[index].map((cell, index) => (
                      <StyledCell role="gridcell" key={index}>
                        {cell}
                      </StyledCell>
                    ))}
                  </StyledRow>
                </CellMeasurer>
              )}
            />
          )}
        </AutoSizer>
      </FullHeight>
    </StyledTable>
  </Container>
);
