// @flow
import React from 'react';
import {format} from 'date-fns';

import {StyledLink} from 'baseui/link';
import {useStyletron} from 'baseui';

import {
  StyledTable,
  StyledHeadCell,
  StyledBodyCell,
} from 'baseui/table-grid';

const row = [
  'feat(docs-site): theme editor POC',
  'https://github.com/uber/baseweb/pull/1296',
  [
    [new Date(2019, 6, 22), 'jh3y added a commit'],
    [new Date(2019, 6, 22), 'chasestarr left a comment'],
    [new Date(2019, 6, 22), 'jh3y left a comment'],
    [new Date(2019, 6, 22), 'chasestarr left a comment'],
    [new Date(2019, 6, 22), 'chasestarr left a comment'],
    [new Date(2019, 6, 22), 'jh3y added a commit'],
    [new Date(2019, 6, 22), 'jh3y added a commit'],
    [
      new Date(2019, 6, 22),
      'jh3y marked this pull request as ready',
    ],
  ],
];

const data = [row, row, row];

export default function() {
  const [css] = useStyletron();
  return (
    <div className={css({height: '600px'})}>
      <StyledTable $gridTemplateColumns="minmax(300px, 500px) repeat(2, max-content)">
        <StyledHeadCell>Name</StyledHeadCell>
        <StyledHeadCell>Date</StyledHeadCell>
        <StyledHeadCell>Event</StyledHeadCell>
        {data.map((row, index) => {
          return (
            <React.Fragment key={index}>
              <StyledBodyCell $gridRow={`span ${row[2].length}`}>
                <StyledLink href={row[1]}>{row[0]}</StyledLink>
              </StyledBodyCell>
              {row[2].map((event, index) => {
                const striped = index % 2 === 0;
                return (
                  <React.Fragment key={index}>
                    <StyledBodyCell $striped={striped}>
                      {format(event[0], 'yyyy-MM-dd h:mm a')}
                    </StyledBodyCell>
                    <StyledBodyCell $striped={striped}>
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
