/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {styled} from '../../styles/index.js';
import {Checkbox} from '../../checkbox/index.js';
import {
  Filter,
  StyledTable,
  StyledHead,
  StyledHeadCell,
  StyledBody,
  StyledRow,
  StyledCell,
} from '../index.js';

const FilterCheckbox = props => (
  <Checkbox
    checked={props.checked}
    onChange={props.onChange}
    overrides={{
      Root: {
        style: ({$theme}) => ({
          marginTop: $theme.sizing.scale400,
          marginBottom: $theme.sizing.scale400,
        }),
      },
      Checkmark: {style: {marginLeft: 0}},
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

  FILTER_FUNCTIONS = [...new Array(10)].map((_, i) => row =>
    row[0] % (i + 1) === 0,
  );

  onFilter = index => {
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
      <StyledTable>
        <StyledHead>
          <StyledHeadCell>
            Number
            <Filter
              active={!!this.state.filters.filter(Boolean).length}
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
    );
  }
}

const Container = styled('div', {
  height: '500px',
});

export const name = 'table-filter';

export const component = () => {
  const FILTER_DATA = [...new Array(100)].map((_, i) => [i, 'row title']);
  return (
    <Container>
      <FilterTable data={FILTER_DATA} />
    </Container>
  );
};
