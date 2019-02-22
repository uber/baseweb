import React from 'react';

import {styled} from 'baseui';
import {Block} from 'baseui/block';
import Search from 'baseui/icon/search';
import Plus from 'baseui/icon/plus';
import Delete from 'baseui/icon/delete';
import Overflow from 'baseui/icon/overflow';
import {
  StyledTable,
  StyledHead,
  StyledHeadCell,
  StyledBody,
  StyledRow,
  StyledCell,
  StyledAction,
} from 'baseui/table';

const DATA = [
  ['Marlyn', 10, 'Engineering', 'San Francisco'],
  ['Luther', 15, 'Marketing', 'Seattle'],
  ['Kiera', 13, 'Operations', 'Los Angeles'],
  ['Edna', 20, 'Design', 'Atlanta'],
  ['Soraya', 18, 'Finance', 'Denver'],
  ['Dorris', 32, 'Legal', 'Dallas'],
  ['Astrid', 26, 'Product', 'Tempe'],
  ['Wendie', 17, 'Engineering', 'Pittsburgh'],
  ['Marna', 11, 'Marketing', 'Indianapolis'],
  ['Malka', 14, 'Operations', 'New Orleans'],
  ['Jospeh', 10, 'Design', 'New York City'],
  ['Roselee', 12, 'Finance', 'Oakland'],
  ['Justine', 35, 'Legal', 'Louisville'],
  ['Marlon', 30, 'Engineering', 'Baltimore'],
  ['Mellissa', 32, 'Marketing', 'Boulder'],
  ['Fausto', 21, 'Operations', 'Chicago'],
  ['Alfredia', 22, 'Design', 'Grand Rapids'],
  ['Abel', 18, 'Finance', 'Nashville'],
  ['Winford', 19, 'Legal', 'Sacramento'],
  ['Neil', 27, 'Product', 'Columbus'],
];

const Container = styled('div', {
  height: '400px',
});

export default () => (
  <Container>
    <StyledTable>
      <StyledHead>
        <StyledHeadCell>Name</StyledHeadCell>
        <StyledHeadCell>Age</StyledHeadCell>
        <StyledHeadCell>Role</StyledHeadCell>
        <StyledHeadCell>Actions</StyledHeadCell>
      </StyledHead>
      <StyledBody>
        {DATA.map((row, index) => (
          <StyledRow key={index}>
            <StyledCell>{row[0]}</StyledCell>
            <StyledCell>{row[1]}</StyledCell>

            <StyledCell>
              <Block>
                <Block font="font200" color="mono600">
                  {row[3]}
                </Block>
                <Block font="font300">{row[2]}</Block>
              </Block>
            </StyledCell>

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
  </Container>
);
