// @flow
import * as React from 'react';
import {useStyletron} from 'baseui';
import {
  StyledTable,
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

const cache = new CellMeasurerCache({
  defaultHeight: 36,
  fixedWidth: true,
});

export default () => {
  const [useCss] = useStyletron();
  return (
    <div className={useCss({height: '500px'})}>
      <StyledTable
        role="grid"
        aria-colcount={COLUMNS.length}
        aria-rowcount={DATA.length}
      >
        <StyledHead role="row">
          {COLUMNS.map((column, index) => (
            <StyledHeadCell role="columnheader" key={index}>
              {column}
            </StyledHeadCell>
          ))}
        </StyledHead>

        <div className={useCss({height: '100%'})}>
          <AutoSizer>
            {({width, height}) => (
              <List
                height={height}
                width={width}
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
        </div>
      </StyledTable>
    </div>
  );
};
