/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import ChevronDown from '../../icon/chevron-down.js';
import Delete from '../../icon/delete.js';
import Upload from '../../icon/upload.js';
import Overflow from '../../icon/overflow.js';

import { AppNavBar, setItemActive } from '../index.js';

const expandBorderStyles = (str) => {
  const val = str.split(' ');
  return {
    borderTopColor: val[2],
    borderRightColor: val[2],
    borderBottomColor: val[2],
    borderLeftColor: val[2],
    borderTopStyle: val[0],
    borderRightStyle: val[0],
    borderBottomStyle: val[0],
    borderLeftStyle: val[0],
    borderTopWidth: val[1],
    borderRightWidth: val[1],
    borderBottomWidth: val[1],
    borderLeftWidth: val[1],
  };
};

export function Scenario() {
  const [mainItems, setMainItems] = React.useState([
    { icon: Upload, label: 'Primary A' },
    { icon: Upload, label: 'Primary B' },
    {
      icon: ChevronDown,
      label: 'Primary C',
      navExitIcon: Delete,
      children: [
        { icon: Upload, label: 'Secondary A' },
        { icon: Upload, label: 'Secondary B' },
        { icon: Upload, label: 'Secondary C' },
        { icon: Upload, label: 'Secondary D' },
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
            { icon: Upload, label: 'Tertiary A' },
            { icon: Upload, label: 'Tertiary B' },
          ],
        },

        { icon: Upload, label: 'Secondary F' },
      ],
    },
  ]);

  const userItems = [
    { icon: Overflow, label: 'Account item1' },
    { icon: Overflow, label: 'Account item2' },
    { icon: Overflow, label: 'Account item3' },
    { icon: Overflow, label: 'Account item4' },
  ];

  function handleMainItemSelect(item) {
    setMainItems((prev) => setItemActive(prev, item));
  }

  return (
    <AppNavBar
      title="Uber Something"
      mainItems={mainItems}
      userItems={userItems}
      onMainItemSelect={handleMainItemSelect}
      onUserItemSelect={(item) => console.log('user', item)}
      username="Umka Marshmallow"
      usernameSubtitle="5.0"
      userImgUrl=""
      overrides={{
        Root: { style: { ...expandBorderStyles('dashed 2px red') } },
        Spacing: { style: { ...expandBorderStyles('dashed 2px orange') } },
        AppName: { style: { ...expandBorderStyles('dashed 2px yellow') } },
        PrimaryMenuContainer: {
          style: { ...expandBorderStyles('dashed 2px green') },
        },

        DesktopMenu: { style: { ...expandBorderStyles('dashed 2px pink') } },
        DesktopMenuContainer: { style: { ...expandBorderStyles('dashed 2px tomato') } },

        MainMenuItem: { style: { ...expandBorderStyles('dashed 2px blue') } },
        SubnavContainer: { style: { ...expandBorderStyles('dashed 2px purple') } },
        SecondaryMenuContainer: {
          style: { ...expandBorderStyles('dashed 2px lightskyblue') },
        },

        SideMenuButton: {
          props: {
            overrides: {
              BaseButton(props) {
                console.log(props);
                return <button onClick={props.onClick}>menu</button>;
              },
            },
          },
        },

        UserMenuProfileListItem: {
          style: { ...expandBorderStyles('solid 2px red') },
        },

        UserProfileInfoContainer: {
          style: { ...expandBorderStyles('solid 2px blue') },
        },

        UserProfilePictureContainer: {
          style: { ...expandBorderStyles('solid 2px green') },
        },

        UserProfileTileContainer: {
          style: { ...expandBorderStyles('solid 2px purple') },
        },
      }}
    />
  );
}
