/*
Copyright (c) 2018 Uber Technologies, Inc.

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
    adjoined: ADJOINED.none,
    autoFocus: false,
    disabled: false,
    error: false,
    name: '',
    inputRef: (React.createRef(): {current: ?HTMLInputElement}),
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

  getInputProps = () => {
    const {
      disabled,
      error,
      id,
      inputRef,
      $ref,
      name,
      onChange,
      onKeyDown,
      onKeyPress,
      onKeyUp,
      placeholder,
      required,
      rows,
      type,
      value,
    } = this.props;

    return {
      $ref: $ref || inputRef,
      'aria-label': this.props['aria-label'],
      'aria-labelledby': this.props['aria-labelledby'],
      'aria-invalid': !!error,
      'aria-required': required,
      disabled,
      id,
      name,
      onBlur: this.onBlur,
      onChange,
      onFocus: this.onFocus,
      onKeyDown,
      onKeyPress,
      onKeyUp,
      placeholder,
      type,
      value,
      ...(type === CUSTOM_INPUT_TYPE.textarea ? {rows} : {}),
    };
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
      <InputContainer {...sharedProps} {...inputContainerProps}>
        <Before {...sharedProps} {...beforeProps} />
        <Input {...sharedProps} {...this.getInputProps()} {...inputProps}>
          {type === CUSTOM_INPUT_TYPE.textarea ? value : null}
        </Input>
        <After {...sharedProps} {...afterProps} />
      </InputContainer>
    );
  }
}

export default BaseInput;
