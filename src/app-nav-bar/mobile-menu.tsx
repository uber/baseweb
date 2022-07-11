/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Button } from '../button/index';
import { Drawer, ANCHOR } from '../drawer/index';
import { getOverrides, mergeOverrides } from '../helpers/overrides';
import ArrowLeft from '../icon/arrow-left';
import MenuIcon from '../icon/menu';
import { MenuAdapter, ListItemLabel, ARTWORK_SIZES } from '../list/index';
import { StatefulMenu } from '../menu/index';

import { StyledSideMenuButton, StyledUserMenuProfileListItem } from './styled-components';
import type { AppNavBarPropsT } from './types';
import UserProfileTile from './user-profile-tile';
import { defaultMapItemToNode } from './utils';

const USER_TITLE_ITEM = 'USER_TITLE_ITEM';
const USER_MENU_ITEM = 'USER_MENU_ITEM';
const PARENT_MENU_ITEM = 'PARENT_MENU_ITEM';

// eslint-disable-next-line react/display-name
const MobileNavMenuItem = React.forwardRef((props, ref) => {
  const { item, mapItemToNode = defaultMapItemToNode, overrides = {}, ...restProps } = props;

  const [UserMenuProfileListItem, userMenuProfileListItemProps] = getOverrides(
    overrides.UserMenuProfileListItem,
    StyledUserMenuProfileListItem
  );

  if (item.PARENT_MENU_ITEM) {
    return (
      <MenuAdapter
        {...restProps}
        ref={ref}
        artwork={item.navExitIcon || ArrowLeft}
        artworkSize={ARTWORK_SIZES.LARGE}
      >
        <ListItemLabel>{item.label}</ListItemLabel>
      </MenuAdapter>
    );
  }
  if (item.USER_TITLE_ITEM) {
    // Replace with a user menu item renderer
    return (
      <UserMenuProfileListItem {...restProps} {...userMenuProfileListItemProps} ref={ref}>
        <UserProfileTile {...item.item} />
      </UserMenuProfileListItem>
    );
  }
  return (
    // Replace with a main menu item renderer
    <MenuAdapter
      {...restProps}
      ref={ref}
      artwork={item.icon || null}
      artworkSize={ARTWORK_SIZES.LARGE}
    >
      <ListItemLabel>{mapItemToNode(item)}</ListItemLabel>
    </MenuAdapter>
  );
});

export default function MobileMenu(props: AppNavBarPropsT) {
  const { mainItems = [], userItems = [], mapItemToNode, overrides = {}, ...rest } = props;

  const items = [
    ...(userItems.length
      ? [
          {
            item: { ...rest },
            label: props.username,
            [USER_TITLE_ITEM]: true,
            children: userItems.map((item) => {
              return {
                ...item,
                [USER_MENU_ITEM]: true,
              };
            }),
          },
        ]
      : []),
    ...mainItems,
  ];

  const [isOpen, setIsOpen] = React.useState(false);
  const [currentNavItems, setCurrentNavItems] = React.useState(items);
  const [ancestorNavItems, setAncestorNavItems] = React.useState([]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [SideMenuButton, sideMenuButtonProps] = getOverrides(overrides.SideMenuButton, Button);
  sideMenuButtonProps.overrides = mergeOverrides(
    { BaseButton: { component: StyledSideMenuButton } },
    sideMenuButtonProps.overrides
  );

  const [MobileDrawer, drawerProps] = getOverrides(overrides.MobileDrawer, Drawer);
  drawerProps.overrides = mergeOverrides(
    {
      DrawerBody: {
        style: ({ $theme }) => {
          return {
            marginTop: '0px',
            marginBottom: '0px',
            marginLeft: '0px',
            marginRight: '0px',
          };
        },
      },
      // Removes the close icon from the drawer
      Close: () => null,
    },
    drawerProps.overrides
  );

  const [MobileMenu, menuProps] = getOverrides(overrides.MobileMenu, StatefulMenu);
  menuProps.overrides = mergeOverrides(
    {
      List: {
        style: {
          paddingTop: '0',
          paddingBottom: '0',
          minHeight: '100vh',
          boxShadow: 'none',
        },
      },
      // eslint-disable-next-line react/display-name
      ListItem: React.forwardRef((listItemProps, ref) => {
        return (
          <MobileNavMenuItem
            ref={ref}
            {...listItemProps}
            mapItemToNode={mapItemToNode}
            overrides={overrides}
          />
        );
      }),
    },
    menuProps.overrides
  );

  return (
    <>
      <SideMenuButton onClick={toggleMenu} {...sideMenuButtonProps}>
        <MenuIcon size={'24px'} />
      </SideMenuButton>
      <MobileDrawer
        anchor={ANCHOR.left}
        isOpen={isOpen}
        onClose={toggleMenu}
        size={'75%'}
        {...drawerProps}
      >
        <MobileMenu
          items={currentNavItems}
          onItemSelect={({ item }) => {
            if (item.PARENT_MENU_ITEM) {
              // Remove current parent item selected to return to
              // from the ancestors list (`ancestorNavItems[ancestorArrLength - 1]`)
              const updatedAncestorNavItems = ancestorNavItems.slice(
                0,
                ancestorNavItems.length - 1
              );
              const isTopLevel = !updatedAncestorNavItems.length;
              if (isTopLevel) {
                // Set to the initial `navItems` value
                setCurrentNavItems(items);
              } else {
                const newParentItem = {
                  ...updatedAncestorNavItems[updatedAncestorNavItems.length - 1],
                  [PARENT_MENU_ITEM]: true,
                };
                setCurrentNavItems([newParentItem, ...newParentItem.children]);
              }
              setAncestorNavItems(updatedAncestorNavItems);
              return;
            }

            if (item.USER_MENU_ITEM && props.onUserItemSelect) {
              props.onUserItemSelect(item);
            } else if (!item.USER_TITLE_ITEM && props.onMainItemSelect) {
              props.onMainItemSelect(item);
            }

            if (item.children && item.children.length) {
              const parentItem = { ...item, [PARENT_MENU_ITEM]: true };
              setAncestorNavItems([...ancestorNavItems, item]);
              setCurrentNavItems([parentItem, ...item.children]);
              return;
            }
            toggleMenu();
          }}
          {...menuProps}
        />
      </MobileDrawer>
    </>
  );
}
