/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import List from 'react-virtualized/dist/commonjs/List'; // eslint-disable-line import/extensions
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'; // eslint-disable-line import/extensions

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

class Virtual extends React.Component<any> {
  render() {
    return (
      <AutoSizer>
        {({width, height}) => (
          <Root>
            <Head>
              {this.props.columns.map(column => (
                <HeadCell>{column}</HeadCell>
              ))}
            </Head>

            <List
              height={height}
              width={width}
              rowCount={this.props.data.length}
              rowHeight={40}
              rowRenderer={({index, key, style}) => (
                <Row key={key} style={style}>
                  {this.props.data[index].map(cell => (
                    <Cell>{cell}</Cell>
                  ))}
                </Row>
              )}
            />
          </Root>
        )}
      </AutoSizer>
    );
  }
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
