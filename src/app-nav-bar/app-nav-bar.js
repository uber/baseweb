/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {useStyletron} from '../styles/index.js';
import {Cell, Grid} from '../layout-grid/index.js';
import {isFocusVisible} from '../utils/focusVisible.js';

import MobileNav from './mobile-menu.js';
import UserMenu from './user-menu.js';
import {KIND, POSITION} from './constants.js';
import {
  StyledRoot,
  StyledSpacing,
  StyledPrimaryMenuContainer,
  StyledSubnavContainer,
  StyledSecondaryMenuContainer,
  StyledAppName,
  StyledMainMenuItem,
} from './styled-components.js';
import type {AppNavBarPropsT} from './types.js';

function MainMenuItem(props) {
  const {item, kind = KIND.primary, onSelect} = props;
  const [focusVisible, setFocusVisible] = React.useState(false);

  function handleFocus(event) {
    if (isFocusVisible(event)) {
      setFocusVisible(true);
    }
  }

  function handleBlur(event) {
    if (focusVisible) {
      setFocusVisible(false);
    }
  }

  function handleClick(event) {
    if (onSelect) {
      onSelect(item);
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && onSelect) {
      onSelect(item);
    }
  }

  return (
    // $FlowFixMe
    <StyledMainMenuItem
      $active={item.active}
      $isFocusVisible={focusVisible}
      $kind={kind}
      aria-selected={item.active}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {item.mapItemToNode ? item.mapItemToNode(item) : item.label}
    </StyledMainMenuItem>
  );
}

function SecondaryMenu(props) {
  const {items = [], onSelect} = props;

  return (
    <StyledSubnavContainer>
      <Grid>
        <Cell span={[0, 8, 12]}>
          <StyledSecondaryMenuContainer
            role="navigation"
            aria-label="Secondary navigation"
          >
            {items.map((item, index) => (
              // Replace with a menu item renderer
              <MainMenuItem
                item={item}
                kind={KIND.secondary}
                key={index}
                onSelect={onSelect}
              />
            ))}
          </StyledSecondaryMenuContainer>
        </Cell>
      </Grid>
    </StyledSubnavContainer>
  );
}

export default function AppNavBar(props: AppNavBarPropsT) {
  const [css, theme] = useStyletron();
  const {
    title,
    onMainItemSelect = item => {},
    onUserItemSelect = item => {},
    mainItems = [],
    userItems = [],
    username,
    usernameSubtitle,
    userImgUrl,
  } = props;

  let secondaryMenu;
  let desktopSubNavPosition = POSITION.horizontal;
  let mobileSubNavPosition = POSITION.vertical;

  return (
    <StyledRoot data-baseweb="app-nav-bar">
      {/* Mobile Nav Experience */}
      <div
        className={css({
          [`@media screen and (min-width: ${theme.breakpoints.large}px)`]: {
            display: 'none',
          },
        })}
      >
        <Grid>
          <Cell span={[4, 8, 0]}>
            <StyledSpacing>
              {mainItems.length || userItems.length ? (
                <MobileNav {...props} />
              ) : null}
              <StyledAppName>{title}</StyledAppName>
            </StyledSpacing>
          </Cell>
        </Grid>

        {secondaryMenu && mobileSubNavPosition === POSITION.horizontal ? (
          <SecondaryMenu items={secondaryMenu} onSelect={onMainItemSelect} />
        ) : null}
      </div>

      {/* Desktop Nav Experience */}
      <div
        className={css({
          [`@media screen and (max-width: ${theme.breakpoints.large - 1}px)`]: {
            display: 'none',
          },
        })}
      >
        <Grid>
          <Cell span={[0, 3, 3]}>
            <StyledSpacing>
              {/* Replace with a Logo renderer */}
              <StyledAppName>{title}</StyledAppName>
            </StyledSpacing>
          </Cell>
          <Cell span={userItems.length ? [0, 4, 8] : [0, 5, 9]}>
            <StyledPrimaryMenuContainer
              role="navigation"
              aria-label="Main navigation"
            >
              {mainItems.map((item, index) => {
                // For an active top level menu get the secondary navigation and its positioning
                if (item.active && item.children && item.children.length) {
                  secondaryMenu = item.children;
                  if (item.navPosition) {
                    desktopSubNavPosition =
                      item.navPosition.desktop || desktopSubNavPosition;
                    mobileSubNavPosition =
                      item.navPosition.mobile || mobileSubNavPosition;
                  }
                }
                return (
                  <MainMenuItem
                    item={item}
                    key={index}
                    onSelect={onMainItemSelect}
                  />
                );
              })}
            </StyledPrimaryMenuContainer>
          </Cell>

          {userItems.length ? (
            <Cell span={[0, 1, 1]}>
              <StyledSpacing>
                <UserMenu
                  onItemSelect={onUserItemSelect}
                  username={username}
                  usernameSubtitle={usernameSubtitle}
                  userImgUrl={userImgUrl}
                  userItems={userItems}
                />
              </StyledSpacing>
            </Cell>
          ) : null}
        </Grid>

        {secondaryMenu && desktopSubNavPosition === POSITION.horizontal ? (
          <SecondaryMenu items={secondaryMenu} onSelect={onMainItemSelect} />
        ) : null}
      </div>
    </StyledRoot>
  );
}
