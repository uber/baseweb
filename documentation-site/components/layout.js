/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {MDXProvider} from '@mdx-js/tag';
import Link from 'next/link';
import {Tag} from 'baseui/tag';

import {Block} from 'baseui/block';
import {
  HeaderNavigation,
  StyledNavigationList as NavigationList,
  ALIGN,
} from 'baseui/header-navigation';

import MarkdownElements from './markdown-elements';
import Sidebar from './sidebar';
import Logo from '../images/base-web.svg';
import GithubLogo from './github-logo';
import SlackLogo from './slack-logo';
import Search from './search';
import {version} from '../../package.json';

type PropsT = {
  children: React.Node,
  path?: {},
};

export default (props: PropsT) => {
  return (
    <React.Fragment>
      <HeaderNavigation
        overrides={{
          Root: {
            style: ({$theme}) => ({
              paddingLeft: $theme.sizing.scale800,
              paddingRight: $theme.sizing.scale800,
              paddingTop: $theme.sizing.scale600,
              paddingBottom: $theme.sizing.scale600,
              border: 0,
              boxShadow: `0 2px 8px ${$theme.colors.mono500}`,
            }),
          },
        }}
      >
        <NavigationList align={ALIGN.left}>
          <Block display="flex" alignItems="center">
            <Link href="/" prefetch>
              <Block
                as="img"
                height="40px"
                src={Logo}
                width="101px"
                overrides={{Block: {style: {cursor: 'pointer'}}}}
              />
            </Link>
            <Block
              marginLeft="scale200"
              overrides={{
                Block: {
                  style: {
                    color: 'inherit',
                    textDecoration: 'none',
                  },
                },
              }}
              target="_blank"
              as="a"
              href="https://github.com/uber-web/baseui/releases"
            >
              <Tag closeable={false}>{version}</Tag>
            </Block>
          </Block>
        </NavigationList>
        <NavigationList align={ALIGN.center} />
        <NavigationList align={ALIGN.right}>
          <Block display="flex" alignItems="center">
            <Search />
            <Block
              $as="a"
              href="https://join.slack.com/t/baseui/shared_invite/enQtNDI0NTgwMjU0NDUyLTk3YzM1NWY2MjY3NTVjNjk3NzY1MTE5OTI4Y2Q2ZmVkMTUyNDc1MTcwYjZhYjlhOWQ2M2NjOWJkZmQyNjFlYTA"
              marginLeft="scale700"
              $style={{textDecoration: 'none'}}
              target="_blank"
            >
              <SlackLogo size={24} color="#666" />
            </Block>
            <Block
              $as="a"
              href="https://github.com/uber-web/baseui"
              marginLeft="scale700"
              $style={{textDecoration: 'none'}}
              target="_blank"
            >
              <GithubLogo size={24} color="#666" />
            </Block>
          </Block>
        </NavigationList>
      </HeaderNavigation>

      <Block display="flex" paddingTop="scale400">
        <Block
          display="flex"
          paddingTop="scale800"
          marginLeft="scale1000"
          marginRight="scale800"
        >
          <Sidebar path={props.path} />
        </Block>

        <Block
          flex="2"
          paddingLeft="scale900"
          paddingRight="scale900"
          overrides={{
            Block: {
              style: ({$theme}) => ({
                maxWidth: '40rem',
              }),
              props: {
                id: 'docSearch-content',
              },
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
};
