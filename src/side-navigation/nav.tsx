/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { getOverrides } from '../helpers/overrides';
import NavItem from './nav-item';
import { StyledRoot, StyledNavItemContainer, StyledSubNavContainer } from './styled-components';
import type { NavigationProps, Item } from './types';
import { isFocusVisible, forkFocus, forkBlur } from '../utils/focusVisible';

import type { SyntheticEvent } from 'react';

export default class SideNav extends React.Component<
  NavigationProps,
  {
    isFocusVisible: boolean;
  }
> {
  static defaultProps = {
    activeItemId: '/',
    // @ts-ignore
    activePredicate: null,
    // @ts-ignore
    items: [],
    overrides: {},
    // @ts-ignore
    mapItem: null,
  };
  state = { isFocusVisible: false };

  handleFocus = (event: SyntheticEvent) => {
    if (isFocusVisible(event)) {
      this.setState({ isFocusVisible: true });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleBlur = (event: SyntheticEvent) => {
    if (this.state.isFocusVisible !== false) {
      this.setState({ isFocusVisible: false });
    }
  };

  activePredicate = (item: Item) => item.itemId === this.props.activeItemId;

  render() {
    const { activeItemId, activePredicate, items, onChange, overrides, mapItem } = this.props;
    const navLevel = 1;

    // @ts-ignore
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    const [NavItemContainer, itemContainerProps] = getOverrides(
      // @ts-ignore
      overrides.NavItemContainer,
      StyledNavItemContainer
    );
    const [SubNavContainer, subNavContainerProps] = getOverrides(
      // @ts-ignore
      overrides.SubNavContainer,
      StyledSubNavContainer
    );

    // @ts-ignore
    const renderNavItem = (item: Item, level: number, index, mapItem?) => {
      if (typeof mapItem === 'function') {
        // @ts-ignore
        const recMapItem = (item) => {
          let subNav = [];
          if (item.subNav) {
            subNav = item.subNav.map(recMapItem);
          }
          return mapItem({ ...item, subNav });
        };
        item = recMapItem(item);
      }

      const sharedProps = {
        $active: activePredicate ? activePredicate(item, activeItemId) : this.activePredicate(item),
        $level: level,
        $selectable: !!item.itemId,
        $disabled: item.disabled || false,
      };

      return (
        <NavItemContainer
          key={`${index}-level${level}-${
            typeof item.title === 'string' ? item.title : item.itemId || ''
          }`}
          {...sharedProps}
          {...itemContainerProps}
          onFocus={forkFocus(itemContainerProps, this.handleFocus)}
          onBlur={forkBlur(itemContainerProps, this.handleBlur)}
        >
          <>
            <NavItem
              $isFocusVisible={this.state.isFocusVisible}
              item={item}
              itemMemoizationComparator={this.props.itemMemoizationComparator}
              onSelect={onChange}
              overrides={overrides}
              {...sharedProps}
            />
            {item.subNav ? (
              <SubNavContainer role="list" {...sharedProps} {...subNavContainerProps}>
                {item.subNav.map((subitem) => {
                  return renderNavItem(subitem, level + 1, index);
                })}
              </SubNavContainer>
            ) : null}
          </>
        </NavItemContainer>
      );
    };

    return (
      <Root role="navigation" data-baseweb="side-navigation" {...rootProps}>
        <SubNavContainer role="list">
          {items.map((item, index) => {
            return renderNavItem(item, navLevel, index, mapItem);
          })}
        </SubNavContainer>
      </Root>
    );
  }
}
