/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import type { StatefulContainerProps, StateReducer, State, OnChangeParams } from './types';

const defaultStateReducer: StateReducer = (type, nextState) => nextState;

class StatefulSelectContainer extends React.Component<StatefulContainerProps, State> {
  static defaultProps = {
    initialState: {
      value: [],
    },
    onChange: () => {},
    overrides: {},
    stateReducer: defaultStateReducer,
  };

  state = { ...this.props.initialState };

  onChange = (params: OnChangeParams) => {
    this.internalSetState(params);
    this.props.onChange(params);
  };

  internalSetState = (params: OnChangeParams) => {
    const { stateReducer } = this.props;
    const nextState: State = { value: params.value };
    this.setState(stateReducer(params.type, nextState, this.state));
  };

  render() {
    const {
      children,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      initialState, // eslint-disable-line no-unused-vars
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      stateReducer, // eslint-disable-line no-unused-vars
      ...restProps
    } = this.props;
    return children({
      ...restProps,
      ...this.state,
      onChange: this.onChange,
    });
  }
}

export default StatefulSelectContainer;
