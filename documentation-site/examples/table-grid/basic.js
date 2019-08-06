// @flow
import React from 'react';
import {useStyletron} from 'baseui/styles';
import {
  Unstable_StyledTable as StyledTable,
  Unstable_StyledHeadCell as StyledHeadCell,
  Unstable_StyledBodyCell as StyledBodyCell,
} from 'baseui/table-grid';

const data = Array(100)
  .fill(2)
  .map(() => [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
     labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut`,
    'Cell two',
    'Cell three',
  ]);

export default function() {
  const [useCss] = useStyletron();
  return (
    <div className={useCss({height: '750px'})}>
      <StyledTable $gridTemplateColumns="minmax(400px, max-content) 200px 200px">
        <StyledHeadCell>Column 1</StyledHeadCell>
        <StyledHeadCell>Column 2</StyledHeadCell>
        <StyledHeadCell>Column 3</StyledHeadCell>
        {data.map(row => {
          return (
            <React.Fragment>
              <StyledBodyCell>{row[0]}</StyledBodyCell>
              <StyledBodyCell>{row[1]}</StyledBodyCell>
              <StyledBodyCell>{row[2]}</StyledBodyCell>
            </React.Fragment>
          );
        })}
      </StyledTable>
    </div>
  );
}
