/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* global window */

import * as React from 'react';

import {getOverrides, mergeOverrides} from '../helpers/overrides.js';
import {ADJOINED, SIZE, CUSTOM_INPUT_TYPE} from './constants.js';
import {
  InputContainer as StyledInputContainer,
  Input as StyledInput,
  StyledClearIcon,
  StyledClearIconContainer,
} from './styled-components.js';
import type {BaseInputPropsT, InternalStateT} from './types.js';
import {getSharedProps} from './utils.js';
import {Button, KIND} from '../button/index.js';
import Hide from '../icon/hide.js';
import Show from '../icon/show.js';
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
    onBlur: () => {},
    onChange: () => {},
    onKeyDown: () => {},
    onKeyPress: () => {},
    onKeyUp: () => {},
    onFocus: () => {},
    onClear: () => {},
    clearable: false,
    overrides: {},
    pattern: null,
    placeholder: '',
    required: false,
    size: SIZE.default,
    type: 'text',
  };

  // eslint-disable-next-line flowtype/no-weak-types
  inputRef = this.props.inputRef || React.createRef<any>();

  state = {
    isFocused: this.props.autoFocus || false,
    isMasked: this.props.type === 'password',
  };

  componentDidMount() {
    const {autoFocus, clearable} = this.props;
    if (this.inputRef.current) {
      if (autoFocus) {
        this.inputRef.current.focus();
      }
      if (clearable) {
        this.inputRef.current.addEventListener('keydown', this.onInputKeyDown);
      }
    }
  }

  componentWillUnmount() {
    const {clearable} = this.props;
    if (clearable && this.inputRef.current) {
      this.inputRef.current.removeEventListener('keydown', this.onInputKeyDown);
    }
  }

  clearValue() {
    // trigger a fake input change event (as if all text was deleted)
    const input = this.inputRef.current;
    if (input) {
      const nativeInputValue = Object.getOwnPropertyDescriptor(
        this.props.type === CUSTOM_INPUT_TYPE.textarea
          ? window.HTMLTextAreaElement.prototype
          : window.HTMLInputElement.prototype,
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

  onInputKeyDown = (e: KeyboardEvent) => {
    if (this.props.clearable && e.key === 'Escape' && this.inputRef.current) {
      this.clearValue();
      // prevent event from closing modal or doing something unexpected
      e.stopPropagation();
    }
  };

  onClearIconClick = () => {
    if (this.inputRef.current) this.clearValue();
    // return focus to the input after click
    if (this.inputRef.current) this.inputRef.current.focus();
  };

  onFocus = (e: SyntheticFocusEvent<T>) => {
    this.setState({isFocused: true});
    this.props.onFocus(e);
  };

  onBlur = (e: SyntheticFocusEvent<T>) => {
    this.setState({isFocused: false});
    this.props.onBlur(e);
  };

  getInputType() {
    // If the type prop is equal to "password" we allow the user to toggle between
    // masked and non masked text. Internally, we toggle between type "password"
    // and "text".
    if (this.props.type === 'password') {
      return this.state.isMasked ? 'password' : 'text';
    } else {
      return this.props.type;
    }
  }

  renderMaskToggle() {
    if (this.props.type !== 'password') return null;

    const [MaskToggleButton, maskToggleButtonProps] = getOverrides(
      this.props.overrides.MaskToggleButton,
      Button,
    );
    const baseButtonOverrides = {
      BaseButton: {
        style: ({$theme}) => ({
          color: $theme.colors.contentPrimary,
        }),
      },
    };
    // $FlowFixMe
    maskToggleButtonProps.overrides = mergeOverrides(
      baseButtonOverrides,
      // $FlowFixMe
      maskToggleButtonProps.overrides,
    );
    const [MaskToggleShowIcon, maskToggleIconShowProps] = getOverrides(
      this.props.overrides.MaskToggleShowIcon,
      Show,
    );
    const [MaskToggleHideIcon, maskToggleIconHideProps] = getOverrides(
      this.props.overrides.MaskToggleHideIcon,
      Hide,
    );
    const label = this.state.isMasked
      ? 'Show password text'
      : 'Hide password text';
    const iconSize = {
      [SIZE.compact]: '16px',
      [SIZE.default]: '20px',
      [SIZE.large]: '24px',
    }[this.props.size];
    return (
      <MaskToggleButton
        aria-label={label}
        kind={KIND.minimal}
        onClick={() => this.setState({isMasked: !this.state.isMasked})}
        title={label}
        type="button"
        size={this.props.size}
        {...maskToggleButtonProps}
      >
        {this.state.isMasked ? (
          <MaskToggleShowIcon
            size={iconSize}
            title={label}
            {...maskToggleIconShowProps}
          />
        ) : (
          <MaskToggleHideIcon
            size={iconSize}
            title={label}
            {...maskToggleIconHideProps}
          />
        )}
      </MaskToggleButton>
    );
  }

  renderClear() {
    const {clearable, value, disabled, overrides = {}} = this.props;
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
    const sharedProps = getSharedProps(this.props, this.state);
    return (
      <ClearIconContainer
        $alignTop={this.props.type === CUSTOM_INPUT_TYPE.textarea}
        {...sharedProps}
        {...clearIconContainerProps}
      >
        <ClearIcon
          size={16}
          title={ariaLabel}
          aria-label={ariaLabel}
          onClick={this.onClearIconClick}
          role="button"
          {...sharedProps}
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
          ref={this.inputRef}
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
          pattern={this.props.pattern}
          placeholder={this.props.placeholder}
          type={this.getInputType()}
          required={this.props.required}
          value={this.props.value}
          min={this.props.min}
          max={this.props.max}
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
        {this.renderMaskToggle()}
        <After {...sharedProps} {...afterProps} />
      </InputContainer>
    );
  }
}
export default BaseInput;
