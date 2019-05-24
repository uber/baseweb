/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {countries, STATE_CHANGE_TYPE} from './constants.js';

import type {
  StatefulPhoneInputContainerPropsT,
  StateT,
  StateReducerT,
  StateChangeT,
  StateChangePayloadT,
  InputChangeEventT,
  CountryChangeEventT,
} from './types.js';

const defaultStateReducer: StateReducerT = (state, type, payload) => {
  switch (type) {
    case STATE_CHANGE_TYPE.inputValueChange:
      if (typeof payload === 'string') {
        return {...state, inputValue: payload};
      } else {
        return state;
      }
    case STATE_CHANGE_TYPE.countryValueChange: {
      if (typeof payload !== 'string') {
        // Replace (if possible) the current country dialcode
        let newInputValue = state.inputValue.replace(
          `+${state.countryValue.dialCode}`,
          `+${payload.dialCode}`,
        );
        // If the replacement did nothing, just use the new dialcode
        newInputValue =
          state.inputValue === newInputValue
            ? `+${payload.dialCode} `
            : newInputValue;
        return {
          inputValue: newInputValue,
          countryValue: payload,
        };
      } else {
        return state;
      }
    }
    default:
      return state;
  }
};

export default class StatefulPhoneInputContainer extends React.Component<
  StatefulPhoneInputContainerPropsT,
  StateT,
> {
  static defaultProps = {
    initialState: {
      inputValue: '+' + countries.US.dialCode,
      countryValue: countries.US,
    },
    overrides: {},
    onInputChange: () => {},
    onCountryChange: () => {},
    stateReducer: defaultStateReducer,
  };

  state = {...this.props.initialState};

  internalSetState = (type: StateChangeT, payload: StateChangePayloadT) => {
    const nextState: StateT = this.props.stateReducer(
      this.state,
      type,
      payload,
    );
    this.setState(nextState);
  };

  onInputChange = (event: InputChangeEventT) => {
    this.internalSetState(
      STATE_CHANGE_TYPE.inputValueChange,
      event.target.value,
    );
    this.props.onInputChange(event);
  };

  onCountryChange = (event: CountryChangeEventT) => {
    this.internalSetState(STATE_CHANGE_TYPE.countryValueChange, event.option);
    this.props.onCountryChange(event);
  };

  render() {
    const {children, initialState, stateReducer, ...restProps} = this.props;
    return children({
      ...restProps,
      ...this.state,
      onInputChange: this.onInputChange,
      onCountryChange: this.onCountryChange,
    });
  }
}
