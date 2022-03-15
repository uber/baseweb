/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import { AppNavBar } from '../index.js';

const mainItems = [
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
];

const userItems = [
  { label: 'Account item1' },
  { label: 'Account item2' },
  { label: 'Account item3' },
  { label: 'Account item4' },
];

export function Scenario() {
  const [activeLabel, setActiveLabel] = React.useState('Secondary A');

  const handleMainItemSelect = React.useCallback((item) => setActiveLabel(item.label), []);

  const isMainItemActive = React.useCallback((item) => item.label === activeLabel, [activeLabel]);

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
      isMainItemActive={isMainItemActive}
    />
  );
}
