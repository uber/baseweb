/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {countries} from './countries.js';

export default class StatefulContainer extends React.Component {
  static defaultProps = {
    initialState: {
      inputValue: '+' + countries.find(c => c.iso2 === 'US').dialCode,
      countryValue: countries.find(c => c.iso2 === 'US'),
    },
    overrides: {},
    onInputChange: () => {},
    onCountryChange: () => {},
    stateReducer: (state, type, payload) => {
      switch (type) {
        case 'INPUT_VALUE_CHANGE':
          return {...state, inputValue: payload};
        case 'COUNTRY_VALUE_CHANGE': {
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
    this.internalSetState('INPUT_VALUE_CHANGE', event.target.value);
    this.props.onInputChange(event);
  };

  onCountryChange = event => {
    this.internalSetState('COUNTRY_VALUE_CHANGE', event.option);
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
