/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {
  StyledTable,
  StyledContent,
  StyledHead,
  StyledHeadCell,
  StyledBody,
  StyledRow,
  StyledCell,
} from './styled-components.js';

import type {TablePropsT} from './types.js';

export default class Table extends React.Component<TablePropsT> {
  static defaultProps = {
    columns: [],
    data: [[]],
    isLoading: false,
  };

  render() {
    return (
      <StyledTable
        role="grid"
        aria-colcount={this.props.columns.length}
        aria-rowcount={this.props.data.length}
      >
        <StyledHead role="row" $width={this.props.horizontalScrollWidth}>
          {this.props.columns.map((column, index) => (
            <StyledHeadCell role="columnheader" key={index}>
              {column}
            </StyledHeadCell>
          ))}
        </StyledHead>
        <StyledContent $width={this.props.horizontalScrollWidth}>
          <StyledBody role="rowgroup">
            {this.props.data.map((row, index) => (
              <StyledRow key={index} role="row">
                {row.map((cell, cellIndex) => (
                  <StyledCell key={cellIndex} role="gridcell">
                    {cell}
                  </StyledCell>
                ))}
              </StyledRow>
            ))}
          </StyledBody>
        </StyledContent>
      </StyledTable>
    );
  }
}
