/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { ThemeProvider, LightTheme } from '../../index';
import { AppNavBar, NavItem, setItemActive } from '../index';
import { IconProps } from '../../icon';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const XSmallFilled = ({ title, size, color, ...props }: IconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <title>{title}</title>
      <path
        d="M18.1 8.1l-2.2-2.2-3.9 4-3.9-4-2.2 2.2 4 3.9-4 3.9 2.2 2.2 3.9-4 3.9 4 2.2-2.2-4-3.9 4-3.9z"
        fill={color}
      />
    </svg>
  );
};

export function Scenario() {
  const [mainItems, setMainItems] = React.useState<NavItem[]>([
    { label: 'Primary A' },
    { label: 'Primary B' },
    {
      label: 'Primary C',
      children: [
        { label: 'Secondary A' },
        { label: 'Secondary B' },
        { label: 'Secondary C' },
        { label: 'Secondary D' },
      ],
    },

    {
      label: 'Primary D',
      children: [
        {
          label: 'Secondary E',
          children: [{ label: 'Tertiary A' }, { label: 'Tertiary B' }],
        },

        { label: 'Secondary F' },
      ],
    },
  ]);

  const userItems = [
    { label: 'Account item1' },
    { label: 'Account item2' },
    { label: 'Account item3' },
    { label: 'Account item4' },
  ];

  function handleMainItemSelect(item) {
    setMainItems((prev) => setItemActive(prev, item));
  }

  return (
    <ThemeProvider
      theme={{
        ...LightTheme,
        icons: {
          ChevronDown: (p) => <XSmallFilled {...p} color="pink" />,
          ChevronUp: (p) => <XSmallFilled {...p} color="green" />,
        },
      }}
    >
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
    </ThemeProvider>
  );
}
