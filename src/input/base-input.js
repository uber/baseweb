/*
MIT License

Copyright (c) 2018 Uber Technologies, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
// @flow
import * as React from 'react';
import getBuiId from '../utils/get-bui-id';
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
    id: getBuiId(),
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
