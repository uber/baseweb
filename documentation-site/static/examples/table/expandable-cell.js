import React from 'react';

import {styled} from 'baseui';
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
import {StatefulPanel} from 'baseui/accordion';

const DATA = [
  [
    'Marlyn',
    10,
    {title: 'New York', data: '100 Broadway st. New York City, New York'},
  ],
  [
    'Luther',
    15,
    {title: 'New York', data: '100 Broadway st. New York City, New York'},
  ],
  [
    'Kiera',
    13,
    {title: 'New York', data: '100 Broadway st. New York City, New York'},
  ],
  [
    'Edna',
    20,
    {title: 'New York', data: '100 Broadway st. New York City, New York'},
  ],
  [
    'Soraya',
    18,
    {title: 'New York', data: '100 Broadway st. New York City, New York'},
  ],
  [
    'Dorris',
    32,
    {title: 'New York', data: '100 Broadway st. New York City, New York'},
  ],
  [
    'Astrid',
    26,
    {title: 'New York', data: '100 Broadway st. New York City, New York'},
  ],
  [
    'Wendie',
    17,
    {title: 'New York', data: '100 Broadway st. New York City, New York'},
  ],
  [
    'Marna',
    11,
    {title: 'New York', data: '100 Broadway st. New York City, New York'},
  ],
  [
    'Malka',
    14,
    {title: 'New York', data: '100 Broadway st. New York City, New York'},
  ],
  [
    'Jospeh',
    10,
    {title: 'New York', data: '100 Broadway st. New York City, New York'},
  ],
  [
    'Roselee',
    12,
    {title: 'New York', data: '100 Broadway st. New York City, New York'},
  ],
  [
    'Justine',
    35,
    {title: 'New York', data: '100 Broadway st. New York City, New York'},
  ],
  [
    'Marlon',
    30,
    {title: 'New York', data: '100 Broadway st. New York City, New York'},
  ],
  [
    'Mellissa',
    32,
    {title: 'New York', data: '100 Broadway st. New York City, New York'},
  ],
  [
    'Fausto',
    21,
    {title: 'New York', data: '100 Broadway st. New York City, New York'},
  ],
  [
    'Alfredia',
    22,
    {title: 'New York', data: '100 Broadway st. New York City, New York'},
  ],
  [
    'Abel',
    18,
    {title: 'New York', data: '100 Broadway st. New York City, New York'},
  ],
  [
    'Winford',
    19,
    {title: 'New York', data: '100 Broadway st. New York City, New York'},
  ],
  [
    'Neil',
    27,
    {title: 'New York', data: '100 Broadway st. New York City, New York'},
  ],
];

const Container = styled('div', {
  height: '400px',
});

const ExpandableCellHead = styled(StyledHeadCell, {
  paddingTop: '0',
  paddingBottom: '0',
  paddingLeft: '0',
  paddingRight: '0',
});

const ExpandableCell = styled(StyledCell, {
  paddingTop: '0',
  paddingBottom: '0',
  paddingLeft: '0',
  paddingRight: '0',
});

const overrides = {
  Header: {
    style: ({$theme: {colors, sizing, typography}, $expanded}) => ({
      ...typography.font300,
      borderBottom: $expanded
        ? `1px solid ${colors.mono500}`
        : '1px solid transparent',
      paddingTop: sizing.scale300,
      paddingBottom: sizing.scale300,
      paddingLeft: sizing.scale1000,
      paddingRight: sizing.scale600,
      ':hover': {
        color: colors.foreground,
      },
    }),
  },
  Content: {
    style: ({$theme: {colors, sizing}, $expanded}) => ({
      backgroundColor: colors.mono200,
      color: colors.mono800,
      paddingTop: $expanded ? sizing.scale300 : 0,
      paddingBottom: $expanded ? sizing.scale600 : 0,
      paddingLeft: sizing.scale1000,
      paddingRight: sizing.scale600,
    }),
  },
  ToggleIcon: {
    style: ({$theme: {colors}}) => ({
      color: colors.mono600,
      position: 'absolute',
      left: '12px',
    }),
  },
};

export default () => (
  <Container>
    <StyledTable>
      <StyledHead>
        <StyledHeadCell>Name</StyledHeadCell>
        <StyledHeadCell>Age</StyledHeadCell>
        <ExpandableCellHead>
          <StyledHeadCell>Data</StyledHeadCell>
        </ExpandableCellHead>
      </StyledHead>
      <StyledBody>
        {DATA.map((row, index) => (
          <StyledRow key={index}>
            {row.map((cell, cellIndex) => {
              if (typeof cell === 'object') {
                return (
                  <ExpandableCell key={cellIndex}>
                    <StatefulPanel title={cell.title} overrides={overrides}>
                      {cell.data}
                    </StatefulPanel>
                  </ExpandableCell>
                );
              } else {
                return <StyledCell key={cellIndex}>{cell}</StyledCell>;
              }
            })}
          </StyledRow>
        ))}
      </StyledBody>
    </StyledTable>
  </Container>
);
