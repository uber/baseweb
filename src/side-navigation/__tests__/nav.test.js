/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {mount} from 'enzyme';
import {Navigation, StyledNavItemContainer} from '../index.js';

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

  it('renders titles correctly modified by mapItem', () => {
    const Title = ({item}) => <span>New {item.title}</span>;
    const mapItem = item => ({
      ...item,
      title: <Title item={item} />,
    });
    const wrapper = mount(<Navigation items={nav} mapItem={mapItem} />);
    expect(wrapper.find(Title)).toHaveLength(5);
  });

  it('calls mapItem exactly once for each item', () => {
    const mapItem = jest.fn();
    mapItem.mockImplementation(item => item);
    mount(<Navigation items={nav} mapItem={mapItem} />);
    expect(mapItem).toHaveBeenCalledTimes(5);
  });
});
