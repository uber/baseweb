/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import InputMask from 'react-input-mask';

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
    adjoined: ADJOINED.none,
    autoFocus: false,
    disabled: false,
    error: false,
    maskChar: ' ',
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
      $ref: inputRef,
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
    const {overrides = {}, mask, maskChar, type, value} = this.props;

    const sharedProps = getSharedProps(this.props, this.state);

    const [InputContainer, inputContainerProps] = getOverrides(
      overrides.InputContainer,
      StyledInputContainer,
    );
    const [Input, inputPropsFromOverride] = getOverrides(
      overrides.Input,
      StyledInput,
    );
    const [Before, beforeProps] = getOverrides(overrides.Before, NullComponent);
    const [After, afterProps] = getOverrides(overrides.After, NullComponent);

    if (type === CUSTOM_INPUT_TYPE.textarea) {
      return (
        <InputContainer {...sharedProps} {...inputContainerProps}>
          <Before {...sharedProps} {...beforeProps} />
          <Input
            {...sharedProps}
            {...this.getInputProps()}
            {...inputPropsFromOverride}
          >
            {value}
          </Input>
          <After {...sharedProps} {...afterProps} />
        </InputContainer>
      );
    }

    return (
      <InputMask mask={mask} maskChar={maskChar} {...this.getInputProps()}>
        {inputProps => {
          return (
            <InputContainer {...sharedProps} {...inputContainerProps}>
              <Before {...sharedProps} {...beforeProps} />
              <Input
                {...sharedProps}
                {...inputProps}
                {...inputPropsFromOverride}
              />
              <After {...sharedProps} {...afterProps} />
            </InputContainer>
          );
        }}
      </InputMask>
    );
  }
}

export default BaseInput;
