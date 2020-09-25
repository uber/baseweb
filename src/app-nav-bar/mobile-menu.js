/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Button} from '../button/index.js';
import {Drawer, ANCHOR} from '../drawer/index.js';
import ArrowLeft from '../icon/arrow-left.js';
import MenuIcon from '../icon/menu.js';
import {MenuAdapter, ListItemLabel, ARTWORK_SIZES} from '../list/index.js';
import {StatefulMenu} from '../menu/index.js';

import {
  StyledSideMenuButton,
  StyledUserMenuListItem,
} from './styled-components.js';
import type {AppNavBarPropsT} from './types.js';
import UserProfileTile from './user-profile-tile.js';

const USER_MENU_ITEM = 'USER_MENU_ITEM';
const PARENT_MENU_ITEM = 'PARENT_MENU_ITEM';

const MobileNavMenuItem = React.forwardRef<{item: any}, HTMLLIElement>(
  (props, ref) => {
    const {item = {}, ...restProps} = props;
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
    if (item.USER_MENU_ITEM) {
      // Replace with a user menu item renderer
      return (
        // $FlowFixMe
        <StyledUserMenuListItem {...restProps} ref={ref}>
          <UserProfileTile {...item.item} />
        </StyledUserMenuListItem>
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
        <ListItemLabel>
          {item.mapItemToNode ? item.mapItemToNode(item) : item.label}
        </ListItemLabel>
      </MenuAdapter>
    );
  },
);

export default function MobileMenu(props: AppNavBarPropsT) {
  const {mainItems = [], userItems = [], ...rest} = props;

  const items = [
    ...(userItems.length
      ? [
          {
            item: {...rest},
            label: props.username,
            [USER_MENU_ITEM]: true,
            children: userItems,
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

  return (
    <>
      <Button
        overrides={{BaseButton: {component: StyledSideMenuButton}}}
        onClick={toggleMenu}
      >
        <MenuIcon size={'24px'} />
      </Button>
      <Drawer
        anchor={ANCHOR.left}
        isOpen={isOpen}
        onClose={toggleMenu}
        size={'75%'}
        overrides={{
          DrawerBody: {
            style: ({$theme}) => {
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
        }}
      >
        <StatefulMenu
          items={currentNavItems}
          onItemSelect={({item}) => {
            props.onItemSelect(item);
            if (item.PARENT_MENU_ITEM) {
              // Remove current parent item selected to return to
              // from the ancestors list (`ancestorNavItems[ancestorArrLength - 1]`)
              const updatedAncestorNavItems = ancestorNavItems.slice(
                0,
                ancestorNavItems.length - 1,
              );
              const isTopLevel = !updatedAncestorNavItems.length;
              if (isTopLevel) {
                // Set to the initial `navItems` value
                setCurrentNavItems(items);
              } else {
                const newParentItem = {
                  ...updatedAncestorNavItems[
                    updatedAncestorNavItems.length - 1
                  ],
                  [PARENT_MENU_ITEM]: true,
                };
                setCurrentNavItems([newParentItem, ...newParentItem.nav]);
              }
              setAncestorNavItems(updatedAncestorNavItems);
              return;
            }
            if (item.nav && item.nav.length) {
              const parentItem = {...item, [PARENT_MENU_ITEM]: true};
              setAncestorNavItems([...ancestorNavItems, item]);
              setCurrentNavItems([parentItem, ...item.nav]);
              return;
            }
            toggleMenu();
          }}
          overrides={{
            List: {
              style: {
                paddingTop: '0',
                paddingBottom: '0',
                minHeight: '100vh',
                boxShadow: 'none',
              },
            },
            ListItem: {
              component: MobileNavMenuItem,
            },
          }}
        />
      </Drawer>
    </>
  );
}
