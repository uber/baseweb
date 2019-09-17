// @flow
import React from 'react';
import {withStyle, useStyletron} from 'baseui';
import {
  StyledTable,
  StyledHead,
  StyledHeadCell,
  StyledBody,
  StyledRow,
  StyledCell,
} from 'baseui/table';

const DATA = [
  [
    1,
    'Sarah',
    'Brown',
    31,
    '100 Broadway st. New York City, New York',
  ],
  [
    2,
    'Jane',
    'Smith',
    32,
    '100 Market st. San Francisco, California',
  ],
  [3, 'Joe', 'Black', 33, '100 Macquarie st. Sydney, Australia'],
  [
    1,
    'Sarah',
    'Brown',
    31,
    '100 Broadway st. New York City, New York',
  ],
  [
    2,
    'Jane',
    'Smith',
    32,
    '100 Market st. San Francisco, California',
  ],
  [3, 'Joe', 'Black', 33, '100 Macquarie st. Sydney, Australia'],
  [
    1,
    'Sarah',
    'Brown',
    31,
    '100 Broadway st. New York City, New York',
  ],
  [
    2,
    'Jane',
    'Smith',
    32,
    '100 Market st. San Francisco, California',
  ],
  [3, 'Joe', 'Black', 33, '100 Macquarie st. Sydney, Australia'],
  [
    1,
    'Sarah',
    'Brown',
    31,
    '100 Broadway st. New York City, New York',
  ],
  [
    2,
    'Jane',
    'Smith',
    32,
    '100 Market st. San Francisco, California',
  ],
  [3, 'Joe', 'Black', 33, '100 Macquarie st. Sydney, Australia'],
];

const COLUMNS = ['Id', 'First Name', 'Last Name', 'Age', 'Address'];

const SmallerHeadCell = withStyle(StyledHeadCell, {
  maxWidth: '30px',
});

const SmallerCell = withStyle(StyledCell, {
  maxWidth: '30px',
});

export default () => {
  const [css] = useStyletron();
  return (
    <div className={css({height: '400px'})}>
      <StyledTable>
        <StyledHead>
          <SmallerHeadCell>ID</SmallerHeadCell>
          {COLUMNS.slice(1).map((col, index) => (
            <StyledHeadCell key={index}>{col}</StyledHeadCell>
          ))}
        </StyledHead>

        <StyledBody>
          {DATA.map((row, index) => (
            <StyledRow key={index}>
              <SmallerCell>{row[0]}</SmallerCell>
              {row.slice(1).map((cell, cellIndex) => (
                <StyledCell key={cellIndex}>{cell}</StyledCell>
              ))}
            </StyledRow>
          ))}
        </StyledBody>
      </StyledTable>
    </div>
  );
};
