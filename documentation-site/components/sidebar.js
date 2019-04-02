/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import {
  Navigation,
  StyledNavItem as NavItem,
  StyledNavLink,
} from 'baseui/side-navigation';
import {Label2, Label1} from 'baseui/typography';
import {styled} from 'baseui';
import Link from 'next/link';

import Routes from '../routes';

const StyledNavItem = styled(NavItem, ({$theme}) => ({
  paddingTop: $theme.sizing.scale200,
  paddingBottom: $theme.sizing.scale200,
}));

const removeSlash = path => {
  if (path) {
    return path.replace(/\/$/, '');
  }
  return path;
};

function renderItem(item, itemProps) {
  const {onSelect, onClick, onKeyDown, ...sharedProps} = itemProps;
  const Label = itemProps.$level === 1 ? Label2 : Label1;

  const NavLink = ({item}) => (
    <Link passHref={true} href={item.itemId} prefetch>
      <StyledNavLink tabIndex="0" {...sharedProps}>
        <StyledNavItem {...sharedProps}>{item.title}</StyledNavItem>
      </StyledNavLink>
    </Link>
  );

  if (item.itemId && itemProps.$level === 1)
    return (
      <Label overrides={{Block: {style: {textTransform: 'uppercase'}}}}>
        <NavLink item={item} />
      </Label>
    );

  if (item.itemId) {
    return <NavLink item={item} />;
  }

  return (
    <Label overrides={{Block: {style: {textTransform: 'uppercase'}}}}>
      <StyledNavItem {...sharedProps}>{item.title}</StyledNavItem>
    </Label>
  );
}

function activePredicate(item, location) {
  return (
    (location && removeSlash(location) === removeSlash(item.itemId)) ||
    (!location && item.itemId === '/')
  );
}

export default ({path}) => {
  return (
    <Navigation
      activeItemId={path}
      activePredicate={activePredicate}
      items={Routes}
      renderItem={renderItem}
    />
  );
};
