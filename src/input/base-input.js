/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* global window */

import * as React from 'react';

import {getOverrides} from '../helpers/overrides.js';
import {ADJOINED, SIZE, CUSTOM_INPUT_TYPE} from './constants.js';
import {
  InputContainer as StyledInputContainer,
  Input as StyledInput,
  StyledClearIcon,
  StyledClearIconContainer,
} from './styled-components.js';
import type {BaseInputPropsT, InternalStateT} from './types.js';
import {getSharedProps} from './utils.js';
import createEvent from '../utils/create-event.js';

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
    onClear: () => {},
    clearable: false,
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
    const {inputRef, autoFocus, clearable} = this.props;
    if (inputRef.current) {
      if (autoFocus) {
        inputRef.current.focus();
      }
      if (clearable) {
        inputRef.current.addEventListener('keydown', this.onInputKeyDown);
      }
    }
  }

  componentWillUnmount() {
    const {inputRef, clearable} = this.props;
    if (clearable && inputRef.current) {
      inputRef.current.removeEventListener('keydown', this.onInputKeyDown);
    }
  }

  clearValue() {
    // trigger a fake input change event (as if all text was deleted)
    const input = this.props.inputRef.current;
    if (input) {
      const nativeInputValue = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value',
      );
      if (nativeInputValue) {
        const nativeInputValueSetter = nativeInputValue.set;
        if (nativeInputValueSetter) {
          nativeInputValueSetter.call(input, '');
          const event = createEvent('input');
          input.dispatchEvent(event);
        }
      }
    }
  }

  onInputKeyDown = (e: SyntheticKeyboardEvent<T>) => {
    if (
      this.props.clearable &&
      e.key === 'Escape' &&
      this.props.inputRef.current
    ) {
      this.clearValue();
      // prevent event from closing modal or doing something unexpected
      e.stopPropagation();
    }
  };

  onClearIconClick = () => {
    if (this.props.inputRef.current) {
      this.clearValue();
      // return focus to the input after click
      this.props.inputRef.current.focus();
    }
  };

  onFocus = (e: SyntheticFocusEvent<T>) => {
    this.setState({isFocused: true});
    this.props.onFocus(e);
  };

  onBlur = (e: SyntheticFocusEvent<T>) => {
    this.setState({isFocused: false});
    this.props.onBlur(e);
  };

  renderClear() {
    const {clearable, value, disabled, overrides = {}, size} = this.props;
    if (!clearable || !value || !value.length || disabled) {
      return null;
    }
    const [ClearIconContainer, clearIconContainerProps] = getOverrides(
      overrides.ClearIconContainer,
      StyledClearIconContainer,
    );
    const [ClearIcon, clearIconProps] = getOverrides(
      overrides.ClearIcon,
      StyledClearIcon,
    );
    const ariaLabel = 'Clear value';
    return (
      <ClearIconContainer
        $size={size}
        $alignTop={this.props.type === CUSTOM_INPUT_TYPE.textarea}
        {...clearIconContainerProps}
      >
        <ClearIcon
          size={size === SIZE.large ? 'scale700' : 'scale600'}
          title={ariaLabel}
          aria-label={ariaLabel}
          onClick={this.onClearIconClick}
          role="button"
          {...clearIconProps}
        />
      </ClearIconContainer>
    );
  }

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
        {this.renderClear()}
        <After {...sharedProps} {...afterProps} />
      </InputContainer>
    );
  }
}

export default BaseInput;
