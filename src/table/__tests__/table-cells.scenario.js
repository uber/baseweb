/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import Search from '../../icon/search.js';
import Plus from '../../icon/plus.js';
import Delete from '../../icon/delete.js';
import Overflow from '../../icon/overflow.js';

import {
  StyledTable,
  StyledHead,
  StyledHeadCell,
  StyledBody,
  StyledRow,
  StyledCell,
  StyledAction,
} from '../index.js';

export const name = 'table-cells';

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

export const component = () => (
  <div style={{height: '500px', width: '400px'}}>
    <StyledTable>
      <StyledHead>
        <StyledHeadCell>Name</StyledHeadCell>
        <StyledHeadCell>Age</StyledHeadCell>
        <StyledHeadCell>Actions</StyledHeadCell>
      </StyledHead>
      <StyledBody>
        {DATA.map((row, index) => (
          <StyledRow key={index}>
            {row.map((cell, cellIndex) => (
              <StyledCell key={cellIndex}>{cell}</StyledCell>
            ))}

            <StyledCell>
              <StyledAction>
                <Search />
              </StyledAction>

              <StyledAction>
                <Plus />
              </StyledAction>

              <StyledAction>
                <Delete />
              </StyledAction>

              <StyledAction>
                <Overflow />
              </StyledAction>
            </StyledCell>
          </StyledRow>
        ))}
      </StyledBody>
    </StyledTable>
  </div>
);
