/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {StyledPrimaryMenuItem} from './styled-components.js';
import {isFocusVisible} from '../utils/focusVisible.js';
import type {MainNavItemT} from './types.js';

export default class MenuItem extends React.Component<
  {
    // eslint-disable-next-line flowtype/no-weak-types
    item: MainNavItemT,
    onClick?: (e: Event) => mixed,
    onKeyDown?: (e: KeyboardEvent) => mixed,
    // eslint-disable-next-line flowtype/no-weak-types
    onSelect: ({item: any}) => mixed,
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
    typeof onClick === 'function' && onClick(e);
    typeof onSelect === 'function' && onSelect({item: this.props.item});
    return;
  };

  onKeyDown = (e: KeyboardEvent) => {
    const {onKeyDown, onSelect} = this.props;
    typeof onKeyDown === 'function' && onKeyDown(e);
    if (e.key === 'Enter') {
      typeof onSelect === 'function' && onSelect({item: this.props.item});
    }
    return;
  };

  render() {
    const {item} = this.props;
    return (
      <StyledPrimaryMenuItem
        $isFocusVisible={this.state.hasFocusVisible}
        $active={item.active || false}
        tabIndex={0}
        aria-selected={item.active || null}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}
      >
        {typeof item.mapItemToNode === 'function'
          ? item.mapItemToNode(item.item)
          : item.mapItemToString(item.item)}
      </StyledPrimaryMenuItem>
    );
  }
}
