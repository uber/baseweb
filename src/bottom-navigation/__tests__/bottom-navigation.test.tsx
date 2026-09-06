/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { BottomNavigation, NavItem } from '..';
import { Overflow } from '../../icon';

describe('BottomNavigation', () => {
  it('highlights the overflow selector when the active item is only reachable via More', () => {
    const items = Array.from({ length: 6 }).map((_, idx) => (
      <NavItem key={idx} title={`Item ${idx}`} icon={Overflow}>
        {`panel ${idx}`}
      </NavItem>
    ));

    const { getByText } = render(<BottomNavigation activeKey={4}>{items}</BottomNavigation>);

    // Item 4 only renders inside the overflow panel/selector (the first 4 items get
    // direct selectors), so its being active must highlight the "More" tab.
    const moreTab = getByText('More').closest('[role="tab"]');
    expect(moreTab).toHaveAttribute('aria-selected', 'true');
  });
});
