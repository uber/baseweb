/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {mount} from 'enzyme';
import {Navigation, StyledNavItemContainer, NavItem} from '../index.js';

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

  it('renders titles correctly modified by transformItem', () => {
    const transformItem = item => ({
      ...item,
      title: <span>New {item.title}</span>,
    });
    const wrapper = mount(
      <Navigation items={nav} transformItem={transformItem} />,
    );
    expect(
      wrapper.find(NavItem).map(item => item.instance().props.item.title),
    ).toMatchSnapshot();
  });

  it('calls transformItem exactly once for each item', () => {
    const transformItem = jest.fn();
    transformItem.mockImplementation(item => item);
    mount(<Navigation items={nav} transformItem={transformItem} />);
    expect(transformItem).toHaveBeenCalledTimes(5);
  });
});
