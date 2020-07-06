/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';
import {styled} from '../styles/index.js';
import {Button, KIND} from '../button/index.js';

// TODO(tabs-motion): Use unique ids for when there are multiple Tabs on the page.

// Constants

export const ORIENTATION = {
  vertical: 'vertical',
  horizontal: 'horizontal',
};

export const FILL = {
  fixed: 'fixed',
  intrinsic: 'intrinsic',
};

export const KEYBOARD_ACTIVATION = {
  automatic: 'automatic',
  manual: 'manual',
};

// Utilities

export const getTabId = key => `tab_${key}`;
export const getTabPanelId = key => `tabpanel_${key}`;

// Styled Components

export const StyledTabList = styled('div', ({$theme}) => {
  return {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    overflowY: 'scroll',
    // The track for the StyledTabAccent
    boxShadow: `inset 0 -5px ${$theme.colors.borderOpaque}`,
    paddingBottom: '5px',
  };
});

export const StyledTabAccent = styled(
  'div',
  ({$theme, $length = 0, $distance = 0}) => {
    return {
      position: 'absolute',
      bottom: '0',
      height: '5px',
      width: `${$length}px`,
      backgroundColor: $theme.colors.primary,
      transform: `translateX(${$distance}px)`,
      transitionProperty: 'all',
      transitionDuration: $theme.animation.timing400,
      transitionTimingFunction: $theme.animation.easeInOutQuinticCurve,
    };
  },
);

export const StyledTabPanel = styled('div', () => {});

// Components

export function Tabs({
  activeTabKey = '0',
  disabled = false,
  keyboardActivation = KEYBOARD_ACTIVATION.automatic,
  onSelect = () => {},
  orientation = ORIENTATION.horizontal,
  fill = FILL.intrinsic,
  children,
}) {
  const activeTabRef = React.useRef();

  // Keep state for the Tab Accent layout.
  // [length] The width or height of the Accent
  // [distance] How far from the origin the Accent should be placed.
  const [accentLayout, setAccentLayout] = React.useState({
    length: 0,
    distance: 0,
  });

  // When the active Tab changes, update the Accent layout.
  React.useEffect(() => {
    if (activeTabRef.current) {
      setAccentLayout({
        length: activeTabRef.current.clientWidth,
        distance: activeTabRef.current.offsetLeft,
      });
    }
  }, [activeTabKey]);

  // TODO(tabs-motion): Add scrolling handlers

  // Collect shared styling props
  const shared$Props = {$orientation: orientation, $fill: fill};

  // We do a first pass to collect what each Tab's [key] will be.
  // We will use them when building keyDown handlers for focus management-
  // at which point we won't have access to other Tab component's keys.
  const tabKeys = React.Children.map(children, (child, index) => {
    if (!child) return;
    return child.key || String(index);
  });

  return (
    <React.Fragment>
      <StyledTabList role="tablist" {...shared$Props}>
        {React.Children.map(children, (child, index) => {
          if (!child) return;
          const key = tabKeys[index];
          const isActive = key === activeTabKey;
          return (
            <Button
              key={key}
              id={getTabId(key)}
              role="tab"
              onClick={() => onSelect({selectedTabKey: key})}
              onKeyDown={event => {
                // TODO(tabs-motion): Add alternate keyCode conditions (RTL, orientation)

                // WAI-ARIA 1.1
                // https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel
                // We use directional keys to iterate focus through Tabs.

                if (event.keyCode === 37 || event.keyCode === 39) {
                  let nextActiveIndex;
                  if (
                    // Previous
                    // ⬆️ if Vertical
                    // ➡️ if RTL
                    // ⬅️
                    event.keyCode === 37
                  ) {
                    if (event.target.previousSibling) {
                      nextActiveIndex = index - 1;
                    } else {
                      nextActiveIndex = children.length - 1;
                    }
                  } else if (
                    // Next
                    // ⬇️ if Vertical
                    // ⬅️ if RTL
                    // ➡️
                    event.keyCode === 39
                  ) {
                    if (
                      event.target.nextSibling &&
                      event.target.nextSibling !==
                        event.target.parentNode.lastElementChild
                    ) {
                      nextActiveIndex = index + 1;
                    } else {
                      nextActiveIndex = 0;
                    }
                  }
                  // Focus the Tab first...
                  event.target.parentNode.childNodes[nextActiveIndex].focus();
                  // And then optionally activate the Tab.
                  if (keyboardActivation === KEYBOARD_ACTIVATION.automatic) {
                    onSelect({selectedTabKey: tabKeys[nextActiveIndex]});
                  }
                }
              }}
              aria-selected={isActive}
              aria-controls={getTabPanelId(key)}
              tabIndex={isActive ? '0' : '-1'}
              ref={isActive ? activeTabRef : null}
              kind={KIND.tertiary}
            >
              {child.props.title}
            </Button>
          );
        })}
        <StyledTabAccent
          $length={accentLayout.length}
          $distance={accentLayout.distance}
          aria-hidden="true"
          role="presentation"
          {...shared$Props}
        />
      </StyledTabList>

      {React.Children.map(children, (child, index) => {
        if (!child) return;
        const key = child.key || String(index);
        const isActive = key === activeTabKey;
        return (
          <StyledTabPanel
            key={key}
            id={getTabPanelId(key)}
            role="tabpanel"
            aria-expanded={isActive}
            hidden={!isActive}
          >
            {child.props.children}
          </StyledTabPanel>
        );
      })}
    </React.Fragment>
  );
}

export function Tab({id}) {}
