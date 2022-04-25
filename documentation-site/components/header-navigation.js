/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import Link from 'next/link';
import { themedUseStyletron as useStyletron } from '../pages/_app';
import Menu from 'baseui/icon/menu';
import DarkLogo from '../images/base-web.svg';
import LightLogo from '../images/base-web-white.svg';
import GithubLogo from './github-logo';
import SlackLogo from './slack-logo';
import AlignLeftIcon from './align-left-icon';
import AlignRightIcon from './align-right-icon';
//$FlowFixMe
import VersionSelector from './version-selector.js';
import Search from './search';
import Bulb from './bulb';
import { Button, KIND, SIZE, SHAPE } from 'baseui/button';

// Breakpoint for un-wrapping the search bar from under the links and toggles.
const WRAP_SEARCH = 715;

const mq = (breakpoint: number): string => `@media screen and (min-width: ${breakpoint}px)`;

export default function HeaderNavigation({
  toggleSidebar,
  toggleTheme,
  toggleDirection,
}: {
  toggleSidebar: () => void,
  toggleTheme: () => void,
  toggleDirection: () => void,
}) {
  const [css, theme] = useStyletron();
  return (
    <header
      className={css({
        ...theme.typography.ParagraphMedium,
        display: 'flex',
        flexWrap: 'wrap',
        paddingTop: theme.sizing.scale500,
        paddingBottom: theme.sizing.scale500,
        paddingLeft: theme.sizing.scale800,
        paddingRight: theme.sizing.scale800,
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        borderBottomColor: theme.colors.borderOpaque,
        [mq(WRAP_SEARCH)]: {
          flexWrap: 'nowrap',
        },
      })}
    >
      {/* Logo & Links  */}
      <div
        className={css({
          marginLeft: theme.direction === 'rtl' ? 'auto' : 'none',
          marginRight: theme.direction === 'rtl' ? 'none' : 'auto',
          display: 'flex',
          alignItems: 'center',
          order: 1,
        })}
      >
        {/* Base Web Logo */}
        <Link href="/">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            className={css({
              display: 'flex',
              marginLeft: theme.direction === 'rtl' ? theme.sizing.scale400 : 'none',
              marginRight: theme.direction === 'rtl' ? 'none' : theme.sizing.scale400,
              ':focus': {
                outline: `3px solid ${theme.colors.accent}`,
                outlineOffset: '5px',
              },
            })}
          >
            <img
              src={theme.name.startsWith('dark') ? LightLogo : DarkLogo}
              alt="Base Web"
              height="40px"
              width="97px"
            />
          </a>
        </Link>
        {/* Version Selector */}
        <div
          className={css({
            display: 'none',
            [mq(400)]: {
              display: 'block',
            },
          })}
        >
          <VersionSelector />
        </div>
        {/* Link to blog */}
        <Link href="/blog" passHref>
          <Button
            $as="a"
            size={SIZE.compact}
            kind={KIND.tertiary}
            overrides={{
              BaseButton: {
                style: {
                  display: 'none',
                  [mq(1000)]: {
                    display: 'block',
                  },
                },
              },
            }}
          >
            Blog
          </Button>
        </Link>
        {/* Link to component gallery */}
        <Link href="/components" passHref>
          <Button
            $as="a"
            size={SIZE.compact}
            kind={KIND.tertiary}
            overrides={{
              BaseButton: {
                style: {
                  display: 'none',
                  [mq(1000)]: {
                    display: 'block',
                  },
                },
              },
            }}
          >
            Components
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div
        className={css({
          flexBasis: '100%',
          order: 3,
          marginTop: theme.sizing.scale400,
          [mq(WRAP_SEARCH)]: {
            flexBasis: 'auto',
            order: 2,
            marginTop: '0',
            marginLeft: theme.direction === 'rtl' ? theme.sizing.scale400 : 'none',
            marginRight: theme.direction === 'rtl' ? 'none' : theme.sizing.scale400,
          },
        })}
      >
        <Search />
      </div>

      {/* Toggles & Links */}
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          order: 2,
          [mq(WRAP_SEARCH)]: {
            order: 3,
          },
        })}
      >
        {/* Slack */}
        <Button
          $as="a"
          href="https://join.slack.com/t/baseui/shared_invite/zt-5f1s4d10-1D2uywAECAG50m64PTH9cw"
          target="_blank"
          rel="noopener noreferrer"
          size={SIZE.compact}
          kind={KIND.tertiary}
          shape={SHAPE.square}
          title="Join our Slack channel"
          overrides={{
            BaseButton: {
              style: {
                display: 'none',
                [mq(500)]: {
                  display: 'flex',
                },
              },
            },
          }}
        >
          <SlackLogo size={24} color={theme.colors.contentPrimary} />
        </Button>

        {/* GitHub */}
        <Button
          $as="a"
          href="https://github.com/uber/baseweb"
          target="_blank"
          rel="noopener noreferrer"
          size={SIZE.compact}
          kind={KIND.tertiary}
          shape={SHAPE.square}
          title="Open GitHub repository"
          overrides={{
            BaseButton: {
              style: {
                display: 'none',
                [mq(400)]: {
                  display: 'flex',
                },
              },
            },
          }}
        >
          <GithubLogo size={24} color={theme.colors.contentPrimary} />
        </Button>

        {/* Direction Toggle */}
        <Button
          onClick={toggleDirection}
          size={SIZE.compact}
          kind={KIND.tertiary}
          shape={SHAPE.square}
          title="Toggle direction"
          overrides={{
            BaseButton: {
              style: {
                display: 'none',
                [mq(450)]: {
                  display: 'flex',
                },
              },
            },
          }}
        >
          {theme.direction === 'rtl' ? (
            <AlignLeftIcon size={24} color={theme.colors.contentPrimary} />
          ) : (
            <AlignRightIcon size={24} color={theme.colors.contentPrimary} />
          )}
        </Button>

        {/* Theme Toggle */}
        <Button
          onClick={toggleTheme}
          size={SIZE.compact}
          kind={KIND.tertiary}
          shape={SHAPE.square}
          title="Toggle theme"
          overrides={{
            BaseButton: {
              style: {
                display: 'flex',
              },
            },
          }}
        >
          <Bulb size={24} color={theme.colors.contentPrimary} />
        </Button>

        {/* Nav Toggle */}
        <Button
          onClick={toggleSidebar}
          size={SIZE.compact}
          kind={KIND.tertiary}
          shape={SHAPE.square}
          title="Toggle navigation"
          overrides={{
            BaseButton: {
              style: {
                display: 'flex',
                [theme.mediaQuery.medium]: {
                  display: 'none',
                },
              },
            },
          }}
        >
          <Menu size={24} color={theme.colors.contentPrimary} />
        </Button>
      </div>
    </header>
  );
}
