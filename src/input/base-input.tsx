/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* global window */

import * as React from 'react';

import { getOverrides } from '../helpers/overrides';
import { ADJOINED, SIZE, CUSTOM_INPUT_TYPE } from './constants';
import {
  InputContainer as StyledInputContainer,
  Input as StyledInput,
  StyledClearIcon,
  StyledClearIconContainer,
  StyledMaskToggleButton,
} from './styled-components';
import type { BaseInputProps, InternalState } from './types';
import { getSharedProps } from './utils';
import Hide from '../icon/hide';
import Show from '../icon/show';
import createEvent from '../utils/create-event';
import { isFocusVisible, forkFocus, forkBlur } from '../utils/focusVisible';

import type { SyntheticEvent, FocusEvent } from 'react';

// @ts-ignore
const NullComponent = () => null;

class BaseInput<T extends HTMLInputElement | HTMLTextAreaElement> extends React.Component<
  BaseInputProps<T>,
  InternalState
> {
  static defaultProps = {
    // @ts-ignore
    'aria-activedescendant': null,
    // @ts-ignore
    'aria-autocomplete': null,
    // @ts-ignore
    'aria-controls': null,
    // @ts-ignore
    'aria-errormessage': null,
    // @ts-ignore
    'aria-haspopup': null,
    // @ts-ignore
    'aria-label': null,
    // @ts-ignore
    'aria-labelledby': null,
    // @ts-ignore
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
    clearOnEscape: true,
    overrides: {},
    // @ts-ignore
    pattern: null,
    placeholder: '',
    required: false,
    // @ts-ignore
    role: null,
    size: SIZE.default,
    type: 'text',
    readOnly: false,
  };

  inputRef = this.props.inputRef || React.createRef<T>();

  state = {
    isFocused: this.props.autoFocus || false,
    isMasked: this.props.type === 'password',
    initialType: this.props.type,
    isFocusVisibleForClear: false,
    isFocusVisibleForMaskToggle: false,
  };

  componentDidMount() {
    const { autoFocus, clearable } = this.props;
    if (this.inputRef.current) {
      if (autoFocus) {
        this.inputRef.current.focus();
      }
      if (clearable) {
        // @ts-ignore
        this.inputRef.current.addEventListener('keydown', this.onInputKeyDown);
      }
    }
  }

  componentWillUnmount() {
    const { clearable } = this.props;
    if (clearable && this.inputRef.current) {
      // @ts-ignore
      this.inputRef.current.removeEventListener('keydown', this.onInputKeyDown);
    }
  }

  clearValue() {
    // trigger a fake input change event (as if all text was deleted)
    const input = this.inputRef.current;
    if (input) {
      const nativeInputValue = Object.getOwnPropertyDescriptor(
        this.props.type === CUSTOM_INPUT_TYPE.textarea
          ? // todo(flow->ts): globals, not props of window object
            HTMLTextAreaElement.prototype
          : HTMLInputElement.prototype,
        'value'
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
    if (
      this.props.clearOnEscape &&
      e.key === 'Escape' &&
      this.inputRef.current &&
      !this.props.readOnly
    ) {
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

  onFocus = (e: FocusEvent<T>) => {
    this.setState({ isFocused: true });
    // @ts-ignore
    this.props.onFocus(e);
  };

  onBlur = (e: FocusEvent<T>) => {
    this.setState({ isFocused: false });
    // @ts-ignore
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

  handleFocusForMaskToggle = (event: SyntheticEvent) => {
    if (isFocusVisible(event)) {
      this.setState({ isFocusVisibleForMaskToggle: true });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleBlurForMaskToggle = (event: SyntheticEvent) => {
    if (this.state.isFocusVisibleForMaskToggle !== false) {
      this.setState({ isFocusVisibleForMaskToggle: false });
    }
  };

  renderMaskToggle() {
    if (this.props.type !== 'password') return null;

    const [MaskToggleButton, maskToggleButtonProps] = getOverrides(
      // @ts-ignore
      this.props.overrides.MaskToggleButton,
      StyledMaskToggleButton
    );
    const [MaskToggleShowIcon, maskToggleIconShowProps] = getOverrides(
      // @ts-ignore
      this.props.overrides.MaskToggleShowIcon,
      Show
    );
    const [MaskToggleHideIcon, maskToggleIconHideProps] = getOverrides(
      // @ts-ignore
      this.props.overrides.MaskToggleHideIcon,
      Hide
    );
    const label = this.state.isMasked ? 'Show password text' : 'Hide password text';
    const iconSize = {
      [SIZE.mini]: '12px',
      [SIZE.compact]: '16px',
      [SIZE.default]: '20px',
      [SIZE.large]: '24px',
      // @ts-ignore
    }[this.props.size];
    return (
      // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
      <MaskToggleButton
        $size={this.props.size}
        $isFocusVisible={this.state.isFocusVisibleForMaskToggle}
        aria-label={label}
        onClick={() => this.setState((state) => ({ isMasked: !state.isMasked }))}
        title={label}
        type="button"
        {...maskToggleButtonProps}
        onFocus={forkFocus(maskToggleButtonProps, this.handleFocusForMaskToggle)}
        onBlur={forkBlur(maskToggleButtonProps, this.handleBlurForMaskToggle)}
      >
        {this.state.isMasked ? (
          // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
          <MaskToggleShowIcon size={iconSize} title={label} {...maskToggleIconShowProps} />
        ) : (
          // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
          <MaskToggleHideIcon size={iconSize} title={label} {...maskToggleIconHideProps} />
        )}
      </MaskToggleButton>
    );
  }

  handleFocusForClear = (event: SyntheticEvent) => {
    if (isFocusVisible(event)) {
      this.setState({ isFocusVisibleForClear: true });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleBlurForClear = (event: SyntheticEvent) => {
    if (this.state.isFocusVisibleForClear !== false) {
      this.setState({ isFocusVisibleForClear: false });
    }
  };

  renderClear() {
    const { clearable, value, disabled, readOnly, overrides = {} } = this.props;
    if (
      disabled ||
      readOnly ||
      !clearable ||
      value == null ||
      (typeof value === 'string' && value.length === 0)
    ) {
      return null;
    }

    const [ClearIconContainer, clearIconContainerProps] = getOverrides(
      overrides.ClearIconContainer,
      StyledClearIconContainer
    );
    const [ClearIcon, clearIconProps] = getOverrides(overrides.ClearIcon, StyledClearIcon);
    const ariaLabel = 'Clear value';
    const sharedProps = getSharedProps(this.props, this.state);
    const iconSize = {
      [SIZE.mini]: '14px',
      [SIZE.compact]: '14px',
      [SIZE.default]: '16px',
      [SIZE.large]: '22px',
      // @ts-ignore
    }[this.props.size];
    return (
      // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
      <ClearIconContainer
        $alignTop={this.props.type === CUSTOM_INPUT_TYPE.textarea}
        {...sharedProps}
        {...clearIconContainerProps}
      >
        {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
        <ClearIcon
          size={iconSize}
          tabIndex={0}
          title={ariaLabel}
          aria-label={ariaLabel}
          onClick={this.onClearIconClick}
          // @ts-ignore
          onKeyDown={(event) => {
            if (event.key && (event.key === 'Enter' || event.key === ' ')) {
              event.preventDefault();
              this.onClearIconClick();
            }
          }}
          role="button"
          $isFocusVisible={this.state.isFocusVisibleForClear}
          {...sharedProps}
          {...clearIconProps}
          onFocus={forkFocus(clearIconProps, this.handleFocusForClear)}
          onBlur={forkBlur(clearIconProps, this.handleBlurForClear)}
        />
      </ClearIconContainer>
    );
  }

  render() {
    const {
      overrides: {
        // @ts-ignore
        InputContainer: InputContainerOverride,
        // @ts-ignore
        Input: InputOverride,
        // @ts-ignore
        Before: BeforeOverride,
        // @ts-ignore
        After: AfterOverride,
      },
    } = this.props;

    // more here https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion#Preventing_autofilling_with_autocompletenew-password
    const autoComplete =
      this.state.initialType === 'password' &&
      this.props.autoComplete === BaseInput.defaultProps.autoComplete
        ? 'new-password'
        : this.props.autoComplete;

    const sharedProps = getSharedProps(this.props, this.state);

    const [InputContainer, inputContainerProps] = getOverrides(
      InputContainerOverride,
      StyledInputContainer
    );
    const [Input, inputProps] = getOverrides(InputOverride, StyledInput);
    const [Before, beforeProps] = getOverrides(BeforeOverride, NullComponent);
    const [After, afterProps] = getOverrides(AfterOverride, NullComponent);

    return (
      // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
      <InputContainer
        data-baseweb={this.props['data-baseweb'] || 'base-input'}
        {...sharedProps}
        {...inputContainerProps}
      >
        {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
        <Before {...sharedProps} {...beforeProps} />
        {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
        <Input
          ref={this.inputRef}
          aria-activedescendant={this.props['aria-activedescendant']}
          aria-autocomplete={this.props['aria-autocomplete']}
          aria-controls={this.props['aria-controls']}
          aria-errormessage={this.props['aria-errormessage']}
          aria-haspopup={this.props['aria-haspopup']}
          aria-label={this.props['aria-label']}
          aria-labelledby={this.props['aria-labelledby']}
          aria-describedby={this.props['aria-describedby']}
          aria-invalid={this.props.error}
          aria-required={this.props.required}
          autoComplete={autoComplete}
          disabled={this.props.disabled}
          readOnly={this.props.readOnly}
          id={this.props.id}
          inputMode={this.props.inputMode}
          maxLength={this.props.maxLength}
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
          role={this.props.role}
          value={this.props.value}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          rows={this.props.type === CUSTOM_INPUT_TYPE.textarea ? this.props.rows : null}
          {...sharedProps}
          {...inputProps}
        />
        {this.renderClear()}
        {this.renderMaskToggle()}
        {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
        <After {...sharedProps} {...afterProps} />
      </InputContainer>
    );
  }
}
export default BaseInput;
