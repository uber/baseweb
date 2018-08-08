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
import React from 'react';
import type {PropsT, DefaultPropsT, StatelessStateT} from './types';
import {
  RadioGroupRoot as StyledRadioGroupRoot,
  RadioMark as StyledRadioMark,
  Label as StyledLabel,
  Input as StyledInput,
  Root as StyledRoot,
} from './styled-components';

class StatelessRadioGroup extends React.Component<PropsT, StatelessStateT> {
  static defaultProps: DefaultPropsT = {
    name: '',
    value: '',
    disabled: false,
    autoFocus: false,
    labelPlacement: 'right',
    align: 'vertical',
    isError: false,
    required: false,
    onChange: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onFocus: () => {},
    onBlur: () => {},
  };

  render() {
    const {
      name,
      children,
      labelPlacement,
      isError,
      disabled,
      align,
      required,
      overrides = {},
    } = this.props;
    const events = {
      onChange: this.props.onChange,
      onMouseEnter: this.props.onMouseEnter,
      onMouseLeave: this.props.onMouseLeave,
      onFocus: this.props.onFocus,
      onBlur: this.props.onBlur,
    };
    const sharedProps = {
      $isError: isError,
      $required: required,
      $disabled: disabled,
    };
    const {
      Root = StyledRoot,
      RadioMark = StyledRadioMark,
      Label = StyledLabel,
      Input = StyledInput,
    } = overrides;
    const childrenProps = {
      name,
      isError,
      disabled,
      required,
      labelPlacement,
      type: 'radio',
      overrides: {Root, Checkmark: RadioMark, Label, Input},
      ...sharedProps,
      ...events,
    };
    return (
      <StyledRadioGroupRoot $align={align} {...sharedProps}>
        {React.Children.map(children, child => {
          if (!React.isValidElement(child)) {
            return null;
          }
          return React.cloneElement(child, {
            ...childrenProps,
            checked: this.props.value === child.props.value,
          });
        })}
      </StyledRadioGroupRoot>
    );
  }
}

export default StatelessRadioGroup;
