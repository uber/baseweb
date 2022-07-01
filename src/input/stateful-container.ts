/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { STATE_CHANGE_TYPE } from './constants';
import type { StatefulContainerPropsT, StateT, StateReducerT, StateTypeT } from './types';

import type { ChangeEvent } from 'react';

const defaultStateReducer: StateReducerT = (type, nextState) => nextState;

class StatefulContainer<T extends EventTarget> extends React.Component<
  StatefulContainerPropsT<T>,
  StateT
> {
  static defaultProps = {
    initialState: {},
    stateReducer: defaultStateReducer,
    onChange: () => {},
    onClear: () => {},
  };

  state: StateT = {
    value: '',
    ...this.props.initialState,
  };

  onChange = (e: ChangeEvent<T>) => {
    const nextState = { value: e.target.value };
    this.internalSetState(STATE_CHANGE_TYPE.change, nextState);
    this.props.onChange(e);
  };

  internalSetState = (type: StateTypeT, nextState: StateT) => {
    const newState = this.props.stateReducer(type, nextState, this.state);
    this.setState(newState);
  };

  render() {
    const { children, initialState, stateReducer, ...restProps } = this.props;
    const { onChange } = this;
    return children({
      ...restProps,
      ...this.state,
      onChange,
    });
  }
}

export default StatefulContainer;
