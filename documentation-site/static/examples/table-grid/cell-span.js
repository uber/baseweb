import React from 'react';
import {format} from 'date-fns';

import {StyledLink} from 'baseui/link';
import {useStyletron} from 'baseui/styles';

import {
  Unstable_StyledTable as StyledTable,
  Unstable_StyledHeadCell as StyledHeadCell,
  Unstable_StyledBodyCell as StyledBodyCell,
} from 'baseui/table-grid';

const row = [
  'feat(docs-site): theme editor POC',
  'https://github.com/uber-web/baseui/pull/1296',
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

const data = [row, row, row];

export default function() {
  const [css] = useStyletron();
  return (
    <div className={css({height: '600px', width: '900px'})}>
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
