/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

// TODO(tabs-motion): Add Flow types
// TODO(tabs-motion): Add TS types
// TODO(tabs-motion): Add new documentation & examples

// TODO(tabs-motion): Use [withWrapper] for default props on styled components?

import * as React from 'react';
import {useUID} from 'react-uid';
import {styled, useStyletron} from '../styles/index.js';
import {getOverrides} from '../helpers/overrides.js';
import {isFocusVisible, forkFocus, forkBlur} from '../utils/focusVisible.js';

import type {StyleObject} from 'styletron-standard';
import type {OverrideT} from '../helpers/overrides.js';
import type {IconPropsT} from '../icon/types.js';

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

export const KEYBOARD_ACTION = {
  next: 'next',
  previous: 'previous',
};

// Types

export type OrientationT = $Values<typeof ORIENTATION>;
export type FillT = $Values<typeof FILL>;
export type KeyboardActivationT = $Values<typeof KEYBOARD_ACTIVATION>;
export type DirectionT = 'rtl' | 'ltr';

export type SharedStylingPropsT = {
  $orientation: OrientationT,
  $fill: FillT,
};

export type StyledTabPropsT = {
  ...SharedStylingPropsT,
  $focusVisible?: boolean,
};

export type StyledTabHighlightPropsT = {
  ...SharedStylingPropsT,
  $length?: number,
  $distance?: number,
  $animate?: boolean,
};

export type TabsOverridesT = {
  Root?: OverrideT,
  TabList?: OverrideT,
  TabHighlight?: OverrideT,
  TabBorder?: OverrideT,
};

export type TabOverridesT = {
  Tab?: OverrideT,
  ArtworkContainer?: OverrideT,
  TabPanel?: OverrideT,
};

export type TabsPropsT = {
  activeTabKey?: string | number,
  disabled?: boolean,
  fill?: FillT,
  orientation?: OrientationT,
  keyboardActivation?: KeyboardActivationT,
  onSelect?: (params: {selectedTabKey: string}) => mixed,
  overrides?: TabsOverridesT,
  children?: React.Node,
};

export type TabPropsT = {
  title: React.Node,
  key?: React.Key,
  tabRef?: React.Ref<'button'>,
  overrides?: TabOverridesT,
  children?: React.Node,
  artwork?: React.AbstractComponent<{
    ...IconPropsT,
    size: $PropertyType<IconPropsT, 'size'>,
    color: $PropertyType<IconPropsT, 'color'>,
  }>,
};

// Utilities

export const getTabId = (uid: string, key: string) => `tabs-${uid}-tab-${key}`;
export const getTabPanelId = (uid: string, key: string) =>
  `tabs-${uid}-tabpanel-${key}`;

const isHorizontal = orientation => orientation === ORIENTATION.horizontal;
const isVertical = orientation => orientation === ORIENTATION.vertical;
const isLTR = direction => direction === 'ltr';
const isIntrinsic = fill => fill === FILL.intrinsic;
const isFixed = fill => fill === FILL.fixed;

// Styled Components

export const StyledRoot = styled<SharedStylingPropsT>(
  'div',
  ({$theme, $orientation}) => {
    const style: StyleObject = {
      // Creates a stacking context so we can use z-index on the TabHighlight
      // without affecting anything outside of this element.
      transform: 'scale(1)',
    };
    if (isVertical($orientation)) {
      style.display = 'flex';
    }
    return style;
  },
);

export const StyledTabList = styled<SharedStylingPropsT>(
  'div',
  ({$theme, $fill, $orientation}) => {
    const style: StyleObject = {
      position: 'relative',
      display: 'flex',
      flexWrap: 'nowrap',
    };
    if (isHorizontal($orientation)) {
      style.flexDirection = 'row';
      style.paddingBottom = '5px';
      style.marginBottom = '-5px';
    } else {
      style.flexDirection = 'column';
      if (isLTR($theme.direction)) {
        style.paddingRight = '5px';
        style.marginRight = '-5px';
      } else {
        style.paddingLeft = '5px';
        style.marginLeft = '-5px';
      }
    }
    if (isIntrinsic($fill)) {
      style['::-webkit-scrollbar'] = {display: 'none'};
      // $FlowFixMe: property missing in StyleObject
      style['-ms-overflow-style'] = 'none';
      style.scrollbarWidth = 'none';
      if (isHorizontal($orientation)) {
        style.overflowX = 'scroll';
      } else {
        style.overflowY = 'scroll';
      }
    }
    return style;
  },
);

export const StyledTab = styled<StyledTabPropsT>(
  'button',
  ({$theme, $orientation, $fill, $focusVisible = false}) => {
    const style: StyleObject = {
      boxSizing: 'border-box',
      display: 'inline-flex',
      alignItems: 'center',
      paddingLeft: $theme.sizing.scale600,
      paddingTop: $theme.sizing.scale600,
      paddingRight: $theme.sizing.scale600,
      paddingBottom: $theme.sizing.scale600,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      borderLeftStyle: 'none',
      borderTopStyle: 'none',
      borderRightStyle: 'none',
      borderBottomStyle: 'none',
      color: $theme.colors.contentPrimary,
      backgroundColor: $theme.colors.backgroundPrimary,
      transitionProperty: 'background',
      transitionDuration: $theme.animation.timing200,
      transitionTimingFunction: $theme.animation.linearCurve,
      outline: 'none',
      outlineOffset: '-3px',
      ':disabled': {
        cursor: 'not-allowed',
        color: $theme.colors.contentStateDisabled,
      },
      ...$theme.typography.LabelSmall,
    };
    if ($focusVisible) {
      style.outline = `3px solid ${$theme.colors.accent}`;
    }
    if (isFixed($fill)) {
      style.flexGrow = 1;
    }
    if (isHorizontal($orientation)) {
      style.justifyContent = 'center';
    } else {
      style.justifyContent = 'flex-end';
    }
    return style;
  },
);

export const StyledArtworkContainer = styled<SharedStylingPropsT>(
  'div',
  ({$theme, $orientation}) => {
    const style: StyleObject = {
      display: 'flex',
    };
    if (isLTR($theme.direction)) {
      style.marginRight = $theme.sizing.scale300;
    } else {
      style.marginLeft = $theme.sizing.scale300;
    }
    return style;
  },
);

export const StyledTabBorder = styled<SharedStylingPropsT>(
  'div',
  ({$theme, $orientation}) => {
    const style: StyleObject = {
      backgroundColor: $theme.colors.borderOpaque,
      position: 'relative',
    };
    if (isHorizontal($orientation)) {
      style.height = '5px';
    } else {
      style.width = '5px';
    }
    return style;
  },
);

export const StyledTabHighlight = styled<StyledTabHighlightPropsT>(
  'div',
  ({$theme, $orientation, $length = 0, $distance = 0, $animate = false}) => {
    const style: StyleObject = {
      backgroundColor: $theme.colors.borderSelected,
      position: 'absolute',
      zIndex: 1,
    };
    if (isHorizontal($orientation)) {
      style.bottom = '0px';
      style.height = '5px';
      style.left = '0px';
      style.transform = `translateX(${$distance}px)`;
    } else {
      style.transform = `translateY(${$distance}px)`;
      style.width = '5px';
      if (isLTR($theme.direction)) {
        style.right = '0px';
      } else {
        style.left = '0px';
      }
    }
    if ($animate) {
      style.transitionProperty = 'all';
      style.transitionDuration = $theme.animation.timing400;
      style.transitionTimingFunction = $theme.animation.easeInOutQuinticCurve;
    }
    return style;
  },
);

export const StyledTabPanel = styled<{}>('div', () => {
  return {
    flexGrow: 1, // only used in vertical orientation
  };
});

// Components

export function Tabs({
  activeTabKey = '0',
  disabled = false,
  children,
  fill = FILL.intrinsic,
  keyboardActivation = KEYBOARD_ACTIVATION.automatic,
  onSelect = () => {},
  orientation = ORIENTATION.horizontal,
  overrides = {},
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
  }, [activeTabKey]);

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
  }, [activeTabKey]);

  // Scroll active Tab into view.
  // We have separate scroll styles for mount and key change.

  // On mount
  React.useEffect(() => {
    if (activeTabRef.current) {
      activeTabRef.current.scrollIntoView({
        block: 'start',
        inline: 'center',
      });
    }
  }, []);

  // On key change
  React.useEffect(() => {
    if (activeTabRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }, [activeTabKey]);

  // Collect shared styling props
  const sharedStylingProps = {
    $orientation: orientation,
    $fill: fill,
  };

  // Helper for parsing directional keys
  const [, theme] = useStyletron();
  const parseKeyDown = React.useCallback(
    event => {
      if (orientation === ORIENTATION.horizontal) {
        if (theme.direction === 'rtl') {
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

          const key = child.key || String(index);
          const isActive = key == activeTabKey;
          const {
            artwork: Artwork,
            overrides = {},
            tabRef,
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
            }
          });

          return (
            <Tab
              data-baseweb="tab"
              key={key}
              id={getTabId(uid, key)}
              role="tab"
              onClick={() => onSelect({selectedTabKey: key})}
              onKeyDown={handleKeyDown}
              aria-selected={isActive}
              aria-controls={getTabPanelId(uid, key)}
              tabIndex={isActive ? '0' : '-1'}
              ref={isActive ? activeTabRef : ref}
              disabled={disabled}
              $focusVisible={focusVisible}
              {...sharedStylingProps}
              {...restProps}
              {...TabProps}
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
              {child.props.title}
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
        const key = child.key || String(index);
        const isActive = key == activeTabKey;
        const {overrides = {}} = child.props;
        const {TabPanel: TabPanelOverrides} = overrides;
        const [TabPanel, TabPanelProps] = getOverrides(
          TabPanelOverrides,
          StyledTabPanel,
        );
        return (
          <TabPanel
            data-baseweb="tab-panel"
            key={key}
            role="tabpanel"
            id={getTabPanelId(uid, key)}
            aria-labelledby={getTabId(uid, key)}
            aria-expanded={isActive}
            hidden={!isActive}
            {...sharedStylingProps}
            {...TabPanelProps}
          >
            {child.props.children}
          </TabPanel>
        );
      })}
    </Root>
  );
}

export function Tab(props: TabPropsT) {
  return null;
}
