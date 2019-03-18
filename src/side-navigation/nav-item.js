/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {getOverrides} from '../helpers/overrides.js';
import {
  StyledNavItemContainer,
  StyledSubNavContainer,
  StyledNavItem,
} from './styled-components.js';
import type {NavItemPropsT} from './types.js';

export default class NavItem extends React.Component<NavItemPropsT> {
  static defaultProps = {
    overrides: {},
    onSelect: null,
    onClick: null,
    onKeyDown: null,
  };

  handleClick = (params: {e: Event, item: *}) => {
    const {item, e} = params;
    const {onSelect} = this.props;
    if (typeof onSelect === 'function') {
      onSelect({item});
    }
    this.props.onClick && this.props.onClick(e);
  };

  handleKeyDown = (params: {e: KeyboardEvent, item: *}) => {
    const {item, e} = params;
    if (e.key === 'Enter') {
      const {onSelect} = this.props;
      if (typeof onSelect === 'function') {
        onSelect({item});
      }
    }
    this.props.onKeyDown && this.props.onKeyDown(e);
  };

  render() {
    const {
      activeItemId,
      index,
      activePredicate,
      item: topLevelItem,
      navLevel,
      overrides,
      renderItem,
    } = this.props;
    const [NavItemContainer, itemContainerProps] = getOverrides(
      overrides.NavItemContainer,
      StyledNavItemContainer,
    );
    const [NavItem, itemProps] = getOverrides(overrides.NavItem, StyledNavItem);
    const [SubNavContainer, subNavContainerProps] = getOverrides(
      overrides.SubNavContainer,
      StyledSubNavContainer,
    );

    const renderNavItem = (item, level, index) => {
      const sharedProps = {
        $active: activePredicate ? activePredicate(item, activeItemId) : false,
        $level: level,
        $selectable: !!item.itemId,
      };
      const navItemProps = {
        role: 'link',
        tabIndex: item.itemId ? 0 : null,
        onClick: item.itemId ? e => this.handleClick({e, item}) : null,
        onKeyDown: item.itemId ? e => this.handleKeyDown({e, item}) : null,
        ...sharedProps,
        ...itemProps,
      };
      return (
        <NavItemContainer
          key={`${index}-level${level}-${item.title}`}
          {...sharedProps}
          {...itemContainerProps}
        >
          <>
            {typeof renderItem === 'function' ? (
              renderItem(item, navItemProps)
            ) : (
              <NavItem {...navItemProps}>{item.title}</NavItem>
            )}
            {item.subnav ? (
              <SubNavContainer {...sharedProps} {...subNavContainerProps}>
                {item.subnav.map((subitem, idx) => {
                  return renderNavItem(subitem, level + 1, index);
                })}
              </SubNavContainer>
            ) : null}
          </>
        </NavItemContainer>
      );
    };

    return renderNavItem(topLevelItem, navLevel, index);
  }
}
