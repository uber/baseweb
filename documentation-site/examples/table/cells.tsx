import React from 'react';
import {withStyle, useStyletron} from 'baseui';

import {Block} from 'baseui/block';
import {
  ArrowUp,
  ArrowDown,
  Search,
  Plus,
  Delete,
  Overflow,
} from 'baseui/icon';
import {
  StyledTable,
  StyledHead,
  StyledHeadCell,
  StyledBody,
  StyledRow,
  StyledCell,
  StyledAction,
} from 'baseui/table';
import {Caption1, Caption2, Paragraph3} from 'baseui/typography';
import {Theme} from 'baseui/theme';

const StyledHeadingCell = withStyle(StyledCell, {
  paddingTop: 0,
  paddingBottom: 0,
});

const StyledDeltaCell = withStyle<
  typeof StyledCell,
  {$isNegative: boolean},
  Theme & {customThemeProp: string}
>(StyledCell, ({$isNegative, $theme}) => ({
  ...$theme.typography.font550,
  alignItems: 'center',
  backgroundColor: $isNegative
    ? $theme.colors.negative50
    : $theme.colors.positive50,
  color: $isNegative
    ? $theme.colors.negative
    : $theme.colors.positive,
}));

const StyledLargeText = withStyle(StyledCell, {
  alignItems: 'center',
});

const DATA = [
  [
    'Marlyn',
    'Engineering',
    'San Francisco',
    -100,
    1234.5,
    {
      title: 'New York',
      data: '100 Broadway st. New York City, New York',
    },
  ],
  [
    'Luther',
    'Marketing',
    'Seattle',
    50,
    2435.2,
    {
      title: 'California',
      data: '100 Market st. San Francisco, California',
    },
  ],
  [
    'Kiera',
    'Operations',
    'Los Angeles',
    40,
    8348.1,
    {
      title: 'Australia',
      data: '100 Macquarie st. Sydney, Australia',
    },
  ],
  [
    'Edna',
    'Design',
    'Atlanta',
    700,
    2893.4,
    {
      title: 'New York',
      data: '100 Broadway st. New York City, New York',
    },
  ],
  [
    'Soraya',
    'Finance',
    'Denver',
    99,
    8787.3,
    {
      title: 'California',
      data: '100 Market st. San Francisco, California',
    },
  ],
  [
    'Dorris',
    'Legal',
    'Dallas',
    -20,
    6325.2,
    {
      title: 'Australia',
      data: '100 Macquarie st. Sydney, Australia',
    },
  ],
  [
    'Astrid',
    'Product',
    'Tempe',
    0,
    7392.7,
    {
      title: 'New York',
      data: '100 Broadway st. New York City, New York',
    },
  ],
  [
    'Wendie',
    'Engineering',
    'Pittsburgh',
    -15,
    9283.1,
    {
      title: 'California',
      data: '100 Market st. San Francisco, California',
    },
  ],
  [
    'Marna',
    'Marketing',
    'Indianapolis',
    -2,
    7720.9,
    {
      title: 'Australia',
      data: '100 Macquarie st. Sydney, Australia',
    },
  ],
  [
    'Malka',
    'Operations',
    'New Orleans',
    30,
    6273.3,
    {
      title: 'New York',
      data: '100 Broadway st. New York City, New York',
    },
  ],
  [
    'Jospeh',
    'Design',
    'New York City',
    -22,
    8837.4,
    {
      title: 'California',
      data: '100 Market st. San Francisco, California',
    },
  ],
  [
    'Roselee',
    'Finance',
    'Oakland',
    4,
    9277.9,
    {
      title: 'Australia',
      data: '100 Macquarie st. Sydney, Australia',
    },
  ],
  [
    'Justine',
    'Legal',
    'Louisville',
    -9,
    7737.2,
    {
      title: 'New York',
      data: '100 Broadway st. New York City, New York',
    },
  ],
  [
    'Marlon',
    'Engineering',
    'Baltimore',
    -2,
    2330.3,
    {
      title: 'California',
      data: '100 Market st. San Francisco, California',
    },
  ],
  [
    'Mellissa',
    'Marketing',
    'Boulder',
    -30,
    4458.8,
    {
      title: 'Australia',
      data: '100 Macquarie st. Sydney, Australia',
    },
  ],
  [
    'Fausto',
    'Operations',
    'Chicago',
    -10,
    6363.9,
    {
      title: 'New York',
      data: '100 Broadway st. New York City, New York',
    },
  ],
  [
    'Alfredia',
    'Design',
    'Grand Rapids',
    70,
    2235.2,
    {
      title: 'California',
      data: '100 Market st. San Francisco, California',
    },
  ],
  [
    'Abel',
    'Finance',
    'Nashville',
    30,
    9882.3,
    {
      title: 'Australia',
      data: '100 Macquarie st. Sydney, Australia',
    },
  ],
  [
    'Winford',
    'Legal',
    'Sacramento',
    10,
    8774.7,
    {
      title: 'New York',
      data: '100 Broadway st. New York City, New York',
    },
  ],
  [
    'Neil',
    'Product',
    'Columbus',
    -5,
    2673.2,
    {
      title: 'California',
      data: '100 Market st. San Francisco, California',
    },
  ],
];

export default () => {
  const [css] = useStyletron();
  return (
    <div className={css({height: '400px'})}>
      <StyledTable>
        <StyledHead $width="1000px">
          <StyledHeadCell>Name</StyledHeadCell>
          <StyledHeadCell>Role</StyledHeadCell>
          <StyledHeadCell>Delta</StyledHeadCell>
          <StyledHeadCell>Amount</StyledHeadCell>
          <StyledHeadCell>Actions</StyledHeadCell>
        </StyledHead>
        <StyledBody $width="1000px">
          {DATA.map((row, index) => (
            <StyledRow key={index}>
              <StyledCell>{row[0]}</StyledCell>

              <StyledHeadingCell>
                <Block>
                  <Caption1>{row[2]}</Caption1>
                  <Paragraph3 as="div">{row[1]}</Paragraph3>
                </Block>
              </StyledHeadingCell>

              <StyledDeltaCell $isNegative={row[3] < 0}>
                <React.Fragment>
                  {row[3] < 0 ? (
                    <ArrowDown size={24} />
                  ) : (
                    <ArrowUp size={24} />
                  )}
                  {row[3]}%
                </React.Fragment>
              </StyledDeltaCell>

              <StyledLargeText>
                <Block font="font550">{row[4]}</Block>
                <Caption2 paddingLeft="scale200">+1000%</Caption2>
              </StyledLargeText>

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
    </div>
  );
};
