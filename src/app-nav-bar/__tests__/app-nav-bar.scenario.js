/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import ChevronDown from '../../icon/chevron-down.js';
import Delete from '../../icon/delete.js';
import Icon from '../../icon/upload.js';
import UserIcon from '../../icon/overflow.js';
import {Unstable_AppNavBar as AppNavBar, NAV_POSITION} from '../index.js';

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
      desktop: NAV_POSITION.horizontal,
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
      desktop: NAV_POSITION.horizontal,
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

function findAndSetActiveChain(item, arr): [boolean, Array<any>] {
  let returnValue = [false, arr];
  for (let i = 0; i < arr.length; i++) {
    const elm = arr[i];
    if (elm === item) {
      const newArr = [...arr];
      newArr[i] = {...elm, active: true};
      returnValue = [true, newArr];
      break;
    } else if (elm.nav) {
      const [foundItem, updatedSubnav] = findAndSetActiveChain(item, elm.nav);
      if (foundItem) {
        const newArr = [...arr];
        newArr[i] = {...elm, active: true, nav: updatedSubnav};
        returnValue = [true, newArr];
        break;
      }
    }
  }
  return returnValue;
}

export default function Scenario() {
  const [nav, setNav] = React.useState(MAIN_NAV);
  return (
    <AppNavBar
      appDisplayName="Uber Something"
      mainNav={nav}
      onNavItemSelect={({item}) => {
        if (item.active) return;
        const [_, nextNav] = findAndSetActiveChain(item, MAIN_NAV);
        setNav(nextNav);
      }}
      userNav={USER_NAV}
      username="Umka Marshmallow"
      usernameSubtitle="5.0"
      userImgUrl=""
    />
  );
}
