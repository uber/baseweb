/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {useStyletron} from '../../styles/index.js';
import {SortableHeadCell} from '../../table/index.js';

import {
  StyledTable,
  StyledHeadCell,
  StyledBodyCell,
  StyledFooterCell,
} from '../index.js';

export const name = 'table-grid';

const data = Array(100)
  .fill(2)
  .map(() => [
    `As we find ourselves caught between unraveling old realities and emerging weird ones, Worlding
     creating art, games, institutions, religions, or life itself: live to world and world to live.`,
    'Cell two',
    'Cell three',
  ]);

export function component() {
  const [css] = useStyletron();
  return (
    <div>
      <div className={css({height: '400px', width: '800px'})}>
        <StyledTable $gridTemplateColumns="auto auto auto">
          <SortableHeadCell
            direction={null}
            title="sort"
            overrides={{HeadCell: StyledHeadCell}}
          />
          <StyledHeadCell>hello</StyledHeadCell>
          <StyledHeadCell>hello</StyledHeadCell>
          {data.map(row => {
            return (
              <>
                <StyledBodyCell>{row[0]}</StyledBodyCell>
                <StyledBodyCell>{row[1]}</StyledBodyCell>
                <StyledBodyCell>{row[2]}</StyledBodyCell>
              </>
            );
          })}
          <StyledFooterCell>Foo</StyledFooterCell>
          <StyledFooterCell>Foo</StyledFooterCell>
          <StyledFooterCell>Foo</StyledFooterCell>
        </StyledTable>
      </div>

      <div
        className={css({height: '400px', width: '800px', marginTop: '50px'})}
      >
        <StyledTable $gridTemplateColumns="200px 200px 200px 200px 200px 200px">
          <StyledHeadCell>hello</StyledHeadCell>
          <StyledHeadCell>hello</StyledHeadCell>
          <StyledHeadCell>hello</StyledHeadCell>
          <StyledHeadCell>hello</StyledHeadCell>
          <StyledHeadCell>hello</StyledHeadCell>
          <StyledHeadCell>hello</StyledHeadCell>
          {data.map(row => {
            return (
              <>
                <StyledBodyCell>{row[0]}</StyledBodyCell>
                <StyledBodyCell>{row[1]}</StyledBodyCell>
                <StyledBodyCell>{row[2]}</StyledBodyCell>
                <StyledBodyCell>{row[2]}</StyledBodyCell>
                <StyledBodyCell>{row[2]}</StyledBodyCell>
                <StyledBodyCell>{row[2]}</StyledBodyCell>
              </>
            );
          })}
          <StyledFooterCell>Foo</StyledFooterCell>
          <StyledFooterCell>Foo</StyledFooterCell>
          <StyledFooterCell>Foo</StyledFooterCell>
          <StyledFooterCell>Foo</StyledFooterCell>
          <StyledFooterCell>Foo</StyledFooterCell>
          <StyledFooterCell>Foo</StyledFooterCell>
        </StyledTable>
      </div>
    </div>
  );
}
