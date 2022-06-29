/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';

import type {
  ChangeEvent,
  StatefulPinCodeContainerProps,
  StatefulPinCodeContainerState,
  StateReducer,
} from './types';
import defaultProps from './default-props';
import { STATE_CHANGE_TYPE } from '../input';

const stateReducer: StateReducer = (type, nextState) => nextState;

export default class StatefulPinCodeContainer extends React.Component<
  StatefulPinCodeContainerProps,
  StatefulPinCodeContainerState
> {
  static defaultProps = {
    initialState: { values: defaultProps.values },
    stateReducer,
    onChange: defaultProps.onChange,
  };

  state = this.props.initialState;

  handleChange = ({ values, event }: ChangeEvent) => {
    this.props.onChange({ values, event });
    const nextState = this.props.stateReducer(STATE_CHANGE_TYPE.change, { values }, this.state);
    this.setState(nextState);
  };

  render() {
    return this.props.children({
      ...defaultProps,
      'aria-label': this.props['aria-label'],
      'aria-labelledby': this.props['aria-labelledby'],
      'aria-describedby': this.props['aria-describedby'],
      autoComplete: this.props.autoComplete,
      autoFocus: this.props.autoFocus,
      disabled: this.props.disabled,
      error: this.props.error,
      id: this.props.id,
      name: this.props.name,
      overrides: this.props.overrides,
      placeholder: this.props.placeholder,
      positive: this.props.positive,
      required: this.props.required,
      size: this.props.size,
      manageFocus: this.props.manageFocus,
      values: this.state.values,
      onChange: this.handleChange,
      mask: this.props.mask,
    });
  }
}
