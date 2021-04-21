/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
import * as React from 'react';
import {render, getByTestId} from '@testing-library/react';

import OptionList from '../option-list.js';

const mockItem = {label: 'item1'};

function getSharedProps() {
  return {
    item: mockItem,
    getItemLabel: item => item.label,
  };
}

describe('Option List Stateless Component', () => {
  it('basic renders', () => {
    const {container} = render(<OptionList {...getSharedProps()} />);

    const item = container.querySelector('li');
    expect(item.textContent).toBe(mockItem.label);
  });

  it('renders with components overrides', () => {
    const NewListItem = () => <div data-testid="list-item" />;
    const props = {
      ...getSharedProps(),
      overrides: {
        ListItem: {
          component: NewListItem,
          props: {
            custom: 'prop',
          },
        },
      },
    };
    const {container} = render(<OptionList {...props} />);
    getByTestId(container, 'list-item');
  });
});
