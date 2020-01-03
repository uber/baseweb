/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
// needs to be removed from here
import {COUNTRIES, STATE_CHANGE_TYPE} from './constants.js';
import type {
  StatefulPhoneInputContainerPropsT,
  StateT,
  StateReducerT,
  StateChangeT,
} from './types.js';
import defaultProps from './default-props.js';
import type {OnChangeParamsT} from '../select/types.js';

const defaultStateReducer: StateReducerT = (type, nextState) => nextState;

export default class StatefulPhoneInputContainer extends React.Component<
  StatefulPhoneInputContainerPropsT,
  StateT,
> {
  static defaultProps = {
    initialState: {
      text: defaultProps.text,
      country: defaultProps.country,
    },
    onTextChange: defaultProps.onTextChange,
    onCountryChange: defaultProps.onTextChange,
    stateReducer: defaultStateReducer,
    overrides: {},
  };

  state = {text: '', country: COUNTRIES.US, ...this.props.initialState};

  internalSetState = (type: StateChangeT, nextState: $Shape<StateT>) => {
    this.setState(this.props.stateReducer(type, nextState, this.state));
  };

  onTextChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.props.onTextChange(event);
    this.internalSetState(STATE_CHANGE_TYPE.textChange, {
      text: event.target.value,
    });
  };

  onCountryChange = (event: OnChangeParamsT) => {
    this.props.onCountryChange(event);
    if (event.option && event.option.id) {
      this.internalSetState(STATE_CHANGE_TYPE.countryChange, {
        country: COUNTRIES[event.option.id],
      });
    }
  };

  render() {
    const {children, initialState, stateReducer, ...restProps} = this.props;
    return children({
      ...defaultProps,
      ...restProps,
      ...this.state,
      onTextChange: this.onTextChange,
      onCountryChange: this.onCountryChange,
    });
  }
}
