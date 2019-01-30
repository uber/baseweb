/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import List from 'react-virtualized/dist/commonjs/List'; // eslint-disable-line import/extensions
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'; // eslint-disable-line import/extensions
import {
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized/dist/commonjs/CellMeasurer'; // eslint-disable-line import/extensions

import {
  Table,
  StyledTable,
  StyledContent,
  StyledHead,
  StyledHeadCell,
  StyledRow,
  StyledCell,
} from './index.js';
import examples from './examples-list.js';

let data = [
  ['1', 'Sarah', 'Brown', 31, 'New York No. 1 Anywhere'],
  ['2', 'Jane', 'Smith', 32, 'San Francisco No. 1 Anywhere'],
  ['3', 'Joe', 'Black', 33, 'Sydney No. 1 Anywhere'],
  [
    '4',
    'Jane',
    'Red',
    34,
    'London No. 1 Anywhere London No. 1 Anywhere London No. 1 Anywhere London No. 1 Anywhere London No. 1 Anywhere London No. 1 Anywhere London No. 1 Anywhere',
  ],
  ['4', 'Jane', 'Red', 34, 'London No. 1 Anywhere'],
  ['4', 'Jane', 'Red', 34, 'London No. 1 Anywhere'],
  ['4', 'Jane', 'Red', 34, 'London No. 1 Anywhere'],
  ['4', 'Jane', 'Red', 34, 'London No. 1 Anywhere'],
  ['4', 'Jane', 'Red', 34, 'London No. 1 Anywhere'],
  ['4', 'Jane', 'Red', 34, 'London No. 1 Anywhere'],
].map(row => [`${row[1]} ${row[2]}`, row[3], row[4]]); // selects data to display

const DATA = data
  .concat(data)
  .concat(data)
  .concat(data);

const cache = new CellMeasurerCache({
  defaultHeight: 36,
});

// eslint-disable-next-line flowtype/no-weak-types
function Virtual(props: any) {
  return (
    <StyledTable>
      <StyledContent $width={props.width + 'px'}>
        <StyledHead $width={props.width + 'px'}>
          {props.columns.map((column, index) => (
            <StyledHeadCell key={index}>{column}</StyledHeadCell>
          ))}
        </StyledHead>
        <AutoSizer>
          {({width, height}) => (
            <List
              height={height - 60}
              width={props.width || width}
              rowCount={props.data.length}
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
                  <StyledRow key={key} style={style}>
                    {props.data[index].map((cell, index) => (
                      <StyledCell key={index}>{cell}</StyledCell>
                    ))}
                  </StyledRow>
                </CellMeasurer>
              )}
            />
          )}
        </AutoSizer>
      </StyledContent>
    </StyledTable>
  );
}

export default {
  [examples.TABLE]: function TableStory() {
    return (
      <div style={{height: '400px', width: '800px', marginTop: '48px'}}>
        <Table columns={['Name', 'Age', 'Address']} data={DATA} />
      </div>
    );
  },

  virtual: function VirtualStory() {
    return (
      <div style={{height: '500px', width: '800px', marginTop: '48px'}}>
        <Virtual columns={['Name', 'Age', 'Address']} data={DATA} />
      </div>
    );
  },

  virtualHorizontalScroll: function VirtualHorizontalStory() {
    return (
      <div style={{height: '500px', width: '800px', marginTop: '48px'}}>
        <Virtual
          columns={['Name', 'Age', 'Address']}
          data={DATA}
          width={2200}
        />
      </div>
    );
  },

  horizontalScroll: function Horizontal() {
    return (
      <div style={{height: '500px', maxWidth: '1200px', marginTop: '48px'}}>
        <Table
          columns={[...new Array(10)].map(() => 'Column Name')}
          data={[...new Array(40)].map(() =>
            [...new Array(10)].map(() => 'Cell Data'),
          )}
          horizontalScrollWidth="2200px"
        />
      </div>
    );
  },
};
