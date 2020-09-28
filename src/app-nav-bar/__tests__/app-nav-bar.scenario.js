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
import {
  Unstable_AppNavBar as AppNavBar,
  setItemActive,
  POSITION,
} from '../index.js';

export default function Scenario() {
  const [activeNavItem, setActiveNavItem] = React.useState();
  const [mainItems, setMainItems] = React.useState([
    {icon: Upload, label: 'Primary A'},
    {icon: Upload, label: 'Primary B'},
    {
      icon: ChevronDown,
      label: 'Primary C',
      navExitIcon: Delete,
      navPosition: {
        desktop: POSITION.horizontal,
      },
      children: [
        {icon: Upload, label: 'Secondary A'},
        {icon: Upload, label: 'Secondary B'},
        {icon: Upload, label: 'Secondary C'},
        {icon: Upload, label: 'Secondary D'},
      ],
    },
    {
      icon: ChevronDown,
      label: 'Primary D',
      navExitIcon: Delete,
      navPosition: {
        desktop: POSITION.horizontal,
        mobile: POSITION.horizontal,
      },
      children: [
        {
          icon: ChevronDown,
          label: 'Secondary E',
          children: [
            {icon: Upload, label: 'Tertiary A'},
            {icon: Upload, label: 'Tertiary B'},
          ],
        },
        {icon: Upload, label: 'Secondary F'},
      ],
    },
  ]);
  const [userItems, setUserItems] = React.useState([
    {icon: UserIcon, label: 'Account item1'},
    {icon: UserIcon, label: 'Account item2'},
    {icon: UserIcon, label: 'Account item3'},
    {icon: UserIcon, label: 'Account item4'},
  ]);

  function handleMainItemSelect(item) {
    setMainItems(prev => setItemActive(prev, item));
  }

  return (
    <AppNavBar
      title="Uber Something"
      mainItems={mainItems}
      userItems={userItems}
      onMainItemSelect={handleMainItemSelect}
      onUserItemSelect={item => console.log('user', item)}
      username="Umka Marshmallow"
      usernameSubtitle="5.0"
      userImgUrl=""
    />
  );
}
