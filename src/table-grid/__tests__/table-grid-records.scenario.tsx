/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { format } from 'date-fns';

import { StyledLink } from '../../link';
import { useStyletron } from '../../styles';

import { StyledTable, StyledHeadCell, StyledBodyCell } from '..';
import { useCellNavigation } from './shared';

// [date, event description]
type EventT = [Date, string];

// [pr title, pr link, description, release kind, author]
type RowT = [string, string, string, string, string, EventT[]];

const row: RowT = [
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

export function Scenario() {
  const [css] = useStyletron();
  const { getCellProps } = useCellNavigation();
  return (
    <div className={css({ height: '600px' })}>
      <StyledTable
        role="grid"
        tabIndex="0"
        $gridTemplateColumns="auto minmax(auto, 500px) repeat(4, auto)"
      >
        <StyledHeadCell {...getCellProps(0, 0)}>Name</StyledHeadCell>
        <StyledHeadCell {...getCellProps(1, 0)}>Summary</StyledHeadCell>
        <StyledHeadCell {...getCellProps(2, 0)}>Release Type</StyledHeadCell>
        <StyledHeadCell {...getCellProps(3, 0)}>Author</StyledHeadCell>
        <StyledHeadCell {...getCellProps(4, 0)}>Date</StyledHeadCell>
        <StyledHeadCell {...getCellProps(5, 0)}>Event</StyledHeadCell>
        {data.map((row, rowIndex) => {
          const events = row[5];
          const primaryRowIndex = rowIndex * events.length + 1;
          return (
            <React.Fragment key={rowIndex}>
              <StyledBodyCell
                {...getCellProps(0, primaryRowIndex)}
                $gridRow={`span ${row[5].length}`}
              >
                <StyledLink href={row[1]}>{row[0]}</StyledLink>
              </StyledBodyCell>
              <StyledBodyCell
                {...getCellProps(1, primaryRowIndex)}
                $gridRow={`span ${row[5].length}`}
              >
                {row[2]}
              </StyledBodyCell>
              <StyledBodyCell
                {...getCellProps(2, primaryRowIndex)}
                $gridRow={`span ${row[5].length}`}
              >
                {row[3]}
              </StyledBodyCell>
              <StyledBodyCell
                {...getCellProps(3, primaryRowIndex)}
                $gridRow={`span ${row[5].length}`}
              >
                {row[4]}
              </StyledBodyCell>
              {events.map((event, eventIndex) => {
                const striped = eventIndex % 2 === 0;
                return (
                  <React.Fragment key={eventIndex}>
                    <StyledBodyCell
                      {...getCellProps(4, primaryRowIndex + eventIndex)}
                      $striped={striped}
                    >
                      {format(event[0], 'yyyy-MM-dd h:mm a')}
                    </StyledBodyCell>
                    <StyledBodyCell
                      {...getCellProps(5, primaryRowIndex + eventIndex)}
                      $striped={striped}
                    >
                      {event[1]}
                    </StyledBodyCell>
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          );
        })}
      </StyledTable>
    </div>
  );
}
