/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {getOverrides} from '../helpers/overrides.js';
import {Tab as StyledTab} from './styled-components.js';

import type {TabPropsT, SharedStylePropsArgT} from './types.js';

class TabComponent extends React.Component<TabPropsT> {
  static defaultProps = {
    disabled: false,
    expanded: false,
    onSelect: () => {},
    onClick: () => {},
    onKeyDown: () => {},
    title: '',
  };

  onClick = (e: Event) => {
    const {disabled, onSelect, onClick} = this.props;
    if (disabled) {
      return;
    }
    typeof onClick === 'function' && onClick(e);
    typeof onSelect === 'function' && onSelect();
    return;
  };

  onKeyDown = (e: KeyboardEvent) => {
    const {disabled, onSelect, onKeyDown} = this.props;
    if (disabled) {
      return;
    }
    typeof onKeyDown === 'function' && onKeyDown(e);
    // toggle on Enter or Space button pressed
    if (e.key === 'Enter' || e.which === 32) {
      typeof onSelect === 'function' && onSelect();
      e.which === 32 && e.preventDefault(); // prevent jumping scroll when using Space
    }
    return;
  };

  getSharedProps(): SharedStylePropsArgT {
    const {disabled, active, $orientation} = this.props;
    return {
      $disabled: disabled,
      $active: active,
      $orientation: $orientation,
    };
  }

  render() {
    const {active, disabled, id, overrides = {}, children} = this.props;
    const sharedProps = this.getSharedProps();
    const {Tab: TabOverride} = overrides;
    const [Tab, tabProps] = getOverrides(TabOverride, StyledTab);

    return (
      <Tab
        tabIndex={disabled ? -1 : 0}
        role="tab"
        id={id}
        aria-selected={active}
        aria-disabled={disabled || null}
        {...sharedProps}
        {...tabProps}
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}
      >
        {children}
      </Tab>
    );
  }
}

export default TabComponent;
