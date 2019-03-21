import React, {useState} from 'react';
import {styled, createTheme, lightThemePrimitives, ThemeProvider} from 'baseui';
import {Navigation, StyledNavLink, StyledNavItem} from 'baseui/side-navigation';
import {Label2} from 'baseui/typography';

const heading = {
  Label2,
};

const nav = [
  {
    title: 'Colors',
    heading: 'Label2',
    subnav: [
      {
        title: 'Primary',
        itemId: '#level1.1.1',
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
    heading: 'Label2',
  },
  {
    title: 'Typography',
    itemId: '#level1.3',
    heading: 'Label2',
  },
];

const customTheme = createTheme(
  {
    ...lightThemePrimitives,
    primary400: '#3e9920',
  },
  {},
);

const renderItem = function(item, itemProps) {
  const {onSelect, onClick, onKeyDown, ...rest} = itemProps;
  const Heading = heading[item.heading];
  const renderedItem = (
    <StyledNavLink
      href={item.itemId}
      onClick={item.itemId ? onClick : null}
      onKeyDown={item.itemId ? onKeyDown : null}
      {...rest}
    >
      <StyledNavItem {...rest}>
        {item.title}
        {item.itemId ? ` (${item.itemId})` : ''}
      </StyledNavItem>
    </StyledNavLink>
  );
  return Heading ? (
    <Heading overrides={{Block: {style: {textTransform: 'uppercase'}}}}>
      {renderedItem}
    </Heading>
  ) : (
    renderedItem
  );
};

export default function() {
  const [location, setLocation] = useState('#level1.1.1');
  return (
    <ThemeProvider theme={customTheme}>
      <Navigation
        items={nav}
        activeItemId={location}
        onChange={({item}) => setLocation(item.itemId)}
        renderItem={renderItem}
      />
    </ThemeProvider>
  );
}
