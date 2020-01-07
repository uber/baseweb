/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {
  StyledTable,
  StyledHead,
  StyledHeadCell,
  StyledBody,
  StyledRow,
  StyledCell,
} from './styled-components.js';

import {ProgressBar} from '../progress-bar/index.js';
import {styled} from '../styles/index.js';

import type {TablePropsT} from './types.js';

const EmptyWrapper = styled('div', props => {
  const {$theme} = props;
  return {
    ...$theme.typography.font100,
    marginTop: $theme.sizing.scale600,
    marginBottom: $theme.sizing.scale600,
    textAlign: 'center',
  };
});

export default class Table extends React.Component<TablePropsT> {
  static defaultProps = {
    columns: [],
    data: [[]],
    isLoading: false,
  };

  render() {
    const {isLoading, columns, data, horizontalScrollWidth} = this.props;
    return (
      <StyledTable
        data-baseweb="table"
        aria-colcount={columns.length}
        aria-rowcount={data.length}
      >
        {isLoading && (
          <ProgressBar
            infinite
            overrides={{
              Bar: {
                style: {
                  marginBottom: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  marginTop: 0,
                },
              },
            }}
          />
        )}
        <StyledHead $width={horizontalScrollWidth}>
          {columns.map((column, index) => (
            <StyledHeadCell key={index}>{column}</StyledHeadCell>
          ))}
        </StyledHead>
        <StyledBody $width={horizontalScrollWidth}>
          {data.length > 0 ? (
            data.map((row, index) => (
              <StyledRow key={index}>
                {row.map((cell, cellIndex) => (
                  <StyledCell key={cellIndex}>{cell}</StyledCell>
                ))}
              </StyledRow>
            ))
          ) : (
            <EmptyWrapper>{isLoading ? 'Loading...' : 'No data'}</EmptyWrapper>
          )}
        </StyledBody>
      </StyledTable>
    );
  }
}
