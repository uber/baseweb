/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {withStyle} from 'styletron-react';

import {
  StyledTable,
  StyledHead,
  StyledBody,
  StyledRow,
  StyledCell,
  StyledHeadCell,
} from '../index.js';

const BorderlessTable = withStyle(StyledTable, {
  border: 0,
});

export const name = 'table-borderless';

const DATA = [
  ['Marlyn', 10],
  ['Luther', 15],
  ['Kiera', 13],
  ['Edna', 20],
  ['Soraya', 18],
  ['Dorris', 32],
  ['Astrid', 26],
  ['Wendie', 17],
  ['Marna', 11],
  ['Malka', 14],
  ['Jospeh', 10],
  ['Roselee', 12],
  ['Justine', 35],
  ['Marlon', 30],
  ['Mellissa', 32],
  ['Fausto', 21],
  ['Alfredia', 22],
  ['Abel', 18],
  ['Winford', 19],
  ['Neil', 27],
];

// eslint-disable-next-line flowtype/no-weak-types
class SortableTable extends React.Component<any, any> {
  render() {
    return (
      <div style={{height: '500px', width: '400px'}}>
        <BorderlessTable>
          <StyledHead>
            <StyledHeadCell>Name</StyledHeadCell>
            <StyledHeadCell>Age</StyledHeadCell>
          </StyledHead>
          <StyledBody>
            {DATA.map((row, index) => (
              <StyledRow key={index}>
                {row.map((cell, cellIndex) => (
                  <StyledCell key={cellIndex}>{cell}</StyledCell>
                ))}
              </StyledRow>
            ))}
          </StyledBody>
        </BorderlessTable>
      </div>
    );
  }
}

export const component = () => <SortableTable />;
