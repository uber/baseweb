/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {render, getByText} from '@testing-library/react';

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
    const {container} = render(<StatefulNavigation {...props} />);
    getByText(container, 'Colors');
    getByText(container, 'Sizing');
    getByText(container, 'Typography');
  });
});
