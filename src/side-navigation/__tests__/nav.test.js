/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {mount} from 'enzyme';
import {Navigation, StyledNavItemContainer} from '../index.js';

const nav = [
  {
    title: 'Colors',
    subnav: [
      {
        title: 'Shades',
        itemId: '/',
        subnav: [
          {
            title: 'Light',
            itemId: '#level1.1.2.2',
          },
        ],
      },
    ],
  },
  {
    title: 'Sizing',
    itemId: '#level1.2',
  },
  {
    title: 'Typography',
    itemId: '#level1.3',
  },
];

describe('Side navigation', () => {
  it('renders expected number of nav items', () => {
    const wrapper = mount(<Navigation items={nav} />);
    expect(wrapper.find(StyledNavItemContainer)).toHaveLength(5);
  });
});
