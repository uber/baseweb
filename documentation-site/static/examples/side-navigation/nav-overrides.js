import React, {useState} from 'react';
import {styled, createTheme, lightThemePrimitives, ThemeProvider} from 'baseui';
import {Navigation, StyledNavItem} from 'baseui/side-navigation';

const nav = [
  {
    title: 'Colors',
    subnav: [
      {
        title: 'Primary',
        itemId: '/',
      },
      {
        title: 'Shades',
        itemId: '#level1.1.2',
        subnav: [
          {
            title: 'Dark',
            itemId: '#level1.1.2.1',
          },
          {
            title: 'Light',
            itemId: '#level1.1.2.2',
          },
        ],
      },
    ],
  },
  {
    title: 'Sizing',
    itemId: '#level1.2',
  },
  {
    title: 'Typography',
    itemId: '#level1.3',
  },
];

const customTheme = createTheme(
  {
    ...lightThemePrimitives,
    primary400: '#3e9920',
  },
  {},
);

const StyledLink = styled('a', {
  color: 'inherit',
  textDecoration: 'none',
});

const renderItem = function(item, itemProps) {
  const {onClick, onKeyDown, tabIndex, role, ...rest} = itemProps;
  return (
    <StyledLink href={item.itemId} onClick={onClick} onKeyDown={onKeyDown}>
      <StyledNavItem {...rest}>
        {item.title}
        {item.itemId ? ` (${item.itemId})` : ''}
      </StyledNavItem>
    </StyledLink>
  );
};

export default function() {
  const [activePath, setActivePath] = useState('/');
  return (
    <ThemeProvider theme={customTheme}>
      <Navigation
        items={nav}
        activeItemId={activePath}
        onChange={({item}) => setActivePath(item.itemId)}
        renderItem={renderItem}
      />
    </ThemeProvider>
  );
}
