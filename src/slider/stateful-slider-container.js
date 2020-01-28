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
  StateReducerT,
  StateT,
  ParamsT,
  ChangeActionT,
} from './types.js';

const defaultStateReducer: StateReducerT = (type, nextState) => nextState;

class StatefulSliderContainer extends React.Component<
  StatefulContainerPropsT,
  StateT,
> {
  constructor(props: StatefulContainerPropsT) {
    super(props);
    this.state = {
      value:
        props.initialState && Array.isArray(props.initialState.value)
          ? props.initialState.value
          : [Math.round((props.max - props.min) / 2) + props.min],
    };
  }
  static defaultProps = {
    stateReducer: defaultStateReducer,
    min: 0,
    max: 100,
    step: 1,
    onChange: () => {},
    onFinalChange: () => {},
  };

  onChange = (params: {value: Array<number>}) => {
    this.internalSetState(STATE_CHANGE_TYPE.change, params);
    return this.props.onChange({...params});
  };

  onFinalChange = (params: {value: Array<number>}) => {
    this.internalSetState(STATE_CHANGE_TYPE.finalChange, params);
    return this.props.onFinalChange({...params});
  };

  internalSetState = (type: ChangeActionT, {value}: ParamsT) => {
    const nextState = {value};
    const {stateReducer} = this.props;
    const newState = stateReducer(type, nextState, this.state);
    this.setState(newState);
  };

  render() {
    const {
      children,
      initialState, // eslint-disable-line no-unused-vars
      stateReducer, // eslint-disable-line no-unused-vars
      ...restProps
    } = this.props;
    return children({
      ...restProps,
      ...this.state,
      onChange: this.onChange,
      onFinalChange: this.onFinalChange,
    });
  }
}

export default StatefulSliderContainer;
