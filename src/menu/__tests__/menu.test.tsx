/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import { render, getAllByTestId } from '@testing-library/react';

import Menu from '../menu.js';

const mockItems = [{ label: 'item1' }, { label: 'item2' }];

function getSharedProps() {
  return {
    items: mockItems,
    getItemLabel: (item) => item.label,
    rootRef: React.createRef(),
  };
}

describe('Menu Stateless Component', () => {
  it('renders basic menu', () => {
    const { container } = render(<Menu {...getSharedProps()} />);

    const list = container.querySelector('ul');
    expect(list).not.toBeNull();

    const items = container.querySelectorAll('li');
    expect(items.length).toBe(2);
  });

  it('renders with components overrides', () => {
    const NewOption = () => <div data-testid="option" />;
    const props = {
      ...getSharedProps(),
      overrides: {
        Option: {
          component: NewOption,
        },
      },
    };
    const { container } = render(<Menu {...props} />);
    const options = getAllByTestId(container, 'option');
    expect(options.length).toBe(2);
  });
});
