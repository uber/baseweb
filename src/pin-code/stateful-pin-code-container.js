/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import type {
  ChangeEventT,
  StatefulPinCodeContainerPropsT,
  StatefulPinCodeContainerStateT,
  StateReducerT,
} from './types.js';
import defaultProps from './default-props.js';
import {STATE_CHANGE_TYPE} from '../input/index.js';

const stateReducer: StateReducerT = (type, nextState) => nextState;

export default class StatefulPinCodeContainer extends React.Component<
  StatefulPinCodeContainerPropsT,
  StatefulPinCodeContainerStateT,
> {
  static defaultProps = {
    initialState: {values: defaultProps.values},
    stateReducer,
    onChange: defaultProps.onChange,
  };

  state = this.props.initialState;

  handleChange = ({values, event}: ChangeEventT) => {
    this.props.onChange({values, event});
    const nextState = this.props.stateReducer(
      STATE_CHANGE_TYPE.change,
      {values},
      this.state,
    );
    this.setState(nextState);
  };

  render() {
    const {children, initialState, stateReducer, ...restProps} = this.props;
    return children({
      ...defaultProps,
      ...restProps,
      ...this.state,
      onChange: this.handleChange,
    });
  }
}
