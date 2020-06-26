/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {getOverrides, mergeOverrides} from '../helpers/overrides.js';
import {
  Root as StyledRoot,
  TabBar as StyledTabBar,
  TabContent as StyledTabContent,
  TabHighlight,
  TabDivider,
} from './styled-components.js';
import TabComponent from './tab.js';
import type {TabsPropsT, SharedStylePropsArgT} from './types.js';
import {ORIENTATION, TAB_WIDTH} from './constants.js';

export default class Tabs extends React.Component<
  TabsPropsT,
  {highlightLength: number, highlightDistance: number},
> {
  static defaultProps: $Shape<TabsPropsT> = {
    disabled: false,
    onChange: () => {},
    overrides: {},
    orientation: ORIENTATION.horizontal,
    tabWidth: TAB_WIDTH.intrinsic,
    renderAll: false,
  };

  activeTabRef = React.createRef<typeof TabComponent>();

  state = {
    highlightLength: 0,
    highlightDistance: 0,
  };

  componentDidMount() {
    this.updateHighlight();
    this.updateScrollPosition();
  }

  componentDidUpdate(prevProps: TabsPropsT) {
    if (prevProps.activeKey !== this.props.activeKey) {
      this.updateHighlight();
      this.updateScrollPosition({smooth: true});
    }
  }

  updateHighlight() {
    // $FlowFixMe: Cannot get this.activeTabRef.current.ref because property ref is missing in statics of TabComponent
    if (this.activeTabRef.current && this.activeTabRef.current.ref.current) {
      const el = this.activeTabRef.current.ref.current;
      if (this.props.orientation === ORIENTATION.vertical) {
        this.setState({
          highlightLength: el.clientHeight,
          highlightDistance: el.offsetTop,
        });
      } else {
        this.setState({
          highlightLength: el.clientWidth,
          highlightDistance: el.offsetLeft,
        });
      }
    }
  }

  updateScrollPosition(options: {smooth?: boolean} = {}) {
    const {smooth = false} = options;
    // $FlowFixMe: Cannot get this.activeTabRef.current.ref because property ref is missing in statics of TabComponent
    if (this.activeTabRef.current && this.activeTabRef.current.ref.current) {
      const el = this.activeTabRef.current.ref.current;
      // Immediately scroll the selected Tab into view.
      if (el.scrollIntoView && typeof el.scrollIntoView === 'function') {
        el.scrollIntoView(
          smooth
            ? {
                behavior: 'smooth',
                block: 'nearest',
                inline: 'nearest',
              }
            : {
                block: 'start',
                inline: 'start',
              },
        );
      }
    }
  }

  onChange({activeKey}: {activeKey: string}) {
    const {onChange} = this.props;
    typeof onChange === 'function' && onChange({activeKey});
  }

  getTabs() {
    const {
      activeKey,
      disabled,
      orientation,
      tabWidth,
      children,
      overrides = {},
    } = this.props;
    // eslint-disable-next-line flowtype/no-weak-types
    const tabs = React.Children.map(children, (child: any, index) => {
      if (!child) return;

      const key = child.key || String(index);
      return React.cloneElement(child, {
        key,
        id: key, // for aria-labelledby
        ref: key === activeKey ? this.activeTabRef : null,
        active: key === activeKey,
        disabled: disabled || child.props.disabled,
        $orientation: orientation,
        $tabWidth: tabWidth,
        onSelect: () => this.onChange({activeKey: key}),
        children: child.props.title,
        overrides: mergeOverrides(overrides, child.props.overrides || {}),
      });
    });

    return tabs;
  }

  getPanels() {
    const {
      activeKey,
      disabled,
      orientation,
      children,
      overrides = {},
      renderAll,
    } = this.props;
    const {TabContent: TabContentOverride} = overrides;
    const [TabContent, tabContentProps] = getOverrides(
      TabContentOverride,
      StyledTabContent,
    );
    // eslint-disable-next-line flowtype/no-weak-types
    const tabs = React.Children.map(children, (child: any, index) => {
      if (!child) return;
      const key = child.key || String(index);
      const isActive = key === activeKey;
      const props = {
        key,
        'aria-labelledby': key,
      };
      const sharedProps = {
        $active: isActive,
        $disabled: disabled,
        $orientation: orientation,
      };

      return (
        <TabContent
          role="tabpanel"
          {...sharedProps}
          {...tabContentProps}
          {...props}
        >
          {renderAll ? child.props.children : null}
          {isActive && !renderAll ? child.props.children : null}
        </TabContent>
      );
    });
    return tabs;
  }

  getSharedProps(): SharedStylePropsArgT {
    const {disabled, orientation, tabWidth} = this.props;
    return {
      $disabled: disabled,
      $orientation: orientation,
      $tabWidth: tabWidth,
    };
  }

  render() {
    const sharedProps = this.getSharedProps();
    const {overrides = {}} = this.props;
    const {Root: RootOverride, TabBar: TabBarOverride} = overrides;
    const [Root, rootProps] = getOverrides(RootOverride, StyledRoot);
    const [TabBar, tabBarProps] = getOverrides(TabBarOverride, StyledTabBar);

    return (
      <Root data-baseweb="tabs" {...sharedProps} {...rootProps}>
        <TabBar
          role="tablist"
          aria-orientation={this.props.orientation}
          {...sharedProps}
          {...tabBarProps}
        >
          {this.getTabs()}
          <TabHighlight
            {...sharedProps}
            aria-hidden="true"
            $distance={this.state.highlightDistance}
            $length={this.state.highlightLength}
          />
        </TabBar>
        <TabDivider {...sharedProps} />
        {this.getPanels()}
      </Root>
    );
  }
}
