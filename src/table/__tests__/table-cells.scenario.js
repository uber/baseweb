/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {Block} from '../../block/index.js';
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
  ['Marlyn', 10, 'Engineering', 'San Francisco'],
  ['Luther', 15, 'Marketing', 'Seattle'],
  ['Kiera', 13, 'Operations', 'Los Angeles'],
  ['Edna', 20, 'Design', 'Atlanta'],
  ['Soraya', 18, 'Finance', 'Denver'],
  ['Dorris', 32, 'Legal', 'Dallas'],
  ['Astrid', 26, 'Product', 'Tempe'],
  ['Wendie', 17, 'Engineering', 'Pittsburgh'],
  ['Marna', 11, 'Marketing', 'Indianapolis'],
  ['Malka', 14, 'Operations', 'New Orleans'],
  ['Jospeh', 10, 'Design', 'New York City'],
  ['Roselee', 12, 'Finance', 'Oakland'],
  ['Justine', 35, 'Legal', 'Louisville'],
  ['Marlon', 30, 'Engineering', 'Baltimore'],
  ['Mellissa', 32, 'Marketing', 'Boulder'],
  ['Fausto', 21, 'Operations', 'Chicago'],
  ['Alfredia', 22, 'Design', 'Grand Rapids'],
  ['Abel', 18, 'Finance', 'Nashville'],
  ['Winford', 19, 'Legal', 'Sacramento'],
  ['Neil', 27, 'Product', 'Columbus'],
];

export const component = () => (
  <div style={{height: '500px', width: '600px'}}>
    <StyledTable>
      <StyledHead>
        <StyledHeadCell>Name</StyledHeadCell>
        <StyledHeadCell>Age</StyledHeadCell>
        <StyledHeadCell>Role</StyledHeadCell>
        <StyledHeadCell>Actions</StyledHeadCell>
      </StyledHead>
      <StyledBody>
        {DATA.map((row, index) => (
          <StyledRow key={index}>
            <StyledCell>{row[0]}</StyledCell>
            <StyledCell>{row[1]}</StyledCell>

            <StyledCell>
              <Block>
                <Block font="font200" color="mono600">
                  {row[3]}
                </Block>
                <Block font="font300">{row[2]}</Block>
              </Block>
            </StyledCell>

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
