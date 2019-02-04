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

import {styled} from '../styles/index.js';
import {Checkbox} from '../checkbox/index.js';

import {
  Filter,
  Table,

  // styled components
  StyledTable,
  StyledHead,
  StyledHeadCell,
  StyledBody,
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

const FullHeight = styled('div', {height: '100%'});

// eslint-disable-next-line flowtype/no-weak-types
function Virtual(props: any) {
  return (
    <StyledTable>
      <StyledHead $width={props.width + 'px'}>
        {props.columns.map((column, index) => (
          <StyledHeadCell key={index}>{column}</StyledHeadCell>
        ))}
      </StyledHead>

      <FullHeight>
        <AutoSizer>
          {({width, height}) => (
            <List
              height={height}
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
      </FullHeight>
    </StyledTable>
  );
}

// eslint-disable-next-line flowtype/no-weak-types
const FilterCheckbox = (props: any) => (
  <Checkbox
    checked={props.checked}
    onChange={props.onChange}
    overrides={{
      Root: {
        style: ({$theme}) => ({
          alignItems: 'center',
          marginTop: $theme.sizing.scale400,
          marginBottom: $theme.sizing.scale400,
        }),
      },
      Checkmark: {style: {marginLeft: 0}},
      Label: {
        style: ({$theme}) => ({
          ...$theme.typography.font300,
        }),
      },
    }}
  >
    {props.children}
  </Checkbox>
);

// eslint-disable-next-line flowtype/no-weak-types
class FilterTable extends React.Component<any, any> {
  state = {
    filters: [],
  };

  // eslint-disable-next-line flowtype/no-weak-types
  FILTER_FUNCTIONS: Function[] = [...new Array(10)].map((_, i) => (row: any) =>
    row[0] % (i + 1) === 0,
  );

  onFilter = (index: number) => {
    const isActive = !!this.state.filters[index];

    const filters = [...this.state.filters];
    if (isActive) {
      filters[index] = null;
    } else {
      filters[index] = this.FILTER_FUNCTIONS[index];
    }
    this.setState({filters});
  };

  handleReset = () => this.setState({filters: []});
  handleSelectAll = () => this.setState({filters: this.FILTER_FUNCTIONS});

  render() {
    const filteredData = this.state.filters
      .filter(Boolean)
      .reduce((data, filter) => data.filter(filter), this.props.data);

    return (
      <div style={{height: '600px', width: '800px', marginTop: '48px'}}>
        <StyledTable>
          <StyledHead>
            <StyledHeadCell>
              Number
              <Filter
                active={!!this.state.filters.length}
                onReset={this.handleReset}
                onSelectAll={this.handleSelectAll}
              >
                {this.FILTER_FUNCTIONS.map((_, index) => (
                  <FilterCheckbox
                    key={index}
                    checked={!!this.state.filters[index]}
                    onChange={() => this.onFilter(index)}
                  >
                    {`Divisible by ${index + 1}`}
                  </FilterCheckbox>
                ))}
              </Filter>
            </StyledHeadCell>
            <StyledHeadCell>Title</StyledHeadCell>
          </StyledHead>

          <StyledBody>
            {filteredData.map((row, index) => (
              <StyledRow key={index}>
                {row.map((cell, cellIndex) => (
                  <StyledCell key={cellIndex}>{cell}</StyledCell>
                ))}
              </StyledRow>
            ))}
          </StyledBody>
        </StyledTable>
      </div>
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

  fewRows: function FewRows() {
    return (
      <div style={{height: '400px', width: '800px', marginTop: '48px'}}>
        <Table columns={['Name', 'Age', 'Address']} data={DATA.slice(0, 4)} />
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

  filter: function FilterStory() {
    const FILTER_DATA = [...new Array(100)].map((_, i) => [i, 'row title']);
    return <FilterTable data={FILTER_DATA} />;
  },
};
