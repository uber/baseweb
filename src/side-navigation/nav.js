/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {getOverrides} from '../helpers/overrides.js';
import NavItem from './nav-item.js';
import {
  StyledRoot,
  StyledNavItemContainer,
  StyledSubNavContainer,
} from './styled-components.js';
import type {NavPropsT, Item} from './types.js';

export default class SideNav extends React.Component<NavPropsT> {
  static defaultProps = {
    activeItemId: '/',
    activePredicate: null,
    items: [],
    overrides: {},
    renderItem: null,
    mapItem: null,
  };

  activePredicate = (item: Item) => item.itemId === this.props.activeItemId;

  render() {
    const {
      activeItemId,
      activePredicate,
      items,
      onChange,
      overrides,
      renderItem,
      mapItem,
    } = this.props;
    const navLevel = 1;

    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    const [NavItemContainer, itemContainerProps] = getOverrides(
      overrides.NavItemContainer,
      StyledNavItemContainer,
    );
    const [SubNavContainer, subNavContainerProps] = getOverrides(
      overrides.SubNavContainer,
      StyledSubNavContainer,
    );

    const renderNavItem = (item: Item, level: number, index, mapItem) => {
      if (typeof mapItem === 'function') {
        const recMapItem = item => {
          let subnav = [];
          if (item.subnav) {
            subnav = item.subnav.map(recMapItem);
          }
          return mapItem({...item, subnav: subnav});
        };
        item = recMapItem(item);
      }

      const sharedProps = {
        $active: activePredicate
          ? activePredicate(item, activeItemId)
          : this.activePredicate(item),
        $level: level,
        $selectable: !!item.itemId,
      };

      return (
        <NavItemContainer
          key={`${index}-level${level}-${
            typeof item.title === 'string' ? item.title : item.itemId || ''
          }`}
          {...sharedProps}
          {...itemContainerProps}
        >
          <>
            <NavItem
              item={item}
              onSelect={onChange}
              renderItem={renderItem}
              {...sharedProps}
            />
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

    return (
      <Root role="list" {...rootProps}>
        {items.map((item, index) => {
          return renderNavItem(item, navLevel, index, mapItem);
        })}
      </Root>
    );
  }
}
