/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {StatefulMenu} from '../../menu/index.js';
import MobileNavMenuItem from './mobile-nav-menu-item.js';
import type {AppNavBarPropsT} from '../types.js';

const USER_MENU_ITEM = 'USER_MENU_ITEM';
const PARENT_MENU_ITEM = 'PARENT_MENU_ITEM';

export default function MobileNavMenu(props: {|
  ...AppNavBarPropsT,
  ...{|close: () => void|},
|}) {
  const {mainNav = [], userNav = [], close = () => {}, ...rest} = props;
  const navItems = [
    {
      item: {...rest},
      mapItemToString: item => item.username || '',
      [USER_MENU_ITEM]: true,
      nav: userNav,
    },
    ...mainNav,
  ];
  const [currentNavItems, setCurrentNavItems] = React.useState(navItems);
  const [ancestorNavItems, setAncestorNavItems] = React.useState([]);

  return (
    <StatefulMenu
      items={currentNavItems}
      onItemSelect={(params, ...args) => {
        const {item} = params;
        props.onNavItemSelect(params, ...args);
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
            setCurrentNavItems(navItems);
          } else {
            const newParentItem = {
              ...updatedAncestorNavItems[updatedAncestorNavItems.length - 1],
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
        close();
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
  );
}
