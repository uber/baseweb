/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {STATE_TYPE} from './constants.js';
import type {
  StatefulContainerPropsT,
  StateReducerT,
  DefaultStatefulPropsT,
  StateT,
} from './types.js';

const defaultStateReducer: StateReducerT = (type, nextState) => nextState;

class StatefulRadioGroupContainer extends React.Component<
  StatefulContainerPropsT,
  StateT,
> {
  static defaultProps: DefaultStatefulPropsT = {
    initialState: {},
    stateReducer: defaultStateReducer,
    onChange: () => {},
  };

  constructor(props: StatefulContainerPropsT) {
    super(props);
    const {initialState} = this.props;
    this.state = {
      value: '',
      ...initialState,
    };
  }

  onChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.stateReducer(STATE_TYPE.change, e);
    const {onChange} = this.props;
    onChange && onChange(e);
  };

  stateReducer = (type: string, e: SyntheticInputEvent<HTMLInputElement>) => {
    let nextState = {};
    const {stateReducer} = this.props;
    if (type === STATE_TYPE.change) {
      nextState = {value: e.target.value};
    }

    if (stateReducer) {
      const newState = stateReducer(type, nextState, this.state, e);
      this.setState(newState);
    } else {
      this.setState(nextState);
    }
  };

  render() {
    const {children = childProps => null} = this.props;
    return children({
      value: this.state.value,
      ['aria-label']: this.props['aria-label'],
      ['aria-labelledby']: this.props['aria-labelledby'],
      autoFocus: this.props.autoFocus,
      overrides: this.props.overrides,
      name: this.props.name,
      disabled: this.props.disabled,
      labelPlacement: this.props.labelPlacement,
      align: this.props.align,
      isError: this.props.isError,
      required: this.props.required,
      onChange: this.onChange,
      onMouseEnter: this.props.onMouseEnter,
      onMouseLeave: this.props.onMouseLeave,
      onFocus: this.props.onFocus,
      onBlur: this.props.onBlur,
    });
  }
}

export default StatefulRadioGroupContainer;
