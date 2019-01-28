/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {
  Table as StyledTable,
  Content as StyledContent,
  Head as StyledHead,
  HeadCell as StyledHeadCell,
  Body as StyledBody,
  Row as StyledRow,
  Cell as StyledCell,
  // Loading as StyledLoading,
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
      <StyledTable>
        <StyledContent $width={this.props.horizontalScrollWidth}>
          <StyledHead>
            {this.props.columns.map((column, index) => (
              <StyledHeadCell key={index}>{column}</StyledHeadCell>
            ))}
          </StyledHead>

          <StyledBody>
            {this.props.data.map((row, index) => (
              <StyledRow key={index}>
                {row.map((cell, cellIndex) => (
                  <StyledCell key={cellIndex}>{cell}</StyledCell>
                ))}
              </StyledRow>
            ))}
          </StyledBody>
        </StyledContent>
      </StyledTable>
    );
  }
}
