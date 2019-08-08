/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import Link from 'next/link';
import {Block} from 'baseui/block';
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
import AlignLeftIcon from './align-left-icon';
import AlignRightIcon from './align-right-icon';
import VersionSelector from './version-selector.js';
import Search from './search';
import {ThemeContext} from 'baseui/styles/theme-provider.js';
import Bulb from './bulb';
import {StatefulTooltip} from 'baseui/tooltip';
import {Button, KIND} from 'baseui/button';

export const HEADER_BREAKPOINT = '@media screen and (min-width: 670px)';

const Hamburger = styled<{}>('div', ({$theme}) => ({
  display: 'block',
  userSelect: 'none',
  height: '32px',
  paddingLeft: $theme.sizing.scale600,
  cursor: 'pointer',
  '@media screen and (min-width: 920px)': {
    display: 'none',
  },
}));

const LogoSegment = styled<{$searchInputOpen: boolean}>(
  'div',
  ({$searchInputOpen}) => ({
    display: $searchInputOpen ? 'none' : 'flex',
    justifySelf: 'flex-start',
    justifyContent: 'flex-start',
    flex: 'none',
    [HEADER_BREAKPOINT]: {
      display: 'flex',
    },
  }),
);

type PropsT = {
  toggleSidebar: () => void,
  toggleTheme: () => void,
  toggleDirection: () => void,
};

const Navigation = ({toggleSidebar, toggleTheme, toggleDirection}: PropsT) => {
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
              <Link href="/">
                <Block
                  as="img"
                  height="40px"
                  src={theme.name.startsWith('dark') ? LogoWhite : Logo}
                  width="101px"
                  overrides={{Block: {style: {cursor: 'pointer'}}}}
                />
              </Link>
              <Block marginLeft="scale300">
                <VersionSelector />
                <Link href="/blog/base-web-v8">
                  <Button
                    size="compact"
                    kind={KIND.minimal}
                    $as="a"
                    href="/blog/base-web-v8"
                    overrides={{
                      BaseButton: {
                        style: {
                          display: 'none',
                          '@media screen and (min-width: 820px)': {
                            display: 'inline-block',
                          },
                        },
                      },
                    }}
                  >
                    {"What's new in v8?"}
                  </Button>
                </Link>
              </Block>
            </Block>
          </LogoSegment>

          <NavigationList $align={ALIGN.right}>
            <Block display="flex" alignItems="center">
              <Search
                searchInputOpen={searchInputOpen}
                toggleSearchInput={() => setSearchInputOpen(!searchInputOpen)}
                // passed as prop to avoid circular dependency
                breakpoint={HEADER_BREAKPOINT}
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
                marginLeft="scale400"
                marginRight="scale400"
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
                marginLeft="scale300"
                $style={{textDecoration: 'none'}}
                target="_blank"
              >
                <GithubLogo size={24} color={theme.colors.foreground} />
              </Block>
              <Block
                as="span"
                font="font400"
                marginLeft="scale400"
                marginRight="scale400"
                onClick={toggleDirection}
                overrides={{
                  Block: {
                    style: {
                      cursor: 'pointer',
                      display: 'none',
                      height: '24px',
                      [HEADER_BREAKPOINT]: {
                        display: 'block',
                      },
                    },
                  },
                }}
              >
                {theme.direction === 'rtl' ? (
                  <AlignLeftIcon size={24} color={theme.colors.foreground} />
                ) : (
                  <AlignRightIcon size={24} color={theme.colors.foreground} />
                )}
              </Block>
              <Block
                $as="a"
                overrides={{
                  Block: {
                    style: {
                      height: '24px',
                      [HEADER_BREAKPOINT]: {
                        display: 'block',
                      },
                    },
                  },
                }}
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
