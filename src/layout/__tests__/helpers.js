/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {Avatar} from '../../avatar/index.js';
import {Block} from '../../block/index.js';
import {StyledLink} from '../../link/index.js';
import Alert from '../../icon/alert.js';
import Menu from '../../icon/menu.js';
import Search from '../../icon/search.js';
import {styled} from '../../styles/index.js';

const Row = styled('div', {alignItems: 'center', display: 'flex'});

const Link = styled(StyledLink, ({$theme}) => ({
  color: $theme.colors.black,
  cursor: 'pointer',
  marginRight: $theme.sizing.scale900,
  ':hover': {
    color: $theme.colors.primary400,
  },
}));

export const HeaderFiller = styled(Row, ({$theme}) => ({
  ...$theme.borders.border100,
  borderTop: 0,
  borderRight: 0,
  borderLeft: 0,
  height: '92px',
  justifyContent: 'space-between',
  paddingTop: 0,
  paddingRight: $theme.sizing.scale1000,
  paddingBottom: 0,
  paddingLeft: $theme.sizing.scale1000,
}));

export const SubheaderFiller = styled('div', ({$theme}) => ({
  backgroundColor: $theme.colors.mono200,
  height: '144px',
}));

export const SidebarFiller = styled('div', ({$theme}) => ({
  height: '800px',
  width: '310px',
  backgroundColor: $theme.colors.mono200,
}));

const Circle = styled(Row, ({$theme}) => ({
  ...$theme.typography.font450,
  alignItems: 'center',
  backgroundColor: 'black',
  borderRadius: '50%',
  color: 'white',
  display: 'flex',
  height: $theme.sizing.scale1200,
  justifyContent: 'center',
  marginLeft: $theme.sizing.scale700,
  marginRight: $theme.sizing.scale900,
  width: $theme.sizing.scale1200,
}));

export function Navigation() {
  return (
    <Row>
      <Link>Navigation 1</Link>
      <Link>Navigation 2</Link>
      <Link>Navigation 3</Link>
      <Link>Navigation 4</Link>
    </Row>
  );
}

export function HeaderLeft() {
  return (
    <Row>
      <Menu size={24} />
      <Circle>xyz</Circle>
      <Navigation />
    </Row>
  );
}

export function HeaderRight() {
  return (
    <Row>
      <Block $as={Row} marginRight="scale300">
        <Search size={24} />
      </Block>
      <Block $as={Row} marginRight="scale800">
        <Alert size={24} />
      </Block>
      <Avatar
        size="scale800"
        src="https://i.imgur.com/mPXJ4tl.jpg"
        name="Han Solo"
      />
      <Block color="mono800" font="font350" marginLeft="scale500">
        Han Solo
      </Block>
    </Row>
  );
}
