/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import {Block} from 'baseui/block';
import {styled} from 'baseui';
import Link from 'next/link';

import Routes from '../routes';

const List = styled(Block, ({$theme}) => ({
  position: 'relative',
  marginTop: '0',
  marginBottom: '0',
  marginLeft: '0',
  marginRight: '0',
  paddingLeft: '0',
  paddingRight: '0',
  listStyle: 'none',
}));

const ListItem = styled(Block, ({$theme}) => ({
  paddingLeft: $theme.sizing.scale400,
}));

const StlyedLink = styled('a', ({$theme}) => ({
  textDecoration: 'none',
  cursor: 'pointer',
}));

const NavigationLink = props => {
  return (
    <Block paddingBottom="scale300">
      <Link href={props.path} prefetch>
        <StlyedLink>{props.text}</StlyedLink>
      </Link>
    </Block>
  );
};

const SubNavigation = props => {
  const {routes = []} = props;
  return routes.map(route => {
    return (
      <ListItem font="font300" key={route.path} as="li">
        <NavigationLink path={route.path} text={route.text} />
      </ListItem>
    );
  });
};

export default () => (
  <List as="ul" font="font350">
    {Routes.map(route => {
      return (
        <React.Fragment key={route.path}>
          {route.path ? (
            <NavigationLink path={route.path} text={route.text} />
          ) : (
            route.text
          )}
          <List>
            <SubNavigation routes={route.children} />
          </List>
        </React.Fragment>
      );
    })}
  </List>
);
