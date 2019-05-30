/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

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
  CountryChangeEventT,
} from './types.js';

const getCountry = iso => {
  return countries.find(({id}) => id === iso) || {dialCode: ''};
};

const defaultStateReducer: StateReducerT = (type, nextState) => nextState;

export default class StatefulPhoneInputContainer extends React.Component<
  StatefulPhoneInputContainerPropsT,
  StateT,
> {
  static defaultProps = {
    initialState: {
      inputValue: `+${getCountry('US').dialCode} `,
      countryValue: getCountry('US'),
    },
    overrides: {
      Input: {},
      CountrySelect: {},
      CountrySelectDropdown: {},
      CountrySelectDropdownListItem: {},
      CountrySelectDropdownFlagColumn: {},
      CountrySelectDropdownNameColumn: {},
      CountrySelectDropdownDialcodeColumn: {},
    },
    onInputChange: () => {},
    onCountryChange: () => {},
    stateReducer: defaultStateReducer,
  };

  state = {...this.props.initialState};

  internalSetState = (type: StateChangeT, payload: StateChangePayloadT) => {
    const nextState: StateT = this.internalStateReducer(type, payload);
    this.setState(this.props.stateReducer(type, nextState));
  };

  internalStateReducer = (type: StateChangeT, payload: StateChangePayloadT) => {
    switch (type) {
      case STATE_CHANGE_TYPE.inputValueChange:
        if (typeof payload === 'string') {
          return {...this.state, inputValue: payload};
        } else {
          return this.state;
        }
      case STATE_CHANGE_TYPE.countryValueChange: {
        if (typeof payload !== 'string') {
          // Replace (if possible) the current country dialcode
          let newInputValue = this.state.inputValue.replace(
            `+${this.state.countryValue.dialCode}`,
            `+${payload.dialCode}`,
          );
          // If the replacement did nothing, just use the new dialcode
          newInputValue =
            this.state.inputValue === newInputValue
              ? `+${payload.dialCode} `
              : newInputValue;
          return {
            inputValue: newInputValue,
            countryValue: payload,
          };
        } else {
          return this.state;
        }
      }
      default:
        return this.state;
    }
  };

  onInputChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.internalSetState(
      STATE_CHANGE_TYPE.inputValueChange,
      event.target.value,
    );
    this.props.onInputChange(event);
  };

  onCountryChange = (event: CountryChangeEventT) => {
    if (event.option) {
      this.internalSetState(STATE_CHANGE_TYPE.countryValueChange, event.option);
      this.props.onCountryChange(event);
    }
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
