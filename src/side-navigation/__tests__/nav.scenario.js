/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {Navigation} from '../index.js';

export const name = 'side-navigation';

const nav = [
  {
    title: 'Colors',
    subnav: [
      {
        title: 'Shades',
        path: '#level1.1.2',
        subnav: [
          {
            title: 'Light',
            path: '#level1.1.2.1',
          },
        ],
      },
    ],
  },
  {
    title: 'Sizing',
    path: '#level1.2',
  },
  {
    title: 'Typography',
    path: '#level1.3',
  },
];

export const component = () => (
  <Navigation items={nav} overrides={{Root: {props: {'data-test': 'e2e'}}}} />
);
