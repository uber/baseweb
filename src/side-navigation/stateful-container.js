/*
Copyright (c) 2018 Uber Technologies, Inc.

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

class StatefulContainer extends React.Component<
  StatefulContainerPropsT,
  StateT,
> {
  static defaultProps = {
    initialState: {},
    stateReducer: defaultStateReducer,
    onChange: () => {},
  };

  state: StateT = {
    activePath: '',
    ...this.props.initialState,
  };

  onChange = (params: {item: *}) => {
    this.internalSetState(STATE_CHANGE_TYPE.change, params.item);
    this.props.onChange(params);
  };

  internalSetState = (type: StateTypeT, item: *) => {
    let nextState = {};
    if (type === STATE_CHANGE_TYPE.change) {
      nextState = {activePath: item.path};
    }
    const newState = this.props.stateReducer(type, nextState, this.state);
    this.setState(newState);
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const {children, initialState, stateReducer, ...rest} = this.props;
    const {onChange} = this;
    // $FlowFixMe
    return children({
      ...rest,
      ...this.state,
      onChange,
    });
  }
}

export default StatefulContainer;
