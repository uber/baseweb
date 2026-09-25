/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { render } from '@testing-library/react';

import { AppNavBar } from '..';
import type { NavItem } from '../types';

const mainItems: NavItem[] = [
  {
    label: 'Primary A',
    active: true,
    navPosition: { mobile: 'horizontal', desktop: 'vertical' },
    children: [{ label: 'Secondary A' }, { label: 'Secondary B' }],
  },
];

describe('AppNavBar', () => {
  it('renders the horizontal mobile sub-nav when the active item requests it', () => {
    const { queryAllByLabelText } = render(<AppNavBar title="Uber" mainItems={mainItems} />);

    // navPosition.mobile is 'horizontal' and navPosition.desktop is 'vertical', so exactly one
    // "Secondary navigation" nav (the mobile one) should render.
    expect(queryAllByLabelText('Secondary navigation')).toHaveLength(1);
  });
});
