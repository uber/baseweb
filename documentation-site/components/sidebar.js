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

const levelToFont = {
  1: 'font450',
  2: 'font400',
  3: 'font400',
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
    <Block>
      <Link passHref={true} href={props.path} prefetch>
        <NavLink tabIndex="0">{props.text}</NavLink>
      </Link>
    </Block>
  );
};

const removeSlash = path => {
  if (path) {
    return path.replace(/\/$/, '');
  }
  return path;
};

const NavigationItem = props => {
  const {route, level = 1, path} = props;
  return (
    <Block
      font={levelToFont[level]}
      paddingBottom={level !== 3 ? 'scale100' : 0}
      marginTop="scale300"
      overrides={{
        Block: {
          style: ({$theme}) => ({
            paddingLeft: !route.children ? $theme.sizing.scale600 : 0,
            borderLeft:
              (path && removeSlash(path) === removeSlash(route.path)) ||
              (!path && route.path === '/')
                ? `3px solid ${$theme.colors.primary300}`
                : route.children
                  ? 'none'
                  : '3px solid transparent',
            textTransform: route.children ? 'uppercase' : 'none',
            ...(route.children && level === 2 ? $theme.typography.font350 : {}),
          }),
        },
      }}
    >
      {route.path ? (
        <NavigationLink path={route.path} text={route.text} />
      ) : (
        route.text
      )}
      {route.children
        ? route.children.map((childRoute, index) => {
            return (
              <React.Fragment key={index}>
                <NavigationItem
                  level={level + 1}
                  route={childRoute}
                  index={index}
                  path={path}
                />
              </React.Fragment>
            );
          })
        : null}
    </Block>
  );
};

export default ({path}) => (
  <List as="ul">
    {Routes.map((route, index) => {
      return (
        <NavigationItem key={index} route={route} index={index} path={path} />
      );
    })}
  </List>
);
