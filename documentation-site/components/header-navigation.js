/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import Link from 'next/link';
import {Block} from 'baseui/block';
import {Tag} from 'baseui/tag';
import {
  HeaderNavigation,
  StyledNavigationList as NavigationList,
  ALIGN,
} from 'baseui/header-navigation';
import {styled} from 'baseui';
import Menu from 'baseui/icon/menu';
import Logo from '../images/base-web.svg';
import LogoWhite from '../images/base-web-white.svg';
import GithubLogo from './github-logo';
import SlackLogo from './slack-logo';
import Search from './search';
import {version} from '../../package.json';
import {ThemeContext} from 'baseui/styles/theme-provider.js';
import Bulb from './bulb';
import {StatefulTooltip} from 'baseui/tooltip';

export const HEADER_BREAKPOINT = '@media screen and (min-width: 640px)';

const Hamburger = styled('div', ({$theme}) => ({
  display: 'block',
  userSelect: 'none',
  height: '32px',
  paddingLeft: $theme.sizing.scale600,
  cursor: 'pointer',
  '@media screen and (min-width: 820px)': {
    display: 'none',
  },
}));

const LogoSegment = styled('div', ({$searchInputOpen}) => ({
  display: $searchInputOpen ? 'none' : 'flex',
  justifySelf: 'flex-start',
  justifyContent: 'flex-start',
  flex: 'none',
  [HEADER_BREAKPOINT]: {
    display: 'flex',
  },
}));

type PropsT = {
  toggleSidebar: () => void,
  toggleTheme: () => void,
};

const Navigation = ({toggleSidebar, toggleTheme}: PropsT) => {
  const [searchInputOpen, setSearchInputOpen] = React.useState(false);
  return (
    <ThemeContext.Consumer>
      {theme => (
        <HeaderNavigation
          overrides={{
            Root: {
              style: ({$theme}) => ({
                justifyContent: 'space-between',
                paddingLeft: $theme.sizing.scale800,
                paddingRight: $theme.sizing.scale800,
                paddingTop: $theme.sizing.scale600,
                paddingBottom: $theme.sizing.scale600,
                boxShadow: 'none',
              }),
            },
          }}
        >
          <LogoSegment $searchInputOpen={searchInputOpen}>
            <Block display="flex" alignItems="center">
              <Link href="/" prefetch>
                <Block
                  as="img"
                  height="40px"
                  src={theme.name.startsWith('dark') ? LogoWhite : Logo}
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
                <Tag closeable={false} onClick={() => {}}>
                  {version}
                </Tag>
              </Block>
            </Block>
          </LogoSegment>

          <NavigationList align={ALIGN.right}>
            <Block display="flex" alignItems="center">
              <Search
                searchInputOpen={searchInputOpen}
                toggleSearchInput={() => setSearchInputOpen(!searchInputOpen)}
              />
              <Block
                $as="a"
                overrides={{
                  Block: {
                    style: {
                      display: 'none',
                      height: '24px',
                      [HEADER_BREAKPOINT]: {
                        display: 'block',
                      },
                    },
                  },
                }}
                href="https://join.slack.com/t/baseui/shared_invite/enQtNDI0NTgwMjU0NDUyLTk3YzM1NWY2MjY3NTVjNjk3NzY1MTE5OTI4Y2Q2ZmVkMTUyNDc1MTcwYjZhYjlhOWQ2M2NjOWJkZmQyNjFlYTA"
                marginLeft="scale700"
                $style={{textDecoration: 'none'}}
                target="_blank"
              >
                <SlackLogo size={24} color={theme.colors.foreground} />
              </Block>
              <Block
                $as="a"
                overrides={{
                  Block: {
                    style: {
                      display: 'none',
                      height: '24px',
                      [HEADER_BREAKPOINT]: {
                        display: 'block',
                      },
                    },
                  },
                }}
                href="https://github.com/uber-web/baseui"
                marginLeft="scale700"
                $style={{textDecoration: 'none'}}
                target="_blank"
              >
                <GithubLogo size={24} color={theme.colors.foreground} />
              </Block>
              <Block
                $as="a"
                overrides={{
                  Block: {
                    style: {
                      display: 'none',
                      height: '24px',
                      [HEADER_BREAKPOINT]: {
                        display: 'block',
                      },
                    },
                  },
                }}
                marginLeft="scale700"
                $style={{textDecoration: 'none'}}
                href="#"
                onClick={toggleTheme}
              >
                <StatefulTooltip
                  content="Switch theme"
                  accessibilityType={'tooltip'}
                >
                  <Block as="span" font="font400">
                    <Bulb size={24} color={theme.colors.foreground} />
                  </Block>
                </StatefulTooltip>
              </Block>
              <Hamburger role="button" onClick={toggleSidebar}>
                <Menu size={32} color={theme.colors.foregroundAlt} />
              </Hamburger>
            </Block>
          </NavigationList>
        </HeaderNavigation>
      )}
    </ThemeContext.Consumer>
  );
};
export default Navigation;
