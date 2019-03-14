/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {getOverrides} from '../helpers/overrides.js';
import {
  StyledItemContainer,
  StyledSubNavContainer,
  StyledLink,
  StyledItem,
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
      isActive,
      item: topLevelItem,
      navLevel,
      overrides,
      renderItem,
    } = this.props;
    const [ItemContainer, itemContainerProps] = getOverrides(
      overrides.NavItemContainer,
      StyledItemContainer,
    );
    const [Link, linkProps] = getOverrides(overrides.Link, StyledLink);
    const [Item, itemProps] = getOverrides(overrides.NavItem, StyledItem);
    const [SubNavContainer, subNavContainerProps] = getOverrides(
      overrides.SubNavContainer,
      StyledSubNavContainer,
    );

    const renderNavItem = (item, level, index) => {
      const sharedProps = {
        $active: isActive ? isActive(item, activePath) : false,
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
              {item.path ? (
                <Link
                  href={item.path}
                  onClick={e => {
                    this.handleClick({e, item});
                  }}
                  onKeyDown={e => {
                    this.handleKeyDown({e, item});
                  }}
                  {...sharedProps}
                  {...linkProps}
                >
                  <Item {...sharedProps} {...itemProps}>
                    {item.title}
                  </Item>
                </Link>
              ) : (
                <Item {...sharedProps} {...itemProps}>
                  {item.title}
                </Item>
              )}
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
