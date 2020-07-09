/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

// TODO(tabs-motion): Add disabled
// TODO(tabs-motion): Add imperative refs
// TODO(tabs-motion): Add Flow types
// TODO(tabs-motion): Add TS types
// TODO(tabs-motion): Add react-testing-library tests
// TODO(tabs-motion): Add e2e tests
// TODO(tabs-motion): Add align scenario (go flush on mobile)
// TODO(tabs-motion): Add tabs within container scenario
// TODO(tabs-motion): Add new documentation & examples

// TODO(tabs-motion): Use [withWrapper] for default props on styled components?
// TODO(tabs-motion): Use unique ids for when there are multiple Tabs on the page?

import * as React from 'react';
import {styled, useStyletron} from '../styles/index.js';
import {getOverrides} from '../helpers/overrides.js';
import {isFocusVisible, forkFocus, forkBlur} from '../utils/focusVisible.js';

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

// Utilities

export const getTabId = key => `tab_${key}`;

export const getTabPanelId = key => `tabpanel_${key}`;

export const makeStylingHelper = (orientation, direction) => results => {
  if (orientation === ORIENTATION.horizontal && direction !== 'rtl') {
    return results.hltr || results.h || results.ltr || null;
  }
  if (orientation === ORIENTATION.vertical && direction !== 'rtl') {
    return results.vltr || results.v || results.ltr || null;
  }
  if (orientation === ORIENTATION.horizontal && direction === 'rtl') {
    return results.hrtl || results.h || results.rtl || null;
  }
  if (orientation === ORIENTATION.vertical && direction === 'rtl') {
    return results.vrtl || results.v || results.rtl || null;
  }
  return null;
};

// Styled Components

export const StyledRoot = styled('div', ({$theme, $orientation}) => {
  const helper = makeStylingHelper($orientation, $theme.direction);
  return {
    display: helper({v: 'flex'}),
    // Creates a stacking context so we can use z-index on the TabHighlight
    // without affecting anything outside of this element.
    transform: 'scale(1)',
  };
});

export const StyledTabList = styled('div', ({$theme, $fill, $orientation}) => {
  const helper = makeStylingHelper($orientation, $theme.direction);
  return {
    position: 'relative',
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: helper({h: 'row', v: 'column'}),
    ...($fill === FILL.intrinsic
      ? {
          overflowX: helper({h: 'scroll'}),
          overflowY: helper({v: 'scroll'}),
          // The following properties hide the scroll bar on various browsers:
          // Chrome, Safari, etc
          '::-webkit-scrollbar': {
            display: 'none',
          },
          // IE, Edge
          '-ms-overflow-style': 'none',
          // Firefox
          scrollbarWidth: 'none',
        }
      : {}),
    // Some CSS trickery for the the TabHighlight track...
    // By setting overflowX/Y, we cut off the TabHighlight.
    // We add 5px padding so that the TabHighlight becomes visible.
    // This requires adding an equivalent negative margin to bring the
    // TabBorder "back in" under the TabHighlight.
    paddingLeft: helper({
      vrtl: '5px',
    }),
    marginLeft: helper({
      vrtl: '-5px',
    }),
    paddingRight: helper({
      vltr: '5px',
    }),
    marginRight: helper({
      vltr: '-5px',
    }),
    paddingBottom: helper({
      h: '5px',
    }),
    marginBottom: helper({
      h: '-5px',
    }),
  };
});

export const StyledTab = styled(
  'button',
  ({$theme, $orientation, $fill, $focusVisible}) => {
    const helper = makeStylingHelper($orientation, $theme.direction);
    return {
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
      outline: $focusVisible ? `3px solid ${$theme.colors.accent}` : 'none',
      outlineOffset: '-3px',
      ':disabled': {
        cursor: 'not-allowed',
        color: $theme.colors.contentStateDisabled,
      },
      ...$theme.typography.LabelSmall,
      ...($fill === FILL.fixed
        ? {
            flexGrow: '1',
            justifyContent: helper({v: 'flex-end', h: 'center'}),
          }
        : {
            justifyContent: helper({v: 'flex-end'}),
          }),
    };
  },
);

export const StyledArtworkContainer = styled(
  'div',
  ({$theme, $orientation}) => {
    const helper = makeStylingHelper($orientation, $theme.direction);
    return {
      display: 'flex',
      marginLeft: helper({rtl: $theme.sizing.scale300}),
      marginRight: helper({ltr: $theme.sizing.scale300}),
    };
  },
);

export const StyledTabBorder = styled('div', ({$theme, $orientation}) => {
  const helper = makeStylingHelper($orientation, $theme.direction);
  return {
    position: 'relative',
    backgroundColor: $theme.colors.borderOpaque,
    height: helper({h: '5px'}),
    width: helper({v: '5px'}),
  };
});

export const StyledTabHighlight = styled(
  'div',
  ({
    $theme,
    $orientation,
    $helper,
    $length = 0,
    $distance = 0,
    $animate = false,
  }) => {
    const helper = makeStylingHelper($orientation, $theme.direction);
    return {
      zIndex: '1',
      position: 'absolute',
      bottom: helper({h: '0'}),
      left: helper({h: '0px', vrtl: '0px'}),
      right: helper({vltr: '0px'}),
      height: helper({h: '5px', v: `${$length}px`}),
      width: helper({v: '5px', h: `${$length}px`}),
      transform: helper({
        h: `translateX(${$distance}px)`,
        v: `translateY(${$distance}px)`,
      }),
      backgroundColor: $theme.colors.borderSelected,
      ...($animate
        ? {
            transitionProperty: 'all',
            transitionDuration: $theme.animation.timing400,
            transitionTimingFunction: $theme.animation.easeInOutQuinticCurve,
          }
        : {}),
    };
  },
);

export const StyledTabPanel = styled('div', () => {
  return {
    flexGrow: 1, // only used in vertical orientation
  };
});

// Components

export function Tabs({
  activeTabKey = '0',
  disabled = false,
  keyboardActivation = KEYBOARD_ACTIVATION.automatic,
  onSelect = () => {},
  orientation = ORIENTATION.horizontal,
  overrides = {},
  fill = FILL.intrinsic,
  children,
}) {
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
  const [, theme] = useStyletron();
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
  // We have to split up the scrollIntoView for mount and key change.
  // On first mount:
  React.useEffect(() => {
    if (activeTabRef.current) {
      activeTabRef.current.scrollIntoView({
        block: 'start',
        inline: 'center',
      });
    }
  }, []);
  // On key change:
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
  const sharedProps = {
    $orientation: orientation,
    $fill: fill,
  };

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
    <Root {...sharedProps} {...RootProps}>
      <TabList
        data-baseweb="tab-list"
        role="tablist"
        aria-orientation={orientation}
        {...sharedProps}
        {...TabListProps}
      >
        {React.Children.map(children, (child, index) => {
          if (!child) return;
          const {artwork: Artwork, overrides = {}, ...restProps} = child.props;

          const key = child.key || String(index);
          const isActive = key === activeTabKey;

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
              let nextTab;
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

              // Focus the tab
              nextTab.focus();

              // Optionally activate the tab
              if (keyboardActivation === KEYBOARD_ACTIVATION.automatic) {
                nextTab.click();
              }
            }
          });

          return (
            <Tab
              data-baseweb="tab"
              key={key}
              id={getTabId(key)}
              role="tab"
              onClick={() => onSelect({selectedTabKey: key})}
              onKeyDown={handleKeyDown}
              aria-selected={isActive}
              aria-controls={getTabPanelId(key)}
              tabIndex={isActive ? '0' : '-1'}
              ref={isActive ? activeTabRef : null}
              $focusVisible={focusVisible}
              {...sharedProps}
              {...restProps}
              {...TabProps}
              onFocus={forkFocus({...restProps, ...TabProps}, handleFocus)}
              onBlur={forkBlur({...restProps, ...TabProps}, handleBlur)}
            >
              {Artwork ? (
                <ArtworkContainer
                  data-baseweb="artwork-container"
                  {...sharedProps}
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
          {...sharedProps}
          {...TabHighlightProps}
        />
      </TabList>
      <TabBorder
        data-baseweb="tab-border"
        aria-hidden="true"
        role="presentation"
        {...sharedProps}
        {...TabBorderProps}
      />

      {React.Children.map(children, (child, index) => {
        if (!child) return;
        const key = child.key || String(index);
        const isActive = key === activeTabKey;
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
            id={getTabPanelId(key)}
            role="tabpanel"
            aria-expanded={isActive}
            hidden={!isActive}
            {...sharedProps}
            {...TabPanelProps}
          >
            {child.props.children}
          </TabPanel>
        );
      })}
    </Root>
  );
}

export function Tab() {}
