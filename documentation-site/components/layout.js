/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Block} from 'baseui/block';
import {Button} from 'baseui/button';
import {
  HeaderNavigation,
  StyledNavigationList as NavigationList,
  ALIGN,
} from 'baseui/header-navigation';
import {StatefulSelect, TYPE} from 'baseui/select';

import Logo from '../images/Logo.png';

type PropsT = {
  children: React.Node,
};

export default (props: PropsT) => (
  <React.Fragment>
    <HeaderNavigation
      overrides={{
        Root: {
          style: ({$theme}) => ({
            paddingLeft: $theme.sizing.scale800,
            paddingRight: $theme.sizing.scale800,
          }),
        },
      }}
    >
      <NavigationList align={ALIGN.left}>
        <Block display="flex" alignItems="center">
          <Block as="img" height="29.25px" src={Logo} width="101px" />
          <Block marginLeft="scale1600" width="288px">
            <StatefulSelect
              options={[]}
              placeholder="Search"
              type={TYPE.search}
            />
          </Block>
        </Block>
      </NavigationList>
      <NavigationList align={ALIGN.center} />
      <NavigationList align={ALIGN.right}>
        <Button>Get Started</Button>
      </NavigationList>
    </HeaderNavigation>

    <Block display="flex" flex="1" paddingTop="scale500">
      <Block display="flex" marginLeft="scale800" maxWidth="170px">
        navbar. this component will include the list of components and links to
        doc pages.
      </Block>

      <Block
        paddingLeft="scale900"
        overrides={{
          Block: {
            style: ({$theme}) => ({
              borderLeft: `1px solid ${$theme.colors.border}`,
            }),
          },
        }}
      >
        {props.children}
      </Block>
    </Block>
  </React.Fragment>
);
