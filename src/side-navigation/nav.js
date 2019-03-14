/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {getOverrides} from '../helpers/overrides.js';
import NavItem from './nav-item.js';
import {StyledRoot} from './styled-components.js';
import type {SideNavPropsT} from './types.js';

export default class SideNav extends React.Component<SideNavPropsT> {
  static defaultProps = {
    activePath: '/',
    items: [],
    isActive: null,
    overrides: {},
    renderItem: null,
  };

  isActive = (item: *, activePath: string) => {
    return item.path === activePath ? true : false;
  };

  render() {
    const {isActive, items, onChange, overrides} = this.props;
    const navLevel = 1;
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);

    return (
      <Root {...rootProps}>
        {items.map((item, index) => {
          return (
            <NavItem
              key={index}
              {...this.props}
              isActive={isActive || this.isActive}
              index={index}
              item={item}
              navLevel={navLevel}
              onSelect={onChange}
            />
          );
        })}
      </Root>
    );
  }
}
