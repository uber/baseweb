/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {useStyletron} from 'baseui';
import {Button} from 'baseui/button';
import {ChevronDown, Delete, Overflow as UserIcon, Upload as Icon} from 'baseui/icon';
import {Unstable_AppNavBar as AppNavBar} from 'baseui/app-nav-bar';

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
    ],
    navExitIcon: Delete,
  },
  {
    active: true,
    icon: ChevronDown,
    item: {label: 'Primary alpha4'},
    mapItemToNode: renderItem,
    mapItemToString: renderItem,
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
    navExitIcon: Delete,
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

export default () => {
  const [css] = useStyletron();
  const [isNavBarVisible, setIsNavBarVisible] = React.useState(false);
  return (
    <>
      <Button onClick={() => setIsNavBarVisible(!isNavBarVisible)}>{isNavBarVisible ? 'Hide' : 'Show'} navigation bar</Button>
      {isNavBarVisible ? (
        <div className={css({
          boxSizing: 'border-box', 
          width: '100vw', 
          position: 'fixed', 
          top: '0', 
          left: '0'
        })}>
          <AppNavBar
            appDisplayName="Uber Something"
            mainNav={MAIN_NAV}
            onNavItemSelect={({item}) => {
              console.log(item);
            }}
            userNav={USER_NAV}
            username="Umka Marshmallow"
            usernameSubtitle="5.0"
            userImgUrl=""
          />
        </div>
      ) : null}
    </>
  );
}
