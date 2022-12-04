/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { getOverrides } from '../helpers/overrides';
import { useStyletron } from '../styles';
import { isFocusVisible } from '../utils/focusVisible';

import { KIND, POSITION } from './constants';
import MobileNav from './mobile-menu';
import UserMenu from './user-menu';
import {
  StyledRoot,
  StyledSpacing,
  StyledPrimaryMenuContainer,
  StyledSecondaryMenuContainer,
  StyledAppName,
  StyledMainMenuItem,
  StyledDesktopMenuContainer,
  StyledDesktopMenu,
} from './styled-components';
import type { AppNavBarProps } from './types';
import { defaultMapItemToNode, mapItemsActive } from './utils';

// @ts-ignore
function MainMenuItem(props) {
  const { item, kind = KIND.primary, mapItemToNode, onSelect, overrides = {} } = props;
  const [focusVisible, setFocusVisible] = React.useState(false);

  // @ts-ignore
  function handleFocus(event) {
    if (isFocusVisible(event)) {
      setFocusVisible(true);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  function handleBlur(event) {
    if (focusVisible) {
      setFocusVisible(false);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  function handleClick(event) {
    if (onSelect) {
      onSelect(item);
    }
  }

  // @ts-ignore
  function handleKeyDown(event) {
    if (event.key === 'Enter' && onSelect) {
      onSelect(item);
    }
  }

  const [MainMenuItemElement, mainMenuItemElementProps] = getOverrides(
    overrides.MainMenuItem,
    StyledMainMenuItem
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

// @ts-ignore
function SecondaryMenu(props) {
  const { items = [], mapItemToNode, onSelect, overrides = {} } = props;

  const [SecondaryMenuContainer, secondaryMenuContainerProps] = getOverrides(
    overrides.SecondaryMenuContainer,
    StyledSecondaryMenuContainer
  );

  return (
    <SecondaryMenuContainer
      role="navigation"
      aria-label="Secondary navigation"
      {...secondaryMenuContainerProps}
    >
      {/* @ts-ignore */}
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
  );
}

export default function AppNavBar(props: AppNavBarProps) {
  const [css, theme] = useStyletron();
  const {
    title,
    mapItemToNode = defaultMapItemToNode,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onMainItemSelect = (item) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onUserItemSelect = (item) => {},
    overrides = {},
    userItems = [],
    username,
    usernameSubtitle,
    userImgUrl,
  } = props;

  const mainItems = React.useMemo(() => {
    if (props.isMainItemActive) {
      return mapItemsActive(props.mainItems || [], props.isMainItemActive);
    }
    return props.mainItems || [];
  }, [props.mainItems, props.isMainItemActive]);

  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
  const [Spacing, spacingProps] = getOverrides(overrides.Spacing, StyledSpacing);
  const [AppName, appNameProps] = getOverrides(overrides.AppName, StyledAppName);
  const [PrimaryMenuContainer, primaryMenuContainerProps] = getOverrides(
    overrides.PrimaryMenuContainer,
    StyledPrimaryMenuContainer
  );
  const [DesktopMenuContainer, desktopMenuContainerProps] = getOverrides(
    overrides.DesktopMenuContainer,
    StyledDesktopMenuContainer
  );
  const [DesktopMenu, desktopMenuProps] = getOverrides(overrides.DesktopMenu, StyledDesktopMenu);

  let secondaryMenu;
  let desktopSubNavPosition: typeof POSITION[keyof typeof POSITION] = POSITION.horizontal;
  let mobileSubNavPosition: typeof POSITION[keyof typeof POSITION] = POSITION.vertical;

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
        <Spacing {...spacingProps}>
          {mainItems.length || userItems.length ? <MobileNav {...props} /> : null}
          <AppName {...appNameProps}>{title}</AppName>
        </Spacing>

        {secondaryMenu &&
          // @ts-expect-error todo(flow->ts) always false
          mobileSubNavPosition === POSITION.horizontal && (
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
        <DesktopMenuContainer {...desktopMenuContainerProps}>
          <DesktopMenu {...desktopMenuProps}>
            {/* Replace with a Logo renderer */}
            <AppName {...appNameProps}>{title}</AppName>

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
                    desktopSubNavPosition = item.navPosition.desktop || desktopSubNavPosition;
                    mobileSubNavPosition = item.navPosition.mobile || mobileSubNavPosition;
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

            {userItems.length ? (
              <UserMenu
                mapItemToNode={mapItemToNode}
                onItemSelect={onUserItemSelect}
                overrides={overrides}
                username={username}
                usernameSubtitle={usernameSubtitle}
                userImgUrl={userImgUrl}
                userItems={userItems}
              />
            ) : null}
          </DesktopMenu>
        </DesktopMenuContainer>

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
