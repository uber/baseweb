/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {StyledLink} from '../../link/index.js';
import ChevronDown from '../../icon/chevron-down.js';
import Delete from '../../icon/delete.js';
import Icon from '../../icon/upload.js';
import UserIcon from '../../icon/overflow.js';
import {Unstable_AppNavBar as AppNavBar, POSITION} from '../index.js';

function renderItem(item) {
  return item.label;
}

const MAIN_NAV = [
  {
    icon: Icon,
    item: {label: 'Primary alpha1'},
    mapItemToNode: renderItem,
    mapItemToString: renderItem,
  },
  {
    icon: Icon,
    item: {label: 'Primary alpha2'},
    mapItemToNode: renderItem,
    mapItemToString: renderItem,
  },
  {
    icon: ChevronDown,
    item: {label: 'Primary alpha3'},
    mapItemToNode: renderItem,
    mapItemToString: renderItem,
    navExitIcon: Delete,
    navPosition: {
      desktop: POSITION.horizontal,
    },
    nav: [
      {
        icon: Icon,
        item: {label: 'Secondary menu1'},
        mapItemToNode: renderItem,
        mapItemToString: renderItem,
      },
      {
        icon: Icon,
        item: {label: 'Secondary menu2'},
        mapItemToNode: renderItem,
        mapItemToString: renderItem,
      },
      {
        icon: Icon,
        item: {label: 'Secondary menu3'},
        mapItemToNode: renderItem,
        mapItemToString: renderItem,
      },
      {
        icon: Icon,
        item: {label: 'Secondary menu4'},
        mapItemToNode: renderItem,
        mapItemToString: renderItem,
      },
    ],
  },
  {
    icon: ChevronDown,
    item: {label: 'Primary alpha4'},
    mapItemToNode: renderItem,
    mapItemToString: renderItem,
    navExitIcon: Delete,
    navPosition: {
      desktop: POSITION.horizontal,
      mobile: POSITION.horizontal,
    },
    nav: [
      {
        icon: ChevronDown,
        item: {label: 'Secondary menu1'},
        mapItemToNode: renderItem,
        mapItemToString: renderItem,
        nav: [
          {
            icon: Icon,
            item: {label: 'Tertiary menu1'},
            mapItemToNode: renderItem,
            mapItemToString: renderItem,
          },
          {
            icon: Icon,
            item: {label: 'Tertiary menu2'},
            mapItemToNode: renderItem,
            mapItemToString: renderItem,
          },
        ],
      },
      {
        icon: Icon,
        item: {label: 'Secondary menu2'},
        mapItemToNode: renderItem,
        mapItemToString: renderItem,
      },
    ],
  },
];

const USER_NAV = [
  {
    icon: UserIcon,
    item: {label: 'Account item1'},
    mapItemToNode: renderItem,
    mapItemToString: renderItem,
  },
  {
    icon: UserIcon,
    item: {label: 'Account item2'},
    mapItemToNode: renderItem,
    mapItemToString: renderItem,
  },
  {
    icon: UserIcon,
    item: {label: 'Account item3'},
    mapItemToNode: renderItem,
    mapItemToString: renderItem,
  },
  {
    icon: UserIcon,
    item: {label: 'Account item4'},
    mapItemToNode: renderItem,
    mapItemToString: renderItem,
  },
];

function isActive(arr, item, activeItem): boolean {
  let active = false;
  for (let i = 0; i < arr.length; i++) {
    const elm = arr[i];
    if (elm === item) {
      if (item === activeItem) return true;
      return isActive((item && item.nav) || [], activeItem, activeItem);
    } else if (elm.nav) {
      active = isActive(elm.nav || [], item, activeItem);
    }
  }
  return active;
}

export default function Scenario() {
  const [activeNavItem, setActiveNavItem] = React.useState();
  const appDisplayName = (
    <StyledLink
      $style={{
        textDecoration: 'none',
        color: 'inherit',
        ':hover': {color: 'inherit'},
        ':visited': {color: 'inherit'},
      }}
      href={'#'}
    >
      Uber Something
    </StyledLink>
  );
  return (
    <AppNavBar
      appDisplayName={appDisplayName}
      mainNav={MAIN_NAV}
      isNavItemActive={({item}) => {
        return (
          item === activeNavItem || isActive(MAIN_NAV, item, activeNavItem)
        );
      }}
      onNavItemSelect={({item}) => {
        if (item === activeNavItem) return;
        setActiveNavItem(item);
      }}
      userNav={USER_NAV}
      username="Umka Marshmallow"
      usernameSubtitle="5.0"
      userImgUrl=""
    />
  );
}
