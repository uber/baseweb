/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {
  Root as StyledRoot,
  Head as StyledHead,
  HeadCell as StyledHeadCell,
  Body as StyledBody,
  Row as StyledRow,
  Cell as StyledCell,
  Loading as StyledLoading,
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
      <StyledRoot>
        <StyledHead>
          {this.props.columns.map(column => (
            <StyledHeadCell>{column}</StyledHeadCell>
          ))}
        </StyledHead>

        <StyledBody>
          {this.props.data.map(row => (
            <StyledRow>
              {row.map(cell => (
                <StyledCell>{cell}</StyledCell>
              ))}
            </StyledRow>
          ))}
        </StyledBody>
      </StyledRoot>
    );
  }
}
