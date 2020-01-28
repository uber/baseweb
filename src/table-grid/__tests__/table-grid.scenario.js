/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {useStyletron} from '../../styles/index.js';

import {StyledTable, StyledHeadCell, StyledBodyCell} from '../index.js';

export const name = 'table-grid';

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

export function component() {
  const [css] = useStyletron();
  return (
    <div className={css({height: '750px', width: '900px'})}>
      <StyledTable $gridTemplateColumns="minmax(400px, max-content) 200px 200px 200px 200px 200px">
        <StyledHeadCell>Column 1</StyledHeadCell>
        <StyledHeadCell>Column 2</StyledHeadCell>
        <StyledHeadCell>Column 3</StyledHeadCell>
        <StyledHeadCell>Column 4</StyledHeadCell>
        <StyledHeadCell>Column 5</StyledHeadCell>
        <StyledHeadCell>Column 6</StyledHeadCell>
        {data.map(row => {
          return (
            <>
              <StyledBodyCell>{row[0]}</StyledBodyCell>
              <StyledBodyCell>{row[1]}</StyledBodyCell>
              <StyledBodyCell>{row[2]}</StyledBodyCell>
              <StyledBodyCell>{row[3]}</StyledBodyCell>
              <StyledBodyCell>{row[4]}</StyledBodyCell>
              <StyledBodyCell>{row[5]}</StyledBodyCell>
            </>
          );
        })}
      </StyledTable>
    </div>
  );
}
