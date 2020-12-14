/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import Tabs from './tabs.js';
import {STATE_CHANGE_TYPE} from './constants.js';
import type {
  StatefulTabsPropsT,
  StatefulTabsStateT,
  StateChangeTypeT,
} from './types.js';

export default class StatefulTabs extends React.Component<
  StatefulTabsPropsT,
  StatefulTabsStateT,
> {
  static defaultProps: $Shape<StatefulTabsPropsT> = {
    disabled: false,
    onChange: () => {},
    overrides: {},
    stateReducer: (type, newState) => newState,
  };

  state = {
    activeKey: this.getInitialKey(),
  };

  onTabChange = (newState: StatefulTabsStateT) => {
    this.internalSetState(STATE_CHANGE_TYPE.change, newState);
  };

  internalSetState(type: StateChangeTypeT, changes: StatefulTabsStateT) {
    const {stateReducer, onChange} = this.props;
    const newState = stateReducer(type, changes, this.state);
    this.setState(newState);
    typeof onChange === 'function' && onChange(newState);
  }

  getInitialKey() {
    const {initialState, children} = this.props;
    if (initialState && initialState.activeKey) {
      return initialState.activeKey;
    } else {
      return React.Children.map(
        children,
        (child, index) => child.key || String(index),
      )[0];
    }
  }

  render() {
    const {initialState, stateReducer, ...restProps} = this.props;
    return (
      <Tabs
        {...restProps}
        activeKey={this.state.activeKey}
        onChange={this.onTabChange}
      />
    );
  }
}
