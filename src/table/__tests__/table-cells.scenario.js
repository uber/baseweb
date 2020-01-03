/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {Block} from '../../block/index.js';
import ArrowDown from '../../icon/arrow-down.js';
import ArrowUp from '../../icon/arrow-up.js';
import Search from '../../icon/search.js';
import Plus from '../../icon/plus.js';
import Delete from '../../icon/delete.js';
import Overflow from '../../icon/overflow.js';
import {StatefulPanel} from '../../accordion/index.js';
import {withStyle} from '../../styles/index.js';

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

const StyledHeadingCell = withStyle(StyledCell, {
  paddingTop: 0,
  paddingBottom: 0,
});

// eslint-disable-next-line flowtype/no-weak-types
const StyledDeltaCell = withStyle<typeof StyledCell, any>(
  StyledCell,
  props => ({
    ...props.$theme.typography.font500,
    alignItems: 'center',
    backgroundColor: props.$isNegative
      ? props.$theme.colors.negative50
      : props.$theme.colors.positive50,
    color: props.$isNegative
      ? props.$theme.colors.negative
      : props.$theme.colors.positive,
  }),
);

const StyledLargeText = withStyle(StyledCell, {
  alignItems: 'center',
});

const ExpandableCellHead = withStyle(StyledHeadCell, {
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0,
  minWidth: '180px',
  maxWidth: '180px',
});

const ExpandableCell = withStyle(StyledCell, {
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0,
  minWidth: '180px',
  maxWidth: '180px',
});

const panelOverrides = {
  Header: {
    style: ({$theme: {colors, sizing, typography}, $expanded}) => ({
      ...typography.font300,
      color: 'inherit',
      borderBottom: $expanded
        ? `1px solid ${colors.mono500}`
        : '1px solid transparent',
      paddingTop: sizing.scale300,
      paddingBottom: sizing.scale300,
      paddingLeft: sizing.scale500,
      paddingRight: sizing.scale600,
      outline: 'none',
      flexDirection: 'row-reverse',
      justifyContent: 'flex-end',
      ':hover': {
        color: 'inherit',
      },
    }),
  },
  Content: {
    style: ({$theme: {colors, sizing}, $expanded}) => ({
      backgroundColor: colors.mono200,
      color: colors.mono800,
      paddingTop: $expanded ? sizing.scale300 : 0,
      paddingBottom: $expanded ? sizing.scale600 : 0,
      paddingLeft: sizing.scale1000,
      paddingRight: sizing.scale600,
    }),
  },
  ToggleIcon: {
    style: ({$theme: {colors, sizing}}) => ({
      color: colors.mono600,
      marginRight: sizing.scale500,
    }),
  },
};

const DATA = [
  [
    'Marlyn',
    'Engineering',
    'San Francisco',
    -100,
    1234.5,
    {title: 'New York', data: '100 Broadway st. New York City, New York'},
  ],
  [
    'Luther',
    'Marketing',
    'Seattle',
    50,
    2435.2,
    {title: 'California', data: '100 Market st. San Francisco, California'},
  ],
  [
    'Kiera',
    'Operations',
    'Los Angeles',
    40,
    8348.1,
    {title: 'Australia', data: '100 Macquarie st. Sydney, Australia'},
  ],
  [
    'Edna',
    'Design',
    'Atlanta',
    700,
    2893.4,
    {title: 'New York', data: '100 Broadway st. New York City, New York'},
  ],
  [
    'Soraya',
    'Finance',
    'Denver',
    99,
    8787.3,
    {title: 'California', data: '100 Market st. San Francisco, California'},
  ],
  [
    'Dorris',
    'Legal',
    'Dallas',
    -20,
    6325.2,
    {title: 'Australia', data: '100 Macquarie st. Sydney, Australia'},
  ],
  [
    'Astrid',
    'Product',
    'Tempe',
    0,
    7392.7,
    {title: 'New York', data: '100 Broadway st. New York City, New York'},
  ],
  [
    'Wendie',
    'Engineering',
    'Pittsburgh',
    -15,
    9283.1,
    {title: 'California', data: '100 Market st. San Francisco, California'},
  ],
  [
    'Marna',
    'Marketing',
    'Indianapolis',
    -2,
    7720.9,
    {title: 'Australia', data: '100 Macquarie st. Sydney, Australia'},
  ],
  [
    'Malka',
    'Operations',
    'New Orleans',
    30,
    6273.3,
    {title: 'New York', data: '100 Broadway st. New York City, New York'},
  ],
  [
    'Jospeh',
    'Design',
    'New York City',
    -22,
    8837.4,
    {title: 'California', data: '100 Market st. San Francisco, California'},
  ],
  [
    'Roselee',
    'Finance',
    'Oakland',
    4,
    9277.9,
    {title: 'Australia', data: '100 Macquarie st. Sydney, Australia'},
  ],
  [
    'Justine',
    'Legal',
    'Louisville',
    -9,
    7737.2,
    {title: 'New York', data: '100 Broadway st. New York City, New York'},
  ],
  [
    'Marlon',
    'Engineering',
    'Baltimore',
    -2,
    2330.3,
    {title: 'California', data: '100 Market st. San Francisco, California'},
  ],
  [
    'Mellissa',
    'Marketing',
    'Boulder',
    -30,
    4458.8,
    {title: 'Australia', data: '100 Macquarie st. Sydney, Australia'},
  ],
  [
    'Fausto',
    'Operations',
    'Chicago',
    -10,
    6363.9,
    {title: 'New York', data: '100 Broadway st. New York City, New York'},
  ],
  [
    'Alfredia',
    'Design',
    'Grand Rapids',
    70,
    2235.2,
    {title: 'California', data: '100 Market st. San Francisco, California'},
  ],
  [
    'Abel',
    'Finance',
    'Nashville',
    30,
    9882.3,
    {title: 'Australia', data: '100 Macquarie st. Sydney, Australia'},
  ],
  [
    'Winford',
    'Legal',
    'Sacramento',
    10,
    8774.7,
    {title: 'New York', data: '100 Broadway st. New York City, New York'},
  ],
  [
    'Neil',
    'Product',
    'Columbus',
    -5,
    2673.2,
    {title: 'California', data: '100 Market st. San Francisco, California'},
  ],
];

export const component = () => (
  <div style={{height: '500px', width: '900px'}}>
    <StyledTable>
      <StyledHead>
        <StyledHeadCell>Name</StyledHeadCell>
        <StyledHeadCell>Role</StyledHeadCell>
        <StyledHeadCell>Delta</StyledHeadCell>
        <StyledHeadCell>Amount</StyledHeadCell>
        <ExpandableCellHead>
          <StyledHeadCell>Expandable</StyledHeadCell>
        </ExpandableCellHead>
        <StyledHeadCell>Actions</StyledHeadCell>
      </StyledHead>
      <StyledBody>
        {DATA.map((row, index) => (
          <StyledRow key={index}>
            <StyledCell>{row[0]}</StyledCell>

            <StyledHeadingCell>
              <Block>
                <Block font="font200" color="mono600">
                  {row[2]}
                </Block>
                <Block font="font300">{row[1]}</Block>
              </Block>
            </StyledHeadingCell>

            <StyledDeltaCell $isNegative={row[3] < 0}>
              <>
                {row[3] < 0 ? <ArrowDown size={24} /> : <ArrowUp size={24} />}
                {row[3]}%
              </>
            </StyledDeltaCell>

            <StyledLargeText>
              <Block font="font500">{row[4]}</Block>
              <Block color="mono700" font="font250" paddingLeft="scale200">
                +1000%
              </Block>
            </StyledLargeText>

            <ExpandableCell>
              <StatefulPanel title={row[5].title} overrides={panelOverrides}>
                {row[5].data}
              </StatefulPanel>
            </ExpandableCell>

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
