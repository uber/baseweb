/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {getOverrides} from '../helpers/overrides.js';
import {StyledNavLink, StyledNavItem} from './styled-components.js';
import type {NavItemPropsT} from './types.js';

export default class NavItem extends React.Component<NavItemPropsT> {
  static defaultProps = {
    overrides: {},
    onSelect: () => {},
  };

  handleClick = (event: Event) => {
    const {item, onSelect} = this.props;
    if (typeof onSelect === 'function') {
      onSelect({item, event});
    }
  };

  handleKeyDown = (event: KeyboardEvent) => {
    const {item, onSelect} = this.props;
    if (event.key === 'Enter') {
      if (typeof onSelect === 'function') {
        onSelect({item, event});
      }
    }
  };

  render() {
    const {item, onSelect, overrides, renderItem, ...sharedProps} = this.props;
    const [NavItem, itemProps] = getOverrides(overrides.NavItem, StyledNavItem);
    const [NavLink, linkProps] = getOverrides(overrides.NavLink, StyledNavLink);
    const navItemProps = {
      ...sharedProps,
      onSelect: onSelect,
      onClick: this.handleClick,
      onKeyDown: this.handleKeyDown,
    };
    if (typeof renderItem === 'function') {
      return renderItem(item, navItemProps);
    }
    return (
      <NavLink
        href={item.itemId}
        {...sharedProps}
        {...linkProps}
        {...(item.itemId
          ? {
              onClick: this.handleClick,
              onKeyDown: this.handleKeyDown,
            }
          : {})}
      >
        <NavItem {...sharedProps} {...itemProps}>
          {item.title}
        </NavItem>
      </NavLink>
    );
  }
}
