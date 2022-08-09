/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import Tabs from './tabs';
import { STATE_CHANGE_TYPE } from './constants';
import type { StatefulTabsProps, StatefulTabsState, StateChangeType } from './types';

export default class StatefulTabs extends React.Component<StatefulTabsProps, StatefulTabsState> {
  static defaultProps: Partial<StatefulTabsProps> = {
    disabled: false,
    onChange: () => {},
    overrides: {},
    stateReducer: (type, newState) => newState,
  };

  state = {
    activeKey: this.getInitialKey(),
  };

  onTabChange = (newState: StatefulTabsState) => {
    this.internalSetState(STATE_CHANGE_TYPE.change, newState);
  };

  internalSetState(type: StateChangeType, changes: StatefulTabsState) {
    const { stateReducer, onChange } = this.props;
    const newState = stateReducer(type, changes, this.state);
    this.setState(newState);
    typeof onChange === 'function' && onChange(newState);
  }

  getInitialKey() {
    const { initialState, children } = this.props;
    if (initialState && initialState.activeKey) {
      return initialState.activeKey;
    } else {
      return React.Children.map(
        children,
        // @ts-expect-error todo(flow->ts) child might be not a ReactElement, theoretically including null
        (child, index) => child.key || String(index)
      )[0];
    }
  }

  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { initialState, stateReducer, ...restProps } = this.props;
    return <Tabs {...restProps} activeKey={this.state.activeKey} onChange={this.onTabChange} />;
  }
}
