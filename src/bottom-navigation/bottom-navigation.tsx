/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Selector } from './selector';
import { Panel } from './panel';
import {
  StyledRoot,
  StyledSelectorList,
  StyledOverflowPanel,
  StyledOverflowPanelList,
} from './styled-components';
import { getOverrides } from '../helpers/overrides';
import { ListItem, ListItemLabel } from '../list';
import { MobileHeader } from '../mobile-header';
import { Overflow, ChevronRight } from '../icon';
import type { BottomNavigationProps } from './types';

const MAX_SELECTORS = 5;

const BottomNavigation = ({
  activeKey = 0,
  onChange,
  children,
  overrides = {},
}: BottomNavigationProps) => {
  const [Root, RootProps] = getOverrides(overrides.Root, StyledRoot);
  const [SelectorList, SelectorListProps] = getOverrides(
    overrides.SelectorList,
    StyledSelectorList
  );
  const [OverflowPanel, OverflowPanelProps] = getOverrides(
    overrides.OverflowPanel,
    StyledOverflowPanel
  );
  const [OverflowPanelList, OverflowPanelListProps] = getOverrides(
    overrides.OverflowPanelList,
    StyledOverflowPanelList
  );

  const [displayOverflow, setDisplayOverflow] = React.useState(false);

  const NavItemPanelRefs = React.useRef([]);

  function scrollToTop(idx) {
    // @ts-expect-error todo(ts-migration) TS2339 Property 'scrollTo' does not exist on type 'never'.
    NavItemPanelRefs.current[idx].scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  function handleNavItemChange(activeKey) {
    if (displayOverflow) {
      setDisplayOverflow(false);
    }
    // @ts-expect-error todo(ts-migration) TS2722 Cannot invoke an object which is possibly 'undefined'.
    onChange({ activeKey });
  }

  const renderSelectors = (navItems) =>
    navItems.map((navItem: React.ReactElement, idx) => {
      const isActive = activeKey === idx && !displayOverflow;
      return (
        <Selector
          title={navItem.props.title}
          icon={navItem.props.icon}
          isActive={isActive}
          onChange={() => {
            isActive ? scrollToTop(idx) : handleNavItemChange(idx);
          }}
          overrides={navItem.props.overrides}
          key={idx}
        />
      );
    });

  const OverflowSelector = () => (
    <Selector
      title="More"
      icon={Overflow}
      onChange={() => setDisplayOverflow(true)}
      isActive={displayOverflow || activeKey > 4}
      overrides={{ Title: overrides.OverflowTitle, Selector: overrides.OverflowSelector }}
      key={'more'}
    />
  );

  const navItems = React.Children.toArray(children);

  return (
    <Root {...RootProps}>
      {navItems.map((navItem: React.ReactElement, idx) => {
        if (!navItem) return;
        const isActive = activeKey === idx && !displayOverflow;
        return (
          <Panel
            isActive={isActive}
            // @ts-expect-error todo(ts-migration) TS2345 Argument of type 'unknown' is not assignable to parameter of type 'never'.
            ref={(element) => NavItemPanelRefs.current.push(element)}
            overrides={navItem.props.overrides}
            key={idx}
            aria-labelledby={`tabs-${navItem.props.title}-tabpanel-${idx}`}
          >
            {navItem.props.children}
          </Panel>
        );
      })}

      {displayOverflow && (
        <OverflowPanel {...OverflowPanelProps}>
          <MobileHeader title="More" expanded />
          <OverflowPanelList {...OverflowPanelListProps}>
            {navItems.slice(MAX_SELECTORS - 1).map((navItem: React.ReactElement, overflowIdx) => {
              const { icon: Icon, title } = navItem.props;
              const idx = overflowIdx + MAX_SELECTORS - 1;
              return (
                <ListItem
                  artwork={(props) => <Icon {...props} />}
                  endEnhancer={() => <ChevronRight />}
                  onClick={() => {
                    activeKey === idx && !displayOverflow
                      ? scrollToTop(idx)
                      : handleNavItemChange(idx);
                  }}
                  key={overflowIdx}
                >
                  <ListItemLabel>{title}</ListItemLabel>
                </ListItem>
              );
            })}
          </OverflowPanelList>
        </OverflowPanel>
      )}

      <SelectorList role="tablist" {...SelectorListProps}>
        {navItems.length > 5 ? (
          <>
            {renderSelectors(navItems.slice(0, 4))}
            <OverflowSelector />
          </>
        ) : (
          <>{renderSelectors(navItems)}</>
        )}
      </SelectorList>
    </Root>
  );
};
export default BottomNavigation;
