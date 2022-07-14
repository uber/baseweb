/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import ChevronDown from '../../icon/chevron-down';
import Delete from '../../icon/delete';
import Upload from '../../icon/upload';
import Overflow from '../../icon/overflow';

import { AppNavBar, NavItem, setItemActive } from '..';

export function Scenario() {
  const [mainItems, setMainItems] = React.useState<NavItem[]>([
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
    />
  );
}
