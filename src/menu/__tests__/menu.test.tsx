/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { render, getAllByTestId } from '@testing-library/react';

import Menu from '../menu';

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
    // @ts-expect-error todo(flow->ts)
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
    // @ts-expect-error todo(flow->ts)
    const { container } = render(<Menu {...props} />);
    const options = getAllByTestId(container, 'option');
    expect(options.length).toBe(2);
  });

  it('renders dividers without react key warning', () => {
    const original = console.error;
    console.error = jest.fn();
    const itemsWithDivider = [{ label: 'item1' }, { divider: true }, { label: 'item2' }];
    // @ts-expect-error todo(flow->ts)
    render(<Menu {...getSharedProps()} items={itemsWithDivider} />);
    expect(console.error).not.toHaveBeenCalledWith(
      expect.stringContaining('Each child in a list should have a unique "key" prop.'),
      expect.anything(),
      expect.anything(),
      expect.anything()
    );
    console.error = original;
  });
});
