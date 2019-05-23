/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {countries, STATE_CHANGE_TYPE} from './constants.js';

export default class StatefulContainer extends React.Component {
  static defaultProps = {
    initialState: {
      inputValue: '+' + countries.US.dialCode,
      countryValue: countries.US,
    },
    overrides: {},
    onInputChange: () => {},
    onCountryChange: () => {},
    stateReducer: (state, type, payload) => {
      switch (type) {
        case STATE_CHANGE_TYPE.inputValueChange:
          return {...state, inputValue: payload};
        case STATE_CHANGE_TYPE.countryValueChange: {
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
        }
        default:
          return state;
      }
    },
  };

  state = {...this.props.initialState};

  internalSetState = (type, payload) => {
    const nextState = this.props.stateReducer(this.state, type, payload);
    this.setState(nextState);
  };

  onInputChange = event => {
    this.internalSetState(
      STATE_CHANGE_TYPE.inputValueChange,
      event.target.value,
    );
    this.props.onInputChange(event);
  };

  onCountryChange = event => {
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
