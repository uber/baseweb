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
      activePath,
      index,
      activePredicate,
      item: topLevelItem,
      navLevel,
      overrides,
      renderItem,
    } = this.props;
    const [ItemContainer, itemContainerProps] = getOverrides(
      overrides.NavItemContainer,
      StyledNavItemContainer,
    );
    const [Item, itemProps] = getOverrides(overrides.NavItem, StyledNavItem);
    const [SubNavContainer, subNavContainerProps] = getOverrides(
      overrides.SubNavContainer,
      StyledSubNavContainer,
    );

    const renderNavItem = (item, level, index) => {
      const sharedProps = {
        $active: activePredicate ? activePredicate(item, activePath) : false,
        $level: level,
        $selectable: !!item.path,
      };
      return (
        <ItemContainer
          key={`${index}-level${level}-${item.title}`}
          {...sharedProps}
          {...itemContainerProps}
        >
          {typeof renderItem === 'function' ? (
            renderItem(item)
          ) : (
            <>
              <Item
                role="button"
                tabIndex={item.path ? 0 : null}
                onClick={
                  item.path
                    ? e => {
                        this.handleClick({e, item});
                      }
                    : null
                }
                onKeyDown={
                  item.path
                    ? e => {
                        this.handleKeyDown({e, item});
                      }
                    : null
                }
                {...sharedProps}
                {...itemProps}
              >
                {item.title}
              </Item>
              {item.subnav ? (
                <SubNavContainer {...sharedProps} {...subNavContainerProps}>
                  {item.subnav.map((subitem, idx) => {
                    return renderNavItem(subitem, level + 1, index);
                  })}
                </SubNavContainer>
              ) : null}
            </>
          )}
        </ItemContainer>
      );
    };

    return renderNavItem(topLevelItem, navLevel, index);
  }
}
