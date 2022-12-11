/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { render } from '@testing-library/react';

import StatefulMenu from '../stateful-menu';

describe('Menu StatefulMenu', () => {
  it('renders with props', () => {
    const props = {
      items: [{ label: 'item1' }, { label: 'item2' }],
      // @ts-ignore
      getItemLabel: (item) => item.label,
    };
    const { container } = render(<StatefulMenu {...props} />);

    const list = container.querySelector('ul');
    expect(list).not.toBeNull();

    const items = container.querySelectorAll('li');
    expect(items.length).toBe(2);
  });
});
