/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {STATE_CHANGE_TYPE} from './constants';
import type {
  StatefulContainerPropsT,
  StateReducerT,
  StateT,
  ParamsT,
  ChangeActionT,
} from './types';

const defaultStateReducer: StateReducerT = (type, nextState) => nextState;

class StatefulSliderContainer extends React.Component<
  StatefulContainerPropsT,
  StateT,
> {
  static defaultProps = {
    initialState: {},
    stateReducer: defaultStateReducer,
    onChange: () => {},
  };

  state = {...this.props.initialState};

  onChange = (config: {event: *, value: Array<number>}) => {
    const {event, ...params} = config;
    //$FlowFixMe
    this.internalSetState(STATE_CHANGE_TYPE.change, event, params);
    const {onChange} = this.props;
    return onChange({event, ...params});
  };

  internalSetState = (
    type: ChangeActionT,
    e: SyntheticInputEvent<HTMLInputElement>,
    {value}: ParamsT,
  ) => {
    const nextState = {value};
    const {stateReducer} = this.props;
    const newState = stateReducer(type, nextState, this.state, e);
    this.setState(newState);
  };

  render() {
    const {
      children,
      initialState, // eslint-disable-line no-unused-vars
      stateReducer, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;
    const {onChange} = this;
    return children({
      ...rest,
      ...this.state,
      onChange,
    });
  }
}

export default StatefulSliderContainer;
