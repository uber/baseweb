/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {KIND} from './constants.js';
import {StyledMainMenuItem} from './styled-components.js';
import {isFocusVisible} from '../utils/focusVisible.js';
import type {
  MainNavItemT,
  UserNavItemT,
  onNavItemClickT,
  onNavItemAuxClickT,
  onNavItemKeyDownT,
  onNavItemSelectT
} from './types.js';

export default class MenuItem extends React.Component<
  {
    item: MainNavItemT | UserNavItemT,
    active?: boolean,
    kind?: $Values<typeof KIND>,
    onClick?: onNavItemClickT,
    onAuxClick?: onNavItemAuxClickT,
    onKeyDown?: onNavItemKeyDownT,
    onSelect: onNavItemSelectT,
  },
  {hasFocusVisible: boolean},
> {
  state = {hasFocusVisible: false};

  setHasFocusVisible = (hasFocusVisible: boolean) => {
    this.setState({hasFocusVisible});
  };

  handleFocus = (event: SyntheticEvent<>) => {
    if (isFocusVisible(event)) {
      this.setHasFocusVisible(true);
    }
  };

  handleBlur = (event: SyntheticEvent<>) => {
    if (this.state.hasFocusVisible !== false) {
      this.setHasFocusVisible(false);
    }
  };

  onClick = (e: Event) => {
    const {onClick, onSelect} = this.props;
    typeof onClick === 'function' && onClick({item: this.props.item, event: e});
    typeof onSelect === 'function' && onSelect({item: this.props.item});
    return;
  };

  onAuxClick = (e: Event) => {
    const {onAuxClick} = this.props;
    typeof onAuxClick === 'function' && onAuxClick({item: this.props.item, event: e});
    // don't call onSelect here
    return;
  };

  onKeyDown = (e: KeyboardEvent) => {
    const {onKeyDown, onSelect} = this.props;
    typeof onKeyDown === 'function' && onKeyDown({item: this.props.item, event: e});
    if (e.key === 'Enter') {
      typeof onSelect === 'function' && onSelect({item: this.props.item});
    }
    return;
  };

  render() {
    const {item, active, kind = KIND.primary} = this.props;
    return (
      <StyledMainMenuItem
        $kind={kind}
        $isFocusVisible={this.state.hasFocusVisible}
        $active={active}
        tabIndex={0}
        aria-selected={active || null}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onClick={this.onClick}
        onAuxClick={this.onAuxClick}
        onKeyDown={this.onKeyDown}
      >
        {typeof item.mapItemToNode === 'function'
          ? item.mapItemToNode(item.item)
          : item.mapItemToString(item.item)}
      </StyledMainMenuItem>
    );
  }
}
