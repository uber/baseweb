/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {getOverrides} from '../helpers/overrides.js';

import LayoutContext from './layout-context.js';
import {StyledLayout} from './styled-components.js';
import type {LayoutPropsT, LayoutStateT} from './types.js';

export default class Layout extends React.Component<
  LayoutPropsT,
  LayoutStateT,
> {
  state = {sidebarCount: 0};
  addSidebar = () => {
    this.setState(prev => ({sidebarCount: prev.sidebarCount + 1}));
  };

  removeSidebar = () => {
    this.setState(prev => {
      const nextCount = Math.max(prev.sidebarCount - 1, 0);
      return {sidebarCount: nextCount};
    });
  };

  render() {
    const {overrides = {}} = this.props;
    const [OverridedLayout, layoutProps] = getOverrides(
      overrides,
      StyledLayout,
    );

    return (
      <OverridedLayout {...layoutProps} $isRow={this.state.sidebarCount > 0}>
        <LayoutContext.Provider
          value={{
            addSidebar: this.addSidebar,
            removeSidebar: this.removeSidebar,
          }}
        >
          {this.props.children}
        </LayoutContext.Provider>
      </OverridedLayout>
    );
  }
}
