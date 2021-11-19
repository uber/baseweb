/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* global window */

import * as React from 'react';
import { useUID } from 'react-uid';
import { useStyletron } from '../styles';
import { getOverrides } from '../helpers/overrides';
import { isFocusVisible, forkFocus, forkBlur } from '../utils/focusVisible';
import { ORIENTATION, FILL } from './constants';
import {
  StyledRoot,
  StyledTabList,
  StyledTab,
  StyledArtworkContainer,
  StyledTabHighlight,
  StyledTabBorder,
  StyledTabPanel,
} from './styled-components';
import { getTabId, getTabPanelId, isVertical, isHorizontal, isRTL } from './utils';

import type { TabsPropsT } from './types';

import type { SyntheticEvent } from 'react';

const KEYBOARD_ACTION = {
  next: 'next',
  previous: 'previous',
} as const;

const getLayoutParams = (el, orientation) => {
  if (!el) {
    return {
      length: 0,
      distance: 0,
    };
  }

  // Note, we are using clientHeight/Width here, which excludes borders.
  // This means borders won't be taken into account if someone adds borders
  // through overrides. In that case you would use getBoundingClientRect
  // which includes borders, but because it returns a fractional value the
  // highlight is slightly misaligned every so often.
  if (isVertical(orientation)) {
    return {
      length: el.clientHeight,
      distance: el.offsetTop,
    };
  } else {
    return {
      length: el.clientWidth,
      distance: el.offsetLeft,
    };
  }
};

const scrollParentToCentreTarget = (targetNode) => {
  const {
    x: parentX,
    y: parentY,
    width: parentWidth,
    height: parentHeight,
  } = targetNode.parentNode.getBoundingClientRect();
  const {
    x: childX,
    y: childY,
    width: childWidth,
    height: childHeight,
  } = targetNode.getBoundingClientRect();

  // get the position of the child centre, relative to parent
  const childCentre = {
    x: childX - parentX + childWidth / 2,
    y: childY - parentY + childHeight / 2,
  };
  // aim for the centre of the child to be the centre of the parent
  const { scrollLeft, scrollTop } = targetNode.parentNode;
  const target = {
    x: scrollLeft + childCentre.x - parentWidth / 2,
    y: scrollTop + childCentre.y - parentHeight / 2,
  };
  // ignore out of bounds, the browser will manage this for us
  targetNode.parentNode.scroll(target.x, target.y);
};

export function Tabs({
  activeKey = '0',
  disabled = false,
  children,
  fill = FILL.intrinsic,
  activateOnFocus = true,
  onChange,
  orientation = ORIENTATION.horizontal,
  overrides = {},
  renderAll = false,
  uid: customUid = null,
}: TabsPropsT) {
  // Create unique id prefix for this tabs component
  const generatedUid = useUID();
  const uid = customUid || generatedUid;

  // Unpack overrides
  const {
    Root: RootOverrides,
    TabList: TabListOverrides,
    TabHighlight: TabHighlightOverrides,
    TabBorder: TabBorderOverrides,
  } = overrides;
  const [Root, RootProps] = getOverrides(RootOverrides, StyledRoot);
  const [TabList, TabListProps] = getOverrides(TabListOverrides, StyledTabList);
  const [TabHighlight, TabHighlightProps] = getOverrides(TabHighlightOverrides, StyledTabHighlight);
  const [TabBorder, TabBorderProps] = getOverrides(TabBorderOverrides, StyledTabBorder);

  // Count key updates
  // We disable a few things until after first mount:
  // - the highlight animation, avoiding an initial slide-in
  // - smooth scrolling active tab into view
  const [keyUpdated, setKeyUpdated] = React.useState(0);
  React.useEffect(() => {
    setKeyUpdated(keyUpdated + 1);
  }, [activeKey]);

  // Positioning the highlight.
  const activeTabRef = React.useRef<HTMLElement>();
  const [highlightLayout, setHighlightLayout] = React.useState({
    length: 0,
    distance: 0,
  });

  // Create a shared, memoized callback for tabs to call on resize.
  const updateHighlight = React.useCallback(() => {
    if (activeTabRef.current) {
      setHighlightLayout(getLayoutParams(activeTabRef.current, orientation));
    }
  }, [activeTabRef.current, orientation]);

  // Update highlight on key and orientation changes.
  React.useEffect(updateHighlight, [activeTabRef.current, orientation]);

  // Scroll active tab into view when the parent has scrollbar on mount and
  // on key change (smooth scroll). Note, if the active key changes while
  // the tab is not in view, the page will scroll it into view.
  // TODO: replace with custom scrolling logic.
  React.useEffect(() => {
    // Flow needs this condition pulled out.
    if (activeTabRef.current) {
      if (
        isHorizontal(orientation)
          ? // @ts-expect-error todo(flow->ts) maybe parentElement?
            activeTabRef.current.parentNode.scrollWidth >
            // @ts-expect-error todo(flow->ts) maybe parentElement?
            activeTabRef.current.parentNode.clientWidth
          : // @ts-expect-error todo(flow->ts) maybe parentElement?
            activeTabRef.current.parentNode.scrollHeight >
            // @ts-expect-error todo(flow->ts) maybe parentElement?
            activeTabRef.current.parentNode.clientHeight
      ) {
        if (keyUpdated > 1) {
          activeTabRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'nearest',
          });
        } else {
          scrollParentToCentreTarget(activeTabRef.current);
        }
      }
    }
  }, [activeTabRef.current]);

  // Collect shared styling props
  const sharedStylingProps = {
    $orientation: orientation,
    $fill: fill,
  };

  // Helper for parsing directional keys
  // TODO(WPT-6473): move to universal keycode aliases
  const [, theme] = useStyletron();
  const parseKeyDown = React.useCallback(
    (event) => {
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
    [orientation, theme.direction]
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
        {/*todo(flow->ts): children might be other the ReactElement*/}
        {React.Children.map(children, (child: React.ReactElement, index) => {
          if (!child) return;
          return (
            <InternalTab
              childKey={child.key}
              childIndex={index}
              activeKey={activeKey}
              orientation={orientation}
              activeTabRef={activeTabRef}
              updateHighlight={updateHighlight}
              parseKeyDown={parseKeyDown}
              activateOnFocus={activateOnFocus}
              uid={uid}
              disabled={disabled}
              sharedStylingProps={sharedStylingProps}
              onChange={onChange}
              {...child.props}
            />
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
      {/*todo(flow->ts): children might be other the ReactElement*/}
      {React.Children.map(children, (child: React.ReactElement, index) => {
        if (!child) return;
        return (
          <InternalTabPanel
            childKey={child.key}
            childIndex={index}
            activeKey={activeKey}
            uid={uid}
            sharedStylingProps={sharedStylingProps}
            renderAll={renderAll}
            {...child.props}
          />
        );
      })}
    </Root>
  );
}

function InternalTab({
  childKey,
  childIndex,
  activeKey,
  orientation,
  activeTabRef,
  updateHighlight,
  parseKeyDown,
  activateOnFocus,
  uid,
  disabled,
  sharedStylingProps,
  onChange,
  ...props
}) {
  const key = childKey || String(childIndex);
  const isActive = key == activeKey;
  const { artwork: Artwork, overrides = {}, tabRef, onClick, title, ...restProps } = props;

  // A way to share our internal activeTabRef via the "tabRef" prop.
  const ref = React.useRef();
  React.useImperativeHandle(tabRef, () => {
    return isActive ? activeTabRef.current : ref.current;
  });

  // Track tab dimensions in a ref after each render
  // This is used to compare params when the resize observer fires
  const tabLayoutParams = React.useRef({ length: 0, distance: 0 });
  React.useEffect(() => {
    tabLayoutParams.current = getLayoutParams(
      isActive ? activeTabRef.current : ref.current,
      orientation
    );
  });

  // We need to potentially update the active tab highlight when the width or
  // placement changes for a tab so we listen for resize updates in each tab.
  React.useEffect(() => {
    if (window.ResizeObserver) {
      const observer = new window.ResizeObserver((entries) => {
        if (entries[0] && entries[0].target) {
          const tabLayoutParamsAfterResize = getLayoutParams(entries[0].target, orientation);
          if (
            tabLayoutParamsAfterResize.length !== tabLayoutParams.current.length ||
            tabLayoutParamsAfterResize.distance !== tabLayoutParams.current.distance
          ) {
            updateHighlight();
          }
        }
      });
      observer.observe(isActive ? activeTabRef.current : ref.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [activeKey, orientation]);

  React.useEffect(updateHighlight, [title]);

  // Collect overrides
  const { Tab: TabOverrides, ArtworkContainer: ArtworkContainerOverrides } = overrides;
  const [Tab, TabProps] = getOverrides(TabOverrides, StyledTab);
  const [ArtworkContainer, ArtworkContainerProps] = getOverrides(
    ArtworkContainerOverrides,
    StyledArtworkContainer
  );

  // Keyboard focus styling
  const [focusVisible, setFocusVisible] = React.useState(false);
  const handleFocus = React.useCallback((event: SyntheticEvent) => {
    if (isFocusVisible(event)) {
      setFocusVisible(true);
    }
  }, []);
  const handleBlur = React.useCallback(
    (event: SyntheticEvent) => {
      if (focusVisible !== false) {
        setFocusVisible(false);
      }
    },
    [focusVisible]
  );

  // Keyboard focus management
  // @ts-expect-error todo: deps are required
  const handleKeyDown = React.useCallback((event) => {
    // WAI-ARIA 1.1
    // https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel
    // We use directional keys to iterate focus through Tabs.

    // Find all tabs eligible for focus
    const availableTabs = [...event.target.parentNode.childNodes].filter(
      (node) => !node.disabled && node.getAttribute('role') === 'tab'
    );

    // Exit early if there are no other tabs available
    if (availableTabs.length === 1) return;

    // Find tab to focus, looping to start/end of list if necessary
    const currentTabIndex = availableTabs.indexOf(event.target);
    const action = parseKeyDown(event);
    if (action) {
      let nextTab: HTMLButtonElement | undefined | null;
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
        if (activateOnFocus) {
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
      type="button" // so it doesn't trigger a submit when used inside forms
      $focusVisible={focusVisible}
      $isActive={isActive}
      {...sharedStylingProps}
      {...restProps}
      {...TabProps}
      onClick={(event) => {
        if (typeof onChange === 'function') onChange({ activeKey: key });
        if (typeof onClick === 'function') onClick(event);
      }}
      onFocus={forkFocus({ ...restProps, ...TabProps }, handleFocus)}
      onBlur={forkBlur({ ...restProps, ...TabProps }, handleBlur)}
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
      {title ? title : key}
    </Tab>
  );
}

function InternalTabPanel({
  childKey,
  childIndex,
  activeKey,
  uid,
  sharedStylingProps,
  renderAll,
  ...props
}) {
  const key = childKey || String(childIndex);
  const isActive = key == activeKey;
  const { overrides = {}, children } = props;
  const { TabPanel: TabPanelOverrides } = overrides;
  const [TabPanel, TabPanelProps] = getOverrides(TabPanelOverrides, StyledTabPanel);
  return (
    <TabPanel
      data-baseweb="tab-panel"
      key={key}
      role="tabpanel"
      id={getTabPanelId(uid, key)}
      aria-labelledby={getTabId(uid, key)}
      hidden={!isActive}
      {...sharedStylingProps}
      {...TabPanelProps}
    >
      {isActive || renderAll ? children : null}
    </TabPanel>
  );
}
