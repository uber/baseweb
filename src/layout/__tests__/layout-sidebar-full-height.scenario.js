/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {Block} from '../../block/index.js';
import Menu from '../../icon/menu.js';
import {styled} from '../../styles/index.js';

import {Layout, Header, Sidebar, Content} from '../index.js';
import {
  HeaderFiller,
  HeaderRight,
  Navigation,
  SidebarFiller,
} from './helpers.js';

export const name = 'layout-sidebar-full-height';

const SidebarHeader = styled(HeaderFiller, ({$theme}) => ({
  paddingLeft: $theme.sizing.scale800,
  borderBottom: 0,
  justifyContent: 'unset',
}));

export const component = () => (
  <Layout>
    <Sidebar>
      <SidebarFiller>
        <SidebarHeader>
          <Menu size={24} />
          <Block color="black" font="font500" marginLeft="scale700">
            Your Logo
          </Block>
        </SidebarHeader>
      </SidebarFiller>
    </Sidebar>

    <Layout>
      <Header>
        <HeaderFiller>
          <Navigation />
          <HeaderRight />
        </HeaderFiller>
      </Header>
      <Content>
        <div />
      </Content>
    </Layout>
  </Layout>
);
