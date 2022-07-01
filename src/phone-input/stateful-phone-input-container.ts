/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
// needs to be removed from here
import { COUNTRIES, STATE_CHANGE_TYPE } from './constants';
import type {
  StatefulPhoneInputContainerPropsT,
  StateT,
  StateReducerT,
  StateChangeT,
} from './types';
import defaultProps from './default-props';
import type { OnChangeParamsT } from '../select/types';

import type { ChangeEvent } from 'react';

const defaultStateReducer: StateReducerT = (type, nextState) => nextState;

export default class StatefulPhoneInputContainer extends React.Component<
  StatefulPhoneInputContainerPropsT,
  StateT
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

  state = { text: '', country: COUNTRIES.US, ...this.props.initialState };

  internalSetState = (type: StateChangeT, nextState: Partial<StateT>) => {
    this.setState(this.props.stateReducer(type, nextState, this.state));
  };

  onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
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
    return this.props.children({
      ...defaultProps,
      'aria-label': this.props['aria-label'],
      'aria-labelledby': this.props['aria-labelledby'],
      'aria-describedby': this.props['aria-describedby'],
      disabled: this.props.disabled,
      error: this.props.error,
      id: this.props.id,
      maxDropdownHeight: this.props.maxDropdownHeight,
      maxDropdownWidth: this.props.maxDropdownWidth,
      mapIsoToLabel: this.props.mapIsoToLabel,
      name: this.props.name,
      overrides: this.props.overrides,
      placeholder: this.props.placeholder,
      positive: this.props.positive,
      required: this.props.required,
      size: this.props.size,
      clearable: this.props.clearable,
      country: this.state.country,
      text: this.state.text,
      onTextChange: this.onTextChange,
      onCountryChange: this.onCountryChange,
    });
  }
}
