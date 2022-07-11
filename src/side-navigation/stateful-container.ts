/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { STATE_CHANGE_TYPE } from './constants';
import type { StatefulContainerPropsT, StateT, StateReducerT, StateTypeT, Item } from './types';

const defaultStateReducer: StateReducerT = (type, nextState) => nextState;

class StatefulContainer extends React.Component<StatefulContainerPropsT, StateT> {
  static defaultProps = {
    initialState: {},
    stateReducer: defaultStateReducer,
    onChange: () => {},
  };

  state: StateT = {
    activeItemId: '',
    ...this.props.initialState,
  };

  onChange = (params: { item: Item; event: Event | KeyboardEvent }) => {
    const { onChange } = this.props;
    this.internalSetState(STATE_CHANGE_TYPE.change, params.item);
    if (typeof onChange === 'function') {
      onChange(params);
    }
  };
  // flowlint-next-line unclear-type:off
  internalSetState = (type: StateTypeT, item: any) => {
    let nextState = {};
    if (type === STATE_CHANGE_TYPE.change) {
      nextState = { activeItemId: item.itemId };
    }
    const newState = this.props.stateReducer
      ? this.props.stateReducer(type, nextState, this.state)
      : nextState;
    this.setState(newState);
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const { children, initialState, stateReducer, ...restProps } = this.props;
    const { onChange } = this;
    // $FlowFixMe
    return children({
      ...restProps,
      ...this.state,
      onChange,
    });
  }
}

export default StatefulContainer;
