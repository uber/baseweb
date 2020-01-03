/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

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
    const {
      item,
      overrides,
      itemMemoizationComparator,
      ...sharedProps
    } = this.props;

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

function compare(prevProps, nextProps) {
  if (nextProps.itemMemoizationComparator) {
    return nextProps.itemMemoizationComparator(prevProps, nextProps);
  }
  return false;
}

export default React.memo<NavItemPropsT>(NavItem, compare);
