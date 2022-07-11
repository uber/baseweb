/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';

import { useStyletron } from '../../styles';

import { StyledTable, StyledHeadCell, StyledBodyCell } from '..';

import { useCellNavigation } from './shared';

const data = Array(100)
  .fill(2)
  .map(() => [
    `As we find ourselves caught between unraveling old realities and emerging weird ones, Worlding
     creating art, games, institutions, religions, or life itself: live to world and world to live.`,
    'Cell two',
    'Cell three',
    'Cell four',
    'Cell five',
    'Cell six',
  ]);

export function Scenario() {
  const { getCellProps } = useCellNavigation();
  const [css] = useStyletron();
  return (
    <div className={css({ height: '750px', width: '900px' })}>
      <StyledTable
        tabIndex={0}
        role="grid"
        $gridTemplateColumns="minmax(400px, max-content) 200px 200px 200px 200px 200px"
      >
        <StyledHeadCell {...getCellProps(0, 0)}>Column 1</StyledHeadCell>
        <StyledHeadCell {...getCellProps(1, 0)}>Column 2</StyledHeadCell>
        <StyledHeadCell {...getCellProps(2, 0)}>Column 3</StyledHeadCell>
        <StyledHeadCell {...getCellProps(3, 0)}>Column 4</StyledHeadCell>
        <StyledHeadCell {...getCellProps(4, 0)}>Column 5</StyledHeadCell>
        <StyledHeadCell {...getCellProps(5, 0)}>Column 6</StyledHeadCell>
        {data.map((row, index) => {
          const rowNumber = index + 1;
          return (
            <React.Fragment key={index}>
              <StyledBodyCell {...getCellProps(0, rowNumber)}>{row[0]}</StyledBodyCell>
              <StyledBodyCell {...getCellProps(1, rowNumber)}>{row[1]}</StyledBodyCell>
              <StyledBodyCell {...getCellProps(2, rowNumber)}>{row[2]}</StyledBodyCell>
              <StyledBodyCell {...getCellProps(3, rowNumber)}>{row[3]}</StyledBodyCell>
              <StyledBodyCell {...getCellProps(4, rowNumber)}>{row[4]}</StyledBodyCell>
              <StyledBodyCell {...getCellProps(5, rowNumber)}>{row[5]}</StyledBodyCell>
            </React.Fragment>
          );
        })}
      </StyledTable>
    </div>
  );
}
