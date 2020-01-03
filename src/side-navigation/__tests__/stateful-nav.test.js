/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {shallow} from 'enzyme';
import StatefulNavigation from '../stateful-nav.js';

const nav = [
  {
    title: 'Colors',
    subNav: [
      {
        title: 'Shades',
        itemId: '#level1.1.2',
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

describe('Navigation', () => {
  test('basic render', () => {
    const props = {
      items: nav,
      onChange: jest.fn(),
    };
    const component = shallow(<StatefulNavigation {...props} />);
    expect(component).toMatchSnapshot('renders <StatefulContainer/>');
    expect(component.dive()).toMatchSnapshot(
      'renders <Navigation/> as a child',
    );
  });
});
