/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import type {TextareaPropsT} from './types';
import {mergeOverrides} from '../helpers/overrides';
import {BaseInput, SIZE, CUSTOM_INPUT_TYPE} from '../input';
import {
  Textarea as StyledTextarea,
  TextareaContainer as StyledTextareaContainer,
} from './styled-components';

class Textarea extends React.Component<TextareaPropsT> {
  static defaultProps = {
    autoFocus: false,
    disabled: false,
    error: false,
    inputRef: React.createRef(),
    name: '',
    onBlur: () => {},
    onChange: () => {},
    onKeyDown: () => {},
    onKeyPress: () => {},
    onKeyUp: () => {},
    onFocus: () => {},
    overrides: {},
    placeholder: '',
    required: false,
    rows: 3,
    size: SIZE.default,
    value: '',
  };

  render() {
    const overrides = mergeOverrides(
      {
        Input: StyledTextarea,
        InputContainer: StyledTextareaContainer,
      },
      this.props.overrides,
    );
    return (
      <BaseInput
        {...this.props}
        type={CUSTOM_INPUT_TYPE.textarea}
        overrides={overrides}
      />
    );
  }
}

export default Textarea;
