/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import type {TextareaPropsT} from './types.js';
import {mergeOverrides} from '../helpers/overrides.js';
import {BaseInput, SIZE, CUSTOM_INPUT_TYPE} from '../input/index.js';
import {StyledTextarea, StyledTextareaContainer} from './styled-components.js';

class Textarea extends React.Component<TextareaPropsT> {
  static defaultProps = {
    autoFocus: false,
    disabled: false,
    error: false,
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
        Input: {component: StyledTextarea},
        InputContainer: {component: StyledTextareaContainer},
      },
      this.props.overrides,
    );
    return (
      //$FlowFixMe
      <BaseInput
        data-baseweb="textarea"
        {...this.props}
        type={CUSTOM_INPUT_TYPE.textarea}
        overrides={overrides}
      />
    );
  }
}

export default Textarea;
