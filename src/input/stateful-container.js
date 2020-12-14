/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {STATE_CHANGE_TYPE} from './constants.js';
import type {
  StatefulContainerPropsT,
  StateT,
  StateReducerT,
  StateTypeT,
} from './types.js';

const defaultStateReducer: StateReducerT = (type, nextState) => nextState;

class StatefulContainer<T: EventTarget> extends React.Component<
  StatefulContainerPropsT<T>,
  StateT,
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

  onChange = (e: SyntheticInputEvent<T>) => {
    const nextState = {value: e.target.value};
    this.internalSetState(STATE_CHANGE_TYPE.change, nextState);
    this.props.onChange(e);
  };

  internalSetState = (type: StateTypeT, nextState: StateT) => {
    const newState = this.props.stateReducer(type, nextState, this.state);
    this.setState(newState);
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const {children, initialState, stateReducer, ...restProps} = this.props;
    const {onChange} = this;
    return children({
      ...restProps,
      ...this.state,
      onChange,
    });
  }
}

export default StatefulContainer;
