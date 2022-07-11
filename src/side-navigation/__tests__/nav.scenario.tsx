/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Navigation } from '../index';

const nav = [
  {
    title: 'Colors',
    subNav: [
      {
        title: 'Shades',
        itemId: '/',
        subNav: [
          {
            title: 'Light',
            itemId: '#level1.1.1.1',
          },
        ],
      },
    ],
  },

  {
    title: 'Sizing',
    itemId: '#level1.2',
    disabled: true,
  },

  {
    title: 'Typography',
    itemId: '#level1.3',
  },
];

export function Scenario() {
  return <Navigation items={nav} overrides={{ Root: { props: { 'data-test': 'e2e' } } }} />;
}
