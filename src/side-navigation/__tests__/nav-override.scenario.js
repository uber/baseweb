/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Navigation} from '../index.js';

export default function Scenario() {
  const [activeItemId, setActiveItemId] = React.useState('222');
  return (
    <Navigation
      items={[
        {
          title: '111',
          itemId: '111',
          isInvalid: true,
        },
        {
          title: '222',
          itemId: '222',
          isInvalid: false,
        },
      ]}
      activeItemId={activeItemId}
      onChange={({item}) => setActiveItemId(item.itemId)}
      overrides={{
        NavItem: {
          style: ({$item: {isInvalid}}) => ({
            color: isInvalid ? 'red' : 'black',
          }),
        },
      }}
    />
  );
}
