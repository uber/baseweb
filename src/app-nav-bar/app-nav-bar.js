/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {useStyletron} from '../styles/index.js';
import {Cell, Grid} from '../layout-grid/index.js';
import PrimaryMenuItem from './primary-menu-item.js';
import MobileNav from './mobile-menu/mobile-nav.js';
import Logo from './logo.js';
import UserMenu from './user-menu/user-menu.js';
import {
  StyledRoot,
  StyledSpacing,
  StyledPrimaryMenuContainer,
} from './styled-components.js';
import type {AppNavBarPropsT} from './types.js';

export default function AppNavBar(props: AppNavBarPropsT) {
  const [css, theme] = useStyletron();
  const {breakpoints} = theme;
  const {
    mainNav = [],
    userNav = [],
    appDisplayName,
    appDisplayNameLink,
  } = props;

  return (
    <StyledRoot>
      {/* Mobile Nav Experience */}
      <div
        className={css({
          [`@media screen and (min-width: ${breakpoints.large}px)`]: {
            display: 'none',
          },
        })}
      >
        <Grid>
          <Cell span={[4, 8, 0]}>
            <StyledSpacing>
              <MobileNav {...props} />
              <Logo appDisplayName={appDisplayName} link={appDisplayNameLink} />
            </StyledSpacing>
          </Cell>
        </Grid>
      </div>
      {/* Desktop Nav Experience */}
      <div
        className={css({
          [`@media screen and (max-width: ${breakpoints.large - 1}px)`]: {
            display: 'none',
          },
        })}
      >
        <Grid>
          <Cell span={[0, 3, 3]}>
            <StyledSpacing>
              {/* Replace with a Logo renderer */}
              <Logo appDisplayName={appDisplayName} link={appDisplayNameLink} />
            </StyledSpacing>
          </Cell>
          <Cell span={userNav.length ? [0, 4, 8] : [0, 5, 9]}>
            <StyledPrimaryMenuContainer
              role="navigation"
              aria-label="Main navigation"
            >
              {mainNav.map((navItem, index) => (
                // Replace with a menu item renderer
                <PrimaryMenuItem
                  key={index}
                  item={navItem}
                  onSelect={props.onNavItemSelect}
                />
              ))}
            </StyledPrimaryMenuContainer>
          </Cell>
          {userNav.length ? (
            <Cell span={[0, 1, 1]}>
              <StyledSpacing>
                <UserMenu
                  onNavItemSelect={props.onNavItemSelect}
                  username={props.username}
                  usernameSubtitle={props.usernameSubtitle}
                  userImgUrl={props.userImgUrl}
                  userNav={userNav}
                />
              </StyledSpacing>
            </Cell>
          ) : null}
        </Grid>
      </div>
    </StyledRoot>
  );
}
