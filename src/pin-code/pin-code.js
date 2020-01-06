/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import MultiRef from 'react-multi-ref';
import defaultProps from './default-props.js';
import {
  StyledRoot,
  StyledInputOverrideRoot,
  StyledInputOverrideInput,
} from './styled-components.js';
import type {PropsT, StateT} from './types.js';
import {getOverrides, mergeOverrides} from '../helpers/overrides.js';
import {Input as DefaultInput} from '../input/index.js';

export default class PinCode extends React.Component<PropsT, StateT> {
  static defaultProps = defaultProps;

  _inputRefs = new MultiRef<number, HTMLInputElement>();

  state = {
    hasFocus: false,
  };

  componentDidMount() {
    if (this.props.autoFocus) {
      const inputRef = this._inputRefs.map.get(0);
      if (inputRef && inputRef.focus) inputRef.focus();
    }
  }

  render() {
    const [Root, rootProps] = getOverrides(
      this.props.overrides.Root,
      StyledRoot,
    );
    const [Input, inputProps] = getOverrides(
      this.props.overrides.Input,
      DefaultInput,
    );
    const baseOverrides = {
      Root: {component: StyledInputOverrideRoot},
      Input: {component: StyledInputOverrideInput},
    };
    // $FlowFixMe
    inputProps.overrides = mergeOverrides(baseOverrides, inputProps.overrides);
    return (
      <Root data-baseweb="pin-code" {...rootProps}>
        {this.props.values.map((v, i) => {
          return (
            <Input
              aria-label={this.props['aria-label']}
              aria-labelledby={this.props['aria-labelledby']}
              aria-describedby={this.props['aria-describedby']}
              autoComplete="one-time-code"
              disabled={this.props.disabled}
              error={this.props.error}
              id={this.props.id ? this.props.id + '-' + i : null}
              inputMode="numeric"
              inputRef={this._inputRefs.ref(i)}
              key={i}
              maxLength="1"
              name={this.props.name}
              onBlur={() => this.setState({hasFocus: false})}
              onFocus={() => this.setState({hasFocus: true})}
              onChange={event => {
                const eventValue = event.target.value;
                // in the case of an autocomplete or copy and paste
                if (eventValue.length > 2) {
                  // see if we can use the string to fill out our values
                  if (
                    eventValue.length === this.props.values.length &&
                    eventValue.match(/^[0-9]+$/)
                  ) {
                    this.props.onChange({values: eventValue.split(''), event});
                  }
                  return;
                }
                // digit was deleted
                if (eventValue === '') {
                  const newValues = this.props.values.slice();
                  newValues[i] = '';
                  this.props.onChange({values: newValues, event});
                  return;
                }
                // we want to override the input value with the last digit typed
                const currentValue = this.props.values[i];
                let newValue = eventValue;
                if (currentValue[0] === eventValue[0]) {
                  newValue = eventValue[1];
                } else if (currentValue[0] === eventValue[1]) {
                  newValue = eventValue[0];
                }
                // only fire a change event if the new value is a digit
                if (newValue.match(/^[0-9]$/)) {
                  const newValues = this.props.values.slice();
                  newValues[i] = newValue;
                  this.props.onChange({values: newValues, event});
                  // tab to next pin code input if we aren't at end already
                  if (
                    this.props.manageFocus &&
                    i < this.props.values.length - 1
                  ) {
                    const inputRef = this._inputRefs.map.get(i + 1);
                    if (inputRef && inputRef.focus) inputRef.focus();
                  }
                }
              }}
              onKeyDown={event => {
                // if we see a backspace/delete and the input is empty, transfer focus backward
                if (
                  this.props.manageFocus &&
                  event.key === 'Backspace' &&
                  this.props.values[i] === '' &&
                  i > 0
                ) {
                  const inputRef = this._inputRefs.map.get(i - 1);
                  if (inputRef && inputRef.focus) inputRef.focus();
                }
              }}
              pattern="\d*"
              placeholder={this.state.hasFocus ? '' : this.props.placeholder}
              positive={this.props.positive}
              required={this.props.required}
              size={this.props.size}
              type="text"
              value={this.props.values[i]}
              {...inputProps}
            />
          );
        })}
      </Root>
    );
  }
}
