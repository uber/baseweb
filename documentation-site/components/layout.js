/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {MDXProvider} from '@mdx-js/tag';
import Link from 'next/link';

import {Block} from 'baseui/block';
import {Button, KIND as ButtonKind} from 'baseui/button';
import {
  HeaderNavigation,
  StyledNavigationList as NavigationList,
  ALIGN,
} from 'baseui/header-navigation';
import {StatefulSelect, TYPE} from 'baseui/select';

import ComponentMenu from './component-menu';
import MarkdownElements from './markdown-elements';
import Sidebar from './sidebar';
import Logo from '../images/Logo.png';
import GithubLogo from './github-logo';

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
          <Link href="/" prefetch>
            <Block
              as="img"
              height="29.25px"
              src={Logo}
              width="101px"
              overrides={{Block: {style: {cursor: 'pointer'}}}}
            />
          </Link>
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
        <ComponentMenu />
        <Block
          $as="a"
          href="https://github.com/uber-web/baseui"
          marginLeft="scale600"
          $style={{textDecoration: 'none'}}
          target="_blank"
        >
          <Button
            kind={ButtonKind.secondary}
            overrides={{
              EndEnhancer: {
                style: {
                  marginLeft: 0,
                },
              },
            }}
            endEnhancer={() => <GithubLogo size={24} color="#276EF1" />}
          />
        </Block>
        <Block marginLeft="scale600">
          <Link href="/getting-started" prefetch>
            <Button>Get Started</Button>
          </Link>
        </Block>
      </NavigationList>
    </HeaderNavigation>

    <Block display="flex" paddingTop="scale500">
      <Block display="flex" marginLeft="scale800" marginRight="scale800">
        <Sidebar />
      </Block>

      <Block
        flex="2"
        paddingLeft="scale900"
        overrides={{
          Block: {
            style: ({$theme}) => ({
              borderLeft: `1px solid ${$theme.colors.border}`,
            }),
          },
        }}
      >
        <MDXProvider components={MarkdownElements}>
          {props.children}
        </MDXProvider>
      </Block>
    </Block>
  </React.Fragment>
);
