/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import ChevronDown from '../../icon/chevron-down.js';
import Delete from '../../icon/delete.js';
import Upload from '../../icon/upload.js';
import Overflow from '../../icon/overflow.js';

import {AppNavBar, setItemActive} from '../index.js';

export default function Scenario() {
  const [mainItems, setMainItems] = React.useState([
    {icon: Upload, label: 'Primary A'},
    {icon: Upload, label: 'Primary B'},
    {
      icon: ChevronDown,
      label: 'Primary C',
      navExitIcon: Delete,
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
  const userItems = [
    {icon: Overflow, label: 'Account item1'},
    {icon: Overflow, label: 'Account item2'},
    {icon: Overflow, label: 'Account item3'},
    {icon: Overflow, label: 'Account item4'},
  ];

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
      overrides={{
        Root: {style: {border: 'dashed 2px red'}},
        Spacing: {style: {border: 'dashed 2px orange'}},
        AppName: {style: {border: 'dashed 2px yellow'}},
        PrimaryMenuContainer: {style: {border: 'dashed 2px green'}},
        MainMenuItem: {style: {border: 'dashed 2px blue'}},
        SubnavContainer: {style: {border: 'dashed 2px purple'}},
        SecondaryMenuContainer: {style: {border: 'dashed 2px lightskyblue'}},
        SideMenuButton: {
          props: {
            overrides: {
              BaseButton(props) {
                return <button {...props}>menu</button>;
              },
            },
          },
        },
        UserMenuProfileListItem: {style: {border: 'solid 2px red'}},
        UserProfileInfoContainer: {style: {border: 'solid 2px blue'}},
        UserProfilePictureContainer: {style: {border: 'solid 2px green'}},
        UserProfileTileContainer: {style: {border: 'solid 2px purple'}},
      }}
    />
  );
}
