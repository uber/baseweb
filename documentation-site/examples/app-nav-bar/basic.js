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

const MAIN_NAV = [
  {icon: Icon, label: 'Primary alpha1'},
  {icon: Icon, label: 'Primary alpha2'},
  {
    icon: ChevronDown,
    label: 'Primary alpha3',
    nav: [
      {icon: Icon, label: 'Secondary menu1'},
      {icon: Icon, label: 'Secondary menu2'},
    ],
    subnavExitIcon: Delete,
  },
  {
    active: true,
    icon: ChevronDown,
    label: 'Primary alpha4',
    nav: [
      {
        icon: ChevronDown,
        label: 'Secondary menu1',
        nav: [
          {icon: Icon, label: 'Tertiary menu1'},
          {icon: Icon, label: 'Tertiary menu2'},
        ],
      },
      {icon: Icon, label: 'Secondary menu2'},
    ],
    subnavExitIcon: Delete,
  },
];

const USER_NAV = [
  {icon: UserIcon, label: 'Account item1'},
  {icon: UserIcon, label: 'Account item2'},
  {icon: UserIcon, label: 'Account item3'},
  {icon: UserIcon, label: 'Account item4'},
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
