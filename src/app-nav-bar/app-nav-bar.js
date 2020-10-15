/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {getOverrides} from '../helpers/overrides.js';
import {Cell, Grid} from '../layout-grid/index.js';
import {useStyletron} from '../styles/index.js';
import {isFocusVisible} from '../utils/focusVisible.js';

import {KIND, POSITION} from './constants.js';
import MobileNav from './mobile-menu.js';
import UserMenu from './user-menu.js';
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
import {defaultMapItemToNode} from './utils.js';

function MainMenuItem(props) {
  const {
    item,
    kind = KIND.primary,
    mapItemToNode,
    onSelect,
    overrides = {},
  } = props;
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

  const [MainMenuItemElement, mainMenuItemElementProps] = getOverrides(
    overrides.MainMenuItem,
    StyledMainMenuItem,
  );

  return (
    <MainMenuItemElement
      $active={item.active}
      $isFocusVisible={focusVisible}
      $kind={kind}
      aria-selected={item.active}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      {...mainMenuItemElementProps}
    >
      {mapItemToNode(item)}
    </MainMenuItemElement>
  );
}

function SecondaryMenu(props) {
  const {items = [], mapItemToNode, onSelect, overrides = {}} = props;

  const [SubnavContainer, subnavContainerProps] = getOverrides(
    overrides.SubnavContainer,
    StyledSubnavContainer,
  );
  const [SecondaryMenuContainer, secondaryMenuContainerProps] = getOverrides(
    overrides.SecondaryMenuContainer,
    StyledSecondaryMenuContainer,
  );

  return (
    <SubnavContainer {...subnavContainerProps}>
      <Grid>
        <Cell span={[0, 8, 12]}>
          <SecondaryMenuContainer
            role="navigation"
            aria-label="Secondary navigation"
            {...secondaryMenuContainerProps}
          >
            {items.map((item, index) => (
              // Replace with a menu item renderer
              <MainMenuItem
                mapItemToNode={mapItemToNode}
                item={item}
                kind={KIND.secondary}
                key={index}
                onSelect={onSelect}
                overrides={overrides}
              />
            ))}
          </SecondaryMenuContainer>
        </Cell>
      </Grid>
    </SubnavContainer>
  );
}

export default function AppNavBar(props: AppNavBarPropsT) {
  const [css, theme] = useStyletron();
  const {
    title,
    mapItemToNode = defaultMapItemToNode,
    onMainItemSelect = item => {},
    onUserItemSelect = item => {},
    mainItems = [],
    overrides = {},
    userItems = [],
    username,
    usernameSubtitle,
    userImgUrl,
  } = props;

  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
  const [Spacing, spacingProps] = getOverrides(
    overrides.Spacing,
    StyledSpacing,
  );
  const [AppName, appNameProps] = getOverrides(
    overrides.AppName,
    StyledAppName,
  );
  const [PrimaryMenuContainer, primaryMenuContainerProps] = getOverrides(
    overrides.PrimaryMenuContainer,
    StyledPrimaryMenuContainer,
  );

  let secondaryMenu;
  let desktopSubNavPosition = POSITION.horizontal;
  let mobileSubNavPosition = POSITION.vertical;

  return (
    <Root {...rootProps} data-baseweb="app-nav-bar">
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
            <Spacing {...spacingProps}>
              {mainItems.length || userItems.length ? (
                <MobileNav {...props} />
              ) : null}
              <AppName {...appNameProps}>{title}</AppName>
            </Spacing>
          </Cell>
        </Grid>

        {secondaryMenu && mobileSubNavPosition === POSITION.horizontal && (
          <SecondaryMenu
            items={secondaryMenu}
            mapItemToNode={mapItemToNode}
            onSelect={onMainItemSelect}
            overrides={overrides}
          />
        )}
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
            <Spacing {...spacingProps}>
              {/* Replace with a Logo renderer */}
              <AppName {...appNameProps}>{title}</AppName>
            </Spacing>
          </Cell>
          <Cell span={userItems.length ? [0, 4, 8] : [0, 5, 9]}>
            <PrimaryMenuContainer
              role="navigation"
              aria-label="Main navigation"
              {...primaryMenuContainerProps}
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
                    mapItemToNode={mapItemToNode}
                    onSelect={onMainItemSelect}
                    overrides={overrides}
                  />
                );
              })}
            </PrimaryMenuContainer>
          </Cell>

          {userItems.length ? (
            <Cell span={[0, 1, 1]}>
              <Spacing {...spacingProps}>
                <UserMenu
                  mapItemToNode={mapItemToNode}
                  onItemSelect={onUserItemSelect}
                  overrides={overrides}
                  username={username}
                  usernameSubtitle={usernameSubtitle}
                  userImgUrl={userImgUrl}
                  userItems={userItems}
                />
              </Spacing>
            </Cell>
          ) : null}
        </Grid>

        {secondaryMenu && desktopSubNavPosition === POSITION.horizontal && (
          <SecondaryMenu
            items={secondaryMenu}
            mapItemToNode={mapItemToNode}
            onSelect={onMainItemSelect}
            overrides={overrides}
          />
        )}
      </div>
    </Root>
  );
}
