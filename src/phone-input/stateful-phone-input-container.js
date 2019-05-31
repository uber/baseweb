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
    overrides: {},
    onInputChange: () => {},
    onCountryChange: () => {},
    stateReducer: defaultStateReducer,
  };

  state = {...this.props.initialState};

  internalSetState = (type: StateChangeT, nextState: $Shape<StateT>) => {
    this.setState(this.props.stateReducer(type, nextState, this.state));
  };

  onInputChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.props.onInputChange(event);
    this.internalSetState(STATE_CHANGE_TYPE.inputChange, {
      inputValue: event.target.value,
    });
  };

  onCountryChange = (event: CountryChangeEventT) => {
    this.props.onCountryChange(event);
    // Replace (if possible) the current country dialcode
    let newInputValue = this.state.inputValue.replace(
      `+${this.state.countryValue.dialCode}`,
      `+${event.option.dialCode}`,
    );
    // If the replacement did nothing, just use the new dialcode
    newInputValue =
      this.state.inputValue === newInputValue
        ? `+${event.option.dialCode} `
        : newInputValue;
    this.internalSetState(STATE_CHANGE_TYPE.countryChange, {
      inputValue: newInputValue,
      countryValue: event.option,
    });
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
