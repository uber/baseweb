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

  it('labels each tabpanel with the id of the tab that controls it', () => {
    const items = Array.from({ length: 6 }).map((_, idx) => (
      <NavItem key={idx} title={`Item ${idx}`} icon={Overflow}>
        {`panel ${idx}`}
      </NavItem>
    ));

    const { getByText, getAllByRole } = render(
      <BottomNavigation activeKey={0}>{items}</BottomNavigation>
    );

    const panels = getAllByRole('tabpanel', { hidden: true });
    const tabIds = getAllByRole('tab').map((tab) => tab.id);

    // Items 0-3 each have their own tab; item 4 (and beyond) is only reachable
    // via the "More" overflow tab, so its panel must be labelled by that tab.
    panels.slice(0, 4).forEach((panel, idx) => {
      expect(panel).toHaveAttribute('aria-labelledby', tabIds[idx]);
    });
    const moreTabId = getByText('More').closest('[role="tab"]')?.id;
    expect(panels[4]).toHaveAttribute('aria-labelledby', moreTabId);

    // Every referenced id must resolve to an element that actually exists.
    panels.forEach((panel) => {
      const labelledBy = panel.getAttribute('aria-labelledby');
      expect(labelledBy).toBeTruthy();
      expect(document.getElementById(labelledBy as string)).not.toBeNull();
    });
  });
});
