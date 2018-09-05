/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {getOverride, getOverrideProps} from '../helpers/overrides';
import type {BaseInputPropsT, InternalStateT} from './types';
import {getSharedProps} from './utils';
import {ADJOINED, SIZE, CUSTOM_INPUT_TYPE} from './constants';
import {
  InputContainer as StyledInputContainer,
  Input as StyledInput,
} from './styled-components';

class BaseInput extends React.Component<BaseInputPropsT, InternalStateT> {
  static defaultProps = {
    adjoined: ADJOINED.none,
    autoFocus: false,
    disabled: false,
    error: false,
    name: '',
    inputRef: React.createRef(),
    onBlur: () => {},
    onChange: () => {},
    onFocus: () => {},
    overrides: {},
    placeholder: '',
    required: false,
    size: SIZE.default,
    type: 'text',
    value: '',
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

  onFocus = (e: SyntheticEvent<HTMLElement>) => {
    this.setState({isFocused: true});
    this.props.onFocus(e);
  };

  onBlur = (e: SyntheticEvent<HTMLElement>) => {
    this.setState({isFocused: false});
    this.props.onBlur(e);
  };

  getInputProps = () => {
    const {
      disabled,
      error,
      id,
      name,
      inputRef,
      onChange,
      placeholder,
      required,
      type,
      value,
      rows,
    } = this.props;
    return {
      $ref: inputRef,
      'aria-invalid': !!error,
      'aria-required': required,
      disabled,
      id,
      name,
      onChange,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      placeholder,
      type,
      value: value,
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

    const InputContainer =
      getOverride(InputContainerOverride) || StyledInputContainer;
    const Input = getOverride(InputOverride) || StyledInput;
    const Before = getOverride(BeforeOverride) || null;
    const After = getOverride(AfterOverride) || null;

    return (
      <InputContainer
        {...getOverrideProps(InputContainerOverride)}
        {...sharedProps}
      >
        {Before ? (
          <Before {...getOverrideProps(BeforeOverride)} {...sharedProps} />
        ) : null}
        <Input
          {...getOverrideProps(InputOverride)}
          {...this.getInputProps()}
          {...sharedProps}
        >
          {type === CUSTOM_INPUT_TYPE.textarea ? value : null}
        </Input>
        {After ? (
          <After {...getOverrideProps(AfterOverride)} {...sharedProps} />
        ) : null}
      </InputContainer>
    );
  }
}

export default BaseInput;
