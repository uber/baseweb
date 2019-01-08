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

import NavLink from './nav-link';
import Routes from '../routes';

const levelToPadding = {
  1: 'scale400',
  2: 'scale600',
  3: 'scale800',
};

const levelToFont = {
  1: 'font450',
  2: 'font400',
  3: 'font300',
};

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

const NavigationLink = props => {
  return (
    <Block paddingBottom="scale300">
      <Link passHref={true} href={props.path} prefetch>
        <NavLink tabIndex="0">{props.text}</NavLink>
      </Link>
    </Block>
  );
};

const NavigationItem = props => {
  const {route, level = 1} = props;
  return (
    <Block font={levelToFont[level]} paddingLeft={levelToPadding[level]}>
      {route.path ? (
        <NavigationLink path={route.path} text={route.text} />
      ) : (
        route.text
      )}
      {route.children
        ? route.children.map((childRoute, index) => {
            return (
              <React.Fragment key={index}>
                <NavigationItem level={level + 1} route={childRoute} />
              </React.Fragment>
            );
          })
        : null}
    </Block>
  );
};

export default () => (
  <List as="ul">
    {Routes.map((route, index) => {
      return <NavigationItem key={index} route={route} />;
    })}
  </List>
);
