/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';
import {useUID} from 'react-uid';
import {useStyletron} from '../styles/index.js';
import {getOverrides} from '../helpers/overrides.js';
import {isFocusVisible, forkFocus, forkBlur} from '../utils/focusVisible.js';
import {
  KEYBOARD_ACTIVATION,
  KEYBOARD_ACTION,
  ORIENTATION,
  FILL,
} from './constants.js';
import {
  StyledRoot,
  StyledTabList,
  StyledTab,
  StyledArtworkContainer,
  StyledTabHighlight,
  StyledTabBorder,
  StyledTabPanel,
} from './styled-components.js';
import {
  getTabId,
  getTabPanelId,
  isVertical,
  isHorizontal,
  isRTL,
} from './utils.js';

import type {TabsPropsT} from './types.js';

export function Tabs({
  activeKey = '0',
  disabled = false,
  children,
  fill = FILL.intrinsic,
  keyboardActivation = KEYBOARD_ACTIVATION.automatic,
  onChange,
  orientation = ORIENTATION.horizontal,
  overrides = {},
  renderAll = false,
}: TabsPropsT) {
  // Create unique id prefix for this tabs component
  const uid = useUID();

  // Unpack overrides
  const {
    Root: RootOverrides,
    TabList: TabListOverrides,
    TabHighlight: TabHighlightOverrides,
    TabBorder: TabBorderOverrides,
  } = overrides;
  const [Root, RootProps] = getOverrides(RootOverrides, StyledRoot);
  const [TabList, TabListProps] = getOverrides(TabListOverrides, StyledTabList);
  const [TabHighlight, TabHighlightProps] = getOverrides(
    TabHighlightOverrides,
    StyledTabHighlight,
  );
  const [TabBorder, TabBorderProps] = getOverrides(
    TabBorderOverrides,
    StyledTabBorder,
  );

  // Count key updates
  // We disable the Highlight animation until the first key update
  // This avoids the tab sliding in from the side on mount
  const [keyUpdated, setKeyUpdated] = React.useState(0);
  React.useEffect(() => {
    setKeyUpdated(keyUpdated + 1);
  }, [activeKey]);

  // Positioning the Highlight
  const activeTabRef = React.useRef();
  const [highlightLayout, setHighlightLayout] = React.useState({
    length: 0,
    distance: 0,
  });
  React.useEffect(() => {
    if (activeTabRef.current) {
      // Note, we are using clientHeight/Width here, which excludes borders.
      // getBoundingClientRect includes borders but returns a fractional value.
      // This leads to the highlight being slightly misaligned every so often.
      if (orientation === ORIENTATION.vertical) {
        setHighlightLayout({
          length: activeTabRef.current.clientHeight,
          distance: activeTabRef.current.offsetTop,
        });
      } else {
        setHighlightLayout({
          length: activeTabRef.current.clientWidth,
          distance: activeTabRef.current.offsetLeft,
        });
      }
    }
  }, [activeKey]);

  // Scroll active tab into view on mount. This should *not* scroll the page!
  React.useEffect(() => {
    if (activeTabRef.current) {
      activeTabRef.current.scrollIntoView({
        block: 'start',
        inline: 'center',
      });
    }
  }, []);

  // Scroll active tab into view on key change *after* mounting.
  React.useEffect(() => {
    if (activeTabRef.current && keyUpdated > 1) {
      activeTabRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }, [activeKey]);

  // Collect shared styling props
  const sharedStylingProps = {
    $orientation: orientation,
    $fill: fill,
  };

  // Helper for parsing directional keys
  // TODO(WPT-6473): move to universal keycode aliases
  const [, theme] = useStyletron();
  const parseKeyDown = React.useCallback(
    event => {
      if (isHorizontal(orientation)) {
        if (isRTL(theme.direction)) {
          switch (event.keyCode) {
            case 39:
              return KEYBOARD_ACTION.previous;
            case 37:
              return KEYBOARD_ACTION.next;
            default:
              return null;
          }
        } else {
          switch (event.keyCode) {
            case 37:
              return KEYBOARD_ACTION.previous;
            case 39:
              return KEYBOARD_ACTION.next;
            default:
              return null;
          }
        }
      } else {
        switch (event.keyCode) {
          case 38:
            return KEYBOARD_ACTION.previous;
          case 40:
            return KEYBOARD_ACTION.next;
          default:
            return null;
        }
      }
    },
    [orientation, theme.direction],
  );

  return (
    <Root {...sharedStylingProps} {...RootProps}>
      <TabList
        data-baseweb="tab-list"
        role="tablist"
        aria-orientation={orientation}
        {...sharedStylingProps}
        {...TabListProps}
      >
        {React.Children.map(children, (child, index) => {
          if (!child) return;

          const key = child.key || index;
          const isActive = key == activeKey;
          const {
            artwork: Artwork,
            overrides = {},
            tabRef,
            onClick,
            ...restProps
          } = child.props;

          // A way to share our internal activeTabRef via the "tabRef" prop.
          const ref = React.useRef();
          React.useImperativeHandle(tabRef, () => {
            return isActive ? activeTabRef.current : ref.current;
          });

          // Collect overrides
          const {
            Tab: TabOverrides,
            ArtworkContainer: ArtworkContainerOverrides,
          } = overrides;
          const [Tab, TabProps] = getOverrides(TabOverrides, StyledTab);
          const [ArtworkContainer, ArtworkContainerProps] = getOverrides(
            ArtworkContainerOverrides,
            StyledArtworkContainer,
          );

          // Keyboard focus styling
          const [focusVisible, setFocusVisible] = React.useState(false);
          const handleFocus = React.useCallback((event: SyntheticEvent<>) => {
            if (isFocusVisible(event)) {
              setFocusVisible(true);
            }
          }, []);
          const handleBlur = React.useCallback(
            (event: SyntheticEvent<>) => {
              if (focusVisible !== false) {
                setFocusVisible(false);
              }
            },
            [focusVisible],
          );

          // Keyboard focus management
          const handleKeyDown = React.useCallback(event => {
            // WAI-ARIA 1.1
            // https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel
            // We use directional keys to iterate focus through Tabs.

            // Find all tabs eligible for focus
            const availableTabs = [
              ...event.target.parentNode.childNodes,
            ].filter(node => !node.disabled && node.dataset.baseweb === 'tab');

            // Exit early if there are no other tabs available
            if (availableTabs.length === 1) return;

            // Find tab to focus, looping to start/end of list if necessary
            const currentTabIndex = availableTabs.indexOf(event.target);
            const action = parseKeyDown(event);
            if (action) {
              let nextTab: ?HTMLButtonElement;
              if (action === KEYBOARD_ACTION.previous) {
                if (availableTabs[currentTabIndex - 1]) {
                  nextTab = availableTabs[currentTabIndex - 1];
                } else {
                  nextTab = availableTabs[availableTabs.length - 1];
                }
              } else if (action === KEYBOARD_ACTION.next) {
                if (availableTabs[currentTabIndex + 1]) {
                  nextTab = availableTabs[currentTabIndex + 1];
                } else {
                  nextTab = availableTabs[0];
                }
              }
              if (nextTab) {
                // Focus the tab
                nextTab.focus();

                // Optionally activate the tab
                if (keyboardActivation === KEYBOARD_ACTIVATION.automatic) {
                  nextTab.click();
                }
              }
              // Prevent default page scroll when in vertical orientation
              if (isVertical(orientation)) {
                event.preventDefault();
              }
            }
          });

          return (
            <Tab
              data-baseweb="tab"
              key={key}
              id={getTabId(uid, key)}
              role="tab"
              onKeyDown={handleKeyDown}
              aria-selected={isActive}
              aria-controls={getTabPanelId(uid, key)}
              tabIndex={isActive ? '0' : '-1'}
              ref={isActive ? activeTabRef : ref}
              disabled={!isActive && disabled}
              $focusVisible={focusVisible}
              {...sharedStylingProps}
              {...restProps}
              {...TabProps}
              onClick={event => {
                if (typeof onChange === 'function') onChange({activeKey: key});
                if (typeof onClick === 'function') onClick(event);
              }}
              onFocus={forkFocus({...restProps, ...TabProps}, handleFocus)}
              onBlur={forkBlur({...restProps, ...TabProps}, handleBlur)}
            >
              {Artwork ? (
                <ArtworkContainer
                  data-baseweb="artwork-container"
                  {...sharedStylingProps}
                  {...ArtworkContainerProps}
                >
                  <Artwork size={20} color="contentPrimary" />
                </ArtworkContainer>
              ) : null}
              {child.props.title ? child.props.title : key}
            </Tab>
          );
        })}
        <TabHighlight
          data-baseweb="tab-highlight"
          $length={highlightLayout.length}
          $distance={highlightLayout.distance}
          // This avoids the tab sliding in from the side on mount
          $animate={keyUpdated > 1}
          aria-hidden="true"
          role="presentation"
          {...sharedStylingProps}
          {...TabHighlightProps}
        />
      </TabList>
      <TabBorder
        data-baseweb="tab-border"
        aria-hidden="true"
        role="presentation"
        {...sharedStylingProps}
        {...TabBorderProps}
      />
      {React.Children.map(children, (child, index) => {
        if (!child) return;
        const key = child.key || index;
        const isActive = key == activeKey;
        const {overrides = {}, children} = child.props;
        const {TabPanel: TabPanelOverrides} = overrides;
        const [TabPanel, TabPanelProps] = getOverrides(
          TabPanelOverrides,
          StyledTabPanel,
        );
        // Keyboard focus styling
        const [focusVisible, setFocusVisible] = React.useState(false);
        const handleFocus = React.useCallback((event: SyntheticEvent<>) => {
          if (isFocusVisible(event)) {
            setFocusVisible(true);
          }
        }, []);
        const handleBlur = React.useCallback(
          (event: SyntheticEvent<>) => {
            if (focusVisible !== false) {
              setFocusVisible(false);
            }
          },
          [focusVisible],
        );
        return (
          <TabPanel
            data-baseweb="tab-panel"
            key={key}
            role="tabpanel"
            id={getTabPanelId(uid, key)}
            aria-labelledby={getTabId(uid, key)}
            tabIndex={isActive ? '0' : null}
            aria-expanded={isActive}
            hidden={!isActive}
            $focusVisible={focusVisible}
            {...sharedStylingProps}
            {...TabPanelProps}
            onFocus={forkFocus(TabPanelProps, handleFocus)}
            onBlur={forkBlur(TabPanelProps, handleBlur)}
          >
            {!isActive && !renderAll ? null : children}
          </TabPanel>
        );
      })}
    </Root>
  );
}
