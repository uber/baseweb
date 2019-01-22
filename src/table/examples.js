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

import {Table} from './index.js';
import {Root, Head, HeadCell, Body, Row, Cell} from './styled-components.js';
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

function Virtual(props) {
  return (
    <Root>
      <Head>
        {props.columns.map(column => (
          <HeadCell>{column}</HeadCell>
        ))}
      </Head>
      <AutoSizer>
        {({width, height}) => (
          <List
            height={height - 60}
            width={width}
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
                <Row key={key} style={style}>
                  {props.data[index].map(cell => (
                    <Cell>{cell}</Cell>
                  ))}
                </Row>
              </CellMeasurer>
            )}
          />
        )}
      </AutoSizer>
    </Root>
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

  virtual: () => (
    <div style={{height: '500px', width: '800px', marginTop: '48px'}}>
      <Virtual columns={['Name', 'Age', 'Address']} data={DATA} />
    </div>
  ),
};
