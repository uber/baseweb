/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {getOverrides} from '../helpers/overrides.js';

import LayoutContext from './layout-context.js';
import {StyledSidebar} from './styled-components.js';
import type {SidebarPropsT} from './types.js';

type SidebarInnerPropsT = {
  ...SidebarPropsT,
  addSidebar: () => void,
  removeSidebar: () => void,
};

// indirection required to access context in lifecycle methods
// https://github.com/facebook/react/issues/12397
class SidebarInner extends React.Component<SidebarInnerPropsT, {}> {
  componentDidMount() {
    this.props.addSidebar();
  }

  componentWillUnmount() {
    this.props.removeSidebar();
  }

  render() {
    const {overrides = {}} = this.props;
    const [OverridedSidebar, sidebarProps] = getOverrides(
      overrides.Sidebar,
      StyledSidebar,
    );

    return (
      <OverridedSidebar {...sidebarProps}>
        {this.props.children}
      </OverridedSidebar>
    );
  }
}

function Sidebar(props: SidebarPropsT) {
  return (
    <LayoutContext.Consumer>
      {({addSidebar, removeSidebar}) => (
        <SidebarInner
          {...props}
          addSidebar={addSidebar}
          removeSidebar={removeSidebar}
        />
      )}
    </LayoutContext.Consumer>
  );
}

export default Sidebar;
