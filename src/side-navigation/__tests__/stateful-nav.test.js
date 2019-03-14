/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {shallow} from 'enzyme';
import {StatefulNavigation} from '../index.js';

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
