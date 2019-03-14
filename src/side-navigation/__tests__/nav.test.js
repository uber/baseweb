/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {mount} from 'enzyme';
import {Navigation, StyledItemContainer, StyledLink} from '../index.js';

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
            path: '#level1.1.2.2',
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

describe('Table', () => {
  it('renders expected number of rows', () => {
    const wrapper = mount(<Navigation items={nav} />);

    expect(wrapper.find(StyledItemContainer)).toHaveLength(5);
    expect(wrapper.find(StyledLink)).toHaveLength(4);
  });
});
