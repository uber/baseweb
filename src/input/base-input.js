/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {getOverrides} from '../helpers/overrides.js';

import {ADJOINED, SIZE, CUSTOM_INPUT_TYPE} from './constants.js';
import {
  InputContainer as StyledInputContainer,
  Input as StyledInput,
} from './styled-components.js';
import type {BaseInputPropsT, InternalStateT} from './types.js';
import {getSharedProps} from './utils.js';

const NullComponent = () => null;

class BaseInput<T: EventTarget> extends React.Component<
  BaseInputPropsT<T>,
  InternalStateT,
> {
  static defaultProps = {
    'aria-label': null,
    'aria-labelledby': null,
    'aria-describedby': null,
    adjoined: ADJOINED.none,
    autoComplete: 'on',
    autoFocus: false,
    disabled: false,
    error: false,
    positive: false,
    name: '',
    inputMode: 'text',
    inputRef: (React.createRef(): {current: HTMLInputElement | null}),
    onBlur: () => {},
    onChange: () => {},
    onKeyDown: () => {},
    onKeyPress: () => {},
    onKeyUp: () => {},
    onFocus: () => {},
    overrides: {},
    placeholder: '',
    required: false,
    size: SIZE.default,
    type: 'text',
  };

  state = {
    isFocused: this.props.autoFocus || false,
  };

  componentDidMount() {
    const {autoFocus, inputRef} = this.props;
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }

  onFocus = (e: SyntheticFocusEvent<T>) => {
    this.setState({isFocused: true});
    this.props.onFocus(e);
  };

  onBlur = (e: SyntheticFocusEvent<T>) => {
    this.setState({isFocused: false});
    this.props.onBlur(e);
  };

  render() {
    const {
      value,
      type,
      overrides: {
        InputContainer: InputContainerOverride,
        Input: InputOverride,
        Before: BeforeOverride,
        After: AfterOverride,
      },
    } = this.props;

    const sharedProps = getSharedProps(this.props, this.state);

    const [InputContainer, inputContainerProps] = getOverrides(
      InputContainerOverride,
      StyledInputContainer,
    );
    const [Input, inputProps] = getOverrides(InputOverride, StyledInput);
    const [Before, beforeProps] = getOverrides(BeforeOverride, NullComponent);
    const [After, afterProps] = getOverrides(AfterOverride, NullComponent);
    return (
      <InputContainer
        data-baseweb={this.props['data-baseweb'] || 'base-input'}
        {...sharedProps}
        {...inputContainerProps}
      >
        <Before {...sharedProps} {...beforeProps} />
        <Input
          ref={this.props.inputRef}
          aria-label={this.props['aria-label']}
          aria-labelledby={this.props['aria-labelledby']}
          aria-describedby={this.props['aria-describedby']}
          aria-invalid={this.props.error}
          aria-required={this.props.required}
          autoComplete={this.props.autoComplete}
          disabled={this.props.disabled}
          id={this.props.id}
          inputMode={this.props.inputMode}
          name={this.props.name}
          onBlur={this.onBlur}
          onChange={this.props.onChange}
          onFocus={this.onFocus}
          onKeyDown={this.props.onKeyDown}
          onKeyPress={this.props.onKeyPress}
          onKeyUp={this.props.onKeyUp}
          placeholder={this.props.placeholder}
          type={this.props.type}
          value={this.props.value}
          rows={
            this.props.type === CUSTOM_INPUT_TYPE.textarea
              ? this.props.rows
              : null
          }
          {...sharedProps}
          {...inputProps}
        >
          {type === CUSTOM_INPUT_TYPE.textarea ? value : null}
        </Input>
        <After {...sharedProps} {...afterProps} />
      </InputContainer>
    );
  }
}

export default BaseInput;
