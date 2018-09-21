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
  DefaultStatefulPropsT,
  StateT,
  ParamsT,
  ChangeActionT,
} from './types';

const defaultStateReducer: StateReducerT = (type, nextState) => nextState;

class StatefulSelectContainer extends React.Component<
  StatefulContainerPropsT,
  StateT,
> {
  static defaultProps: DefaultStatefulPropsT = {
    initialState: {
      selectedOptions: [],
    },
    stateReducer: defaultStateReducer,
    onChange: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onFocus: () => {},
    onBlur: () => {},
  };

  state = {...this.props.initialState};

  onChange = (e: SyntheticInputEvent<HTMLInputElement>, params: ParamsT) => {
    this.stateReducer(params.type, e, params);
    const {onChange} = this.props;
    onChange && onChange(e, params);
  };

  onMouseEnter = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const {onMouseEnter} = this.props;
    onMouseEnter && onMouseEnter(e);
  };

  onMouseLeave = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const {onMouseLeave} = this.props;
    onMouseLeave && onMouseLeave(e);
  };

  onFocus = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const {onFocus} = this.props;
    onFocus && onFocus(e);
  };

  onBlur = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const {onBlur} = this.props;
    onBlur && onBlur(e);
  };

  stateReducer = (
    type: ChangeActionT,
    e: SyntheticInputEvent<HTMLInputElement>,
    params: ParamsT,
  ) => {
    let nextState = {};
    switch (type) {
      case STATE_CHANGE_TYPE.select:
      case STATE_CHANGE_TYPE.unselect:
      case STATE_CHANGE_TYPE.clearAll:
        nextState = {
          selectedOptions: params.selectedOptions,
        };
        break;
      case STATE_CHANGE_TYPE.keyDown: {
        nextState = {
          textValue: params.textValue,
        };
        break;
      }
    }
    const {stateReducer} = this.props;
    const newState = stateReducer(type, nextState, this.state, e, params);
    this.setState(newState);
  };

  render() {
    const {
      children = (childProps: {}) => null, // eslint-disable-line no-unused-vars
      initialState, // eslint-disable-line no-unused-vars
      stateReducer, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;
    const {onChange, onMouseEnter, onMouseLeave, onFocus, onBlur} = this;
    return children({
      ...rest,
      ...this.state,
      onChange,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
    });
  }
}

export default StatefulSelectContainer;
