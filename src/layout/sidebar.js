/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {getOverrides} from '../helpers/overrides.js';
import {ThemeContext} from '../styles/theme-provider.js';
import type {ThemeT} from '../styles/types.js';

import LayoutContext from './layout-context.js';
import {StyledSidebar} from './styled-components.js';
import type {SidebarPropsT} from './types.js';

type SidebarInnerPropsT = {
  ...SidebarPropsT,
  addSidebar: () => void,
  removeSidebar: () => void,
  theme: ThemeT,
};

type SidebarInnerStateT = {|
  belowBreakpoint: boolean,
  isCollapsed: boolean,
|};

// indirection required to access context in lifecycle methods
// https://github.com/facebook/react/issues/12397
class SidebarInner extends React.Component<
  SidebarInnerPropsT,
  SidebarInnerStateT,
> {
  mql: MediaQueryList;

  constructor(props) {
    super(props);

    this.state = {
      belowBreakpoint: false,
      isCollapsed: !!props.isCollapsed,
    };
  }

  componentDidMount() {
    this.props.addSidebar();

    if (__BROWSER__) {
      if (this.props.breakpoint) {
        const breakpoint = this.props.theme.breakpoints[this.props.breakpoint];

        if (__DEV__) {
          if (!breakpoint) {
            // eslint-disable-next-line no-console
            console.error(
              `Breakpoint: ${
                this.props.breakpoint
              } not found. Is it specifyed in your theme?`,
            );
          }
        }

        this.mql = window.matchMedia(breakpoint.replace('@media', ''));
        this.mql.addListener(this.handleResize);
        this.handleResize(this.mql);
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isCollapsed !== this.props.isCollapsed) {
      this.setState({isCollapsed: this.props.isCollapsed});
      if (this.props.onCollapse && this.props.isCollapsed) {
        this.props.onCollapse();
      }
      return;
    }

    if (!prevState.belowBreakpoint && this.state.belowBreakpoint) {
      this.setState({isCollapsed: true});
      if (this.props.onCollapse) {
        this.props.onCollapse();
      }
      return;
    }
  }

  componentWillUnmount() {
    this.props.removeSidebar();

    if (__BROWSER__) {
      if (this.mql) {
        this.mql.removeListener(this.handleResize);
      }
    }
  }

  handleResize = (mql: MediaQueryListEvent | MediaQueryList) => {
    this.setState({belowBreakpoint: !mql.matches});
  };

  render() {
    const {overrides = {}} = this.props;
    const [OverridedSidebar, sidebarProps] = getOverrides(
      overrides.Sidebar,
      StyledSidebar,
    );

    return (
      <OverridedSidebar
        $belowBreakpoint={this.state.belowBreakpoint}
        $isCollapsed={this.state.isCollapsed}
        {...sidebarProps}
      >
        {!this.state.isCollapsed && this.props.children}
      </OverridedSidebar>
    );
  }
}

function Sidebar(props: SidebarPropsT) {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <LayoutContext.Consumer>
          {({addSidebar, removeSidebar}) => (
            <SidebarInner
              {...props}
              addSidebar={addSidebar}
              removeSidebar={removeSidebar}
              theme={theme}
            />
          )}
        </LayoutContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}

export default Sidebar;
