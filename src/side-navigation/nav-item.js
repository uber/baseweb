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

class NavItem extends React.Component<NavItemPropsT> {
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
    const {item, overrides, ...sharedProps} = this.props;
    const [NavItem, itemProps] = getOverrides(overrides.NavItem, StyledNavItem);
    const [NavLink, linkProps] = getOverrides(overrides.NavLink, StyledNavLink);
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
        <NavItem item={item} {...sharedProps} {...itemProps}>
          {item.title}
        </NavItem>
      </NavLink>
    );
  }
}

function areEqualShallow(a, b) {
  if (!a || !b) return false;
  if (typeof a !== 'object' || typeof a !== 'object') return false;

  if (Object.keys(a).length !== Object.keys(b).length) return false;

  for (var key in a) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}

function compare(prevProps, nextProps) {
  return (
    prevProps.$active === nextProps.$active &&
    prevProps.$level === nextProps.$level &&
    prevProps.$selectable === nextProps.$selectable &&
    areEqualShallow(prevProps.item, nextProps.item)
  );
}

export default React.memo<NavItemPropsT>(NavItem, compare);
