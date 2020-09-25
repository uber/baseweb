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
import Upload from '../../icon/upload.js';
import UserIcon from '../../icon/overflow.js';
import {Unstable_AppNavBar as AppNavBar, POSITION} from '../index.js';

export default function Scenario() {
  const [activeNavItem, setActiveNavItem] = React.useState();
  const [mainItems, setMainItems] = React.useState([
    {id: 1, icon: Upload, label: 'Primary alpha1'},
    {id: 2, icon: Upload, label: 'Primary alpha2'},
    {
      id: 3,
      icon: ChevronDown,
      label: 'Primary alpha3',
      navExitIcon: Delete,
      navPosition: {
        desktop: POSITION.horizontal,
      },
      children: [
        {id: 4, icon: Upload, label: 'Secondary menu1'},
        {id: 5, icon: Upload, label: 'Secondary menu2'},
        {id: 6, icon: Upload, label: 'Secondary menu3'},
        {id: 7, icon: Upload, label: 'Secondary menu4'},
      ],
    },
    {
      id: 8,
      icon: ChevronDown,
      label: 'Primary alpha4',
      navExitIcon: Delete,
      navPosition: {
        desktop: POSITION.horizontal,
        mobile: POSITION.horizontal,
      },
      children: [
        {
          id: 9,
          icon: ChevronDown,
          label: 'Secondary menu1',
          children: [
            {id: 10, icon: Upload, label: 'Tertiary menu1'},
            {id: 11, icon: Upload, label: 'Tertiary menu2'},
          ],
        },
        {id: 12, icon: Upload, label: 'Secondary menu2'},
      ],
    },
  ]);
  const [userItems, setUserItems] = React.useState([
    {id: 1, icon: UserIcon, label: 'Account item1'},
    {id: 2, icon: UserIcon, label: 'Account item2'},
    {id: 3, icon: UserIcon, label: 'Account item3'},
    {id: 4, icon: UserIcon, label: 'Account item4'},
  ]);

  function setItemActive(item, id) {
    const next = {...item};

    if (item.id === id) {
      next.active = true;
    } else if (next.children) {
      next.children = next.children.map(child => setItemActive(child, id));
      if (next.children.some(child => child.active)) {
        next.active = true;
      }
    } else {
      next.active = false;
    }
    return next;
  }

  function handleMainItemSelect(item) {
    console.log(item);
    setMainItems(prev => prev.map(i => setItemActive(i, i.id)));
  }

  return (
    <AppNavBar
      title="Uber Something"
      mainItems={mainItems}
      userItems={userItems}
      onMainItemSelect={item => {
        console.log('main', item);
      }}
      onUserItemSelect={item => {
        console.log('user', item);
      }}
      username="Umka Marshmallow"
      usernameSubtitle="5.0"
      userImgUrl=""
    />
  );
}
