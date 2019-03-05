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
import Menu from 'baseui/icon/menu';
import {Layout, Content, Header, Sidebar} from 'baseui/layout';

import ComponentMenu from './component-menu';
import MarkdownElements from './markdown-elements';
import SideMenu from './side-menu';
import Logo from '../images/base-web.svg';
import GithubLogo from './github-logo';
import SlackLogo from './slack-logo';
import Search from './search';
import {version} from '../../package.json';

type PropsT = {
  children: React.Node,
};

const HEADER_HEIGHT = '64px';

export default (props: PropsT) => {
  const [isMenuCollapsed, setMenuCollapsed] = React.useState(false);

  return (
    <Layout>
      <Sidebar
        breakpoint="large"
        isCollapsed={isMenuCollapsed}
        onCollapse={() => setMenuCollapsed(true)}
        overrides={{
          Sidebar: {
            style: ({$theme}) => ({
              boxSizing: 'border-box',
              paddingTop: $theme.sizing.scale300,
              paddingBottom: $theme.sizing.scale300,
              position: 'fixed',
              maxHeight: `calc(100vh - ${HEADER_HEIGHT})`,
              overflow: 'overlay',
              backgroundColor: $theme.colors.white,
              zIndex: 1,
              marginTop: HEADER_HEIGHT,
            }),
          },
        }}
      >
        <SideMenu />
      </Sidebar>

      <Layout>
        <Header
          overrides={{
            Header: {
              style: {
                position: 'fixed',
                width: '100%',
                backgroundColor: 'white',
                zIndex: 2,
              },
            },
          }}
        >
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
                <Button
                  overrides={{BaseButton: {style: {color: 'black'}}}}
                  kind={ButtonKind.minimal}
                  shape="square"
                  onClick={() => setMenuCollapsed(!isMenuCollapsed)}
                >
                  <Menu />
                </Button>

                <Link href="/" prefetch>
                  <Block
                    as="img"
                    height="40px"
                    src={Logo}
                    width="101px"
                    paddingLeft="scale300"
                    overrides={{Block: {style: {cursor: 'pointer'}}}}
                  />
                </Link>
                <Block marginLeft="scale600">{version}</Block>
                <Block
                  overrides={{
                    Block: {
                      style: {
                        color: 'inherit',
                        fontStyle: 'italic',
                      },
                    },
                  }}
                  target="_blank"
                  as="a"
                  href="https://github.com/uber-web/baseui/releases"
                >
                  (Changelog)
                </Block>
              </Block>
            </NavigationList>
            <NavigationList align={ALIGN.center} />
            <NavigationList align={ALIGN.right}>
              <Search />
              <Block marginLeft="scale600">
                <ComponentMenu />
              </Block>
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
              <Block
                $as="a"
                href="https://join.slack.com/t/baseui/shared_invite/enQtNDI0NTgwMjU0NDUyLTk3YzM1NWY2MjY3NTVjNjk3NzY1MTE5OTI4Y2Q2ZmVkMTUyNDc1MTcwYjZhYjlhOWQ2M2NjOWJkZmQyNjFlYTA"
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
                  endEnhancer={() => <SlackLogo size={24} color="#276EF1" />}
                />
              </Block>
              <Block marginLeft="scale600">
                <Link href="/getting-started/installation" prefetch>
                  <Button>Get Started</Button>
                </Link>
              </Block>
            </NavigationList>
          </HeaderNavigation>
        </Header>

        <Content
          overrides={{
            Content: {
              style: ({$theme}) => ({
                maxWidth: '45rem',
                paddingLeft: $theme.sizing.scale900,
                marginLeft: isMenuCollapsed ? 0 : '250px',
                marginTop: HEADER_HEIGHT,
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
        </Content>
      </Layout>
    </Layout>
  );
};
