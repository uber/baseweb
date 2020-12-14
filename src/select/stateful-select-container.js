/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import type {
  StatefulContainerPropsT,
  StateReducerT,
  StateT,
  OnChangeParamsT,
} from './types.js';

const defaultStateReducer: StateReducerT = (type, nextState) => nextState;

class StatefulSelectContainer extends React.Component<
  StatefulContainerPropsT,
  StateT,
> {
  static defaultProps = {
    initialState: {
      value: [],
    },
    onChange: () => {},
    overrides: {},
    stateReducer: defaultStateReducer,
  };

  state = {...this.props.initialState};

  onChange = (params: OnChangeParamsT) => {
    this.internalSetState(params);
    this.props.onChange(params);
  };

  internalSetState = (params: OnChangeParamsT) => {
    const {stateReducer} = this.props;
    const nextState: StateT = {value: params.value};
    this.setState(stateReducer(params.type, nextState, this.state));
  };

  render() {
    const {
      children,
      initialState, // eslint-disable-line no-unused-vars
      stateReducer, // eslint-disable-line no-unused-vars
      ...restProps
    } = this.props;
    // $FlowFixMe
    return children({
      ...restProps,
      ...this.state,
      onChange: this.onChange,
    });
  }
}

export default StatefulSelectContainer;
