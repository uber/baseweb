import React from 'react';

import {styled} from 'baseui';
import {Block} from 'baseui/block';
import ArrowUp from 'baseui/icon/arrow-up';
import ArrowDown from 'baseui/icon/arrow-down';
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

const StyledHeadingCell = styled(StyledCell, {paddingTop: 0, paddingBottom: 0});

const StyledDeltaCell = styled(StyledCell, props => ({
  ...props.$theme.typography.font500,
  alignItems: 'center',
  backgroundColor: props.$isNegative
    ? props.$theme.colors.negative50
    : props.$theme.colors.positive50,
  color: props.$isNegative
    ? props.$theme.colors.negative
    : props.$theme.colors.positive,
}));

const DATA = [
  ['Marlyn', 10, 'Engineering', 'San Francisco', -100],
  ['Luther', 15, 'Marketing', 'Seattle', 50],
  ['Kiera', 13, 'Operations', 'Los Angeles', 40],
  ['Edna', 20, 'Design', 'Atlanta', 700],
  ['Soraya', 18, 'Finance', 'Denver', 99],
  ['Dorris', 32, 'Legal', 'Dallas', -20],
  ['Astrid', 26, 'Product', 'Tempe', 0],
  ['Wendie', 17, 'Engineering', 'Pittsburgh', -15],
  ['Marna', 11, 'Marketing', 'Indianapolis', -2],
  ['Malka', 14, 'Operations', 'New Orleans', 30],
  ['Jospeh', 10, 'Design', 'New York City', -22],
  ['Roselee', 12, 'Finance', 'Oakland', 4],
  ['Justine', 35, 'Legal', 'Louisville', -9],
  ['Marlon', 30, 'Engineering', 'Baltimore', -2],
  ['Mellissa', 32, 'Marketing', 'Boulder', -30],
  ['Fausto', 21, 'Operations', 'Chicago', -10],
  ['Alfredia', 22, 'Design', 'Grand Rapids', 70],
  ['Abel', 18, 'Finance', 'Nashville', 30],
  ['Winford', 19, 'Legal', 'Sacramento', 10],
  ['Neil', 27, 'Product', 'Columbus', -5],
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
        <StyledHeadCell>Delta</StyledHeadCell>
        <StyledHeadCell>Actions</StyledHeadCell>
      </StyledHead>
      <StyledBody>
        {DATA.map((row, index) => (
          <StyledRow key={index}>
            <StyledCell>{row[0]}</StyledCell>
            <StyledCell>{row[1]}</StyledCell>

            <StyledHeadingCell>
              <Block>
                <Block font="font200" color="mono600">
                  {row[3]}
                </Block>
                <Block font="font300">{row[2]}</Block>
              </Block>
            </StyledHeadingCell>

            <StyledDeltaCell $isNegative={row[4] < 0}>
              <>
                {row[4] < 0 ? <ArrowDown size={24} /> : <ArrowUp size={24} />}
                {row[4]}%
              </>
            </StyledDeltaCell>

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
