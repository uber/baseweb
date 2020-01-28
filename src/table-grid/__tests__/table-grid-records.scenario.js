/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {format} from 'date-fns';

import {StyledLink} from '../../link/index.js';
import {useStyletron} from '../../styles/index.js';

import {StyledTable, StyledHeadCell, StyledBodyCell} from '../index.js';

export const name = 'table-grid-records';

// [date, event description]
type EventT = [Date, string];

// [pr title, pr link, description, release kind, author]
type RowT = [string, string, string, string, string, EventT[]];

const row = [
  'feat(docs-site): theme editor POC',
  'https://github.com/uber/baseweb/pull/1296',
  `integrates an inline theme editor for the base web documentation site user can edit a theme
    and see update applied to site globally user can copy to clipboard, import and export theme`,
  'feature',
  'jh3y',
  [
    [new Date(2019, 6, 22), 'jh3y added a commit'],
    [new Date(2019, 6, 22), 'chasestarr left a comment'],
    [new Date(2019, 6, 22), 'jh3y left a comment'],
    [new Date(2019, 6, 22), 'chasestarr left a comment'],
    [new Date(2019, 6, 22), 'chasestarr left a comment'],
    [new Date(2019, 6, 22), 'jh3y added a commit'],
    [new Date(2019, 6, 22), 'jh3y added a commit'],
    [new Date(2019, 6, 22), 'jh3y marked this pull request as ready'],
  ],
];

const data: RowT[] = [row, row, row, row, row, row, row];

export function component() {
  const [css] = useStyletron();
  return (
    <div className={css({height: '600px'})}>
      <StyledTable $gridTemplateColumns="auto minmax(auto, 500px) repeat(4, auto)">
        <StyledHeadCell>Name</StyledHeadCell>
        <StyledHeadCell>Summary</StyledHeadCell>
        <StyledHeadCell>Release Type</StyledHeadCell>
        <StyledHeadCell>Author</StyledHeadCell>
        <StyledHeadCell>Date</StyledHeadCell>
        <StyledHeadCell>Event</StyledHeadCell>
        {data.map(row => {
          return (
            <>
              <StyledBodyCell $gridRow={`span ${row[5].length}`}>
                <StyledLink href={row[1]}>{row[0]}</StyledLink>
              </StyledBodyCell>
              <StyledBodyCell $gridRow={`span ${row[5].length}`}>
                {row[2]}
              </StyledBodyCell>
              <StyledBodyCell $gridRow={`span ${row[5].length}`}>
                {row[3]}
              </StyledBodyCell>
              <StyledBodyCell $gridRow={`span ${row[5].length}`}>
                {row[4]}
              </StyledBodyCell>
              {row[5].map((event, index) => {
                const striped = index % 2 === 0;
                return (
                  <>
                    <StyledBodyCell $striped={striped}>
                      {format(event[0], 'yyyy-MM-dd h:mm a')}
                    </StyledBodyCell>
                    <StyledBodyCell $striped={striped}>
                      {event[1]}
                    </StyledBodyCell>
                  </>
                );
              })}
            </>
          );
        })}
      </StyledTable>
    </div>
  );
}
